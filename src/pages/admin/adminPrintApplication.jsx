import { getApplicationById } from "@/api/apiApplication";
import { getEducationByApplicationId } from "@/api/apiEducation";
import { getExperienceByApplicationId } from "@/api/apiExperience";
import { Button } from "@/components/ui/button";
import OnboardingTopbar from "@/layout/onboardingTopBar";
import { Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader, PropagateLoader } from "react-spinners";
import logo from "./../../assets/logo.png";
const AdminPrintApplication = () => {
  const { applicationid } = useParams();
  const [loading, setLoading] = useState(true);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [application, setApplication] = useState([]);
  useEffect(() => {
    getApplicationById(applicationid)
      .then((data) => setApplication(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);

  useEffect(() => {
    getEducationByApplicationId(applicationid)
      .then((data) => setEducation(data))
      .catch(() => setError("Failed to fetch education."))
      .finally(() => setLoading(false));
  }, [applicationid]);
  useEffect(() => {
    getExperienceByApplicationId(applicationid)
      .then((data) => setExperience(data))
      .catch(() => setError("Failed to fetch experience."))
      .finally(() => setLoading(false));
  }, [applicationid]);
  return (
    <>
      <div className="w-full flex justify-end px-8 py-6">
        <Button className="bg-[#bc9c22] text-xl rounded-full py-6 px-9" onClick={()=>{window.print();}} >
          Print
        </Button>{" "}
      </div>
      <div className="w-full lg:rounded-[60px] lg:p-[60px] sm:p-[20px] sm:mt-0 md:mt-[20px] flex-col bg-white min-h-fit h-full flex ">
        {loading || !application ? (
          <div className="w-full absolute left-0 top-0 z-50 bg-white h-full min-h-fit flex justify-center items-center">
            <PropagateLoader color="#bc9c22" />
          </div>
        ) : (
          <>
            <div id="printbox" className="w-full flex-col ">
              <div className=" flex justify-between mb-10 print-header" id="header">
                <img className="w-28" src={logo} />
                <div className=" flex flex-col items-end">
                  <span>80 Devon Rd #2, Brampton, ON L6T 5B3</span>
                  <span>admission@becominginstitute.ca</span>
                  <span>(647) 265-0804</span>
                </div>
              </div>
              <div className="w-full flex flex-col content">
                {/* Personal Information */}
                <div className="w-full flex flex-col gap-4">
                  <div className=" w-full pl-6 h-fit flex bg-[#bc9c22] mb-6">
                    <span className="py-4 px-8 w-full bg-[#685711] text-xl text-white font-semibold ">
                      Personal Information{" "}
                    </span>
                  </div>
                  {/* Field 1 */}
                  <div className="mt-6 flex items-center">
                    <label className="text-2xl font-semibold mr-4 min-w-36">
                      Name :
                    </label>
                    <div className="text-xl w-full bg-slate-100 p-4 rounded ">
                      {application.first_name} {application.middle_name}{" "}
                      {application.last_name}
                    </div>
                  </div>

                  {/* Field 2 */}
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Phone :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.phone}
                      </div>
                    </div>
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 w-fit">
                        Email:
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.email}
                      </div>
                    </div>
                  </div>

                  {/* Field 3 */}
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Gender :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.gender}
                      </div>
                    </div>
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Date of Birth :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.dob}
                      </div>
                    </div>
                  </div>

                  {/* Field 4 - Subfields in Same Row */}
                  <div className="mt-6 flex items-center">
                    <label className="text-2xl font-semibold mr-4 w-1/3 ">
                      Country of Residence :
                    </label>
                    <div className="text-xl w-full bg-slate-100 p-4 rounded ">
                      {application.country}
                    </div>
                  </div>
                </div>
                {/* Educational background */}
                <div className="mt-10 flex flex-col gap-4">
                  <div className="w-full flex flex-col gap-4">
                    <div className=" w-full pl-6 h-fit flex bg-[#bc9c22] mb-6">
                      <span className="py-4 px-8 w-full bg-[#685711] text-xl text-white font-semibold ">
                        Education & Language{" "}
                      </span>
                    </div>
                  </div>

                  <div className=" flex items-center gap-4">
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Level of Education :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.highest_level_education}
                      </div>
                    </div>
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        First language :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.first_language}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Immigration & Ancestry */}
                <div className="mt-10 flex flex-col gap-4">
                  <div className="w-full flex flex-col gap-4">
                    <div className=" w-full pl-6 h-fit flex bg-[#bc9c22] mb-6">
                      <span className="py-4 px-8 w-full bg-[#685711] text-xl text-white font-semibold ">
                        Immigration & Ancestry{" "}
                      </span>
                    </div>
                  </div>

                  <div className=" flex items-center gap-4">
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Immigration :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.immigration_status}
                      </div>
                    </div>
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Ancestry :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.ancestry}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Term Selection  */}
                <div className="mt-10 flex flex-col gap-4">
                  <div className="w-full flex flex-col gap-4">
                    <div className=" w-full pl-6 h-fit flex bg-[#bc9c22] mb-6">
                      <span className="py-4 px-8 w-full bg-[#685711] text-xl text-white font-semibold ">
                        Term Selection{" "}
                      </span>
                    </div>
                  </div>

                  <div className=" flex items-center gap-4">
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Course Name :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.course_name}
                      </div>
                    </div>
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Term :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.term}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Educational BAckground */}
                {education && education.length > 0 ? (
                  <>
                    {education.map((educate, index) => (
                      <div key={index} className="mt-10 flex flex-col gap-4">
                        <div className="w-full flex flex-col gap-4">
                          <div className=" w-full pl-6 h-fit flex bg-[#bc9c22] mb-6">
                            <span className="py-4 px-8 w-full bg-[#685711] text-xl text-white font-semibold ">
                              Educational Background{" "}
                            </span>
                          </div>
                        </div>
                        <div className=" flex items-center gap-4">
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              Name of Institution :
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {educate.institution_name}
                            </div>
                          </div>
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              Type of Institution :
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {educate.type_of_institution}
                            </div>
                          </div>
                        </div>
                        <div className=" flex items-center gap-4">
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              Country of Residence :
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {educate.country_of_residence}
                            </div>
                          </div>
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              Province :
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {educate.province}
                            </div>
                          </div>
                        </div>
                        <div className=" flex items-center gap-4">
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              City :
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {educate.city}
                            </div>
                          </div>
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              Completed :
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {educate.completed}
                            </div>
                          </div>
                        </div>
                        <div className=" flex items-center gap-4">
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              Attended From :
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {educate.attended_from}
                            </div>
                          </div>
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              Attended To:
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {educate.attended_to}
                            </div>
                          </div>
                        </div>
                        <div className=" flex items-center gap-4">
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              Language :
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {educate.first_language}
                            </div>
                          </div>
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              Transcript :
                            </label>
                            <div className="flex flex-col">
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={educate.transcript_url}
                                className="   text-white  text-sm font-bold  flex flex-row gap-4  h-fit p-2 py-4 w-fit px-6 rounded-full bg-[#bc9c22] items-center justify-center"
                                download
                              >
                                <Download strokeWidth={2} size={20} />{" "}
                                <span className="text-center max-w-fit">
                                  {" "}
                                  Transcript
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : null}
                {/* Experience Background */}
                {experience && experience.length > 0 ? (
                  <>
                    {experience.map((expedia, index) => (
                      <div key={index} className="mt-10 flex flex-col gap-4">
                        <div className="w-full flex flex-col gap-4">
                          <div className=" w-full pl-6 h-fit flex bg-[#bc9c22] mb-6">
                            <span className="py-4 px-8 w-full bg-[#685711] text-xl text-white font-semibold ">
                              Professional Work Experience{" "}
                            </span>
                          </div>
                        </div>
                        <div className=" flex items-center gap-4">
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              Name of Organization :
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {expedia.organization_name}
                            </div>
                          </div>
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              Type of Experience :
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {expedia.type_of_experience}
                            </div>
                          </div>
                        </div>
                        <div className=" flex items-center gap-4">
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              Start Date :
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {expedia.start_date}
                            </div>
                          </div>
                          <div className="flex items-center w-1/2">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              End Date :
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {expedia.end_date}
                            </div>
                          </div>
                        </div>
                        <div className=" flex items-center gap-4">
                          <div className="flex items-center w-full">
                            <label className="text-2xl font-semibold mr-4 min-w-36">
                              Current Professional Title :
                            </label>
                            <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                              {expedia.title}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center w-full">
                          <label className="text-2xl font-semibold mr-4 min-w-36">
                            Nature of Work :
                          </label>
                          <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                            {expedia.nature_of_work}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : null}
                {/* Statement of Purpose */}
                <div className="w-full flex flex-col gap-4 mt-10">
                  <div className=" w-full pl-6 h-fit flex bg-[#bc9c22] mb-6">
                    <span className="py-4 px-8 w-full bg-[#685711] text-xl text-white font-semibold ">
                      Statement of Purpose{" "}
                    </span>
                  </div>
                  {/* Field 1 */}
                  <div className=" flex items-center">
                    <label className="text-2xl font-semibold mr-4 min-w-36">
                      Personal Statement :
                    </label>
                    <div className="text-xl w-full bg-slate-100 p-4 rounded ">
                         <span className="mb-2 text-2xl "    dangerouslySetInnerHTML={{
                         __html: DOMPurify.sanitize(application.statement_of_purpose),
                       }}></span>
                    </div>
                  </div>

                 
                </div>
                {/* Resume & Video Testimonial */}
                <div className="w-full flex flex-col gap-4 mt-10">
                  <div className=" w-full pl-6 h-fit flex bg-[#bc9c22] mb-6">
                    <span className="py-4 px-8 w-full bg-[#685711] text-xl text-white font-semibold ">
                      Resume & Video Testimonial
                    </span>
                  </div>
                  <div className="w-full flex gap-4">
                  {/* Field 1 */}
                  <div className=" flex items-center w-1/2">
                    <label className="text-2xl font-semibold mr-4 ">
                      Resume:
                    </label>
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
                  {/* Field 2 */}
                  <div className=" flex items-center w-1/2">
                    <label className="text-2xl font-semibold mr-4 ">
                      Video:
                    </label>
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
{/* cademic Reference */}

<div className="w-full flex flex-col gap-4 mt-10">
                  <div className=" w-full pl-6 h-fit flex bg-[#bc9c22] mb-6">
                    <span className="py-4 px-8 w-full bg-[#685711] text-xl text-white font-semibold ">
                     Academic Reference
                    </span>
                  </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Name :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.ar_name}
                      </div>
                    </div>
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Phone :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.ar_phone}
                      </div>
                    </div>
                  </div>
                  <div className=" flex items-center w-full">
                    <label className="text-2xl font-semibold mr-4 min-w-36">
                     Email :
                    </label>
                    <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.ar_email}
                      </div>
                  </div>
                  </div>
                  {/* Professional Reference */}
                  <div className="w-full flex flex-col gap-4 mt-10">
                  <div className=" w-full pl-6 h-fit flex bg-[#bc9c22] mb-6">
                    <span className="py-4 px-8 w-full bg-[#685711] text-xl text-white font-semibold ">
                     Professional Reference
                    </span>
                  </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Name :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.prr_name}
                      </div>
                    </div>
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Phone :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.prr_phone}
                      </div>
                    </div>
                  </div>
                  <div className=" flex items-center w-full">
                    <label className="text-2xl font-semibold mr-4 min-w-36">
                     Email :
                    </label>
                    <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.prr_email}
                      </div>
                  </div>
                  </div>
                  {/* Personal Reference */}
                  <div className="w-full flex flex-col gap-4 mt-10">
                  <div className=" w-full pl-6 h-fit flex bg-[#bc9c22] mb-6">
                    <span className="py-4 px-8 w-full bg-[#685711] text-xl text-white font-semibold ">
                     Perosnal Reference
                    </span>
                  </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Name :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.per_name}
                      </div>
                    </div>
                    <div className="flex items-center w-1/2">
                      <label className="text-2xl font-semibold mr-4 min-w-36">
                        Phone :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.per_phone}
                      </div>
                    </div>
                  </div>
                  <div className=" flex items-center w-full">
                    <label className="text-2xl font-semibold mr-4 min-w-36">
                     Email :
                    </label>
                    <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.per_email}
                      </div>
                  </div>
                  </div>

                   {/* Application confirmation */}
                   <div className="w-full flex flex-col gap-4 mt-10">
                  <div className=" w-full pl-6 h-fit flex bg-[#bc9c22] mb-6">
                    <span className="py-4 px-8 w-full bg-[#685711] text-xl text-white font-semibold ">
                     Application Cofirmation
                    </span>
                  </div>


                    <div className="flex items-center w-full">
                      <label className="text-2xl font-semibold mr-4 w-48">
                        Applicant Name :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.per_name}
                      </div>
                    </div>
                    <div className="flex items-center w-full">
                      <label className="text-2xl font-semibold mr-4 w-48">
                        Program :
                      </label>
                      <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
                        {application.course_name}
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
                  
                     <div className="mt-4">
                     <span className="text-gray-400">
                     Note: you can only submit one application per term. If you require changes to your information after your application has been submitted, notify info@becomingmethod.com. If you find any errors above, please go back to make the changes necessary.
                     </span>
                   </div>
                  
                  </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminPrintApplication;
