import { getApplicationById, updateApplication } from "@/api/apiApplication";
import { addNewMail, getMailById } from "@/api/apiMail";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import OnboardingTopbar from "@/layout/onboardingTopBar";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveDownLeft, MoveUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader, PropagateLoader } from "react-spinners";
import { z } from "zod";
const schema = z.object({
  query: z.string().min(3, { message: "Query is Required" }),

  subject: z.string().min(3, { message: "Subject is required" }),
});
const AdminMail = () => {
  const { applicationid } = useParams();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);
  const [mail, setMail] = useState([]);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

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
  useEffect(() => {
    getApplicationById(applicationid)
      .then((data) => setApplication(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);
  useEffect(() => {
    getMailById(applicationid)
      .then((data) => setMail(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);
  const {
    loading: loadingCreateMail,
    error: errorCreateMail,
    data: dataCreateMail,
    fn: fnCreateMail,
  } = useFetch(addNewMail);

  const onSubmit = (data) => {
    data.applicationid = applicationid;
    data.is_candidate = "true";
    setMessage(data.query);
    setSubject(data.subject);
    // data.date_of_birth = startDate;
    fnCreateMail({
      ...data,
    });
  };
  const onError = (errors) => {
    console.log("Form errors:", errors);
  };
  console.log(mail);

  useEffect(() => {
    if (dataCreateMail?.length > 0) {
      if (message) {
        console.log(message);
        console.log(subject);

        const sendEmail = async (to, subject, message) => {
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
    <html>
    <head>
      <style>
        /* General Styles */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background-color: #bc9c22; /* Cyan */
          color: #fff;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
        }
        .content p {
          line-height: 1.6;
          font-size: 16px;
        }
        .content .button {
          display: inline-block;
          padding: 12px 20px;
          margin-top: 10px;
          color: #fff;
          background-color: #bc9c22; /* Cyan */
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          transition: background-color 0.3s ease;
        }
        .content .button:hover {
          background-color: #b2ebf2; /* Light Cyan */
          color: #005662; /* Darker shade for contrast */
        }
        .footer {
          background-color: #f4f4f4;
          color: #888;
          padding: 15px;
          text-align: center;
          font-size: 14px;
        }
        .footer a {
          color: #bc9c22; /* Cyan */
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>BECOMING INSTITUTE</h1>
        </div>
        <div class="content">
          <p>${message}</p>
          <a class="button" href="https://enrollbecominginstitute.ca/candidate-applications/view/${applicationid}" target="_blank">View Mail</a>
          <p>If you have any questions, feel free to contact our support team at <a href="mailto:info@enrollbecominginstitute.ca">info@enrollbecominginstitute.ca</a>.</p>
          <p>Visit our website: <a href="https://enrollbecominginstitute.ca" target="_blank">enrollbecominginstitute.ca</a></p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Becoming Institute. All rights reserved.</p>
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
          }

          const data = await response.json();
        };

        // Usage
        sendEmail(`${application.email}`, `${subject}`, `${message}`);
      }

      navigate("/admin-mail");
    }
  }, [loadingCreateMail]);

  if (loading) {
    return (
      <>
        <div className="w-full absolute left-0 top-0 z-50 bg-white h-full min-h-fit flex justify-center items-center">
          <PropagateLoader color="#bc9c22" />
        </div>
      </>
    );
  }
  return (
    <>
      <OnboardingTopbar />
      <div className="w-full lg:rounded-[60px] lg:p-[60px] sm:p-[20px] sm:mt-0 md:mt-[20px] flex-col bg-white min-h-fit h-full flex ">
        <div className="bg-[#bc9c22] text-white mt-4 py-10 rounded-[30px]">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold">{application.email}</h1>
            <h2 className="text-2xl mt-2 seasons">
              Send An Email to {application.first_name}
            </h2>
          </div>
         
        </div>
        <div className="bg-[#f4f4f4] text-white mt-4  rounded-[30px]">
          <div className="container mx-auto p-10">
            <div className="">
              <p className="text-xl font-semibold text-black">Applicant Details</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      First Name
                    </span>
                    <span className="mb-2 text-2xl text-black">
                      {application.first_name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Last Name
                    </span>
                    <span className="mb-2 text-2xl text-black">
                      {application.last_name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Middle Name
                    </span>
                    <span className="mb-2 text-2xl text-black">
                      {application.middle_name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Former name
                    </span>
                    <span className="mb-2 text-2xl text-black">
                      {application.former_name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Gender
                    </span>
                    <span className="mb-2 text-2xl text-black">
                      {application.gender}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Date of Birth
                    </span>
                    <span className="mb-2 text-2xl text-black">
                      {application.dob}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Phone Number
                    </span>
                    <span className="mb-2 text-2xl text-black">
                      {application.phone}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-2 text-gray-500 text-[13px] poppins-regular">
                      Country of Residence
                    </span>
                    <span className="mb-2 text-2xl text-black">
                      {application.country}
                    </span>
                  </div>
                </div>
            
          </div>
         
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* Name Information */}
          <div className=" py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"></div>

            <div className="flex flex-col mt-4">
              <span className="mb-2 text-[13px] poppins-regular">Subject</span>

              <input
                className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 rounded-full p-4 text-base"
                type="text"
                placeholder="Add Subject"
                required
                {...register("subject")}
              />
              {errors.subject && (
                <p className="text-red-400 text-sm px-4 py-2">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div className="flex flex-col pt-4">
              <span className="mb-2 text-[13px] poppins-regular">
                Add Your Query
              </span>

              <textarea
                className="focus:border-stone-400 focus:outline-none border-[1px] border-opacity-20 w-full h-40 rounded-[30px] p-4 text-base resize-none"
                placeholder="Add query /message ...."
                required
                {...register("query")}
              ></textarea>

              {errors.query && (
                <p className="text-red-400 text-sm px-4 py-2">
                  {errors.query.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="rounded-full px-10 py-6  bg-[#bc9c22] flex justify-center items-center"
          >
            {loadingCreateMail ? (
              <ClipLoader color="white" size={24} />
            ) : (
              "Submit"
            )}
          </Button>
        </form>

        <div className="">
          <div className="bg-[#bc9c22] text-white mt-4 py-10 rounded-[30px]">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl font-bold">Mails History</h1>
              <h2 className="text-2xl mt-2 seasons">
                Mails Sent And Recieved So Far...
              </h2>
            </div>
          </div>

          {mail.map((ami, index) => (
            <div
              onClick={() =>
                (window.location.href = `/admin-mail/view/${ami.id}`)
              }
              key={index}
              className=" cursor-pointerflex w-full mt-4 bg-[#fffcee] rounded-[20px] p-4 px-10 items-center justify-evenly shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center w-1/6 gap-2">
                <p className="font-semibold text-gray-700 truncate">
                  {new Date(ami.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              {/* Icon and Status */}
              <div className="flex items-center w-1/6 gap-2">
                {ami && ami.is_candidate === true ? (
                  <>
                    <p className="text-green-600 font-medium">Sent</p>
                    <MoveUpRight strokeWidth={3} size={20} />
                  </>
                ) : (
                  <>
                    <p className="text-blue-600 font-medium">Received</p>
                    <MoveDownLeft strokeWidth={3} size={20} />
                  </>
                )}
              </div>

              {/* Subject */}
              <div className="flex-1 text-left w-1/3">
                <p className="font-semibold text-gray-700 truncate">
                  {ami.subject}
                </p>
                {ami && ami.instructor_name ? (
                  <>
                    <p className="text-gray-500  text-left truncate">
                      {ami.query}
                    </p>
                  </>
                ) : null}
              </div>

              {/* Query */}
              {ami && ami.instructor_name ? (
                <div className="flex-1 text-left w-1/3">
                  <p className="text-gray-500 truncate">
                    {ami.instructor_name}
                  </p>
                </div>
              ) : (
                <div className="flex-1 text-left w-1/3">
                  <p className="text-gray-500  text-left truncate">
                    {ami.query}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminMail;
