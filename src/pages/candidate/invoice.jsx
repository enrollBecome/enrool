import OnboardingTopbar from '@/layout/onboardingTopBar'
import React from 'react'

const Invoice = () => {
  return (
   <>
    <OnboardingTopbar />
      <div className="w-full  lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white h-full min-h-fit ">
      <div className="bg-[#bc9c22] text-white mt-4 py-14 rounded-[30px]">
              <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold">
                  Invoices
                </h1>
                <h2 className="text-2xl mt-2 seasons">
                All the paid invoices so far..
                </h2>
              </div>
            </div>
            </div>
       </>
  )
}

export default Invoice