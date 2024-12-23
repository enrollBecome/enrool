import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { PropagateLoader } from "react-spinners";

const ProtectedRouteApplicant = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  if (!isLoaded) return (
<div className='w-full h-screen relative flex items-center justify-center'>
<PropagateLoader />
</div>

  ); // Prevent rendering until user data is loaded

  // Redirect to sign-in page if the user is not logged in
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  // Check if user has an admin role in the metadata; if not, redirect to Applicant dashboard
  const isAdmin = user?.unsafeMetadata?.role === "admin";

  if (isAdmin && pathname !== "/admin-dashboard") {
    return <Navigate to="/admin-dashboard" />;
  }

  // Redirect to onboarding if user metadata does not include role
 

  return children;
};

export default ProtectedRouteApplicant;