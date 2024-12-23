import { UserButton } from '@clerk/clerk-react'
import React from 'react'

const OnboardingTopbar = () => {
  return (
   <>
   <div className='w-full h-[100px]  flex justify-end items-center px-20 py-7'>
    <UserButton />
    </div></>
  )
}

export default OnboardingTopbar