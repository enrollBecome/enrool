import React, { useEffect, useState } from 'react'
import { z } from 'zod';
import TermOptions from '@/data/termOptions';
import CourseOptions from '@/data/courseOptions';
import { Controller, useForm } from 'react-hook-form';
import OnboardingTopbar from '@/layout/onboardingTopBar';
import { ClipLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { getApplicationById, updateApplication } from '@/api/apiApplication';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
const schema = z.object({
  term:z.enum(TermOptions, { errorMap: () => ({ message: "Term must not be empty" }) }),
  course_name:z.enum(CourseOptions, { errorMap: () => ({ message: "Course must not be empty" }) }),

});
const ProgramSelection = () => {

const {user} =useUser()

  const { applicationid } = useParams();
  const [loading, setLoading] = useState(true);

  const [application , setApplication] = useState([]);

  const navigate = useNavigate();
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
        if(appliedStatus<2){
          appliedStatus=2;
        }
        user
          .update({
            unsafeMetadata: {
              ...existingMetadata,
              applied: appliedStatus,
            },
          })
          .then(() => {
            navigate(`/education-form/${applicationid}`);
            
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
  




  return (
    <>
    <OnboardingTopbar />
      <div className="w-full  lg:rounded-[60px] lg:p-[60px] sm:p-[20px] sm:mt-0 md:mt-[20px] flex-col bg-white h-fit ">
        <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
         Choose Your Program Start Date
        </div>
        <p className=" font-thin mb-4">
You're one step closer to joining the Becoming Institute. Please select your desired program and start term to continue.
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* Name Information */}
          <div className="border-t py-8">
            <span className="text-2xl font-medium">Program & Start Term</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

           <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                Program Name
                </span>
                <Controller
  name="course_name"
  control={control}
  render={({ field }) => (
    <div className="relative">
      <select
        {...field}
        value={field.value || application.course_name || ""}
        onChange={(e) => field.onChange(e.target.value)}
        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
          errors.course_name ? "border-red-400 border-2" : ""
        }`}>
        <option value="" disabled className="text-neutral-400">
          Select Program
        </option>
        {CourseOptions.map((edu,index) => (
          <option key={index} value={edu}  className="text-zinc-950">
            {edu}
          </option>
        ))}
      </select>
      {errors.course_name && (
    <p className="text-red-400 text-sm px-4 py-2">{errors.course_name.message}</p>
  )}
    </div>
  )}
/>
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Start Term
                </span>
                <Controller
  name="term"
  control={control}
  render={({ field }) => (
    <div className="relative">
      <select
        {...field}
        value={field.value || application.term ||""}
        onChange={(e) => field.onChange(e.target.value)}
        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
          errors.term ? "border-red-400 border-2" : ""
        }`}>
        <option value="" disabled className="text-neutral-400">
          Select Term
        </option>
        {TermOptions.map((edu,index) => (
          <option key={index} value={edu}  className="text-zinc-950">
            {edu}
          </option>
        ))}
      </select>
      {errors.term && (
    <p className="text-red-400 text-sm px-4 py-2">{errors.term.message}</p>
  )}
    </div>
  )}
/>
              </div>

            </div>
            <p className='pt-3 text-sm font-thin'>Select the program you're applying for and your preferred start term. <br />If unsure, choose the next available term.</p>
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
                "Save & Continue"
              )}
            </Button>
        </form>
      </div>
    </>
  )
}

export default ProgramSelection