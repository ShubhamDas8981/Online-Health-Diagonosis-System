const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://yashmukherjee62:KUEghTP1w6e9Xk6g@cluster0.szp9swg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`) //Connect your Mongo DB
// mongodb+srv://shubhamdotin:<password>@cluster0.5gu5il1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
.then(() => {
    console.log("mongodb connected");
})
.catch(() => {
    console.log("failed");
});


// Creating schema for Sign Up data name collection
const newSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  phone: {
      type: String,
      default: ""
  },
  state: {
      type: String,
      default: ""
  },
  address: {
      type: String,
      default: ""
  },
  profileImage: {
      type: String,
      default: ""
  }
});

const collection = mongoose.model("collection", newSchema);


// Doctor Schema
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    specialization: { type: String, required: true },
    contact: { type: String, required: true },
    profileImage: { type: String, default: "" },
    timeSlots: { type: [String], required: true },
    date: { type: [String], required: true }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'collections', required: true },
    patientName: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    specialization: { type: String, required: true },
    location: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

const healthDetailsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'collections', required: true },
    bloodGroup: { type: String},
    bp: { type: String},
    heartRate:{type:String},
    weight: { type: String},
    height: { type: String},
    birthDate: { type: Date},
    gender: { type: String},
    allergies: { type: String },
    vaccinationHistory: { type: String },
    familyMedicalHistory: { type: String },
    smokingStatus: { type: String },
    alcoholConsumption: { type: String },
    exerciseHabits: { type: String },
    emergencyContactName: { type: String },
    emergencyContactRelation: { type: String },
    emergencyContactPhone: { type: String },
    insuranceDetails: { type: String }
  });

  const HealthDetails = mongoose.model('HealthDetails',healthDetailsSchema);
  
  const diagnosisSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'collections', required: true },
    diagnosisDetails: {
      type: String,
      required: true,
    },
    diagnosisType: {
      type: String,
      required: [true, 'Diagnosis type is required'],
    },
    imageUrl: {
      type: String,
      default: "", // Optional if the image URL is not provided
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  const Diagnosis = mongoose.model('Diagnosis',diagnosisSchema);

module.exports = { collection, Doctor, Appointment,  HealthDetails, Diagnosis};
