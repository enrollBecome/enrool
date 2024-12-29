import { getApplicationById, updateApplication } from "@/api/apiApplication";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import OnboardingTopbar from "@/layout/onboardingTopBar";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { z } from "zod";

const schema = z.object({
  application_confirmation: z.boolean({
    errorMap: () => ({ message: "Status must be true or false" }),
  }),
});

const ConfirmationForm = () => {
  const { user } = useUser();
  const { applicationid } = useParams();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // State for checkbox
  let appliedStatus = user.unsafeMetadata.applied;

  const navigate = useNavigate();

  useEffect(() => {
    getApplicationById(applicationid)
      .then((data) => setApplication(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: application,
  });

  const onError = (errors) => {
    console.log("Form errors:", errors);
  };

  const {
    loading: loadingUpdateApplication,
    error: errorUpdateApplication,
    data: dataUpdateApplication,
    fn: fnUpdateApplication,
  } = useFetch(updateApplication);

  const onSubmit = (data) => {
    data.status = "Submitted";
    fnUpdateApplication({
      applicationData: data,
      application_id: applicationid,
    });
  };

  useEffect(() => {
    if (dataUpdateApplication?.length > 0) {
      const existingMetadata = user.unsafeMetadata || {};
      user
        .update({
          unsafeMetadata: {
            ...existingMetadata,
            applied: "true",
          },
        })
        .then(() => {
          navigate("/candidate-dashboard");
        })
        .catch((err) => {
          console.error("Error updating unsafeMetadata:", err);
        });

      // Update Clerk unsafeMetadata with new candidate ID
    }
  }, [loadingUpdateApplication]);

  useEffect(() => {
    if (application) {
      reset(application); // Populate form with fetched job data
    }
  }, [application]);

  useEffect(() => {
    if (appliedStatus === "true") {
      navigate("/candidate-dashboard");
    }
  }, [appliedStatus]);

  return (
    <>
      <OnboardingTopbar />
      <div className="w-full lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white h-fit">
        <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
          Application Confirmation
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="flex flex-col ">
              <p className="text-sm font-light text-gray-400">Applicant Name</p>
              <p className="text-xl">
                {application.first_name} {application.last_name}
              </p>
            </div>
            <div className="flex flex-col ">
              <p className="text-sm font-light text-gray-400">Program</p>
              <p className="text-xl">{application.course_name}</p>
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="checkbox1"
              {...register("application_confirmation")}
              onChange={(e) => {
                setIsCheckboxChecked(e.target.checked); // Update local state
              }}
            />
            <label htmlFor="checkbox1" className="ml-2">
              Confirm
            </label>
          </div>
          <div className="my-4">
            <span className="">
              I certify that the information I have submitted on this
              application is accurate to the best of my knowledge. I authorize
              Becoming Institute’s Admissions Committee to access the
              information, contact my reference if required and evaluate my
              admissibility to the 12-month Trauma Recovery program.
            </span>
          </div>
          <div className="flex flex-col my-8">
            <p className="text-sm font-light text-gray-400">
              Enrollment Status
            </p>
            <p className="text-xl">{application.status}</p>
          </div>
          <div className="my-8">
            <span className="">
              Note: you can only submit one application per term. If you require
              changes to your information after your application has been
              submitted, notify info@becomingmethod.com. If you find any errors
              above, please go back to make the changes necessary.
            </span>
          </div>

          <div className="border-t py-8"></div>

          {errorUpdateApplication?.message && (
            <p className="text-red-500">{errorUpdateApplication.message}</p>
          )}

          <Button
            type="submit"
            className={`rounded-full px-10 py-6 mt-[40px] flex justify-center items-center ${
              !isCheckboxChecked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#bc9c22]"
            }`}
            disabled={!isCheckboxChecked} // Disable button when checkbox is not checked
          >
            {loadingUpdateApplication ? (
              <ClipLoader color="white" size={24} />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default ConfirmationForm;
