import { getApplicationById, updateApplication } from "@/api/apiApplication";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import OnboardingTopbar from "@/layout/onboardingTopBar";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { z } from "zod";

const schema = z.object({
  application_confirmation: z.boolean({
    errorMap: () => ({ message: "Status must be true or false" }),
  }),
});

const ConfirmationForm = () => {
  const { user } = useUser();
  const { applicationid } = useParams();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);
  const [isCheckboxChecked , setIsCheckboxChecked] = useState(false); // State for checkbox
  let applicationStatus = application.status;

  const navigate = useNavigate();

  useEffect(() => {
    getApplicationById(applicationid)
      .then((data) => setApplication(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: application,
  });

  const onError = (errors) => {
    console.log("Form errors:", errors);
  };

  const {
    loading: loadingUpdateApplication,
    error: errorUpdateApplication,
    data: dataUpdateApplication,
    fn: fnUpdateApplication,
  } = useFetch(updateApplication);

  const onSubmit = (data) => {
    data.status = "Submitted";
    fnUpdateApplication({
      applicationData: data,
      application_id: applicationid,
    });
  };

  useEffect(() => {
    if (dataUpdateApplication?.length > 0) {

      const sendArEmail = async (to, subject) => {
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
  <title>Confidential Reference Verification</title>
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
        margin-top:20px;
          padding: 40px;
          text-align: center;
          border-radius: 30px;
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
          border-radius: 30px;
      }

      .apply-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #bc9c22;
          color: white;
          border: none;
          border-radius: 10px;
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
          <img src="https://tallkizetxyhcvjujgzw.supabase.co/storage/v1/object/public/uploads/Screenshot%202025-01-06%20at%2004.31.52.png" alt="Welcome Image">
      </div>
      
      <div class="header">
          <h1>Confidential Reference Verification Request</h1>
      </div>
      <div class="content">
          <p>Dear Referee,</p>

          <p>We are reaching out as one of our students, <strong>${application.first_name}</strong>, has listed you as their academic reference. To ensure the integrity and confidentiality of this process, we kindly request you to verify the details provided by the applicant and submit your recommendation through our secure portal.</p>

          <h2>Applicant Details</h2>
          <ul>
              <li><strong>Applicant First Name:</strong> ${application.first_name}</li>
              <li><strong>Your Email Address:</strong> ${application.ar_email}</li>
              <li><strong>Application ID:</strong> ${application.id}</li>
          </ul>

          <p>To proceed, please click the button below to access the <strong>Confidential Referee Login</strong>. You can then approve or decline your recommendation securely.</p>

          <a href="https://www.enrollbecominginstitute.ca/academic-reference/" class="apply-button">Visit Confidential Referee Login</a>

          <h2>Need Assistance?</h2>
          <p>If you have any questions or need support during the process, visit the Help section in the top-right corner of the portal. Alternatively, you can contact us directly at the details below.</p>

          <h2>Contact Us</h2>
          <p>
              Email: <a href="mailto:info@becomingmethod.com">info@becomingmethod.com</a><br>
              Phone: (236) 852-2299
          </p>

          <p>We value your input and thank you for your cooperation in this confidential process.</p>

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
          
        }

        const data = await response.json();
        
      };
      const sendPrrEmail = async (to, subject) => {
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
  <title>Confidential Reference Verification</title>
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
        margin-top:20px;
          padding: 40px;
          text-align: center;
          border-radius: 30px;
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
          border-radius: 30px;
      }

      .apply-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #bc9c22;
          color: white;
          border: none;
          border-radius: 10px;
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
          <img src="https://tallkizetxyhcvjujgzw.supabase.co/storage/v1/object/public/uploads/Screenshot%202025-01-06%20at%2004.31.52.png" alt="Welcome Image">
      </div>
      
      <div class="header">
          <h1>Confidential Reference Verification Request</h1>
      </div>
      <div class="content">
          <p>Dear Referee,</p>

          <p>We are reaching out as one of our students, <strong>${application.first_name}</strong>, has listed you as their professional reference. To ensure the integrity and confidentiality of this process, we kindly request you to verify the details provided by the applicant and submit your recommendation through our secure portal.</p>

          <h2>Applicant Details</h2>
          <ul>
              <li><strong>Applicant First Name:</strong> ${application.first_name}</li>
              <li><strong>Your Email Address:</strong> ${application.prr_email}</li>
              <li><strong>Application ID:</strong> ${application.id}</li>
          </ul>

          <p>To proceed, please click the button below to access the <strong>Confidential Referee Login</strong>. You can then approve or decline your recommendation securely.</p>

          <a href="https://www.enrollbecominginstitute.ca/professional-reference/" class="apply-button">Visit Confidential Referee Login</a>

          <h2>Need Assistance?</h2>
          <p>If you have any questions or need support during the process, visit the Help section in the top-right corner of the portal. Alternatively, you can contact us directly at the details below.</p>

          <h2>Contact Us</h2>
          <p>
              Email: <a href="mailto:info@becomingmethod.com">info@becomingmethod.com</a><br>
              Phone: (236) 852-2299
          </p>

          <p>We value your input and thank you for your cooperation in this confidential process.</p>

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
          
        }

        const data = await response.json();
        
      };
      const sendPerEmail = async (to, subject) => {
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
  <title>Confidential Reference Verification</title>
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
        margin-top:20px;
          padding: 40px;
          text-align: center;
          border-radius: 30px;
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
          border-radius: 30px;
      }

      .apply-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #bc9c22;
          color: white;
          border: none;
          border-radius: 10px;
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
          <img src="https://tallkizetxyhcvjujgzw.supabase.co/storage/v1/object/public/uploads/Screenshot%202025-01-06%20at%2004.31.52.png" alt="Welcome Image">
      </div>
      
      <div class="header">
          <h1>Confidential Reference Verification Request</h1>
      </div>
      <div class="content">
          <p>Dear Referee,</p>

          <p>We are reaching out as one of our students, <strong>${application.first_name}</strong>, has listed you as their personal reference. To ensure the integrity and confidentiality of this process, we kindly request you to verify the details provided by the applicant and submit your recommendation through our secure portal.</p>

          <h2>Applicant Details</h2>
          <ul>
              <li><strong>Applicant First Name:</strong> ${application.first_name}</li>
              <li><strong>Your Email Address:</strong> ${application.per_email}</li>
              <li><strong>Application ID:</strong> ${application.id}</li>
          </ul>

          <p>To proceed, please click the button below to access the <strong>Confidential Referee Login</strong>. You can then approve or decline your recommendation securely.</p>

          <a href="https://www.enrollbecominginstitute.ca/professional-reference/" class="apply-button">Visit Confidential Referee Login</a>

          <h2>Need Assistance?</h2>
          <p>If you have any questions or need support during the process, visit the Help section in the top-right corner of the portal. Alternatively, you can contact us directly at the details below.</p>

          <h2>Contact Us</h2>
          <p>
              Email: <a href="mailto:info@becomingmethod.com">info@becomingmethod.com</a><br>
              Phone: (236) 852-2299
          </p>

          <p>We value your input and thank you for your cooperation in this confidential process.</p>

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
          
        }

        const data = await response.json();
        
      };
      // Usage
      sendArEmail(`${application.ar_email}`, "Confidential Reference Verification Request");
      sendPrrEmail(`${application.prr_email}`, "Confidential Reference Verification Request");
      sendPerEmail(`${application.per_email}`, "Confidential Reference Verification Request");
      // toast({
      //   title: "Registrtaion Successful",
      //   description: "Kindly check your email for guidelines",
      // })



      const existingMetadata = user.unsafeMetadata || {};
      user
        .update({
          unsafeMetadata: {
            ...existingMetadata,
            applied: "true",
          },
        })
        .then(() => {
          navigate("/confirmation-form/thanks");
        })
        .catch((err) => {
          console.error("Error updating unsafeMetadata:", err);
        });

      // Update Clerk unsafeMetadata with new candidate ID
    }
  }, [loadingUpdateApplication]);

  useEffect(() => {
    if (application) {
      reset(application); // Populate form with fetched job data
    }
  }, [application]);

  useEffect(() => {
    if (applicationStatus === "Approved") {
      navigate("/candidate-dashboard");
    }else if(applicationStatus === "Paid"){
      navigate("/candidate-dashboard");
    }
  }, [applicationStatus]);

  return (
    <>
      <OnboardingTopbar />
      <div className="w-full lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white h-fit">
        <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
          Application Confirmation
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="flex flex-col ">
              <p className="text-sm font-light text-gray-400">Applicant Name</p>
              <p className="text-xl">
                {application.first_name} {application.last_name}
              </p>
            </div>
            <div className="flex flex-col ">
              <p className="text-sm font-light text-gray-400">Program</p>
              <p className="text-xl">{application.course_name}</p>
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="checkbox1"
              {...register("application_confirmation")}
              onChange={(e) => {
                setIsCheckboxChecked(e.target.checked); // Update local state
              }}
            />
            <label htmlFor="checkbox1" className="ml-2">
              Confirm
            </label>
          </div>
          <div className="my-4">
            <span className="">
              I certify that the information I have submitted on this
              application is accurate to the best of my knowledge. I authorize
              Becoming Institute’s Admissions Committee to access the
              information, contact my reference if required and evaluate my
              admissibility to the 12-month Trauma Recovery program.
            </span>
          </div>
          <div className="flex flex-col my-8">
            <p className="text-sm font-light text-gray-400">
              Enrollment Status
            </p>
            <p className="text-xl">{application.status}</p>
          </div>
          <div className="my-8">
            <span className="">
              Note: you can only submit one application per term. If you require
              changes to your information after your application has been
              submitted, notify info@becomingmethod.com. If you find any errors
              above, please go back to make the changes necessary.
            </span>
          </div>

          <div className="border-t py-8"></div>

          {errorUpdateApplication?.message && (
            <p className="text-red-500">{errorUpdateApplication.message}</p>
          )}
{application.status === "Submitted"?(<> <Button
            type="submit"
            className={`rounded-full px-10 py-6 mt-[40px] flex justify-center items-center ${
              !isCheckboxChecked 
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#bc9c22]"
            }`}
            disabled={!isCheckboxChecked } // Disable button when checkbox is not checked
          >
            {loadingUpdateApplication ? (
              <ClipLoader color="white" size={24} />
            ) : (
              "Submit"
            )}
          </Button></>):null}
         
        </form>
      </div>
    </>
  );
};

export default ConfirmationForm;
