import OnboardingTopbar from "@/layout/onboardingTopBar";
import React, { useEffect, useState } from "react";
import countries from "@/data/countries";
import EducationLevel from "@/data/educationLevel";
import FirstLanguage from "@/data/firstLanguage";
import { Controller, useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";
import { z } from "zod";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewApplication } from "@/api/apiApplication";
import ImmigrationStatus from "@/data/immigrationStatus";
import ancestryOptions from "@/data/ancestryOptions";

import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { ClipLoader } from "react-spinners";
import GenderOptions from "@/data/genderOptions";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const ancestryNames = ancestryOptions.map(option => option.name);
const schema = z.object({
  first_name: z.string().min(3, { message: "First Name is required" }),
  last_name: z.string().min(3, { message: "Last name is required" }),
  phone: z.string().regex(
    /^[+]?[0-9]{7,15}$/, // Validates phone numbers with optional "+" and 7-15 digits
    "Invalid phone number. Must contain digits and start with '+'"
  ),
  
  dob: z.string().date(),
  middle_name:z.string().optional(),
  former_name:z.string().optional(),
  country: z.enum(countries, { errorMap: () => ({ message: "Country of Residence must not be empty" }) }),
highest_level_education: z.enum(EducationLevel, { errorMap: () => ({ message: "Highest Level of Education must not be empty" }) }),
first_language: z.enum(FirstLanguage, { errorMap: () => ({ message: "First Language must not be empty" }) }),
immigration_status: z.enum(ImmigrationStatus, { errorMap: () => ({ message: "Immigration Status must not be empty" }) }),
ancestry: z.enum(ancestryNames, { errorMap: () => ({ message: "Ancestry must not be empty" }) }),
gender: z.enum(GenderOptions, { errorMap: () => ({ message: "Gender must not be empty" }) }),

});
const StartEnrollment = () => {
  const { user } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || "No email found";
  const applicationId = user?.unsafeMetadata?.applicationid;
  const [tempData, setTempData] = useState([]);
  const navigate =useNavigate();
  const mailStatus = new URL(window.location.href).searchParams.get('mail');
  let appliedStatus = user.unsafeMetadata.applied;
  const { toast } = useToast()
  useEffect(() => {
    if (appliedStatus === "true") {
      navigate("/candidate-dashboard");
    }
  }, [appliedStatus]);
  const {
    register,
    handleSubmit,
    control,
    setValue, // For setting fetched data
    reset, // To reset form fields
    formState: { errors },
  } = useForm({
    resolver: zodResolver (schema),
    
  });

  const {
    loading: loadingCreateApplication,
    error: errorCreateApplication,
    data: dataCreateApplciation,
    fn: fnCreateApplication,
  } = useFetch(addNewApplication);

  const onSubmit = (data) => {
    data.email = email;
    data.status="In Progress";
    // data.date_of_birth = startDate;
    fnCreateApplication({
      ...data,
     
    });
  };
  const onError = (errors) => {
    console.log("Form errors:", errors);
  };
  

  useEffect(() => {
    if (dataCreateApplciation) {
      const newCandidateId = dataCreateApplciation[0]?.id;
      

      // Update Clerk unsafeMetadata with new candidate ID
      if (!user?.unsafeMetadata?.applicationid && newCandidateId) {
        user
          .update({
            unsafeMetadata: {
              applicationid: newCandidateId,
              applied:"1"
            },
          })
          .then(() => {
            navigate(`/term-selection-form/${newCandidateId}`);
          })
          .catch((err) => {
            console.error("Error updating unsafeMetadata:", err);
          });
      }
    }
  }, [dataCreateApplciation, user]);

  useEffect(() => {
    if (mailStatus === "true") {
      
       

        const sendEmail = async (to, subject) => {
          const response = await fetch(
            "https://tallkizetxyhcvjujgzw.supabase.co/functions/v1/send-mail",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                to,
                subject,
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Becoming Institute</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet">

    <style>
        body {
           font-family: 'Poppins', sans-serif;

            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f8f8f8;
        }

        .email-container {
            max-width: 100%;
            margin: 20px auto;
            background-color: #ffffff;
            
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #bc9c22;
            padding: 20px;
            text-align: center;
            border-radius:60px;
        }

        .header h1 {
            color: white;
            font-size: 24px;
            margin: 0;
        }

        .content {
            padding: 20px;
        }

        .content h2 {
            color: #333333;
            font-size: 20px;
        }

        .content p {
            color: #666666;
            margin-bottom: 20px;
        }

        .content ul {
            margin: 10px 0;
            padding: 0;
            list-style-type: disc;
            padding-left: 20px;
        }

        .content ul li {
            color: #666666;
            margin-bottom: 10px;
        }

        .footer {
            background-color: #f0f0f0;
            color: #333333;
            text-align: center;
            padding: 20px;
            font-size: 14px;
            border-top: 1px solid #ddd;
        }

        .footer a {
            color: #FFD47D;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }

        .image-container {
            width: 100%;
            height: auto;
        }

        .image-container img {
            width: 100%;
            height: auto;
            display: block;
        }

        .apply-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #FFD47D;
            color: #333333;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            text-decoration: none;
            cursor: pointer;
            text-align: center;
            margin: 20px 0;
        }

        .apply-button:hover {
            background-color: #e6bc6f;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="image-container">
            <img src="" alt="Welcome Image">
        </div>
        <a href="https://www.enrollbecominginstitute.ca/start-enrollment" class="apply-button">Start Applying</a>
        <div class="header">
            <h1>Welcome to the Becoming Institute</h1>
        </div>
        <div class="content">
            <p>Thank you for starting your application to the Becoming Institute Inc. We're excited that you're interested in joining our program and taking the next step in your journey toward becoming a Trauma Recovery Specialist. We know that the application process can be overwhelming, so here are some helpful tips to guide you as you complete your application.</p>

            <h2>Important Information:</h2>
            <ul>
                <li>Your email address will serve as your login/username for the application.</li>
                <li>We may send important, time-sensitive updates by email, so please check your inbox (including spam/junk folders) regularly. We recommend using a personal email account, such as Gmail or Yahoo, rather than a school-issued one.</li>
            </ul>

            <h2>What to Expect:</h2>
            <ul>
                <li><strong>Take your time:</strong> The application process requires thoughtful consideration. You can complete it at your own pace, in multiple sessions if needed. Just remember to click 'Save & continue' at the bottom of each page before taking a break.</li>
                <li><strong>Track your progress:</strong> As you move through the application, you'll see checkmarks indicating which sections have been completed.</li>
                <li><strong>Edit freely:</strong> Until you submit your application, you can log in at any time to add or revise any information.</li>
            </ul>

            <h2>What You'll Need:</h2>
            <ul>
                <li>Be prepared to provide personal identification, such as your Social Insurance Number (SIN) or other identification details to support your application.</li>
                <li><strong>Transcripts:</strong> When filling out the 'Academic History' section, please have your transcripts on hand to ensure accurate reporting of your academic performance.</li>
                <li><strong>Payment:</strong> Once you're ready to submit, please have your payment method ready. We accept credit card payments through the application portal. If you prefer to pay by e-transfer, please email <a href="mailto:info@becomingmethod.com">info@becomingmethod.com</a>, instructions will be provided.</li>
            </ul>

            <h2>Need Help?</h2>
            <p>If you have any questions while completing your application, please visit the help section at the top right corner of the application portal to browse frequently asked questions. For further assistance, feel free to reach out to us directly.</p>

            <h2>Contact Us:</h2>
            <p>
                Email: <a href="mailto:info@becomingmethod.com">info@becomingmethod.com</a><br>
                Phone: (236) 852-2299
            </p>

            <p>We're here to support you throughout the process and look forward to reviewing your application!</p>

            <p>Warm regards,<br>
            The Admissions Team<br>
            Becoming Institute Inc.<br>
            <a href="https://www.becomingmethod.com">www.becomingmethod.com</a></p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Becoming Institute Inc. All rights reserved.<br>
            Visit us at <a href="https://www.becomingmethod.com">www.becomingmethod.com</a></p>
        </div>
    </div>
</body>
</html>
`,
              }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error sending email:", errorData);
            return;
          }else{
            toast({
              title: "Uh oh! Something went wrong.",
              description:  "There was a problem with your request.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }

          const data = await response.json();
          console.log(data)
        };

        // Usage
        sendEmail(`${email}`, "Welcome to the Becoming Institute’s 12-Month Trauma Recovery Certificate Program Application!");
      

       
    }
  }, [mailStatus]);











  


  return (
    <>
    
      <OnboardingTopbar />
      <div className="w-full  lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white h-fit ">
        <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
          Admissions Application
        </div>
        <p className=" font-thin mb-4">
          Please enter your application details below:
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* Name Information */}
          <div className="border-t py-8">
            <span className="text-2xl font-medium">Name Information</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Last Name
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Last Name"
                  required
                  {...register("last_name")}
                />
                {errors.last_name && (
                    <p className="text-red-400 text-sm px-4 py-2">
                      {errors.last_name.message}
                    </p>
                  )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  First Name
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add First Name"
                  required
                  {...register("first_name")}
                />
                 {errors.first_name && (
                    <p className="text-red-400 text-sm px-4 py-2">
                      {errors.first_name.message}
                    </p>
                  )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Middle Name
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Middle Name"
                  {...register("middle_name")}
                />
                 {errors.last_name && (
                    <p className="text-red-400 text-sm px-4 py-2">
                      {errors.last_name.message}
                    </p>
                  )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Former Last Name (if applicable)
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="text"
                  placeholder="Add Former Name if any"
                  {...register("former_name")}
                />
                 {errors.former_name && (
                    <p className="text-red-400 text-sm px-4 py-2">
                      {errors.former_name.message}
                    </p>
                  )}
              </div>

            </div>
          </div>
          {/* Personal Details */}
          <div className="border-t py-8">
            <span className="text-2xl font-medium">Personal Details</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Gender
                </span>

                <Controller
  name="gender"
  control={control}
  render={({ field }) => (
    <div className="relative">
      <select
        {...field}
        value={field.value || ""}
        onChange={(e) => field.onChange(e.target.value)}
        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
          errors.gender ? "border-red-400 border-2" : ""
        }`}>
        <option value="" disabled className="text-neutral-400">
          Select Gender
        </option>
        {GenderOptions.map((gender,index) => (
          <option key={index} value={gender} className="text-zinc-950">
            {gender}
          </option>
        ))}
      </select>
      {errors.gender && (
    <p className="text-red-400 text-sm px-4 py-2">{errors.gender.message}</p>
  )}
    </div>
  )}
/>
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Date of Birth
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="date"
                  placeholder="Date of Birth"
                  required
                  {...register("dob")}
                />
                {errors.dob && (
                    <p className="text-red-400 text-sm px-4 py-2">
                      {errors.dob.message}
                    </p>
                  )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Phone Number
                </span>

                <input
                  className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                  type="number"
                  placeholder="Add Phone No"
                  required
                  {...register("phone")}
                />
                {errors.phone && (
                    <p className="text-red-400 text-sm px-4 py-2">
                      {errors.phone.message}
                    </p>
                  )}
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  Country of Residence
                </span>
                <Controller
  name="country"
  control={control}
  render={({ field }) => (
    <div className="relative">
      <select
        {...field}
        value={field.value || ""}
        onChange={(e) => field.onChange(e.target.value)}
        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
          errors.country ? "border-red-400 border-2" : ""
        }`}>
        <option value="" disabled className="text-neutral-400">
          Select Country
        </option>
        {countries.map((country,index) => (
          <option key={index} value={country} className="text-zinc-950">
            {country}
          </option>
        ))}
      </select>
      {errors.country && (
    <p className="text-red-400 text-sm px-4 py-2">{errors.country.message}</p>
  )}
    </div>
  )}
/>
              </div>

            </div>
          </div>
          {/* Education & Language */}
          <div className="border-t py-8">
            <span className="text-2xl font-medium">Personal Details</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  What is Your Highest Level of Education?
                </span>
                <Controller
  name="highest_level_education"
  control={control}
  render={({ field }) => (
    <div className="relative">
      <select
        {...field}
        value={field.value || ""}
        onChange={(e) => field.onChange(e.target.value)}
        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
          errors.highest_level_education ? "border-red-400 border-2" : ""
        }`}>
        <option value="" disabled className="text-neutral-400">
          Select Level of Education
        </option>
        {EducationLevel.map((edu,index) => (
          <option key={index} value={edu} className="text-zinc-950">
            {edu}
          </option>
        ))}
      </select>
      {errors.highest_level_education && (
    <p className="text-red-400 text-sm px-4 py-2">{errors.highest_level_education.message}</p>
  )}
    </div>
  )}
/>
              </div>
              <div className="flex flex-col">
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
        {FirstLanguage.map((edu,index) => (
          <option key={index} value={edu} className="text-zinc-950">
            {edu}
          </option>
        ))}
      </select>
      {errors.first_language && (
    <p className="text-red-400 text-sm px-4 py-2">{errors.first_language.message}</p>
  )}
    </div>
  )}
/>
              </div>

            </div>
          </div>
          {/* Immigration & Ancestry */}
          <div className="border-t py-8">
            <span className="text-2xl font-medium">Immigration & Ancestry</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                Immigration Status
                </span>
                <Controller
  name="immigration_status"
  control={control}
  render={({ field }) => (
    <div className="relative">
      <select
        {...field}
        value={field.value || ""}
        onChange={(e) => field.onChange(e.target.value)}
        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
          errors.immigration_status ? "border-red-400 border-2" : ""
        }`}>
        <option value="" disabled className="text-neutral-400">
          Select Level of Education
        </option>
        {ImmigrationStatus.map((edu,index) => (
          <option key={index} value={edu} className="text-zinc-950">
            {edu}
          </option>
        ))}
      </select>
      {errors.immigration_status && (
    <p className="text-red-400 text-sm px-4 py-2">{errors.immigration_status.message}</p>
  )}
    </div>
  )}
/>
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-[13px] poppins-regular">
                  First Language
                </span>
                <Controller
  name="ancestry"
  control={control}
  render={({ field }) => (
    <div className="relative">
      <select
        {...field}
        value={field.value || ""}
        onChange={(e) => field.onChange(e.target.value)}
        className={`focus:border-stone-400 text-[1rem] focus:outline-none border-[1px] text-neutral-400 focus:text-zinc-950 focus:border-[1px] h-14 border-opacity-20 rounded-full p-4 text-base w-full ${
          errors.ancestry ? "border-red-400 border-2" : ""
        }`}>
        <option value="" disabled className="text-neutral-400">
          Select Level of Education
        </option>
        {ancestryOptions.map((edu,index) => (
          <option key={index} value={edu.name} disabled={edu.isCategoryTrue} className="text-zinc-950">
            {edu.name}
          </option>
        ))}
      </select>
      {errors.ancestry && (
    <p className="text-red-400 text-sm px-4 py-2">{errors.ancestry.message}</p>
  )}
    </div>
  )}
/>
              </div>

            </div>
          </div>
          {errorCreateApplication?.message && (
  <p className="text-red-500">{errorCreateApplication.message}</p>
)}
          <Button
              type="submit"

              className="rounded-full px-10 py-6  bg-[#bc9c22] flex justify-center items-center">
              {loadingCreateApplication ? (
                <ClipLoader color="white" size={24} />
              ) : (
                "Submit"
              )}
            </Button>
        </form>
      </div>
    </>
  );
};

export default StartEnrollment;
