import { getApplicationById } from '@/api/apiApplication';
import { Button } from '@/components/ui/button';
import OnboardingTopbar from '@/layout/onboardingTopBar'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const PaymentForm = () => {
    const { applicationid } = useParams();
    const [loading, setLoading] = useState(true);
    const [application, setApplication] = useState([]);
    let applicationStatus = application.status;

    const navigate = useNavigate();

    useEffect(() => {
      getApplicationById(applicationid)
        .then((data) => setApplication(data))
        .catch(() => setError("Failed to fetch applications."))
        .finally(() => setLoading(false));
    }, [applicationid]);

    useEffect(() => {
        if(applicationStatus === "Paid"){
          navigate("/candidate-dashboard");
        }
      }, [applicationStatus]);
  return (
   <>
     <OnboardingTopbar />
      <div className="w-full lg:rounded-[60px] lg:p-[60px] sm:p-[20px] sm:mt-0 md:mt-[20px] flex-col bg-white h-fit">
       
          
          {application.status === "Submitted"?(<>
          <div className='flex flex-col items-center justify-center'>
            <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
          Payment 
          </div> 
            <span className="text-2xl text-gray-500 font-normal text-center ">
               Your application has been  successfully submitted and is under review.<br/> Once approved you'll get a mail from us, regardig the next steps.
              </span>
              </div></>):(<> 
                <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
          Payment
          </div> 
            <div className="w-full min-h-full h-fit flex flex-col">
              <span className="text-2xl text-gray-500 font-semibold">
                Payment Form
              </span>

              <div className="border-t my-4"></div>
              <div className="">
                <div className="flex flex-col">
                  <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                    Course Name
                  </span>
                  <span className="mb-2 text-2xl poppins-bold">
                    {application.course_name}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col">
                  <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                    Program Term
                  </span>
                  <span className="mb-2 text-2xl poppins-bold">
                    {application.term}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                    Price
                  </span>
                  <span className="mb-2 text-2xl poppins-bold">$150</span>
                </div>
              </div>
              <div className="border-t mt-4 pt-8">
              <form action="https://tallkizetxyhcvjujgzw.supabase.co/functions/v1/create-checkout-session" method="POST">
              <Button className="w-full h-12 rounded-full " type="submit">
                  Complete Payment
                </Button>
</form>
                
              </div>
            </div>
          </>)}
          </div>
</>
  )
}

export default PaymentForm