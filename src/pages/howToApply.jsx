import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import React from 'react'
import { useNavigate } from "react-router-dom"

const HowToApply = () => {
  const navigate = useNavigate();
  return (
   <>
   <div className='w-full justify-center flex'>
   <div className='w-[90%] flex flex-col justify-center items-center'>
   <div className="bg-[#bc9c22] text-white mt-4 w-full py-10 rounded-[30px] pb-6">
              <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold">
                  How To Apply?
                </h1>
                <h2 className="text-2xl mt-2 seasons">
                Please go through this to understand<br /> the procedure of applying!
                </h2>
              </div>
            </div>

            <div className='sm:w-full sm:px-5 md:p-0 md:w-1/2 mt-10'>
            <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-2xl font-light">Steps To Apply</AccordionTrigger>
        <AccordionContent>
        <div className="p-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Applying for the 12-Month Trauma Recovery Program</h2>
  <p className="text-gray-600 mb-6">
    At the Becoming Institute, applying is straightforward, and we're here to assist you throughout the process.
  </p>
  <div>
    <h3 className="text-lg font-semibold text-gray-700 mb-3">How to Apply:</h3>
    <ol className="list-decimal list-inside space-y-2 text-gray-600">
      <li>Review the program's admission requirements.</li>
      <li>
        If you meet the requirements, click the 
        <button className="ml-2 text-blue-600 font-medium underline hover:text-blue-800 focus:outline-none" onClick={() => navigate("/sign-in")}>
          APPLY NOW
        </button> 
        {" "}button to access the online application portal.
      </li>
      <li>Create your student profile.</li>
      <li>Submit your application with all relevant information.</li>
    </ol>
    <p className="text-sm text-gray-500 mt-4">
      <strong>Note:</strong> Your application will be reviewed after the submission of a complete application package.
    </p>
  </div>
</div>

        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-2xl font-light">Admission Requirements</AccordionTrigger>
        <AccordionContent>
        <div className="p-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    Eligibility Criteria for the 12-Month Trauma Recovery Certificate Program
  </h2>
  <p className="text-gray-600 mb-6">
    Applicants must be at least 18 years old. Our program is designed as an entry pathway into RN-Psychotherapy practice. We welcome applications from Registered Nurses (RNs), Registered Practical Nurses (RPNs), and nurses with graduate degrees who are interested in becoming psychotherapists.
  </p>
  <p className="text-gray-600 mb-6">
    Applicants with experience in fields such as public health, psychiatric and mental health nursing, medicine, social work, education, and supportive peer roles will be highly regarded.
  </p>
  <div>
    <h3 className="text-lg font-semibold text-gray-700 mb-3">Preference will be given to applicants with:</h3>
    <ul className="list-disc list-inside space-y-2 text-gray-600">
      <li>
        A master’s degree in nursing, social work, psychology, or related allied health professions.
      </li>
      <li>
        An Honours Bachelor’s degree or its equivalent (typically a four-year full-time program) from a recognized post-secondary institution.
      </li>
    </ul>
  </div>
</div>

        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-2xl font-light">Admissions Process</AccordionTrigger>
        <AccordionContent>
        <div className="p-6 ">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    Eligibility Criteria for the 12-Month Trauma Recovery Certificate Program
  </h2>
  <p className="text-gray-600 mb-6">
    Applicants must be at least 18 years old. Our program is designed as an entry pathway into RN-Psychotherapy practice. We welcome applications from Registered Nurses (RNs), Registered Practical Nurses (RPNs), and nurses with graduate degrees who are interested in becoming psychotherapists.
  </p>
  <p className="text-gray-600 mb-6">
    Applicants with experience in fields such as public health, psychiatric and mental health nursing, medicine, social work, education, and supportive peer roles will be highly regarded.
  </p>
  <div>
    <h3 className="text-lg font-semibold text-gray-700 mb-3">Preference will be given to applicants with:</h3>
    <ul className="list-disc list-inside space-y-2 text-gray-600">
      <li>
        A master’s degree in nursing, social work, psychology, or related allied health professions.
      </li>
      <li>
        An Honours Bachelor’s degree or its equivalent (typically a four-year full-time program) from a recognized post-secondary institution.
      </li>
    </ul>
  </div>
</div>

        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-2xl font-light">Admissions Process</AccordionTrigger>
        <AccordionContent>
        <div className="p-6 ">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    Eligibility Criteria for the 12-Month Trauma Recovery Certificate Program
  </h2>
  <p className="text-gray-600 mb-6">
    Applicants must be at least 18 years old. Our program is designed as an entry pathway into RN-Psychotherapy practice. We welcome applications from Registered Nurses (RNs), Registered Practical Nurses (RPNs), and nurses with graduate degrees who are interested in becoming psychotherapists.
  </p>
  <p className="text-gray-600 mb-6">
    Applicants with experience in fields such as public health, psychiatric and mental health nursing, medicine, social work, education, and supportive peer roles will be highly regarded.
  </p>
  <div>
    <h3 className="text-lg font-semibold text-gray-700 mb-3">Preference will be given to applicants with:</h3>
    <ul className="list-disc list-inside space-y-2 text-gray-600">
      <li>
        A master’s degree in nursing, social work, psychology, or related allied health professions.
      </li>
      <li>
        An Honours Bachelor’s degree or its equivalent (typically a four-year full-time program) from a recognized post-secondary institution.
      </li>
    </ul>
  </div>
</div>

        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="text-2xl font-light">Admission Deadline</AccordionTrigger>
        <AccordionContent>
        <div className="p-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Deadlines</h2>
  <p className="text-gray-600 mb-6">
    We accept applications year-round; however, we recommend submitting your complete application package by the following dates:
  </p>
  <ul className="list-disc list-inside space-y-2 text-gray-600">
    <li>
      <strong>Fall start term:</strong> April 1
    </li>
    <li>
      <strong>Winter start term:</strong> October 30
    </li>
    <li>
      <strong>Spring start term:</strong> February 15
    </li>
  </ul>
</div>


        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger className="text-2xl font-light">Apply Now</AccordionTrigger>
        <AccordionContent>
        <div className="p-6 ">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Apply Today!</h2>
  <p className="text-gray-600 mb-4">We are now accepting applications for 2025!</p>
  <h3 className="text-lg font-semibold text-gray-700 mb-3">Supporting Documentation</h3>
  <p className="text-gray-600 mb-4">
    The documents required to complete your application include the following:
  </p>
  <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
    <li>Transcript(s) from all University level studies</li>
    <li>Personal Statement</li>
    <li>Resume/CV</li>
    <li>3 Letters of Recommendation</li>
    <li>English Language Proficiency Test score for international students</li>
    <li>Video – Your Story, Your Why?</li>
  </ul>
  <p className="text-gray-600">
    Most of the documents above can be uploaded by you directly to the application portal. Applicants are strongly encouraged to submit all documentation within two weeks of the application deadline.
  </p>
</div>



        </AccordionContent>
      </AccordionItem>
    </Accordion>
            </div>
            </div>
            </div>
   </>
  )
}

export default HowToApply