import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-center" style={{ fontFamily: 'Cascadia Mono SemiBold' }}>Online Health Diagnosis System</h1>
        <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel" data-interval="3000" style={{ height: '200px', borderRadius: '50px', overflow: 'hidden' }}>
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
            
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/eat healthy.jpg" className="d-block w-100" alt="First slide" style={{ height: '200px', width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '50px' }} />
              <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px', padding: '10px' }}>
                <h5 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                  <strong>Eat healthy, stay healthy</strong>
                </h5>
              </div>

            </div>

            <div className="carousel-item">
              <img src="/images/exercise.jpg" className="d-block w-100" alt="Second slide" style={{ height: '200px', width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '50px' }} />
              <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px', padding: '10px' }}>
                <h5 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                  <strong>Exercise daily</strong>
                </h5>
              </div>
            </div>


            <div className="carousel-item">
              <img src="/images/stay hydrated.jpg" className="d-block w-100" alt="Second slide" style={{ height: '200px', width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '50px' }} />
              <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px', padding: '10px' }}>
                <h5 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                  <strong>Stay hydrated</strong>
                </h5>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/images/sleep.jpg" className="d-block w-100" alt="Second slide" style={{ height: '200px', width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '50px' }} />
              <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px', padding: '10px' }}>
                <h5 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                  <strong>Get enough sleep</strong>
                </h5>
              </div>
            </div>
            
            <div className="carousel-item">
              <img src="/images/mental.png" className="d-block w-100" alt="Second slide" style={{ height: '200px', width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '50px' }} />
              <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px', padding: '10px' }}>
                <h5 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                  <strong>Maintain mental health</strong>
                </h5>
              </div>
            </div>
           
          </div>
          <button className="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div >

      <div className="container-fluid mt-5 ml-3 mr--3" style={{ paddingLeft: '7%' }}>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-5" >
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <div className="custom-card" style={{ borderRadius: '50px' }}>
                <div className="card-body text-center">
                  <img src="images/folder_17421269.png" alt="Health Locker Icon" className="icon" style={{ marginTop: '-50px' }} />
                  <h6 className="card-title">Your Health Reports</h6>
                  <p className="card-text"> maintain personal health records (PHR) with medical history, allergies, medications, and test results.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6 mb-2">
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <div className="custom-card" style={{ borderRadius: '50px' }}>
                <div className="card-body text-center">
                  <img src="images/hospital.png" alt="Health Locker Icon" className="icon" style={{ marginTop: '-90px' }} />
                  <h6 className="card-title">Symptoms Assesment</h6>
                  <p className="card-text">Let us know about your health condition</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6 mb-2">
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <div className="custom-card" style={{ borderRadius: '50px' }}>
                <div className="card-body text-center">
                  <img src="images/healthcare_2382443.png" alt="Health Locker Icon" className="icon" style={{ marginTop: '-100px' }} />
                  <h6 className="card-title">Appointment booking</h6>
                  <p className="card-text">Book your Appointment with your trusted doctor</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6 mb-2">
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <div className="custom-card" style={{ borderRadius: '50px' }}>
                <div className="card-body text-center">
                  <img src="images/medicine_883407.png" alt="Health Locker Icon" className="icon" style={{ marginTop: '-100px' }} />
                  <h6 className="card-title">Medical Information</h6>
                  <p className="card-text">Get reliable medical informations about your medicines.</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 mb-2">
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <div className="custom-card" style={{ borderRadius: '50px' }}>
                <div className="card-body text-center">
                  <img src="images/insurance_2927067.png" alt="Health Locker Icon" className="icon" style={{ marginTop: '-110px' }} />
                  <h6 className="card-title">Health Card Generator  </h6>
                  <p className="card-text">Create your personalized health card with ease</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 mb-2">
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <div className="custom-card" style={{ borderRadius: '50px' }}>
                <div className="card-body text-center">
                  <img src="images/syringe.png" alt="Health Locker Icon" className="icon" style={{ marginTop: '-90px' }} />
                  <h6 className="card-title">Connect With Your Health Device (Coming Soon)</h6>
                  <p className="card-text"> Sync your devices for real-time health monitoring</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
