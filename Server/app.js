const express = require("express");
const {collection, Doctor,Appointment, HealthDetails,Diagnosis} = require("./mongo"); // Connection with database
const cors = require("cors"); // CORS middleware
const app = express(); // Creating an instance of Express
const bcrypt = require('bcryptjs'); // Password hashing
const jwt = require('jsonwebtoken'); // Stateless authentication 
const cookieParser = require('cookie-parser'); // Middleware
const multer = require('multer'); // Middleware for handling multipart/form-data
const path = require('path'); // Module for file and directory paths
const { OAuth2Client } = require('google-auth-library');//for google signup
const client = new OAuth2Client('');//Your Oauth2.0 client Id
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // For generating OTP
// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append extension
    }
});
const upload = multer({ storage });
// Configure nodemailer for Amazon SES
const transporter = nodemailer.createTransport({
    host: '', 
    port: 587,
    auth: {
        user: '',
        pass: ''
    }
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from the uploads folder

const JWT_SECRET = ''; // Use environment variables in production
let otpStore = {};
// Admin login route
app.post('/admin-login', (req, res) => {
    const { email, password } = req.body;
  
    if (email === 'admin@onlinehealth.com' && password === 'admin@1234') {
      // Generate a token for the admin
      const token = jwt.sign({ name: 'Admin', email: email }, JWT_SECRET, { expiresIn: '1h' });
  
      return res.json({ status: 'exist', name: 'Admin', token: token });
    } else {
      return res.json({ status: 'incorrect' });
    }
  });
// Login
app.post("/", async (req, res) => {
    const { email, password } = req.body; // Request body for email and password
    try {
        const user = await collection.findOne({ email: email });  // Checking whether email exists or not in collection

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password); // Comparing the login password with existing password in Database
            if (isMatch) {
                // Creating the authentication token with signature
                const token = jwt.sign(
                    { id: user._id, name: user.name, email: user.email },
                    JWT_SECRET,
                    { expiresIn: "5h" }
                );

                // Set the cookie
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false, // Set to true in production
                    maxAge: 5 * 60 * 60 * 1000, // 5 hours
                });
                return res.status(200).json({ status: "exist", name: user.name, token }); // Send in response
            } else {
                return res.json({ status: "incorrect" }); // Send in response
            }
        } else {
            return res.json({ status: "notexist" }); // Send in response
        }
    } catch (e) {
        return res.json({ status: "fail" }); // Send in response
    }
});
// Google Login
app.post("/google-login", async (req, res) => {
    const { tokenId } = req.body;
  
    try {
        // Verify the token using the client
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: '' // Replace with your actual client ID
        });
    
        const { email, name,  picture } = ticket.getPayload();
    
        // Check if the user already exists
        const user = await collection.findOne({ email: email });
        if (user) {
            // Generate a new JWT token
            const token = jwt.sign(
                { id: user._id, name: user.name, email: user.email,  profileImage: picture  },
                JWT_SECRET,
                { expiresIn: "5h" }
            );
    
            return res.status(200).json({ status: "exist", name: user.name, token: token, profileImage: picture  });
        } else {
            return res.status(404).json({ status: "notexist", message: "User not found" });
        }
    } catch (e) {
        console.error("Error during Google Login:", e);
        res.status(500).json({ status: "fail", message: "Error Occurred during Google Login" });
    }
});


