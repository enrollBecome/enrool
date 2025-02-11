import OnboardingTopbar from "@/layout/onboardingTopBar";
import React, { useEffect, useState } from "react";
import countries from "@/data/countries";
import EducationLevel from "@/data/educationLevel";
import FirstLanguage from "@/data/firstLanguage";
import { Controller, useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";
import { z } from "zod";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewApplication, getApplicationById, updateApplication } from "@/api/apiApplication";
import ImmigrationStatus from "@/data/immigrationStatus";

import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import GenderOptions from "@/data/genderOptions";
import { useNavigate, useParams } from "react-router-dom";

const schema = z.object({
    ar_name: z.string().min(3, { message: "Minimum 3 letters are required" }),
    ar_phone: z.string().min(3, { message: "Minimum 3 letters are required" }),
    ar_email: z.string().min(3, { message: "Minimum 3 letters are required" }),
    per_name: z.string().min(3, { message: "Minimum 3 letters are required" }),
    per_phone: z.string().min(3, { message: "Minimum 3 letters are required" }),
    per_email: z.string().min(3, { message: "Minimum 3 letters are required" }),
   prr_name: z.string().min(3, { message: "Minimum 3 letters are required" }),
   prr_phone: z.string().min(3, { message: "Minimum 3 letters are required" }),
   prr_email: z.string().min(3, { message: "Minimum 3 letters are required" }),
    
    
  });

const ReferencesForm = () => {



    const { applicationid } = useParams();
    const [loading, setLoading] = useState(true);

    const [application , setApplication] = useState([]);
  const { user } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || "No email found";
  const navigate =useNavigate();

  let appliedStatus = user.unsafeMetadata.applied;
  let applicationStatus = application.status;
  useEffect(() => {
    if (applicationStatus === "Approved") {
      navigate("/candidate-dashboard");
    }else if(applicationStatus === "Paid"){
      navigate("/candidate-dashboard");
    }
  }, [applicationStatus]);
  useEffect(() => {
    getApplicationById(applicationid)
      .then((data) => setApplication(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);
  const {
    register,
    handleSubmit,
    control,
    setValue, // For setting fetched data
    reset, // To reset form fields
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: application,
  });

  const onError = (errors) => {
    console.log('Form errors:', errors);
  };
  
  const {
    loading : loadingUpdateApplication ,
    error : errorUpdateApplication,
    data : dataUpdateApplication,
    fn : fnUpdateApplication

  } = useFetch(updateApplication);

  const onSubmit = (data) => {

    fnUpdateApplication({

    applicationData: data,
    application_id:applicationid,

    })
  };

  useEffect(() => {
    if (dataUpdateApplication?.length > 0){

        const existingMetadata = user.unsafeMetadata || {};
        if(appliedStatus<7){
          appliedStatus=7;
        }
        user
          .update({
            unsafeMetadata: {
              ...existingMetadata,
              applied: appliedStatus,
            },
          })
          .then(() => {
            navigate(`/confirmation-form/${applicationid}`);
            
          })
          .catch((err) => {
            console.error("Error updating unsafeMetadata:", err);
          });
  
        // Update Clerk unsafeMetadata with new candidate ID
      }
    
      
  }, [loadingUpdateApplication]);
  // useEffect(() => {
  //   if (dataUpdateApplication?.length > 0) navigate(`/confirmation-form/${applicationid}`);
  // }, [loadingUpdateApplication]);
  useEffect(() => {
    if (application) {

      reset(application); // Populate form with fetched job data
    }
  }, [application]);
  

  return (
   <>

<OnboardingTopbar />
      <div className="w-full  lg:rounded-[60px] lg:p-[60px] sm:p-[20px] sm:mt-0 md:mt-[20px] flex-col bg-white h-fit ">
        <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
        Resume and Video Testimonial
        </div>
        <p className=" font-thin mb-4">
        List the names and contact information of referees who are willing to complete a confidential assessment on your behalf.
        </p>


        <form onSubmit={handleSubmit(onSubmit, onError)}>

          
          <div className="border-t py-8">
<div className='pb-4'>
<span className='text-2xl font-bold '>Academic Reference</span>
</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Full Name
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add full name"
                  required
                  {...register("ar_name")}
                />
                {errors.ar_name && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.ar_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Phone
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="number"
                  placeholder="Add Phone"
                  required
                  {...register("ar_phone")}
                />
                {errors.ar_phone && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.ar_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Email Address
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="email"
                  placeholder="Add Email"
                  required
                  {...register("ar_email")}
                />
                {errors.ar_email && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.ar_email.message}
                  </p>
                )}
              </div>
            </div>
            <div className='py-4'>
<span className='text-2xl font-bold '>Professional Reference</span>
</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Full Name
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add full name"
                  required
                  {...register("prr_name")}
                />
                {errors.prr_name && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.prr_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Phone
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="number"
                  placeholder="Add Phone"
                  required
                  {...register("prr_phone")}
                />
                {errors.prr_phone && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.prr_phone.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Email Address
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="email"
                  placeholder="Add Email"
                  required
                  {...register("prr_email")}
                />
                {errors.prr_email && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.prr_email.message}
                  </p>
                )}
              </div>
            
            </div>
            <div className='py-4'>
<span className='text-2xl font-bold '>Personal Reference</span>
</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Full Name
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add full name"
                  required
                  {...register("per_name")}
                />
                {errors.per_name && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.per_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Phone
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="number"
                  placeholder="Add Phone"
                  required
                  {...register("per_phone")}
                />
                {errors.per_phone && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.per_phone.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Email Address
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="email"
                  placeholder="Add Email"
                  required
                  {...register("per_email")}
                />
                {errors.per_email && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.per_email.message}
                  </p>
                )}
              </div>
            </div>
            </div>
            {errorUpdateApplication?.message && (
  <p className="text-red-500">{errorUpdateApplication.message}</p>
)}
          <Button
              type="submit"

              className="rounded-full px-10 py-6  bg-[#bc9c22] flex justify-center items-center">
              {loadingUpdateApplication ? (
                <ClipLoader color="white" size={24} />
              ) : (
                "Submit"
              )}
            </Button>
            </form></div>
   </>
  )
}

export default ReferencesForm