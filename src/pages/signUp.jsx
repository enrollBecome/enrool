import { SignIn, SignUp } from '@clerk/clerk-react'
import React from 'react'
import logo from "./../assets/logo.png";
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <>
    <div className='w-full min-h-screen flex items-center bg-white'>
    
    <div className='sm:w-full md:w-1/2 h-screen flex flex-col justify-center items-center'>
    <img className="w-24" src={logo} /><SignUp forceRedirectUrl='/start-enrollment?mail=true'/>
    <div className="flex gap-4 mt-4 ">

            <Link to="/how-to-apply" className="font-thin text-sm text-gray-400" >How to Apply  </Link>
            <Link to="/terms-condition" className="font-thin text-sm text-gray-400" >Terms & Condition  </Link>
            <Link to="/privacy-policy" className="font-thin text-sm text-gray-400" >Privacy Policy</Link>
          </div></div>
    <div className=' sm: hidden md:block h-screen'><img className='h-full' src="https://tallkizetxyhcvjujgzw.supabase.co/storage/v1/object/public/uploads/Image%20(2).png"/></div>
    
    </div>
    </>
  )
}

export default Signup