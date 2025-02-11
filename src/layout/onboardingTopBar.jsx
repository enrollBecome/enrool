import { UserButton } from '@clerk/clerk-react'
import { Menu } from 'lucide-react';
import React from 'react'
import logoWhite from "./../assets/logo.png"

const OnboardingTopbar = () => {
  const handleMenuState = () =>{
    const menu = document.getElementById("mobile-menu");
      if (menu) {
        menu.classList.remove("sm:hidden"); // Add or remove the "hidden" class
      }
  
  
  }
  return (
   <>
   <div className='w-full h-[100px]  flex  sm:justify-between md:justify-end items-center sm:px-5 md:px-20 py-7'>

   <div className='sm:flex md:hidden'><Menu strokeWidth={2} size={30} onClick={handleMenuState} /></div>
   <div className='sm:flex md:hidden'> <img onClick={() => { window.location.href = "/"; }}  className='cursor-pointer sm:h-[50px] md:h-[60px] mt-3' src={logoWhite} height={80}/>
           </div>
    <UserButton />
    </div></>
  )
}

export default OnboardingTopbar