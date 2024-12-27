import OnboardingTopbar from "@/layout/onboardingTopBar";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import PaymentForm from "./paymentFrom";
import MyApplication from "./myApplication";
import { getApplicationById } from "@/api/apiApplication";
import { Button } from "@/components/ui/button";
import { getEducationByApplicationId } from "@/api/apiEducation";
import { Download } from "lucide-react";
import { getExperienceByApplicationId } from "@/api/apiExperience";

const CandidateDashboard = () => {
  const { user } = useUser();
  const applied = user?.unsafeMetadata?.applied;

  const applicationid = user?.unsafeMetadata?.applicationid;
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  useEffect(() => {
    getApplicationById(applicationid)
      .then((data) => setApplication(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);
  
  useEffect(() => {
    getEducationByApplicationId(applicationid)
      .then((data) => setEducation(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);
  useEffect(() => {
    getExperienceByApplicationId(applicationid)
      .then((data) => setExperience(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);
  return (
    <>
      <OnboardingTopbar />
      <div className="w-full lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white min-h-fit h-full">
        <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
          My Application
        </div>
        {application && application.status === "Approved" ? (
          <>
            <div className="w-4/5 min-h-full h-fit flex justify-center">
              <span className="">
                Your application has been successfully submitted and is
                currently under review. Once approved, you will receive a
                notification to complete the payment and begin your course.{" "}
              </span>
            </div>
          </>
        ) : null}
        {application && application.status === "Approved" ? (
          <>
            <div className="w-full min-h-full h-fit flex flex-col">
              <span className="text-2xl text-gray-500 font-semibold">
                Payment Form
              </span>

              <div className="border-t my-4"></div>
              <div className="">
                <div className="flex flex-col">
                  <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                    Course Name
                  </span>
                  <span className="mb-2 text-2xl poppins-bold">
                    {application.course_name}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col">
                  <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                    Program Term
                  </span>
                  <span className="mb-2 text-2xl poppins-bold">
                    {application.term}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                    Price
                  </span>
                  <span className="mb-2 text-2xl poppins-bold">150,00 €</span>
                </div>
              </div>
              <div className="border-t mt-4 pt-8">
                <Button className="w-full h-12 rounded-full ">
                  Complete Payment
                </Button>
              </div>
            </div>
          </>
        ) : null}
        {application && application.status === "Submitted" ? (
          <>
            <div className="w-full min-h-full h-fit flex flex-col">
              {/* Personal Information  */}
              <div className="border-t mt-4 pt-8">
                <span className="text-2xl font-medium  seasons text-gray-400">
                  Perosnal Information
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      First Name
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.first_name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Last Name
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.last_name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Middle Name
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.middle_name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Former name
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.former_name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Gender
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.gender}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Date of Birth
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.dob}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Phone Number
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.phone}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Country of Residence
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.country}
                    </span>
                  </div>
                </div>
              </div>
              {/* Education & Language  */}
              <div className="border-t mt-4 pt-8">
                <span className="text-2xl font-medium  seasons text-gray-400">
                  Education & Language
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Highest Level of Education
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.highest_level_education}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      First Language
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.first_language}
                    </span>
                  </div>
                </div>
              </div>
              {/* Immigration & Ancestry  */}
              <div className="border-t mt-4 pt-8">
                <span className="text-2xl font-medium  seasons text-gray-400">
                  Immigration & Ancestry
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Immigration
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.immigration_status}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Ancestry
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.ancestry}
                    </span>
                  </div>
                </div>
              </div>
              {/* Term Selection  */}
              <div className="border-t mt-4 pt-8">
                <span className="text-2xl font-medium  seasons text-gray-400">
                  Term Selection
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Course Selection
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.course_name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Term
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.term}
                    </span>
                  </div>
                </div>
              </div>
{/* Education  */}
              {education && education.length > 0 ? (
                <>
                  <div className="border-t mt-4 pt-8">
                    <span className="text-2xl font-medium  seasons text-gray-400">
                      Educational Background
                    </span>
                    <div className=" flex w-full mt-8 gap-4 flex-col ">
                      <>
                        {education.map((educate, index) => (
                          <div
                            key={index}
                            className="w-full rounded-[30px] border-[#e0d7b9] border bg-[#fdfbf1] flex p-10 mb-6 gap-6 items-center">
                            <div className=" grid grid-cols-2 md:grid-cols-3 gap-4  w-11/12">
                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  Name of Institution
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.institution_name}
                                </p>
                              </div>

                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  Type of Institution
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.type_of_institution}
                                </p>
                              </div>

                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  Country of Residence
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.country_of_residence}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  Province
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.province}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  City
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.city}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  Completed
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.completed}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  Attended From
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.attended_from}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  Attended To
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.attended_to}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  First Language
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.first_language}
                                </p>
                              </div>
                              <div></div>
                            </div>
                            <div className="flex flex-col">
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={educate.transcript_url}
                                className="   text-white  text-sm font-bold  flex flex-row gap-4  h-fit p-2 py-4 w-fit px-6 rounded-full bg-[#bc9c22] items-center justify-center"
                                download>
                                <Download strokeWidth={2} size={20} />{" "}
                                <span className="text-center max-w-fit">
                                  {" "}
                                  Transcript
                                </span>
                              </a>
                            </div>
                          </div>
                        ))}
                      </>
                    </div>
                  </div>
                </>
              ) : null}
              {/* Experience  */}
              {experience && experience.length > 0 ? (
                <>
                  <div className="border-t mt-4 pt-8">
                    <span className="text-2xl font-medium  seasons text-gray-400">
                      Professional Work Experience
                    </span>
                    <div className=" flex w-full mt-8 gap-4 flex-col ">
                      <>
                        {experience.map((educate, index) => (
                          <div
                            key={index}
                            className="w-full rounded-[30px] border-[#e0d7b9] border bg-[#fdfbf1] flex p-10 mb-6 gap-6 items-center">
                            <div className=" grid grid-cols-2 md:grid-cols-3 gap-4  w-11/12">
                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  Name of Organization
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.organization_name}
                                </p>
                              </div>

                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  Type of Experience
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.type_of_experience}
                                </p>
                              </div>

                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  Current Professional Title
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.title}
                                </p>
                              </div>

                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  Start Date
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.start_date}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  End Date
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.end_date}
                                </p>
                              </div>

                              <div></div>

                              <div className="flex flex-col">
                                <p className="text-sm font-light text-gray-400">
                                  Nature of Work
                                </p>
                                <p className="mb-2 text-2xl poppins-bold">
                                  {educate.nature_of_work}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    </div>
                  </div>
                </>
              ) : null}
              {/* Statement of Purpose  */}
              <div className="border-t mt-4 pt-8">
                <span className="text-2xl font-medium  seasons text-gray-400">
                  Statement of Purpose
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Personal Statement
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.statement_of_purpose}
                    </span>
                  </div>
                </div>
              </div>
              {/* Resuem & Video Testimonial */}
              <div className="border-t mt-4 pt-8">
                <span className="text-2xl font-medium  seasons text-gray-400">
                  Resume & Video Testimonial
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Download Resume Testimonial
                    </span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={application.resume_url}
                      className=" cursor-pointer  text-white  text-sm font-bold  flex flex-row gap-4  h-fit p-2 py-4 w-full px-6 rounded-full bg-[#bc9c22] items-center justify-center"
                      download>
                      <Download strokeWidth={2} size={20} />{" "}
                      <span className="text-center max-w-fit">
                        {" "}
                        Resume Testimonial
                      </span>
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Download Video Testimonial
                    </span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={application.video_url}
                      className=" cursor-pointer  text-white  text-sm font-bold  flex flex-row gap-4  h-fit p-2 py-4 w-full px-6 rounded-full bg-[#bc9c22] items-center justify-center"
                      download>
                      <Download strokeWidth={2} size={20} />{" "}
                      <span className="text-center max-w-fit">
                        {" "}
                        Video Testimonial
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              {/* Academic Reference */}
              <div className="border-t mt-4 pt-8">
                <span className="text-2xl font-medium  seasons text-gray-400">
                  Academic Refernce
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Full Name
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.ar_name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Phone Number
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.ar_phone}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Email Address
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.ar_email}
                    </span>
                  </div>
                </div>
              </div>
              {/* Professional Refernece  */}
              <div className="border-t mt-4 pt-8">
                <span className="text-2xl font-medium  seasons text-gray-400">
                  Professional Refernce
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Full Name
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.prr_name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Phone Number
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.prr_phone}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Email Address
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.prr_email}
                    </span>
                  </div>
                </div>
              </div>
              {/* Personal Refernce  */}
              <div className="border-t mt-4 pt-8">
                <span className="text-2xl font-medium  seasons text-gray-400">
                 Personal Refernce
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Full Name
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.per_name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Phone Number
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.per_phone}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Email Address
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.per_email}
                    </span>
                  </div>
                </div>
              </div>
              {/* Application Confirmation  */}
              <div className="border-t mt-4 pt-8">
                <span className="text-2xl font-medium  seasons text-gray-400">
                 Applciation Confirmation
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Applicant Name
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.first_name}{" "}{application.last_name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Program
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.course_name}
                    </span>
                  </div>
                  
                </div>
                <div className=" flex gap-4 mt-4 items-center">
               
            <input
              type="checkbox"
              disabled
              checked
              className="w-6 h-6 mb-3"
            />

              <span className="mb-2 text-gray-500 text-2xl poppins-regular">Confirm</span>

          
                </div>
                <div className="mt-4">
                  <span className="text-gray-400">
                  I certify that the information I have submitted on this application is accurate to the best of my knowledge. I authorize Becoming Institute’s Admissions Committee to access the information, contact my reference if required and evaluate my admissibility to the 12-month Trauma Recovery program.
                  </span>
                </div>
                <div className="flex mt-8 flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Enrollemnt Status
                    </span>
                    <span className="mb-2 text-2xl poppins-bold">
                      {application.status}
                    </span>
                  </div>
                  <div className="mt-4">
                  <span className="text-gray-400">
                  Note: you can only submit one application per term. If you require changes to your information after your application has been submitted, notify info@becomingmethod.com. If you find any errors above, please go back to make the changes necessary.
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default CandidateDashboard;
