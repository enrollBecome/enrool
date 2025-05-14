import { getApplicationById, updateApplication } from "@/api/apiApplication";
import { findLastOrderForApplication } from "@/api/apiOrders";
import useFetch from "@/hooks/use-fetch";
import OnboardingTopbar from "@/layout/onboardingTopBar";
import { useUser } from "@clerk/clerk-react";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";

const InitialPaymentSuccess = () => {
  const session = new URL(window.location.href).searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);
  const [order,setOrder] = useState([]);
  const { user } = useUser();
  const applicationid = user?.unsafeMetadata?.applicationid;
  useEffect(() => {
    getApplicationById(applicationid)
      .then((data) => setApplication(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);
  useEffect(() => {
    findLastOrderForApplication(applicationid)
      .then((data) => setOrder(data))
      .catch(() => setError("Failed to fetch order."))
      .finally(() => setLoading(false));
  }, [applicationid]);
  const {
    loading: loadingUpdateApplication,
    error: errorUpdateApplication,
    fn: fnUpdateApplication,
  } = useFetch(updateApplication); // Destructure outside useEffect

  useEffect(() => {
    if (session && applicationid) {
      const existingMetadata = user.unsafeMetadata || {};

      // Define data for updating the application
      const applicationData = {
        status: "Submitted",
        order_id : order.id,

      };

      // Call fnUpdateApplication to update application data
      fnUpdateApplication({
        applicationData,
        application_id: applicationid,
      })
        .then(() => {
          // Update user metadata if the application update is successful
          return user.update({
            unsafeMetadata: {
              ...existingMetadata,
              applied: "applied",
              stage9:"completed"
            },
          });
        })
        .then(()=>{
          const sendInvoiceEmail = async () => {
            const response = await fetch(
              "https://tallkizetxyhcvjujgzw.supabase.co/functions/v1/send-emaile",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  to: order.email,
                  subject: "Invoice for Application Fee – Becoming Institute",
                  html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Invoice – Becoming Institute</title>
            <style>
                body { font-family: 'Poppins', sans-serif; background: #f9f9f9; margin: 0; padding: 20px; }
                .container { background: #fff; max-width: 600px; margin: 0 auto; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden; }
                .header { background: #bc9c22; padding: 30px; text-align: center; color: #fff; }
                .header h1 { margin: 0; font-size: 22px; }
                .content { padding: 30px; color: #333; }
                .content h2 { font-size: 18px; margin-bottom: 10px; }
                .content p { line-height: 1.6; }
                .details { background: #f3f3f3; padding: 15px; border-radius: 6px; margin: 20px 0; }
                .details p { margin: 4px 0; }
                .footer { background: #f0f0f0; padding: 20px; font-size: 14px; text-align: center; color: #555; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Invoice – Application Processing Fee</h1>
                </div>
                <div class="content">
                    <p>Dear ${order.first_name} ${order.last_name},</p>
                    <p>Thank you for your interest in the <strong>Becoming Institute’s 12-Month Trauma Recovery Certificate Program</strong>.</p>
                    <p>To move forward with your application, please complete the $150 processing fee below. This <strong>non-refundable fee</strong> supports the review of your application, coordination of your interview, and early access to orientation materials that will help you prepare for this transformative journey.</p>
        
                    <h2>Billing Information</h2>
                    <div class="details">
                        <p><strong>Name:</strong> ${order.first_name} ${order.last_name}</p>
                        <p><strong>Email:</strong> ${order.email}</p>
                        <p><strong>Phone:</strong> ${order.phone}</p>
                        <p><strong>Address:</strong> ${order.address}, ${order.address2}, ${order.town}, ${order.province}, ${order.pin}</p>
                    </div>
        
                    <h2>Invoice Summary</h2>
                    <div class="details">
                        <p><strong>Application Fee:</strong> $150 USD</p>
                        <p><strong>Status:</strong> Unpaid</p>
                        <p><strong>Note:</strong> This fee is non-refundable.</p>
                    </div>
        
                    <p>Please proceed to the application portal to make the payment.</p>
                    <p>Warm regards,<br>The Admissions Team<br>Becoming Institute Inc.<br><a href="https://www.becomingmethod.com">www.becomingmethod.com</a></p>
                </div>
                <div class="footer">
                    &copy; 2024 Becoming Institute Inc. All rights reserved.
                </div>
            </div>
        </body>
        </html>`
                }),
              }
            );
        
            if (!response.ok) {
              const error = await response.json();
              console.error("Error sending invoice email:", error);
            }
          };
        
          sendInvoiceEmail();
        
        
        })
        .catch((err) => {
          console.error("Error in application update or metadata update:", err);
        });
    }
  }, [applicationid,order, session, user, fnUpdateApplication]); // Add relevant dependencies



   useEffect(() => {
      if (mailStatus === "true") {
        const sendEmail = async (to, subject) => {
          const response = await fetch(
            "https://tallkizetxyhcvjujgzw.supabase.co/functions/v1/send-emaile",
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
              padding-top:50px;
              padding-bottom:50px;
              text-align: center;
              border-radius:30px;
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
              border-radius:30px;
          }
  
          .apply-button {
              display: inline-block;
              padding: 10px 20px;
              background-color:#bc9c22;
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
          <a href="https://www.enrollbecominginstitute.ca/start-enrollment" style="color:white; font-weight:500;" class="apply-button">Start Applying</a>
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
          } else {
          }
  
          const data = await response.json();
        };
  
        // Usage
        sendEmail(
          `${email}`,
          "Welcome to the Becoming Institute’s 12-Month Trauma Recovery Certificate Program Application!"
        );
        toast({
          title: "Registrtaion Successful",
          description: "Kindly check your email for guidelines",
        });
      }
    }, [mailStatus]);
  return (
    <>
      <OnboardingTopbar />
      <div className="w-full lg:rounded-[60px] lg:p-[60px] sm:p-[20px] sm:mt-0 md:mt-[20px] flex flex-col bg-white h-full min-h-fit justify-center">
        {/* <div className="poppins-bold sm:text-[20px] sm:text-center lg:text-left lg:mb-5 sm:mb-3 lg:text-[38px] sm:leading-tight lg:leading-none">
          Payment Confirmation
        </div> */}
        {session && session.length >= 10 ? (
          <div className="text-center flex flex-col items-center justify-center space-y-6">
            <div className="rounded-full w-[230px] h-[230px] bg-green-200 flex justify-center items-center">
              <div className="rounded-full w-[180px] h-[180px] bg-green-300 flex justify-center items-center">
                <div className="rounded-full w-[130px] h-[130px] bg-green-400 flex justify-center items-center">
                  <Check strokeWidth={5} size={70} color="white" />
                </div>
              </div>
            </div>
            <div className="text-green-500 text-3xl font-bold">
              Payment Successful!
            </div>
            <div className="text-gray-700 text-lg">
              Thank you for your payment,{" "}
              <span className="font-semibold">
                {application?.first_name || "User"}
              </span>
              .
            </div>
            <div className="text-gray-800 text-xl font-semibold">
              Amount Paid: <span className="text-green-600">$150 CAD</span>
            </div>
            <div className="text-gray-500">
              Transaction ID is:{" "}
              <span className="font-mono text-sm">{session}</span>
            </div>
            <button
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700"
              onClick={() => (window.location.href = `/initial-payment/${applicationid}`)}
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="text-center text-red-500 text-lg">
            Invalid session. Please try again.
          </div>
        )}
      </div>
    </>
  );
};

export default InitialPaymentSuccess;
