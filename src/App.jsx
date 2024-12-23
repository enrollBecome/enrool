import { useState } from "react";
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

const router = createBrowserRouter([
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
    element:<ProtectedRouteApplicant><OnboardingLayout /></ProtectedRouteApplicant>, 
    children:[
      {
        path:"/start-enrollment",
        element:<StartEnrollment />
      },
      {
        path:"/start-enrollment/:applicationid",
        element:<EditStartEnrollment />
      },
      {
        path:"/term-selection-form/:applicationid",
        element:<ProgramSelection />
      },
      {
        path:"/education-form/:applicationid",
        element:<EducationForm />
      },
      {
        path:"/experience-form/:applicationid",
        element:<ExperienceForm />
      },
      {
        path:"/personal-statement-form/:applicationid",
        element:<PersonalStatementForm />
      },
      {
        path:"/testimonial-form/:applicationid",
        element:<TestimonialForm />
      },
      {
        path:"/references-form/:applicationid",
        element:<ReferencesForm />
      },
      {
        path:"/confirmation-form/:applicationid",
        element:<ConfirmationForm />
      }
    ]
  }
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
