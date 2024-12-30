import OnboardingTopbar from '@/layout/onboardingTopBar'
import React from 'react'

const CourseEnrolled = () => {
  return (
   <>
   <OnboardingTopbar />
      <div className="w-full  lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white h-fit ">
       
  
                <div className=" bg-[#bc9c22] text-white mt-4 py-10 rounded-[30px]">
        <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold">The Becoming Institute</h1>
            <h2 className="text-2xl mt-2 seasons">12-Month Trauma Recovery Certificate Program</h2>
        </div>
    </div> 

    <div className="container mx-auto px-4 py-8">
        <section id="program-overview" className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Program Overview</h3>
            <p className="mb-4">
                The Becoming Institute’s 12-month Trauma Recovery Certificate program is designed to equip students with the theoretical knowledge, practical skills, and community-focused experience necessary to provide high-quality psychotherapy that delivers quick and lasting results.
            </p>
            <p>
                Combining academic rigor with immersive experiences, this program prepares students to become leaders in trauma recovery, particularly within Afro-descendant communities in Ontario.
            </p>
        </section>

        <section id="program-structure" className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Program Structure</h3>
            <p className="mb-4">
                Delivered over three 16-week semesters, the program includes:
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li>14 online courses</li>
                <li>Weekly live webinars every Friday (9 AM to 5 PM EST)</li>
                <li>Three intensive retreats focused on mastering the eight modalities of the Becoming Method™</li>
            </ul>
        </section>

        <section id="learning-approach" className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Learning Approach</h3>
            <p className="mb-4">
                Through a blend of contemplative practices, lectures, collaborative exercises, and live demonstrations, students will gain proficiency in:
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li>Psychotherapeutic processes</li>
                <li>Session management</li>
                <li>Client coaching</li>
            </ul>
        </section>
        </div> </div>
</>
  )
}

export default CourseEnrolled