import Header from '@/components/header'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  applicant_name: z.string().min(1, "Name is required"),
  prremail: z.string().email("Invalid email address"),
application_id:z.string().min(1, "Application id is required"),
});

const ProfessionalRefrence = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    // Navigate to the result page with data
    navigate("/view-prr-application", { state: { formData: data } });
  };

  
  return (
    <>
<div className='w-full flex flex-col items-center'>
<div className='w-[90%]'>
<div className="bg-[#bc9c22] text-white mt-4 py-10 rounded-[30px]">
<div className="container mx-auto text-center flex flex-col gap-4 py-10">
  <h2 className='text-5xl seasons'>Confidential Refree Login</h2>
<p>Please enter the details sent to your registered email address, then click 'Next' to view and verify the application. <br />After verification, kindly provide your recommendation.</p>
</div></div></div>
<form className='w-[90%]' onSubmit={handleSubmit(onSubmit)}>
<div className="border-t py-8">
           
            <div className=" w-full flex flex-col gap-6">
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Applicant First Name
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Applicant's First Name"
                  required
                  {...register("applicant_name")}
                />
                {errors.applicant_name && (
                    <p className="text-red-400 text-sm px-4 py-2">
                      {errors.applicant_name.message}
                    </p>
                  )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Your Email Address
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Email"
                  required
                  {...register("prremail")}
                />
                {errors.prremail && (
                    <p className="text-red-400 text-sm px-4 py-2">
                      {errors.prremail.message}
                    </p>
                  )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Application ID
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Application Id"
                  required
                  {...register("application_id")}
                />
                {errors.application_id && (
                    <p className="text-red-400 text-sm px-4 py-2">
                      {errors.application_id.message}
                    </p>
                  )}
              </div>
         
       
              <Button
              type="submit"

              className="rounded-full px-10 py-6  bg-[#bc9c22] flex justify-center items-center">
              
                Submit
             
            </Button>
        </div></div>
      </form>
</div>

    </>
  )
}

export default ProfessionalRefrence