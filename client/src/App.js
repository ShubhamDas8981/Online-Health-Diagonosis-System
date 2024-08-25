import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
// import { GoogleOAuthProvider } from '@react-oauth/google';
import Landing from "./components/Landing";
import Signup from "./components/Signup"
import Login from "./components/Login"
import Home from "./components/Home"
import AddDetails from "./components/AddDetails";
import ChangePassword from "./components/ChangePassword";
import AppointmentBooking from "./components/AppointmentBooking";
import Healthcheckup from "./components/Healthcheckup";
import MainPage from "./components/MainPage";
import DiagnosisArchive from "./components/DiagonosisArchive";
import HealthDetails from "./components/HealthDetails";
import DiabetesPredictionForm from "./components/DiabetesPredictionForm";
import HeartDiseaseForm from "./components/HeartDiseaseForm";
import PCOSPredictionForm from "./components/PCOSPredictionForm";
import Covid19Form from "./components/Covid19PredictionForm";
import AppointmentArchive from "./components/AppointmentArchive";
import MedicinalInformation from "./components/MedicalInformation";
import AdminPanel from "./components/AdminPanel";
import ManageUsers from "./components/ManageUsers";
import ManageDoctor from "./components/ManageDoctors";
import ViewAnalytics from "./components/ViweAnalytics";
import GenerateHealthCard from "./components/GenerateHealthCard";
function App() {
  return (
    <div className="App">
    <ChakraProvider>
    
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/add-details" element={<AddDetails />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="/health-checkup" element={<Healthcheckup />} />
          <Route path="/main-page" element={<MainPage />} />
          <Route path="/Diagnosis-Archive" element={<DiagnosisArchive />} />
          <Route path="/Health-Details" element={<HealthDetails />} />
          <Route path="/Diabetes-Prediction-Form" element={<DiabetesPredictionForm />} />
          <Route path="/Heart-Disease-Prediction-Form" element={<HeartDiseaseForm />} />
          <Route path="/PCOS-Prediction-Form" element={<PCOSPredictionForm />} />
          <Route path="/Covid-19-Form" element={<Covid19Form />} />
          <Route path="/appointment-archive" element={<AppointmentArchive />} />
          <Route path="/medicinal-information" element={<MedicinalInformation />} />
          <Route path="/health-card" element={<GenerateHealthCard />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-doctors" element={<ManageDoctor/>} />
          <Route path="/view-analytics" element={<ViewAnalytics/>} />
        </Routes>
      </Router>
      
      </ChakraProvider>
    </div>
  );
}

export default App;