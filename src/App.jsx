import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/landing";
import AppLayout from "./layout/app-layout";
import { SignIn } from "@clerk/clerk-react";
import Register from "./pages/register";
import OnboardingLayout from "./layout/onboardingLayout";
import StartEnrollment from "./pages/onboarding/startEnrollment";
import ProtectedRouteApplicant from "./components/protectedRouteApplicant";
import ProgramSelection from "./pages/onboarding/programSelections";
import EditStartEnrollment from "./pages/onboarding/editStartEnrollment";
import EducationForm from "./pages/onboarding/educationForm";
import ExperienceForm from "./pages/onboarding/experienceForm";
import PersonalStatementForm from "./pages/onboarding/personalStatementForm";

import TestimonialForm from "./pages/onboarding/testimonialForm";
import ReferencesForm from "./pages/onboarding/referencesForm";
import ConfirmationForm from "./pages/onboarding/confirmationForm";
import CandidateLayout from "./layout/candidateLayout";
import CandidateDashboard from "./pages/candidate/candidateDashboard";
import EditProfile from "./pages/candidate/editProfile";
import CourseEnrolled from "./pages/candidate/courseEnrolled";
import CourseSchedule from "./pages/candidate/courseSchedule";
import SubmitTickets from "./pages/candidate/submitTickets";
import Invoice from "./pages/candidate/invoice";
import Payment from "./pages/payment";
import Completion from "./pages/completion";
import TicketsThankYou from "./pages/candidate/ticketThankYou";

function App() {
  // const [stripePromise, setStripePromise] = useState(null);
  
  const router = createBrowserRouter([
    {
      path: "/pay",
      element: <Payment/>, // Render Register without AppLayout
    },

    {
      path: "/completion",
      element: <Completion/>, // Render Register without AppLayout
    },

    // Publically Available without navbar
    {
      path: "/sign-in",
      element: <Register />, // Render Register without AppLayout
    },
    // Publically Available with NavBar
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
      ],
    },
    // Start Enrollment : Being signed in is required
    {
      element: (
        <ProtectedRouteApplicant>
          <OnboardingLayout />
        </ProtectedRouteApplicant>
      ),
      children: [
        {
          path: "/start-enrollment",
          element: <StartEnrollment />,
        },
        {
          path: "/start-enrollment/:applicationid",
          element: <EditStartEnrollment />,
        },
        {
          path: "/term-selection-form/:applicationid",
          element: <ProgramSelection />,
        },
        {
          path: "/education-form/:applicationid",
          element: <EducationForm />,
        },
        {
          path: "/experience-form/:applicationid",
          element: <ExperienceForm />,
        },
        {
          path: "/personal-statement-form/:applicationid",
          element: <PersonalStatementForm />,
        },
        {
          path: "/testimonial-form/:applicationid",
          element: <TestimonialForm />,
        },
        {
          path: "/references-form/:applicationid",
          element: <ReferencesForm />,
        },
        {
          path: "/confirmation-form/:applicationid",
          element: <ConfirmationForm />,
        },
      ],
    },
    {
      element: (
        <ProtectedRouteApplicant>
          <CandidateLayout />
        </ProtectedRouteApplicant>
      ),
      children: [
        {
          path: "/candidate-dashboard",
          element: <CandidateDashboard />,
        },
        {
          path: "/edit-profile",
          element: <EditProfile />,
        },
        {
          path: "/course-enrolled",
          element: <CourseEnrolled />,
        },
        {
          path: "/course-schedule",
          element: <CourseSchedule />,
        },
        {
          path: "/submit-tickets",
          element: <SubmitTickets />,
        },
        {
          path: "/submit-tickets/thank-you",
          element: <TicketsThankYou />,
        },
        {
          path: "/invoice",
          element: <Invoice />,
        },
      ],
    },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;
