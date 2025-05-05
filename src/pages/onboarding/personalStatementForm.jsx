import { getApplicationById, updateApplication } from '@/api/apiApplication';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import OnboardingTopbar from '@/layout/onboardingTopBar'
import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { z } from 'zod';
const schema =z.object({
   statement_of_purpose:z.string().min(1500, { message: "Minimum 1500 characters are required" }),
})
const PersonalStatementForm = () => {


    const { applicationid } = useParams();
    const [loading, setLoading] = useState(true);
    const {user} = useUser();
    const [application , setApplication] = useState([]);
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
        if(appliedStatus<5){
          appliedStatus=5;
        }
        user
          .update({
            unsafeMetadata: {
              ...existingMetadata,
              applied: appliedStatus,
            },
          })
          .then(() => {
            navigate(`/testimonial-form/${applicationid}`)
            
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
          Statement of Purpose
        </div>
        <p className=" font-thin mb-4">
        Your Statement of Purpose helps us get to know you beyond your transcripts and resume. It's an opportunity to share what draws you to this program, what experiences have shaped your path, and how you hope to grow through your time at the Becoming Institute. Please focus on what feels most relevant to your journey, your readiness, and your intentions for the work ahead.
        </p>


        <form onSubmit={handleSubmit(onSubmit, onError)}>
          
          <div className="border-t py-8">
          <div className="flex flex-col pt-4">
  <span className="mb-2 text-[13px] poppins-regular">Statement of Purpose</span>

  <textarea
    className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 w-full h-40 rounded-[30px] p-4 text-base resize-none"
    placeholder="Maximun 1 Page, Single-Spaced (~500-600 words)"
    required
    {...register("statement_of_purpose")}
  ></textarea>
  
  {errors.statement_of_purpose && (
    <p className="text-red-400 text-sm px-4 py-2">
      {errors.statement_of_purpose.message}
    </p>
  )}
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
              "Save & Continue"
            )}
          </Button>
            
            </form>
        </div> 
   </>
  )
}

export default PersonalStatementForm