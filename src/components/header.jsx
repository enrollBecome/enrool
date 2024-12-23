import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import logo from "./../../public/logo.png";
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { isSignedIn, isLoaded, user } = useUser();
    const candidateId =user?.unsafeMetadata?.candidateid;
    const role = user?.unsafeMetadata?.role;
    const navigate = useNavigate();
    const handleClick =() =>{
        navigate('/sign-in');
    }

    useEffect(() => {
        if (candidateId) {
          navigate("/candidate-dashboard");
        }
        
        else if(role=="admin"){
          navigate("/admin-dashboard");
        }
       else if(isSignedIn){
        navigate("/start-enrollment");

       }
      }, [candidateId,role ,isSignedIn]);
      
  return (
    <>
    <div className=' w-full h-[80px] bg-white flex justify-between px-20'>
        <span className='h-full items-center flex'>
            <img src={logo} className='h-12' />
        </span>
        <div className='flex items-center gap-4'>
            
        <span className='items-center flex'>
    <SignedOut>
    <Button onClick={handleClick} className="bg-[#bc9c22]">Apply Now</Button>
    </SignedOut>
    <SignedIn>
        <UserButton />
    </SignedIn>
    </span>
    </div>
    </div>
    </>
  )
}

export default Header