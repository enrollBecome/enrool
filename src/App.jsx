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

import Completion from "./pages/completion";
import TicketsThankYou from "./pages/candidate/ticketThankYou";
import PaymentSuccess from "./pages/paymentSuccess";
import InitialPayment from "./pages/initialPayment";
import ProtectedRouteAdmin from "./components/protectedRouteAdmin";
import AdminLayout from "./layout/adminLayout";
import AdminDashbaord from "./pages/admin/adminDashbaord";
import AdminViewApplication from "./pages/admin/adminViewApplication";
import AdminMail from "./pages/admin/adminMail";
import MailsTable from "./pages/admin/mailsTable";
import AdminPrintApplication from "./pages/admin/adminPrintApplication";
import Signup from "./pages/signUp";
import AdminViewMail from "./pages/admin/adminViewMail";
import AcademicRefernce from "./pages/references/academicReference";

import PersonalRefrence from "./pages/references/perosnalReference";
import ProfessionalRefrence from "./pages/references/professionalRefernece";
import ViewArApplication from "./pages/references/viewArApplication";
import ViewPerApplication from "./pages/references/viewPerApplication";
import ViewPrrApplication from "./pages/references/viewPrrApplication";
import Thanks from "./pages/references/thanks";
import EnrollmentThanks from "./pages/onboarding/enrollmentThanks";
import HowToApply from "./pages/howToApply";
import TermsConditions from "./pages/termsConditions";
import PrivacyPolicy from "./pages/privacyPolicy";
import InitialPaymentSuccess from "./pages/onboarding/initialPaymentSuccess";
import PaymentForm from "./pages/onboarding/paymentForm";


function App() {
  // const [stripePromise, setStripePromise] = useState(null);
  
  const router = createBrowserRouter([
  
    

    {
      path: "/completion",
      element: <Completion/>, // Render Register without AppLayout
    },

    // Publically Available without navbar
    {
      path: "/sign-in",
      element: <Register />, // Render Register without AppLayout
    },
    {
      path: "/sign-up",
      element: <Signup/>, // Render Register without AppLayout
    },
    // Publically Available with NavBar
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/how-to-apply",
          element: <HowToApply />,
        },
        {
          path: "/terms-condition",
          element: <TermsConditions />,
        },
        {
          path: "/privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path:"/academic-reference",
          element:<AcademicRefernce />
        },
        {
          path:"/personal-reference",
          element:<PersonalRefrence />
        },
        {
          path:"/professional-reference",
          element:<ProfessionalRefrence />
        },
        {
          path:"/view-ar-application",
          element:<ViewArApplication />
        },
        {
          path:"/view-per-application",
          element:<ViewPerApplication />
        },
        {
          path:"/view-prr-application",
          element:<ViewPrrApplication />
        },

        {
          path:"/thanks-refree",
          element:<Thanks />
        }
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
        {
          path: "/confirmation-form/thanks",
          element: <EnrollmentThanks />,
        },
        {
          path: "/confirmation-payment-i",
          element: <InitialPaymentSuccess />,
        },
        {
          path: "/initial-payment/:applicationid",
          element: <PaymentForm />,
        },
      ],
    },

    {
      element: (
        <ProtectedRouteAdmin>
          <AdminLayout />
        </ProtectedRouteAdmin>
      ),
      children: [
        {
          path: "/admin-dashboard",
          element: <AdminDashbaord/>, // Render Register without AppLayout
        },{
          path: "/admin-dashboard/view/:applicationid",
          element: <AdminViewApplication/>, // Render Register without AppLayout
        },{
          path: "/admin-mail/:applicationid",
          element: <AdminMail/>, // Render Register without AppLayout
        },{
          path: "/admin-mail",
          element: <MailsTable/>, // Render Register without AppLayout
        },{
          path: "/admin-dashboard/print/:applicationid",
          element: <AdminPrintApplication/>, // Render Register without AppLayout
        },
        {
          path: "/admin-mail/view/:mailid",
          element: <AdminViewMail/>, // Render Register without AppLayout
        },]
      },
    {
      element: (
        <ProtectedRouteApplicant>
          <CandidateLayout />
        </ProtectedRouteApplicant>
      ),
      children: [
        {
          path: "/pay",
          element: <InitialPayment/>, // Render Register without AppLayout
        },
        {
          path: "/success",
          element: <PaymentSuccess/>, // Render Register without AppLayout
        },
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
