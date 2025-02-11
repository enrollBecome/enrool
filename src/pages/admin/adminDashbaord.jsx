import OnboardingTopbar from '@/layout/onboardingTopBar'
import React from 'react'
import { ApplicantsData } from './applicationsTable'

const AdminDashbaord = () => {
  return (
    <>
    <OnboardingTopbar />
      <div className="w-full lg:rounded-[60px] lg:p-[60px] sm:p-[20px] sm:mt-0 md:mt-[20px] flex-col bg-white min-h-fit h-full flex gap-10">
      <div className="bg-[#bc9c22] text-white mt-4 py-10 rounded-[30px]">
              <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold">
                 Applications
                </h1>
                <h2 className="text-2xl mt-2 seasons">
                Candidates who've applied so far..
                </h2>
              </div>
            </div>
            <ApplicantsData />
            </div>
    </>
  )
}

export default AdminDashbaord