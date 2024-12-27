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
  .refine((file) => file && file[0] && file[0].size <= 5_000_000, { // Example: 50 MB limit
    message: "File size must be 5 MB or less",
  }),
})
const TestimonialForm = () => {


    const { applicationid } = useParams();
    const [loading, setLoading] = useState(true);
    const {user} = useUser();
    const [application , setApplication] = useState([]);

    const navigate =useNavigate();

    const appliedStatus = user.unsafeMetadata.applied;

  useEffect(() => {
    if (appliedStatus === "true") {
      navigate("/candidate-dashboard");
    }
  }, [appliedStatus]);
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
      if (dataUpdateApplication?.length > 0) navigate(`/references-form/${applicationid}`);
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
      <div className="w-full  lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white h-fit ">
        <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
        Resume and Video Testimonial
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

          <div className="border-t py-4">
          Upload a short, 3-minute video answering the following questions. Make sure to speak clearly and concisely, and ensure that your responses are authentic and reflective of your true self. This video is an opportunity for us to get to know you beyond your written application.
          </div>
          <div className="border-t py-8">

<div className="flex flex-col pb-4">
      <span className="mb-2 text-[13px] poppins-regular">
        Upload Your Recoreded Video Testimonial Here
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


    <div className="border-t py-4 flex flex-col gap-4">
<span className='text-xl  font-semibold'>Video Resume Questions</span>
<span className=''>
    What motivated you to pursue a Trauma Recovery Certificate, and what do you hope to achieve by completing this program? Why would you be an ideal candidate for admission into the program?
    </span> </div>

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
          </form>
          </div></>
  )
}

export default TestimonialForm