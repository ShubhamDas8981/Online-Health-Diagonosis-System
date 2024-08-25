import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import NavbarNew from './NavbarNew';

const assessments = [
  {
    title: "Diabetes",
    description: "Are you at risk of developing Diabetes?",
    questions: "8 Questions",
    time: "1 min. to complete",
    age: "Age - 20+ years",
    redirectUrl: "/Diabetes-Prediction-Form",
  },
  {
    title: "Heart Diseases",
    description: "Are you at risk of developing heart diseases in the next 10 years?",
    questions: "11 Questions",
    time: "2 mins. to complete",
    age: "Age - 25 to 80 years",
    redirectUrl: "/Heart-Disease-Prediction-Form",
  },
  {
    title: "PCOS (Women's Health)",
    description: "Irregular periods? Know your risk of developing PCOS",
    questions: "15 Questions",
    time: "3 mins. to complete",
    age: "Age - 20 to 50 years",
    redirectUrl: "/PCOS-Prediction-Form",
  },
  {
    title: "Covid-19",
    description: "Take this assessment and know if you have covid related symptoms",
    questions: "14 Questions",
    time: "3 mins. to complete",
    redirectUrl: "/Covid-19-Form",
  },
  {
    title: "Emotional Health",
    description: "Are you feeling stressed, depressed or anxious?",
    questions: "21 Questions",
    time: "3 mins. to complete",
    //redirectUrl: "/Emotional-Health-Form",
  },
  {
    title: "Migraine or TTH",
    description: "Are your headaches Migraine or Tension Type Headaches?",
    questions: "10 Questions",
    time: "1 min. to complete",
    //redirectUrl: "/Migraine-Prediction-Form",
  }
];

const AssessmentCard = ({ title, description, questions, time, age, redirectUrl }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (redirectUrl) {
      navigate(redirectUrl);
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{questions}</p>
        <p>{time}</p>
        {age && <p>{age}</p>}
        <Button
          onClick={handleButtonClick}
          colorScheme={redirectUrl ? 'teal' : 'gray'}
          variant="solid"
          isDisabled={!redirectUrl}
        >
          {redirectUrl ? 'Take Assessment' : 'Coming Soon'}
        </Button>
      </div>
    </div>
  );
};

const Healthcheckup = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const cancelRef = React.useRef();

  const onCloseDialog = () => setIsDialogOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDialogOpen(true);
    }, 1000);  // Show the dialog after 1 second for better UX
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="health-checkup">
      <NavbarNew />
      <header className="header">
        <h1>Explore Health Assessments</h1>
        <p>Invest in your health. Take the evidence-based health assessments.</p>
      </header>
      <div className="assessments-container">
        {assessments.map((assessment, index) => (
          <AssessmentCard key={index} {...assessment} />
        ))}
      </div>

        {/* Alert Dialog */}
        <AlertDialog
        isOpen={isDialogOpen}
        onClose={onCloseDialog}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Important Notice
            </AlertDialogHeader>
            <AlertDialogBody>
              The performance of these assessments is based on the training data and may not be fully accurate. Please consult a medical practitioner to confirm the outcomes.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="teal" onClick={onCloseDialog}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}

export default Healthcheckup;
