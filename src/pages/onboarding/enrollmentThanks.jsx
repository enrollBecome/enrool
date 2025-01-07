import OnboardingTopbar from '@/layout/onboardingTopBar'
import React from 'react'

const EnrollmentThanks = () => {
  return (
   <>
    <OnboardingTopbar />
      <div className="w-full lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white h-full min-h-fit">
        <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
          Thanks for applying
        </div>
        <div className=''>
            Your Application is under review. Once approved you'll recieve a maill regarding the next steps!
        </div>
        </div>
   </>
  )
}

export default EnrollmentThanks