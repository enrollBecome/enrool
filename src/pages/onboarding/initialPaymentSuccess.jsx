import { getApplicationById, updateApplication } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import OnboardingTopbar from "@/layout/onboardingTopBar";
import { useUser } from "@clerk/clerk-react";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";

const InitialPaymentSuccess = () => {
  const session = new URL(window.location.href).searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);
  const { user } = useUser();
  const applicationid = user?.unsafeMetadata?.applicationid;
  useEffect(() => {
    getApplicationById(applicationid)
      .then((data) => setApplication(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);

  const {
    loading: loadingUpdateApplication,
    error: errorUpdateApplication,
    fn: fnUpdateApplication,
  } = useFetch(updateApplication); // Destructure outside useEffect

  useEffect(() => {
    if (session && applicationid) {
      const existingMetadata = user.unsafeMetadata || {};

      // Define data for updating the application
      const applicationData = {
        status: "Submitted",
      };

      // Call fnUpdateApplication to update application data
      fnUpdateApplication({
        applicationData,
        application_id: applicationid,
      })
        .then(() => {
          // Update user metadata if the application update is successful
          return user.update({
            unsafeMetadata: {
              ...existingMetadata,
              applied: "applied",
            },
          });
        })
        .catch((err) => {
          console.error("Error in application update or metadata update:", err);
        });
    }
  }, [applicationid, session, user, fnUpdateApplication]); // Add relevant dependencies

  return (
    <>
      <OnboardingTopbar />
      <div className="w-full lg:rounded-[60px] lg:p-[60px] mt-[20px] flex flex-col bg-white h-full min-h-fit justify-center">
        {/* <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
          Payment Confirmation
        </div> */}
        {session && session.length >= 10 ? (
          <div className="text-center flex flex-col items-center justify-center space-y-6">
            <div className="rounded-full w-[230px] h-[230px] bg-green-200 flex justify-center items-center">
              <div className="rounded-full w-[180px] h-[180px] bg-green-300 flex justify-center items-center">
                <div className="rounded-full w-[130px] h-[130px] bg-green-400 flex justify-center items-center">
                  <Check strokeWidth={5} size={70} color="white" />
                </div>
              </div>
            </div>
            <div className="text-green-500 text-3xl font-bold">
              Payment Successful!
            </div>
            <div className="text-gray-700 text-lg">
              Thank you for your payment,{" "}
              <span className="font-semibold">
                {application?.first_name || "User"}
              </span>
              .
            </div>
            <div className="text-gray-800 text-xl font-semibold">
              Amount Paid: <span className="text-green-600">$150 CAD</span>
            </div>
            <div className="text-gray-500">
              Transaction ID is:{" "}
              <span className="font-mono text-sm">{session}</span>
            </div>
            <button
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700"
              onClick={() => (window.location.href = `/initial-payment/${applicationid}`)}
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="text-center text-red-500 text-lg">
            Invalid session. Please try again.
          </div>
        )}
      </div>
    </>
  );
};

export default InitialPaymentSuccess;