// Sign Up
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body; // Requesting the body for sign up details
    const salt = await bcrypt.genSalt(10); // Generating salt (return promise so asynchronous)
    const secPass = await bcrypt.hash(password, salt); // Generating hash (same return promise)
    const data = {
        name: name,
        email: email,
        password: secPass
    };

    try {
        const check = await collection.findOne({ email: email });

        if (check) {
            return res.json({ status: "exist" });
        } else {
            await collection.insertMany([data]); // Inserting the data with encrypted password
            const token = jwt.sign(
                { id: data._id, name, email }, // Signature
                JWT_SECRET,
                { expiresIn: "5h" }
            );
            return res.status(201).json({ status: "notexist", token, name: data.name }); // Response
        }
    } catch (e) {
        return res.json({ status: "fail" }); // Response
    }
});
// Google Signup
app.post("/google-signup", async (req, res) => {
    const { tokenId } = req.body;
  
    try {
      // Verify the token using the client
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: '' // Replace with your actual client ID
      });
  
      const { email, name,picture } = ticket.getPayload();
  
      // Check if the user already exists
      const user = await collection.findOne({ email: email });
      if (user) {
        // Generate a new JWT token
        const token = jwt.sign(
          { id: user._id, name: user.name, email: user.email,profileImage: picture },
          JWT_SECRET,
          { expiresIn: "5h" }
        );
  
        return res.status(200).json({ status: "exist", name: user.name, token: token ,profileImage: picture});
      } else {
        // Create a new user
        const newUser = new collection({
          name: name,
          email: email,
          password: "google-auth", // Indicating this user signed up with Google
          profileImage: picture // Save the profile picture URL
        });
  
        // Generate a JWT token for the new user
        const token = jwt.sign(
          { id: newUser._id, name: name, email: email ,profileImage: picture },
          JWT_SECRET,
          { expiresIn: "5h" }
        );
  
        await newUser.save();
  
        return res.status(200).json({ status: "notexist", name: newUser.name, token: token , profileImage: picture});
      }
    } catch (e) {
      console.error("Error during Google Signup:", e);
      res.status(500).json("Error Occurred during Google Signup");
    }
  });
  
// Middleware to authenticate and extract user from token
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ status: "fail", message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ status: "fail", message: "Invalid token" });
    }
};


