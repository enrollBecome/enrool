import { getApplicationById, updateApplication } from '@/api/apiApplication';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import OnboardingTopbar from '@/layout/onboardingTopBar'
import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';


const schema = z.object({
  query: z.string().min(3, { message: "Query is Required" }),
  instructor_name: z.string().min(3, { message: "Instructor name is required" }),
  subject:z.string().min(3, { message: "Subject is required" }),
  

});
const SubmitTickets = () => {

  const { user } = useUser();
  const applicationid = user?.unsafeMetadata?.applicationid;

  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);

  useEffect(() => {
    getApplicationById(applicationid)
      .then((data) => setApplication(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);
  
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
     <div className="w-full lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white h-fit">
     <div className="bg-[#bc9c22] text-white mt-4 py-10 rounded-[30px] pb-6">
              <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold">
                  Submit A Ticket
                </h1>
                <h2 className="text-2xl mt-2 seasons">
                Pease Write the issue over here, and one of our executive will <br />reach out to you via mail
                </h2>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* Name Information */}
          <div className="border-t py-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                 Instructor Name
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Instructor Name"
                  required
                  {...register("instructor_name")}
                />
                 {errors.instructor_name && (
                    <p className="text-red-400 text-sm px-4 py-2">
                      {errors.instructor_name.message}
                    </p>
                  )}
              </div>
              <div className="flex flex-col mt-4">
                <span className="mb-2 text-[13px] poppins-regular">
                  Subject
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Subject"
                  required
                  {...register("subject")}
                />
                 {errors.subject && (
                    <p className="text-red-400 text-sm px-4 py-2">
                      {errors.subject.message}
                    </p>
                  )}
              </div>
              <div className="flex flex-col pt-4">
  <span className="mb-2 text-[13px] poppins-regular">Add Your Query</span>

  <textarea
    className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 w-full h-40 rounded-[30px] p-4 text-base resize-none"
    placeholder="Add query /message ...."
    required
    {...register("query")}
  ></textarea>
  
  {errors.query && (
    <p className="text-red-400 text-sm px-4 py-2">
      {errors.query.message}
    </p>
  )}
</div>

            </div>

            <Button className="rounded-full text-lg bg-[#bc9c22] py-7 px-10" > Submit</Button>

            </form>
        
          

     </div>
    </>
  )
}

export default SubmitTickets