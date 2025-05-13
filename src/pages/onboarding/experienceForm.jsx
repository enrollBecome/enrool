import React, { useEffect, useState } from "react";
import { z } from "zod";
import ExperienceType from "@/data/experienceType";
import { Controller, useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { Download, Plus, Trash2 } from "lucide-react";
import {
  addNewExperience,
  deleteExperience,
  getExperienceByApplicationId,
} from "@/api/apiExperience";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import OnboardingTopbar from "@/layout/onboardingTopBar";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import { useUser } from "@clerk/clerk-react";

const schema = z.object({
  start_date: z.string().date(),
  end_date: z.string().date(),
  type_of_experience: z.enum(ExperienceType, {
    errorMap: () => ({ message: "Experience Type must not be empty" }),
  }),

  organization_name: z
    .string()
    .min(3, { message: "Organization Name is required" }),
  title: z
    .string()
    .min(3, { message: "Current Professional Title is required" }),
  nature_of_work: z.string().min(3, { message: "Role Description is required" }),
});
const ExperienceForm = () => {
  const { applicationid } = useParams();
  const [loading, setLoading] = useState(true);
  const {user} = useUser();
  const [application, setApplication] = useState([]);
  const [experience, setExperience] = useState([]);
  const [formOpen,setFormOpen]=useState(true);
  let appliedStatus = user.unsafeMetadata.applied;
  const navigate = useNavigate();
  let applicationStatus = application.status;
  useEffect(() => {
    if (applicationStatus === "Approved") {
      navigate("/candidate-dashboard");
    }else if(appliedStatus === "Paid"){
      navigate("/candidate-dashboard");
    }
  }, [applicationStatus]);
  useEffect(()=>{
    if(experience.length>0){
      setFormOpen(false);
    }
    },[experience])
  useEffect(() => {
    getExperienceByApplicationId(applicationid)
      .then((data) => setExperience(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);
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
    loading: loadingCreateExperience,
    error: errorCreateExperience,
    data: dataCreateExperience,
    fn: fnCreateExperience,
  } = useFetch(addNewExperience);

  const onSubmit = (data) => {
    fnCreateExperience({
      ...data,

      application_id: applicationid,
    });
  };


  useEffect(() => {
    if (dataCreateExperience?.length > 0){

        const existingMetadata = user.unsafeMetadata || {};
        if(appliedStatus<4){
          appliedStatus=4;
        }
        user
          .update({
            unsafeMetadata: {
              ...existingMetadata,
              applied: appliedStatus,
              stage4:"completed"
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
    
      
  }, [loadingCreateExperience]);
 

  const handleDelete = (experienceId) => {
    deleteExperience(experienceId)
      .then((response) => {
        window.location.reload();
        console.log(response);
      })
      .catch((err) => {
        console.error("Error deleting Experience", err);
      });
  };
 const handleNext=()=>{
    navigate(`/personal-statement-form/${applicationid}`);
  }


  const handleFormOpen = () =>{
    setFormOpen(true)
  }
  return (
    <>
      <OnboardingTopbar />
      <div className="w-full  lg:rounded-[60px] lg:p-[60px] sm:p-[20px] sm:mt-0 md:mt-[20px] flex-col bg-white h-fit ">
        <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
          Work and Professional Experience
        </div>
        <p className=" font-thin mb-4">
        Provide a summary of your relevant professional roles, including titles, organizations, and responsibilities.
        </p>

        {experience && experience.length > 0 ? (
          <>
            <div className=" flex w-full gap-4 flex-col ">
              <>
                {experience.map((educate, index) => (
                  <div
                    key={index}
                    className="w-full rounded-[30px] bg-[#f2f7fc] flex p-10 mb-10 gap-10 items-center">
                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4  w-11/12">
                      <div className="flex flex-col">
                        <p className="text-sm font-light text-gray-400">
                          Name of Organization
                        </p>
                        <p className="text-xl">{educate.organization_name}</p>
                      </div>

                      <div className="flex flex-col">
                        <p className="text-sm font-light text-gray-400">
                          Experience Type
                        </p>
                        <p className="text-xl">{educate.type_of_experience}</p>
                      </div>

                      <div className="flex flex-col">
                        <p className="text-sm font-light text-gray-400">
Position / Title
                        </p>
                        <p className="text-xl">{educate.title}</p>
                      </div>

                      <div className="flex flex-col">
                        <p className="text-sm font-light text-gray-400">
                          Start Date
                        </p>
                        <p className="text-xl">{educate.start_date}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-light text-gray-400">
                          End Date
                        </p>
                        <p className="text-xl">{educate.end_date}</p>
                      </div>

                      <div></div>

                      <div className="flex flex-col">
                        <p className="text-sm font-light text-gray-400">
Role Description
                        </p>
                        <p className="text-xl">{educate.nature_of_work}</p>
                      </div>
                    </div>

                    {experience.length <= 1 ? null : (
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
         {formOpen? (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="border-t py-8">
            {/* Experience */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Experience Type
                </span>
                <Controller
                  name="type_of_experience"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
                          errors.type_of_experience
                            ? "border-red-400 border-2"
                            : ""
                        }`}>
                        <option value="" disabled className="text-neutral-400">
                          Select Experience Type
                        </option>
                        {ExperienceType.map((edu, index) => (
                          <option
                            key={index}
                            value={edu}
                            className="text-zinc-950">
                            {edu}
                          </option>
                        ))}
                      </select>
                      {errors.type_of_experience && (
                        <p className="text-red-400 text-sm px-4 py-2">
                          {errors.type_of_experience.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Organization Name
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Organization Name"
                  required
                  {...register("organization_name")}
                />
                {errors.organization_name && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.organization_name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
Position / Title
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Current Professional Title"
                  required
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Start Date
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="date"

                  required
                  {...register("start_date")}
                />
                {errors.start_date && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.start_date.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  End Date
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="date"

                  required
                  {...register("end_date")}
                />
                {errors.end_date && (
                  <p className="text-red-400 text-sm px-4 py-2">
                    {errors.end_date.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <span className="mb-2 text-[13px] poppins-regular">
Role Description
              </span>

              <textarea
                className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 w-full h-40 rounded-[30px] p-4 text-base resize-none"
                placeholder="Describe your key responsibilities, areas of focus, and any achievements in this role (minimum 500 characters)."
                required
                {...register("nature_of_work")}></textarea>

              {errors.nature_of_work && (
                <p className="text-red-400 text-sm px-4 py-2">
                  {errors.nature_of_work.message}
                </p>
              )}
            </div>
          </div>
          {errorCreateExperience?.message && (
            <p className="text-red-500">{errorCreateExperience.message}</p>
          )}
          <div className="flex gap-6" >
          <Button
            type="submit"
            className="rounded-full px-10 py-6  bg-[#bc9c22] flex justify-center items-center">
            {loadingCreateExperience ? (
              <ClipLoader color="white" size={24} />
            ) : (
              "Save & Continue"
            )}
          </Button>
          {experience && experience.length > 0?(<>
            <Button className="rounded-full px-10 py-6  bg-[#bc9c22] flex justify-center items-center" onClick={handleNext}>Add</Button>
          </>):null}
          </div>
        </form>):(<>
        
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

export default ExperienceForm;
