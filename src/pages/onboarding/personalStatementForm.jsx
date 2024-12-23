import { getApplicationById, updateApplication } from '@/api/apiApplication';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import OnboardingTopbar from '@/layout/onboardingTopBar'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { z } from 'zod';
const schema =z.object({
   statement_of_purpose:z.string().min(3, { message: "Nature of Work is required" }),
})
const PersonalStatementForm = () => {


    const { applicationid } = useParams();
    const [loading, setLoading] = useState(true);

    const [application , setApplication] = useState([]);


  const navigate =useNavigate();
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
    if (dataUpdateApplication?.length > 0) navigate(`/term-selection-form/${applicationid}`);
  }, [loadingUpdateApplication]);
  useEffect(() => {
    if (application) {

      reset(application); // Populate form with fetched job data
    }
  }, [application]);
  

  













  return (
   <>
   <OnboardingTopbar />
      <div className="w-full  lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white h-fit ">
        <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
          Statement of Purpose
        </div>
        <p className=" font-thin mb-4">
          Please provide detailed information about your professional experience.
        </p>


        <form onSubmit={handleSubmit(onSubmit, onError)}>
          
          <div className="border-t py-8">
          <div className="flex flex-col pt-4">
  <span className="mb-2 text-[13px] poppins-regular">Statement of Purpose</span>

  <textarea
    className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 w-full h-40 rounded-[30px] p-4 text-base resize-none"
    placeholder="Add statement of purpose"
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
              "Add"
            )}
          </Button>
            
            </form>
        </div> 
   </>
  )
}

export default PersonalStatementForm