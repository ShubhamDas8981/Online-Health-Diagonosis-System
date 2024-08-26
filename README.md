# Online Health Diagnosis System

## Project Description
The **Online Health Diagnosis System** is a comprehensive digital healthcare platform designed to offer a secure, user-friendly, and accessible means of managing health profiles and receiving health diagnoses online. The system enables users to book appointments, communicate with doctors, store medical records, perform AI-driven symptom assessments, and generate health cards for sharing vital health information during emergencies. This project emphasizes security, data privacy, and the convenience of users while integrating modern technology into healthcare management.

---

## Objectives
- Develop a secure, user-friendly platform for managing health profiles and records.
- Ensure data privacy through encryption and robust authentication mechanisms.
- Facilitate communication between users and doctors, and provide seamless appointment booking.
- Integrate AI models for initial health assessments and deliver personalized health insights.
- Store and manage medical records, reports, and health-related data securely.

---

## Key Features

### User Module
- **Login & Sign-Up:** Secure user authentication using JWT tokens and OAuth (Google Login).
- **Password Encryption:** User passwords are encrypted to ensure the safety of personal data.
- **Profile Management:** Users can update their profile details, including phone numbers, addresses, and profile images.
- **Change Password:** A secure process involving email verification and OTP for password changes.
  
### Admin Panel
- **User Management:** Admins can create, view, update, and delete user details.
- **Doctor Management:** Admins can perform CRUD operations on doctor details.
- **Analytics:** Provides insights and metrics related to system usage and other relevant data.

### Personalized Health Records
- **Health Details Storage:** Store and update users' vital signs, medical history, emergency contacts, and insurance details.
- **Diagnosis Report Archive:** Securely store medical reports and images for future reference.
- **Appointment Archive:** View upcoming and past appointments.

### AI Symptom Assessment
The system includes AI-powered health assessments for:
- **Diabetes Assessment**
- **Heart Disease Assessment**
- **PCOS Assessment**
- **COVID-19 Symptom Check**

### Appointment Booking
- Users can book appointments with doctors based on their name, location, and specialization. Appointment slots are managed by the doctor’s availability.

### Medicinal Information
- Search for drug-related information using the National Library of Medicine's API.

### Health Card Generator
- Generate a QR-based health card containing essential health information for emergency use.

---

## Technology Stack

### Frontend
- **React.js**: Dynamic UI creation.Frontend structure and styling.

### Backend
- **Node.js & Express.js**: Server-side logic and API routing.
- **Python**: For machine learning integrations.

### Database
- **MongoDB**: NoSQL database to manage user profiles, doctor details, appointments, and health records.

### APIs
- **REST APIs & FastAPI**: For communication between frontend and backend.
- **National Library of Medicine API**: Fetching medicinal information.

### Authentication
- **JWT Tokens**: Stateless authentication.
- **Google OAuth**: Easy login with Google credentials.

### Other Tools
- **Pydantic & Uvicorn**: For machine learning integration.
- **Google Email Services**: For user communication.

---

## AI Models and Datasets

- **Diabetes Assessment Model**
  - **Model:** LightGBM (Light Gradient Boosting Machine)
  - **Dataset:** [Kaggle - Diabetes Prediction Dataset](https://www.kaggle.com/datasets/iammustafatz/diabetes-prediction-dataset/data)

- **Heart Disease Assessment Model**
  - **Model:** Support Vector Classifier (SVC)
  - **Dataset:** [Kaggle - Heart Failure Prediction](https://www.kaggle.com/code/tanmay111999/heart-failure-prediction-cv-score-90-5-models/notebook)

- **PCOS Assessment Model**
  - **Model:** Random Forest Classifier
  - **Dataset:** [Kaggle - PCOS 2023 Dataset](https://www.kaggle.com/datasets/sahilkoli04/pcos2023)

- **COVID-19 Assessment Model**
  - **Model:** Logistic Regression
  - **Dataset:** [Kaggle - COVID-19 Symptoms Checker](https://www.kaggle.com/datasets/iamhungundji/covid19-symptoms-checker)

---

## Future Scope
- **Health Device Integration:** Connect and integrate health devices using APIs to gather real-time health data.
- **Telemedicine Integration:** Enable virtual consultations and remote diagnoses.
- **Global Expansion:** Extend platform accessibility worldwide with enhanced data privacy measures and multilingual support.
- **Advanced AI Assessments:** Improve AI models for more accurate and comprehensive health diagnoses.

---

## References
- [Unified Health Interface (UHI)](https://uhi.abdm.gov.in)
- [National Library of Medicine](https://www.nlm.nih.gov)
- [Practo](https://www.practo.com)

---

## Conclusion
The **Online Health Diagnosis System** revolutionizes healthcare by offering secure, user-friendly solutions for managing personal health information, booking appointments, and receiving AI-powered health assessments. The platform prioritizes user data privacy while providing essential services that can significantly improve healthcare accessibility and engagement. Looking forward, the system aims to evolve by integrating telemedicine, health device data, and real-time health monitoring.

