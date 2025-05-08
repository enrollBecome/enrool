import React, { useEffect, useState } from "react";
import { z } from "zod";
import TermOptions from "@/data/termOptions";
import CourseOptions from "@/data/courseOptions";
import { Controller, useForm } from "react-hook-form";
import OnboardingTopbar from "@/layout/onboardingTopBar";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import useFetch from "@/hooks/use-fetch";
import countries from "@/data/countries";
import InstitutionType from "@/data/institutionType";
// import FirstLanguage from "@/data/firstLanguage";
import YesNo from "@/data/yesNo";
import {
  addNewEducation,
  deleteEducation,
  getEducationByApplicationId,
} from "@/api/apiEducation";
import { Download, Info, Plus, Trash2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import ProgramCompleted from "@/data/programCompleted";
const schema = z.object({
  attended_from: z.string().date(),
  attended_to: z.string().date(),
  country_of_residence: z.enum(countries, {
    errorMap: () => ({ message: "Country of Residence must not be empty" }),
  }),
  type_of_institution: z.enum(InstitutionType, {
    errorMap: () => ({ message: "Institution Type must not be empty" }),
  }),
  institution_name: z
    .string()
    .min(3, { message: "Institution Name is required" }),
  province: z.string().min(3, { message: "Province is required" }),
  city: z.string().min(3, { message: "City is required" }),
  // first_language: z.enum(FirstLanguage, {
  //   errorMap: () => ({ message: "First Language must not be empty" }),
  // }),
  completed: z.enum(ProgramCompleted, {
    errorMap: () => ({ message: "Completed must not be empty" }),
  }),

  transcript: z
    .any()
    .refine((file) => file && file[0] && file[0].type === "application/pdf", {
      message: "Only PDF files are allowed",
    })
    .refine((file) => file && file[0] && file[0].size <= 5_242_880, {
      message: "File size must be 5 MB or less",
    }),
});
const EducationForm = () => {
  const { applicationid } = useParams();
  const [loading, setLoading] = useState(true);
const {user} = useUser();
  const [application, setApplication] = useState([]);
  const [education, setEducation] = useState([]);
  const [formOpen,setFormOpen]=useState(true);
  let appliedStatus = user.unsafeMetadata.applied;
  let applicationStatus = application.status;
  const navigate = useNavigate();
  useEffect(() => {
    if (applicationStatus === "Approved") {
      navigate("/candidate-dashboard");
    }else if(applicationStatus === "Paid"){
      navigate("/candidate-dashboard");
    }
  }, [applicationStatus]);
  useEffect(() => {
    getEducationByApplicationId(applicationid)
      .then((data) => setEducation(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);

useEffect(()=>{
if(education.length>0){
  setFormOpen(false);
}
},[education])
  
  const {
    register,
    handleSubmit,
    control,
    setValue, // For setting fetched data
    reset, // To reset form fields
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onError = (errors) => {
    console.log("Form errors:", errors);
  };

  const {
    loading: loadingCreateEductaion,
    error: errorCreateEductaion,
    data: dataCreateEductaion,
    fn: fnCreateEductaion,
  } = useFetch(addNewEducation);

  


  const onSubmit = (data) => {
    fnCreateEductaion({
      ...data,

      application_id: applicationid,
    });
  };
  useEffect(() => {
    if (dataCreateEductaion?.length > 0){

        const existingMetadata = user.unsafeMetadata || {};
        if(appliedStatus<3){
          appliedStatus=3;
        }
        user
          .update({
            unsafeMetadata: {
              ...existingMetadata,
              applied: appliedStatus,
              stage3:"completed"
            },
          })
          .then(() => {
            window.location.reload();
            
          })
          .catch((err) => {
            console.error("Error updating unsafeMetadata:", err);
          });
  
        // Update Clerk unsafeMetadata with new candidate ID
      }
    
      
  }, [loadingCreateEductaion]);

const handleDelete = (educationId)=>{

    
    deleteEducation(educationId)
    .then((response) => {
      window.location.reload();
      console.log(response);
    })
    .catch((err) => {
      console.error("Error deleting Education", err);
    });
  }

  const handleNext=()=>{
    navigate(`/experience-form/${applicationid}`);
  }


  const handleFormOpen = () =>{
    setFormOpen(true)
  }
  return (
    <>
      <OnboardingTopbar />
      <div className="w-full  lg:rounded-[60px] lg:p-[60px] sm:p-[20px] sm:mt-0 md:mt-[20px] flex-col bg-white h-fit ">
        <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
          Academic History
        </div>
        <p className=" font-thin mb-4">
          Detail your educational history, including institutions, programs and credentials earned.
        </p>


        {education && education.length > 0 ? (
              <>
                <div className=" flex w-full gap-4 flex-col ">
                  
                    <>
                      {education.map((educate, index) => (
                        <div
                          key={index}
                          className="w-full rounded-[30px] bg-[#f2f7fc] flex p-10 mb-10 gap-10 items-center">
                          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4  w-11/12">
                            <div className="flex flex-col">
                              <p className="text-sm font-light text-gray-400">
                                Name of Institution
                              </p>
                              <p className="text-xl">
                                {educate.institution_name}
                              </p>
                            </div>

                            <div className="flex flex-col">
                              <p className="text-sm font-light text-gray-400">
                                Type of Institution
                              </p>
                              <p className="text-xl">
                                {educate.type_of_institution}
                              </p>
                            </div>

                            <div className="flex flex-col">
                              <p className="text-sm font-light text-gray-400">
                                Country of Institute
                              </p>
                              <p className="text-xl">
                                {educate.country_of_residence}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm font-light text-gray-400">
                                Province
                              </p>
                              <p className="text-xl">{educate.province}</p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm font-light text-gray-400">
                                City
                              </p>
                              <p className="text-xl">{educate.city}</p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm font-light text-gray-400">
                                Completed
                              </p>
                              <p className="text-xl">{educate.completed}</p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm font-light text-gray-400">
                                Attended From
                              </p>
                              <p className="text-xl">
                                {educate.attended_from}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm font-light text-gray-400">
                                Attended To
                              </p>
                              <p className="text-xl">{educate.attended_to}</p>
                            </div>
                            {/* <div className="flex flex-col">
                              <p className="text-sm font-light text-gray-400">
                                First Language
                              </p>
                              <p className="text-xl">
                                {educate.first_language}
                              </p>
                            </div> */}
                            <div></div>
                            <div className="flex flex-col">
                              
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={educate.transcript_url}
                                className="   text-black font-semibold text-lg  flex gap-4  h-fit p-2 w-fit px-6 rounded-full bg-slate-200 items-center"
                                download>
                                
                                <Download strokeWidth={2} size={20} /> Download Transcript
                              </a>
                            </div>
                          </div>

                          {education.length <= 1 ? null : (
                            <div
                              className="w-1/12 bg-white rounded-full p-4 max-w-fit cursor-pointer"
                              onClick={() => handleDelete(educate.id)}>
                              <Trash2 color="#FF0000" />
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                 
                </div>
              </>
            ) : null}

            {formOpen? (<><form onSubmit={handleSubmit(onSubmit, onError)}>
          
          <div className="border-t py-8">
            {/* Education */}
           

            <span className="text-2xl font-medium">Institution Details</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Institution Name
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Institution Name"
                  required
                  {...register("institution_name")}
                />
                {errors.institution_name && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.institution_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <div className=" flex gap-4">
                <span className="mb-2 text-[13px] poppins-regular">
                  Type of Institution 
                </span>
                <span className="italic text-xs font-light flex gap-2" ><Info  size={17}/> Select the type that best describes this institution.</span>
                </div>
                <Controller
                  name="type_of_institution"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
                          errors.type_of_institution
                            ? "border-red-400 border-2"
                            : ""
                        }`}>
                        <option value="" disabled className="text-neutral-400">
                          Select Type of Institution
                        </option>
                        {InstitutionType.map((edu, index) => (
                          <option
                            key={index}
                            value={edu}
                            className="text-zinc-950">
                            {edu}
                          </option>
                        ))}
                      </select>
                      {errors.type_of_institution && (
                        <p className="text-red-400 text-sm px-4 py-2">
                          {errors.type_of_institution.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Country of Institute
                </span>
                <Controller
                  name="country_of_residence"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
                          errors.country_of_residence
                            ? "border-red-400 border-2"
                            : ""
                        }`}>
                        <option value="" disabled className="text-neutral-400">
                          Select Country of Institute
                        </option>
                        {countries.map((edu, index) => (
                          <option
                            key={index}
                            value={edu}
                            className="text-zinc-950">
                            {edu}
                          </option>
                        ))}
                      </select>
                      {errors.country_of_residence && (
                        <p className="text-red-400 text-sm px-4 py-2">
                          {errors.country_of_residence.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Province / State
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Province"
                  required
                  {...register("province")}
                />
                {errors.province && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.province.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">City</span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add City"
                  required
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                Program Completed
                </span>
                <Controller
                  name="completed"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
                          errors.completed ? "border-red-400 border-2" : ""
                        }`}>
                        <option value="" disabled className="text-neutral-400">
                          Select program completed
                        </option>
                        {ProgramCompleted.map((edu, index) => (
                          <option
                            key={index}
                            value={edu}
                            className="text-zinc-950">
                            {edu}
                          </option>
                        ))}
                      </select>
                      {errors.completed && (
                        <p className="text-red-400 text-sm px-4 py-2">
                          {errors.completed.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Attended From
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="date"

                  required
                  {...register("attended_from")}
                />
                {errors.attended_from && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.attended_from.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Attended To
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="date"

                  required
                  {...register("attended_to")}
                />
                {errors.attended_to && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.attended_to.message}
                  </p>
                )}
              </div>
              {/* <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  First Language
                </span>
                <Controller
                  name="first_language"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
                          errors.first_language ? "border-red-400 border-2" : ""
                        }`}>
                        <option value="" disabled className="text-neutral-400">
                          Select Level of Education
                        </option>
                        {FirstLanguage.map((edu, index) => (
                          <option
                            key={index}
                            value={edu}
                            className="text-zinc-950">
                            {edu}
                          </option>
                        ))}
                      </select>
                      {errors.first_language && (
                        <p className="text-red-400 text-sm px-4 py-2">
                          {errors.first_language.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div> */}
              <div className="flex flex-col ">
                <span className="mb-2 text-[13px] poppins-regular">
                  Upload Your Transcript
                </span>
                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 flex justify-center rounded-full p-4 text-base"
                  type="file"
                  accept=".pdf"
                  {...register("transcript")}
                  required
                />
                {errors.transcript && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.transcript.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {errorCreateEductaion?.message && (
            <p className="text-red-500">{errorCreateEductaion.message}</p>
          )}
          <div className="flex gap-6" >
          <Button
            type="submit"
            className="rounded-full px-10 py-6  bg-[#bc9c22] flex justify-center items-center">
            {loadingCreateEductaion ? (
              <ClipLoader color="white" size={24} />
            ) : (
              "Save & Continue"
            )}
          </Button>
          {education && education.length > 0?(<>
            <Button className="rounded-full px-10 py-6  bg-[#bc9c22] flex justify-center items-center" onClick={handleNext}>Add</Button>
          </>):null}
          
          </div>
        </form></>):(<>
        
          <div className="flex gap-6" >
          <Button
            
            className="rounded-full px-8 py-4  bg-[#bc9c22] h-12 flex justify-center items-center" onClick={handleFormOpen}>
             <Plus strokeWidth={2} size={40} color="white" /> Add
          </Button>
          
            <Button className="rounded-full px-10 py-6  bg-[#bc9c22] flex justify-center items-center" onClick={handleNext}>Save & Continue</Button>
         
          
          </div>
        
        
        </>)}
        
      </div>
    </>
  );
};

export default EducationForm;
