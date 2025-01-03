import {
  getApplicationByIdArmail,
  getApplicationByIdPermail,
  getApplicationByIdPrrmail,
} from "@/api/apiApplication";
import { getEducationByApplicationId } from "@/api/apiEducation";
import { getExperienceByApplicationId } from "@/api/apiExperience";
import { addNewReference } from "@/api/apiReference";
import { Button } from "@/components/ui/button";
import RefrenceStatus from "@/data/referenceStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
const arFormSchema = z.object({
  applicant_name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  application_id: z.string().min(1, "Application id is required"),
  category: z.string().optional(),
  status: z.enum(RefrenceStatus, {
    errorMap: () => ({ message: "Status must not be empty" }),
  }),
});
const ViewArApplication = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { formData } = location.state || { formData: {} };

  const [loading, setLoading] = useState(true);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [application, setApplication] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    setValue, // For setting fetched data
    reset, // To reset form fields
    formState: { errors },
  } = useForm({
    resolver: zodResolver(arFormSchema),
    defaultValues: {
      applicant_name: formData?.applicant_name || "",
      email: formData?.aremail || "",
      application_id: formData?.application_id || "",
      category: "Academic Reference",
    },
  });

  const onError = (errors) => {
    console.log("Form errors:", errors);
  };

  const onSubmit = async (data) => {
    console.log("Submitting data:", data);

    try {
      console.log("Final payload:", data);

      const result = await addNewReference(data);
      console.log("Reference added successfully:", result);
      navigate("/thanks-refree");
      reset();
    } catch (error) {
      console.error("Error adding reference:", error.message);
    }
  };

  //   Academic Refrence
  useEffect(() => {
    if (formData.aremail) {
      const applicationid = formData.application_id;

      getApplicationByIdArmail(applicationid, formData.aremail)
        .then((data) => setApplication(data))
        .catch(() => setError("Failed to fetch applications."))
        .finally(() => setLoading(false));
    }
  }, [formData.aremail]);

  //   Fetch Education
  useEffect(() => {
    if (application.id) {
      getEducationByApplicationId(application.id)
        .then((data) => setEducation(data))
        .catch(() => setError("Failed to fetch education."))
        .finally(() => setLoading(false));
    }
  }, [application.id]);

  //   Fetch Experience
  useEffect(() => {
    if (application.id) {
      getExperienceByApplicationId(application.id)
        .then((data) => setExperience(data))
        .catch(() => setError("Failed to fetch experience."))
        .finally(() => setLoading(false));
    }
  }, [application.id]);

  return (
    <>
      {application && application.ar_email === String(formData?.aremail) ? (
        <>
          <div className="flex justify-center">
            <div className="w-[90%]">
              <div className="bg-[#bc9c22] text-white mt-4 py-10 rounded-[30px]">
                <div className="container mx-auto text-center">
                  <h1 className="text-4xl font-bold">
                    {application.first_name} {application.last_name}
                  </h1>
                  <h2 className="text-2xl mt-2 seasons">{application.email}</h2>
                </div>
              </div>
              <div className="w-full min-h-full h-fit flex flex-col">
                {/* Personal Information  */}
                <div className="border-t mt-4 pt-8">
                  <span className="text-2xl font-medium  seasons text-gray-400">
                    Personal Information
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        First Name
                      </span>
                      <span className="mb-2 text-2xl ">
                        {application.first_name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Last Name
                      </span>
                      <span className="mb-2 text-2xl ">
                        {application.last_name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Middle Name
                      </span>
                      <span className="mb-2 text-2xl ">
                        {application.middle_name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Former name
                      </span>
                      <span className="mb-2 text-2xl ">
                        {application.former_name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Gender
                      </span>
                      <span className="mb-2 text-2xl ">
                        {application.gender}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Date of Birth
                      </span>
                      <span className="mb-2 text-2xl ">{application.dob}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Phone Number
                      </span>
                      <span className="mb-2 text-2xl ">
                        {application.phone}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Country of Residence
                      </span>
                      <span className="mb-2 text-2xl ">
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
                      <span className="mb-2 text-2xl ">
                        {application.highest_level_education}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        First Language
                      </span>
                      <span className="mb-2 text-2xl ">
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
                      <span className="mb-2 text-2xl ">
                        {application.immigration_status}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Ancestry
                      </span>
                      <span className="mb-2 text-2xl ">
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
                      <span className="mb-2 text-2xl ">
                        {application.course_name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Term
                      </span>
                      <span className="mb-2 text-2xl ">{application.term}</span>
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
                              className="w-full rounded-[30px] border-[#e0d7b9] border bg-[#fdfbf1] flex p-10 mb-6 gap-6 items-center"
                            >
                              <div className=" grid grid-cols-2 md:grid-cols-3 gap-4  w-11/12">
                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    Name of Institution
                                  </p>
                                  <p className="mb-2 text-2xl ">
                                    {educate.institution_name}
                                  </p>
                                </div>

                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    Type of Institution
                                  </p>
                                  <p className="mb-2 text-2xl ">
                                    {educate.type_of_institution}
                                  </p>
                                </div>

                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    Country of Residence
                                  </p>
                                  <p className="mb-2 text-2xl ">
                                    {educate.country_of_residence}
                                  </p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    Province
                                  </p>
                                  <p className="mb-2 text-2xl ">
                                    {educate.province}
                                  </p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    City
                                  </p>
                                  <p className="mb-2 text-2xl ">
                                    {educate.city}
                                  </p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    Completed
                                  </p>
                                  <p className="mb-2 text-2xl ">
                                    {educate.completed}
                                  </p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    Attended From
                                  </p>
                                  <p className="mb-2 text-2xl ">
                                    {educate.attended_from}
                                  </p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    Attended To
                                  </p>
                                  <p className="mb-2 text-2xl ">
                                    {educate.attended_to}
                                  </p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    First Language
                                  </p>
                                  <p className="mb-2 text-2xl ">
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
                              className="w-full rounded-[30px] border-[#e0d7b9] border bg-[#fdfbf1] flex p-10 mb-6 gap-6 items-center"
                            >
                              <div className=" grid grid-cols-2 md:grid-cols-3 gap-4  w-11/12">
                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    Name of Organization
                                  </p>
                                  <p className="mb-2 text-2xl ">
                                    {educate.organization_name}
                                  </p>
                                </div>

                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    Type of Experience
                                  </p>
                                  <p className="mb-2 text-2xl ">
                                    {educate.type_of_experience}
                                  </p>
                                </div>

                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    Current Professional Title
                                  </p>
                                  <p className="mb-2 text-2xl ">
                                    {educate.title}
                                  </p>
                                </div>

                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    Start Date
                                  </p>
                                  <p className="mb-2 text-2xl ">
                                    {educate.start_date}
                                  </p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    End Date
                                  </p>
                                  <p className="mb-2 text-2xl ">
                                    {educate.end_date}
                                  </p>
                                </div>

                                <div></div>

                                <div className="flex flex-col">
                                  <p className="text-sm font-light text-gray-400">
                                    Nature of Work
                                  </p>
                                  <p className="mb-2 text-2xl ">
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
                      <span className="mb-2 text-2xl ">
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
                        download
                      >
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
                        download
                      >
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
                      <span className="mb-2 text-2xl ">
                        {application.ar_name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Phone Number
                      </span>
                      <span className="mb-2 text-2xl ">
                        {application.ar_phone}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Email Address
                      </span>
                      <span className="mb-2 text-2xl ">
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
                      <span className="mb-2 text-2xl ">
                        {application.prr_name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Phone Number
                      </span>
                      <span className="mb-2 text-2xl ">
                        {application.prr_phone}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Email Address
                      </span>
                      <span className="mb-2 text-2xl ">
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
                      <span className="mb-2 text-2xl ">
                        {application.per_name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Phone Number
                      </span>
                      <span className="mb-2 text-2xl ">
                        {application.per_phone}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Email Address
                      </span>
                      <span className="mb-2 text-2xl ">
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
                      <span className="mb-2 text-2xl ">
                        {application.first_name} {application.last_name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                        Program
                      </span>
                      <span className="mb-2 text-2xl ">
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

                    <span className="mb-2 text-gray-500 text-2xl poppins-regular">
                      Confirm
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-gray-400">
                      I certify that the information I have submitted on this
                      application is accurate to the best of my knowledge. I
                      authorize Becoming Institute’s Admissions Committee to
                      access the information, contact my reference if required
                      and evaluate my admissibility to the 12-month Trauma
                      Recovery program.
                    </span>
                  </div>
                  <div className="flex mt-8 flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Enrollemnt Status
                    </span>
                    <span className="mb-2 text-2xl ">{application.status}</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-gray-400">
                      Note: you can only submit one application per term. If you
                      require changes to your information after your application
                      has been submitted, notify info@becomingmethod.com. If you
                      find any errors above, please go back to make the changes
                      necessary.
                    </span>
                  </div>
                </div>
              
              
                <form className="pt-14 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        
       
       
        <div className="flex flex-col">
              <span className="mb-2 text-2xl pb-2 poppins-bold">
              Select Recommendation
              </span>

              <Controller

name="status"
control={control}
render={({ field }) => (
  <div className="relative">
    <select
      {...field}
      value={field.value || ""}
      onChange={(e) => field.onChange(e.target.value)}
      className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
        errors.status ? "border-red-400 border-2" : ""
      }`}>
      <option value="" disabled className="text-neutral-400">
       Select Recommendation
      </option>
      {RefrenceStatus.map((ref,index) => (
        <option key={index} value={ref} className="text-zinc-950">
          {ref}
        </option>
      ))}
    </select>
    {errors.status && (
  <p className="text-red-400 text-sm px-4 py-2">{errors.status.message}</p>
)}
  </div>
)}
/>
            </div>
            <Button
            type="submit"

            className="rounded-full px-10 py-6  bg-[#bc9c22] flex justify-center items-center">
            
              Submit
           
          </Button>
    </form>
              </div>

             
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ViewArApplication;
