import { getApplicationById, updateApplication, updateTestimonialApplication } from '@/api/apiApplication'
import { Button } from '@/components/ui/button'
import useFetch from '@/hooks/use-fetch'
import OnboardingTopbar from '@/layout/onboardingTopBar'
import { useUser } from '@clerk/clerk-react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { z } from 'zod'
const schema = z.object({
    resume: z
    .any()
    .refine((file) => file && file[0] && file[0].type === "application/pdf", {
      message: "Only PDF files are allowed",
    })
    .refine((file) => file && file[0] && file[0].size <= 5_242_880, {
      message: "File size must be 5 MB or less",
    }),
    video: z
  .any()
  .refine((file) => file && file[0] && file[0].type.startsWith("video/"), {
    message: "Only video files are allowed",
  })
  .refine((file) => file && file[0] && file[0].size <= 50_000_000, { // Example: 50 MB limit
    message: "File size must be 50 MB or less",
  }),
})
const TestimonialForm = () => {


    const { applicationid } = useParams();
    const [loading, setLoading] = useState(true);
    const {user} = useUser();
    const [application , setApplication] = useState([]);

    const navigate =useNavigate();

    let appliedStatus = user.unsafeMetadata.applied;


    useEffect(() => {
      if (application.status === "Approved") {
        navigate("/candidate-dashboard");
      }else if(application.status === "Paid"){
        navigate("/candidate-dashboard");
      }
    }, [application]);
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
  
    } = useFetch(updateTestimonialApplication);
  
    const onSubmit = (data) => {
  
      fnUpdateApplication({
  
      applicationData: data,
      application_id:applicationid,
  
      })
    };
    useEffect(() => {
      if (dataUpdateApplication?.length > 0){
  
          const existingMetadata = user.unsafeMetadata || {};
          if(appliedStatus<6){
            appliedStatus=6;
          }
          user
            .update({
              unsafeMetadata: {
                ...existingMetadata,
                applied: appliedStatus,
              },
            })
            .then(() => {
              navigate(`/references-form/${applicationid}`);
              
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
    
  
    
  
  
  
  
  
  
  console.log(errorUpdateApplication)
  
  
  
  
  return (
   <>
   <OnboardingTopbar />
      <div className="w-full  lg:rounded-[60px] lg:p-[60px] sm:p-[20px] sm:mt-0 md:mt-[20px] flex-col bg-white h-fit ">
        <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
Resume & Video Introduction
        </div>
        <p className=" font-thin mb-4">
        Please upload a copy of your resume here:
        </p>


        <form onSubmit={handleSubmit(onSubmit, onError)}>
          
          <div className="border-t py-8">

          <div className="flex flex-col ">
                <span className="mb-2 text-[13px] poppins-regular">
                  Upload Your Resume
                </span>
                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 flex justify-center rounded-full p-4 text-base"
                  type="file"
                  accept=".pdf"
                  {...register("resume")}
                  required
                />
                {errors.resume && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.resume.message}
                  </p>
                )}
              </div>

          </div>

          <div className="border-t py-4 font-light">
          Please upload a 3-minute video responding to the questions below.<br /><br />

1. What motivated you to pursue a Trauma Recovery Certificate?<br />
2. What do you hope to achieve by completing this program?<br />
3. Why would you be an ideal candidate for admission into the program?<br /><br />
This is a chance for us to hear directly from you and get a sense of who you are beyond your written application. Speak clearly, and share authentically-there's no need for perfection; just be yourself.
          </div>
          <div className="border-t py-8">

<div className="flex flex-col pb-4">
      <span className="mb-2 text-[13px] poppins-regular">
        Upload Your Recoreded Video Testimonial Here (must not exceed 50MB)
      </span>
      <input
        className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 flex justify-center rounded-full p-4 text-base"
        type="file"
        accept="video/*"
        {...register("video")}
        required
      />
      {errors.video && (
        <p className="text-red-400 text-sm px-4 py-2">
          {errors.video.message}
        </p>
      )}
    </div>


    {/* <div className="border-t py-4 flex flex-col gap-4">
<span className='text-xl  font-semibold'>Video Resume Questions</span>
<span className=''>
    What motivated you to pursue a Trauma Recovery Certificate, and what do you hope to achieve by completing this program? Why would you be an ideal candidate for admission into the program?
    </span> </div> */}

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
          </div></>
  )
}

export default TestimonialForm