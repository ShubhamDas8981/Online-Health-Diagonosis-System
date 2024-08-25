import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Box, Heading, Text } from "@chakra-ui/react";
import NavbarNew from './NavbarNew';
import axios from 'axios';
import Footer from './Footer';
function Home() {
  const location = useLocation();
 // const navigate = useNavigate();
  const [userName, setUserName] = useState(location.state?.name || "User");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = location.state?.token || localStorage.getItem('token');
      console.log("Fetched token:", token);
      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/user-details", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("User details response:", response.data);
          setUserName(response.data.name);
        } catch (error) {
          console.error("Error fetching user profile image", error);
        }
      }
    };

    fetchUserProfile();
  }, [location.state]);

  return (
    <Box>
      <NavbarNew />
      <Box textAlign="center" mt={10}>
        <Heading>Hello {userName}</Heading>
        <Text>Welcome to the Online Health Diagnosis System</Text>
      </Box>
      <div className="container-fluid mt-5 ml-3 mr--3" style={{ paddingLeft: '7%' }}>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-5" >
            <Link to="/main-page" style={{ textDecoration: 'none' }}>
              <div className="custom-card" style={{borderRadius:'50px'}}>
                <div className="card-body text-center">
                <img src="images/folder_17421269.png" alt="Health Locker Icon" className="icon" style={{marginTop:'-50px'}}/>
                <h6 className="card-title">Your Health Reports</h6>
                  <p className="card-text"> maintain personal health records (PHR) with medical history, allergies, medications, and test results.
</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6 mb-2">
            <Link to="/health-checkup" style={{ textDecoration: 'none' }}>
              <div className="custom-card" style={{borderRadius:'50px'}}>
                <div className="card-body text-center">
                  <img src="images/hospital.png" alt="Health Locker Icon" className="icon" style={{marginTop:'-90px'}}/>
                  <h6 className="card-title">Symptoms Assesment</h6>
                  <p className="card-text">Let us know about your health condition</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6 mb-2">
            <Link to="/appointment-booking" style={{ textDecoration: 'none' }}>
            <div className="custom-card" style={{borderRadius:'50px'}}>
            <div className="card-body text-center">
                  <img src="images/healthcare_2382443.png" alt="Health Locker Icon" className="icon" style={{marginTop:'-100px'}}/>
                  <h6 className="card-title">Appointment booking</h6>
                  <p className="card-text">Book your Appointment with your trusted doctor</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6 mb-2">
            <Link to="/medicinal-information" style={{ textDecoration: 'none' }}> 
            <div className="custom-card" style={{borderRadius:'50px'}}>            
                <div className="card-body text-center">
                  <img src="images/medicine_883407.png" alt="Health Locker Icon" className="icon" style={{marginTop:'-100px'}}/>
                  <h6 className="card-title">Medical Information  </h6>
                  <p className="card-text">Get reliable medical informations about your medicines.</p>
               
                </div>
              </div>
             </Link> 
          </div>
          <div className="col-lg-4 col-md-6 mb-2">
             <Link to="/health-card" style={{ textDecoration: 'none' }}> 
            <div className="custom-card" style={{borderRadius:'50px'}}>           
                 <div className="card-body text-center">
                  <img src="images/insurance_2927067.png" alt="Health Locker Icon" className="icon" style={{marginTop:'-110px'}}/>
                  <h6 className="card-title">Health Card Generator  </h6>
                  <p className="card-text">Create your personalized health card with ease</p>
                </div>
              </div>
             </Link> 
          </div>
          <div className="col-lg-4 col-md-6 mb-2">
            {/* <Link to="" style={{ textDecoration: 'none' }}> */}
              <div className="custom-card" style={{borderRadius:'50px' }}>
                <div className="card-body text-center">
                <img src="images/syringe.png" alt="Health Locker Icon" className="icon" style={{marginTop:'-90px'}}/>
                <h6 className="card-title">Connect With Your Health Device (Coming Soon)</h6>
                  <p className="card-text"> Sync your devices for real-time health monitoring</p>
                </div>
              </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <Footer />
    </Box>
  );
}

export default Home;
