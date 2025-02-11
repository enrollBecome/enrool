import { getApplicationById } from '@/api/apiApplication';
import { getMailByMailId } from '@/api/apiMail';
import OnboardingTopbar from '@/layout/onboardingTopBar'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AdminViewMail = () => {
    const {mailid} = useParams();
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState("")
    const [mail , setMail] = useState([]);
    const [application , setApplication] = useState([]);
    useEffect(() => {
        if(mailid){
            getMailByMailId(mailid)
            .then((data) => setMail(data[0]))
            .catch(() => setError("Failed to fetch mail."))
            .finally(() => setLoading(false));
        }
        
      }, [mailid]);

      useEffect(()=>{
if(mail.applicationid){
        getApplicationById(mail.applicationid)
        .then((data) => setApplication(data))
        .catch(() => setError("Failed to fetch mail."))
        .finally(() => setLoading(false));
    }
      },[mail])
console.log(mail)
      console.log(application)
  return (
    <>
    <OnboardingTopbar />
    <div className="w-full lg:rounded-[60px] lg:p-[60px] sm:p-[20px] sm:mt-0 md:mt-[20px] flex-col bg-white min-h-fit h-full flex ">
   <div className="bg-[#bc9c22] text-white mt-4 py-10 rounded-[30px]">
              <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold">
                {application.email}
                </h1>
                <h2 className="text-2xl mt-2 seasons">
                Mail From : {application.first_name}{" "}{application.middle_name}{" "}{application.last_name}
                </h2>
                </div>
                </div>
                
                <div className=' w-full '>
<div className=''>
    <span>Instructor Name : </span>
    <span>
        {mail.instructor_name}
    </span>
</div>
                </div>
                
                
                
                
                </div>

                
    </>
  )
}

export default AdminViewMail