// Send OTP
app.post("/send-otp", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await collection.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        otpStore[email] = { otp, expires: Date.now() + 600000 }; // OTP valid for 10 minutes

        const mailOptions = {
            from: '',
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP is ${otp}. It will expire in 10 minutes.`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error:", error);
                return res.status(500).json({ status: "fail", message: "Error sending OTP" });
            } else {
                console.log("Email sent: " + info.response);
                return res.status(200).json({ status: "success", message: "OTP sent to your email" });
            }
        });
    } catch (e) {
        return res.status(500).json({ status: "fail", message: "Error sending OTP" });
    }
});

// Verify OTP
app.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    console.log(`Received OTP verification request: email=${email}, otp=${otp}`); // Debug line
    try {
        const otpData = otpStore[email];
        if (otpData && otpData.otp === otp && otpData.expires > Date.now()) {
            delete otpStore[email]; // Remove OTP after successful verification
            return res.status(200).json({ status: "success", message: "OTP verified" });
        } else {
            return res.status(400).json({ status: "fail", message: "Invalid or expired OTP" });
        }
    } catch (e) {
        return res.status(500).json({ status: "fail", message: "Error verifying OTP" });
    }
});

// Change Password
app.post("/change-password", async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await collection.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();

        res.json({ status: "success", message: "Password changed successfully" });
    } catch (e) {
        res.status(500).json({ status: "fail", message: "Error changing password" });
    }
});

//add more details
app.post("/add-details", authenticateToken, upload.single('profileImage'), async (req, res) => {
    const { phone, address,state } = req.body;
    const profileImage = req.file;

    try {
        const user = await collection.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        // Update user details
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.state = state || user.state;
        if (profileImage) {
            user.profileImage = profileImage.path; // Ensure the path is correct
        }
        await user.save();

        res.json({ status: "success" });
    } catch (error) {
        console.error("Error adding details:", error); // Debug log
        res.status(500).json({ status: "fail", message: "Error adding details" });
    }
});

// Get User Details
app.get("/user-details", authenticateToken, async (req, res) => {
    try {
        const user = await collection.findOne({ _id: req.user.id });
        if (user) {
            return res.status(200).json({ 
                name: user.name, 
                email: user.email, 
                phone: user.phone, 
                address: user.address, 
                state: user.state,
                profileImage: user.profileImage 
            });
        } else {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ status: "fail", message: "Server error" });
    }
});


// Get doctors with filters
app.get("/doctors", authenticateToken, async (req, res) => {
    const { location, name, specialization } = req.query;

    let query = {};
    if (location) query.location = location;
    if (name) query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive regex search
    if (specialization) query.specialization = specialization;

    try {
        // console.log("Query:", query); // Log the query object
        const doctors = await Doctor.find(query);
        // console.log("Doctors:", doctors); // Log the response data
        res.status(200).json({ status: "success", doctors });
    } catch (error) {
        console.error("Error fetching doctors:", error); // Log the error
        res.status(500).json({ status: "fail", message: "Error fetching doctors", error: error.message });
    }
});

// time slot of appointment

app.get("/available-time-slots", authenticateToken, async (req, res) => {
    const { doctorId, date } = req.query;

    try {
        // Check if the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ status: "fail", message: "Doctor not found" });
        }

        // Check if timeSlots exists and is an array
        if (!Array.isArray(doctor.timeSlots)) {
            return res.status(500).json({ status: "fail", message: "Doctor's time slots are not defined properly" });
        }

        // Get all existing appointments for the selected date
        const appointments = await Appointment.find({
            doctorId: doctorId,
            date: date
        });

        // Get all time slots from the doctor's schedule
        const availableSlots = doctor.timeSlots.filter(timeSlot => {
            // Check if the time slot is not already fully booked
            const appointmentCount = appointments.filter(appointment => appointment.time === timeSlot).length;
            return appointmentCount < 2; // Less than 2 appointments
        });

        res.status(200).json({ status: "success", availableSlots });
    } catch (error) {
        console.error("Error fetching available time slots:", error);
        res.status(500).json({ status: "fail", message: "Error fetching available time slots", error: error.message });
    }
});

// Book Appointment
app.post("/appointments", authenticateToken, async (req, res) => {
    const { patientName, doctorId, specialization, location, time, date } = req.body;
    const userId = req.user.id; // User ID from the authenticated token

    try {
        // Check if the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ status: "fail", message: "Doctor not found" });
        }

        // Create a new appointment
        const newAppointment = new Appointment({
            userId: userId, // User ID from the authenticated token
            patientName: patientName,
            doctorId: doctorId,
            specialization: specialization,
            location: location,
            time: time,
            date: date
        });

        // Save the appointment to the database
        await newAppointment.save();

        res.status(201).json({ status: "success", message: "Appointment booked successfully" });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ status: "fail", message: "Error booking appointment", error: error.message });
    }
});

// Route to get appointments for the authenticated user
app.get('/appointment-archive', authenticateToken, async (req, res) => {
    try {
        //console.log('Request User:', req.user)
        const userId = req.user.id;
        //console.log(userId)
        const appointments = await Appointment.find({ userId })
            .populate({
                path: 'doctorId',
                select: 'name specialization location profileImage'
            });
        //console.log(appointments)
        if (!appointments.length) {
            return res.status(404).json({ status: "fail", message: "No appointments found" });
        }

        // Send the full details of the appointments
        res.json({ appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
});

// app.post('/health-details-record1', authenticateToken, async (req, res) => {
//     try {
//         const healthData = req.body;
//         const userId = req.user.id; // Extracted from the token

//         if (!userId) {
//             return res.status(400).json({ message: 'User ID is required' });
//         }

//         // Find the existing health details record
//         let existingHealthDetails = await HealthDetails.findOne({ userId });

//         if (existingHealthDetails) {
//             // Update the existing record with new health data
//             Object.keys(healthData).forEach(key => {
//                 if (healthData[key] !== undefined && healthData[key] !== '') {
//                     existingHealthDetails[key] = healthData[key];
//                 }
//             });

//            // console.log('Updated Health Details:', existingHealthDetails); // Log the updated data
//             await existingHealthDetails.save();
//             res.status(200).json({ message: 'Health details updated successfully' });
//         } else {
//             // Create a new health details record
//             const newHealthDetails = new HealthDetails({
//                 userId,
//                 ...healthData,
//             });

//             //console.log('New Health Details:', newHealthDetails); // Log the new data
//             await newHealthDetails.save();
//             res.status(200).json({ message: 'Health details saved successfully' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// });


// Get health details
app.get('/health-details-record1', authenticateToken, async (req, res) => {
    try {
      const healthDetails = await HealthDetails.findOne({ userId: req.user.id });
      if (!healthDetails) return res.status(404).json({ message: 'No health details found' });
      res.json(healthDetails);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update or create health details
  app.post('/health-details-record1', authenticateToken, async (req, res) => {
    try {
      const healthData = req.body;
      const userId = req.user.id;
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      let existingHealthDetails = await HealthDetails.findOne({ userId });
  
      if (existingHealthDetails) {
        // Update the existing record with new health data
        Object.keys(healthData).forEach(key => {
          if (healthData[key] !== undefined && healthData[key] !== '') {
            existingHealthDetails[key] = healthData[key];
          }
        });
  
        await existingHealthDetails.save();
        res.status(200).json({ message: 'Health details updated successfully' });
      } else {
        // Create a new health details record
        const newHealthDetails = new HealthDetails({
          userId,
          ...healthData,
        });
  
        await newHealthDetails.save();
        res.status(200).json({ message: 'Health details saved successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))  
// New Diagnosis Route
app.post("/add-diagnosis", authenticateToken, upload.single('image'), async (req, res) => {
    const { diagnosisDetails, diagnosisType } = req.body;
    //console.log(diagnosisDetails)
    const image = req.file;
    //console.log('File received:', image); // Debugging line
    //console.log('File received path:', image.path); // Debugging line
    try {
        const newDiagnosis = new Diagnosis({
            userId: req.user.id,
            diagnosisDetails,
            diagnosisType,
            //`/uploads/${image.filename.replace(/\\/g, '/')}` : "" // Convert backslashes to forward slashes
            imageUrl: image ? `uploads/${image.filename.replace(/\\/g, '/')}` : "" // Convert backslashes to forward slashes
        });
        await newDiagnosis.save();
        res.status(201).json({ status: "success", diagnosis: newDiagnosis });
    } catch (error) {
        console.error("Error adding diagnosis:", error);
        res.status(500).json({ status: "fail", message: "Error adding diagnosis" });
    }
});

// Route to get user's diagnoses
app.get('/diagnoses', authenticateToken, async (req, res) => {
    try {
      const diagnoses = await Diagnosis.find({ userId: req.user.id });
      res.status(200).json({ status: 'success', diagnoses });
    } catch (error) {
      console.error('Error fetching diagnoses:', error);
      res.status(500).json({ status: 'fail', message: 'Error fetching diagnoses' });
    }
  });

// Get all users from admin route
app.get("/users", authenticateToken, async (req, res) => {
    try {
        // const users = await collection.find({}, { projection: { name: 1, email: 1, phone: 1, address: 1, profileImage: 1 } }).toArray();
        const users = await collection.find({},{password:0})
        // console.log('Fetched users:', users);
        res.status(200).json({ status: "success", users });
     

    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ status: "fail", message: "Error fetching users", error: error.message });
    }
});

//admin updating user
app.post("/update-details", authenticateToken, upload.single('profileImage'), async (req, res) => {
    const { userId, name, email, phone, state, address } = req.body;
    const profileImage = req.file ? req.file.path : undefined;
  
    try {
      // Find the user by userId passed in the request body
      const user = await collection.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found" });
      }
  
      // Update user details
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.state = state || user.state;
      user.address = address || user.address;
      if (profileImage) {
        user.profileImage = profileImage; // Update profile image path
      }
      await user.save();
  
      res.json({ status: "success", message: "Details updated successfully" });
    } catch (error) {
      console.error("Error updating details:", error);
      res.status(500).json({ status: "fail", message: "Error updating details" });
    }
  });

  
  //Add new user from admin
    app.post('/add-user', upload.single('profileImage'), async (req, res) => {
    //console.log('Request Body:', req.body);
    //console.log('File Info:', req.file); // Should not be undefined if file is uploaded
  
    const { name, email, password, phone,state, address } = req.body;
    const profileImage = req.file ? req.file.path : '/uploads';
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new collection({
        name,
        email,
        password: hashedPassword,
        phone,
        state,
        address,
        profileImage
      });
      await newUser.save();
      res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to add user', error: error.message });
    }
  });

  //delete user from admin
  app.delete("/delete-user", authenticateToken, async (req, res) => {
    const { userId } = req.body;
  
    try {
      // Find the user by userId passed in the request body
      const user = await collection.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found" });
      }
  
      // Delete the user
      await collection.deleteOne({ _id: userId });
  
      res.json({ status: "success", message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ status: "fail", message: "Error deleting user" });
    }
  });

  
 // Update doctor details from admin
app.post("/update-doctors", authenticateToken, upload.single('profileImage'), async (req, res) => {
    const { doctorId, name, location, specialization, contact, timeSlots, date } = req.body;
    const profileImage = req.file ? req.file.path : undefined;

    // console.log("Received request to update doctor:", {
    //     doctorId,
    //     name,
    //     location,
    //     specialization,
    //     contact,
    //     timeSlots,
    //     date,
    //     profileImage
    // });

    try {
        // Find the doctor by doctorId passed in the request body
        const doctor = await Doctor.findOne({ _id: doctorId });
        if (!doctor) {
            console.log("Doctor not found:", doctorId);
            return res.status(404).json({ status: "fail", message: "Doctor not found" });
        }

        // Update doctor details
        doctor.name = name || doctor.name;
        doctor.location = location || doctor.location;
        doctor.specialization = specialization || doctor.specialization;
        doctor.contact = contact || doctor.contact;
        doctor.timeSlots = timeSlots ? timeSlots.split(',') : doctor.timeSlots; // Split and update time slots
        doctor.date = date ? date.split(',') : doctor.date; // Split and update dates
        if (profileImage) {
            doctor.profileImage = profileImage; // Update profile image path
        }

        await doctor.save();

        res.json({ status: "success", message: "Doctor details updated successfully" });
    } catch (error) {
        console.error("Error updating doctor details:", error);
        res.status(500).json({ status: "fail", message: "Error updating doctor details" });
    }
});

// Add new doctor from admin
app.post("/add-doctor", authenticateToken, upload.single('profileImage'), async (req, res) => {
    const { name, location, specialization, contact, timeSlots, date } = req.body;
    const profileImage = req.file ? req.file.path : undefined;

    // Validate required fields
    if (!name || !location || !specialization || !contact || !timeSlots || !date) {
        return res.status(400).json({ status: "fail", message: "All required fields must be filled" });
    }

    try {
        // Create a new doctor instance
        const newDoctor = new Doctor({
            name,
            location,
            specialization,
            contact,
            timeSlots: timeSlots.split(','),
            date: date.split(','),
            profileImage: profileImage || ''
        });

        // Save the doctor to the database
        await newDoctor.save();

        res.status(201).json({ status: "success", message: "Doctor added successfully" });
    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ status: "fail", message: "Error adding doctor" });
    }
});

// Delete doctor
app.delete("/delete-doctor", authenticateToken, async (req, res) => {
    const { doctorId } = req.body;

    try {
        // Find the doctor by doctorId passed in the request body
        const doctor = await Doctor.findOne({ _id: doctorId });
        if (!doctor) {
            return res.status(404).json({ status: "fail", message: "Doctor not found" });
        }

        // Delete the doctor
        await Doctor.deleteOne({ _id: doctorId });

        res.json({ status: "success", message: "Doctor deleted successfully" });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ status: "fail", message: "Error deleting doctor" });
    }
});
 
// Get the number of registered users for analytics
app.get('/analytics/users', authenticateToken, async (req, res) => {
    try {
      const userCount = await collection.countDocuments({});
      res.json({ userCount });
    } catch (error) {
      console.error("Error fetching user count:", error);
      res.status(500).json({ status: "fail", message: "Error fetching user count" });
    }
  });
  
  // Get the number of registered doctors for analytics
  app.get('/analytics/doctors', authenticateToken, async (req, res) => {
    try {
      const doctorCount = await Doctor.countDocuments({});
      res.json({ doctorCount });
    } catch (error) {
      console.error("Error fetching doctor count:", error);
      res.status(500).json({ status: "fail", message: "Error fetching doctor count" });
    }
  });
  
// User bar chart on state
app.get('/analytics/user-states', async (req, res) => {
    try {
      const userStateAnalytics = await collection.aggregate([
        { $group: { _id: "$state", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      res.json(userStateAnalytics);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

//Doctor bar chart on location
app.get('/analytics/locations', async (req, res) => {
    try {
      const locationAnalytics = await Doctor.aggregate([
        { $group: { _id: "$location", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      res.json(locationAnalytics);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get('/health-details', authenticateToken, async (req, res) => {
    //console.log('Received request for health details, user:', req.user); // Check if req.user is set
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      const healthDetails = await HealthDetails.findOne({ userId: req.user.id }); // Ensure `req.user.id` is correct
      if (!healthDetails) {
       // console.log('Health details not found for user:', req.user.id);
        return res.status(404).json({ message: 'Health details not found' });
      }
      //console.log('Health details found:', healthDetails);
      res.json(healthDetails);
    } catch (error) {
     // console.error('Server error:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
  

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
