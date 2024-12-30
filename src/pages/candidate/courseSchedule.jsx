import { getApplicationById } from "@/api/apiApplication";
import OnboardingTopbar from "@/layout/onboardingTopBar";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const CourseSchedule = () => {
  const { user } = useUser();
  const applicationid = user?.unsafeMetadata?.applicationid;

  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);

  useEffect(() => {
    getApplicationById(applicationid)
      .then((data) => setApplication(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, [applicationid]);

  return (
    <>
      {!application ? (
        <>
          <div className="w-full absolute left-0 top-0 z-50 bg-white h-full min-h-fit flex justify-center items-center">
            <ClipLoader color="#bc9c22" />
          </div>
        </>
      ) : null}
      <OnboardingTopbar />
      <div className="w-full lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white h-fit">
      <div className="bg-[#bc9c22] text-white mt-4 py-10 rounded-[30px]">
              <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold">
                  Course Schedule : 2025-26
                </h1>
               
              </div>
            </div>
    
        
            <div className="bg-[#3d3101] text-white mt-4 py-10 rounded-[30px] flex flex-col justify-center items-center">
             

              <span className=" sm:text-[20px] sm:text-center lg:text-left lg:mb-3 sm:mb-3 lg:text-[35px] sm:leading-tight lg:leading-none"> Course Schedule : Winter 2025</span>
          <span className="text-2xl  seasons">
          Friday, May 9, 2025 to Friday, August 22, 2025
                </span>
            </div>
         
       
            <div className="overflow-x-auto mt-6 ">
              <table className="w-full border-collapse border border-[#bc9c22] text-left text-gray-700 rounded-[30px]">
                <thead>
                  <tr className="bg-[#3d3101]">
                    <th className="border border-[#bc9c22] text-white px-4 py-2">
                      Course Code
                    </th>
                    <th className="border border-[#bc9c22] text-white px-4 py-2">
                      Course Name
                    </th>
                    <th className="border border-[#bc9c22] text-white px-4 py-2">
                      Time
                    </th>
                    <th className="border border-[#bc9c22] text-white px-4 py-2">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Becoming 101
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Introduction to Psychotherapy – The Power of Shifting
                      Narratives
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      9:00-11:00
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Becoming 104
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Forgiveness & Holistic Trauma Recovery
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      11:30-13:30
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Becoming 105
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Ubuntu: African & Indigenous Ways of Knowing & Being
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      14:00-16:00
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Becoming 102
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Mindful Fitness - Developing Self-Healing Practices for
                      Psychotherapists
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      17:00-19:00
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Group Coaching Sessions: Week 1: SSP; Week 10-16
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Becoming 103
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      3-Day Intensive Becoming Method™ Training Retreat
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      July 7-9, 2025
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Location: Toronto
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-6">
                <h3 className="text-lg font-semibold">Orientation</h3>
                <p className="text-gray-700">
                  Student Orientation - May 7th, 2025 - 12:00 to 2:00 pm EST
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Holidays</h3>
                <p className="text-gray-700">
                  Reading Week: June 30th to July 4, 2025
                </p>
              </div>
            </div>
          
        
     
          <>
            <div className="bg-[#3d3101] text-white mt-4 py-10 rounded-[30px] flex flex-col justify-center items-center">
             

              <span className=" sm:text-[20px] sm:text-center lg:text-left lg:mb-3 sm:mb-3 lg:text-[35px] sm:leading-tight lg:leading-none"> Course Schedule : Spring 2025</span>
          <span className="text-2xl  seasons">
          Friday, September 5, 2025 to Friday, December 19, 2025
                </span>
            </div>

            <div className="overflow-x-auto mt-6 ">
  <table className="w-full border-collapse border border-[#bc9c22] text-left text-gray-700 rounded-[30px]">
    <thead>
      <tr className="bg-[#3d3101]">
        <th className="border border-[#bc9c22] text-white px-4 py-2">
          Course Code
        </th>
        <th className="border border-[#bc9c22] text-white px-4 py-2">
          Course Name
        </th>
        <th className="border border-[#bc9c22] text-white px-4 py-2">
          Time
        </th>
        <th className="border border-[#bc9c22] text-white px-4 py-2">
          Description
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-[#bc9c22] px-4 py-2">Becoming 301</td>
        <td className="border border-[#bc9c22] px-4 py-2">Authentic & Intuitive Communication for Trauma Recovery Specialists</td>
        <td className="border border-[#bc9c22] px-4 py-2">9:00-11:00</td>
        <td className="border border-[#bc9c22] px-4 py-2"></td>
      </tr>
      <tr>
        <td className="border border-[#bc9c22] px-4 py-2">Becoming 302</td>
        <td className="border border-[#bc9c22] px-4 py-2">Holistic Therapeutic Assessments in Practice</td>
        <td className="border border-[#bc9c22] px-4 py-2">11:30-13:30</td>
        <td className="border border-[#bc9c22] px-4 py-2"></td>
      </tr>
      <tr>
        <td className="border border-[#bc9c22] px-4 py-2">Becoming 303</td>
        <td className="border border-[#bc9c22] px-4 py-2">Psychotherapeutic Standards of Practice</td>
        <td className="border border-[#bc9c22] px-4 py-2">14:00-16:00</td>
        <td className="border border-[#bc9c22] px-4 py-2"></td>
      </tr>
      <tr>
        <td className="border border-[#bc9c22] px-4 py-2">Becoming 304</td>
        <td className="border border-[#bc9c22] px-4 py-2">1000-Hour Psychotherapeutic Practicum</td>
        <td className="border border-[#bc9c22] px-4 py-2">Flexible with supervision</td>
        <td className="border border-[#bc9c22] px-4 py-2">Movement with 15 clients through Becoming Institute’s 16-week Mindful Fitness program</td>
      </tr>
      <tr>
        <td className="border border-[#bc9c22] px-4 py-2">Becoming 305</td>
        <td className="border border-[#bc9c22] px-4 py-2">Major Community Project</td>
        <td className="border border-[#bc9c22] px-4 py-2">Flexible with supervision</td>
        <td className="border border-[#bc9c22] px-4 py-2"></td>
      </tr>
      <tr>
        <td className="border border-[#bc9c22] px-4 py-2">Becoming 306</td>
        <td className="border border-[#bc9c22] px-4 py-2">Final Practice Exam</td>
        <td className="border border-[#bc9c22] px-4 py-2">April 28th-May 2, 2026</td>
        <td className="border border-[#bc9c22] px-4 py-2">Written exam + application</td>
      </tr>
      <tr>
        <td className="border border-[#bc9c22] px-4 py-2">Becoming 201</td>
        <td className="border border-[#bc9c22] px-4 py-2">Metaphysics and the Process of Becoming on the Healing Journey</td>
        <td className="border border-[#bc9c22] px-4 py-2">9:00-11:00</td>
        <td className="border border-[#bc9c22] px-4 py-2"></td>
      </tr>
      <tr>
        <td className="border border-[#bc9c22] px-4 py-2">Becoming 202</td>
        <td className="border border-[#bc9c22] px-4 py-2">Polyvagal Theory, Trauma, and the Response of the Nervous System</td>
        <td className="border border-[#bc9c22] px-4 py-2">11:30-13:30</td>
        <td className="border border-[#bc9c22] px-4 py-2"></td>
      </tr>
      <tr>
        <td className="border border-[#bc9c22] px-4 py-2">Becoming 204</td>
        <td className="border border-[#bc9c22] px-4 py-2">Epigenetic & Intergenerational Trauma</td>
        <td className="border border-[#bc9c22] px-4 py-2">14:00-16:00</td>
        <td className="border border-[#bc9c22] px-4 py-2"></td>
      </tr>
      <tr>
        <td className="border border-[#bc9c22] px-4 py-2">Becoming 102</td>
        <td className="border border-[#bc9c22] px-4 py-2">Mindful Fitness - Developing Self-Healing Practices for Psychotherapists</td>
        <td className="border border-[#bc9c22] px-4 py-2">17:00-19:00</td>
        <td className="border border-[#bc9c22] px-4 py-2">Group Coaching Sessions<br />Week 1: SSP<br />Week 10-16</td>
      </tr>
      <tr>
        <td className="border border-[#bc9c22] px-4 py-2">Becoming 205</td>
        <td className="border border-[#bc9c22] px-4 py-2">Introduction to Cognitive-Behavioral Therapy</td>
        <td className="border border-[#bc9c22] px-4 py-2">Saturdays from 10:00 to 12:00</td>
        <td className="border border-[#bc9c22] px-4 py-2"></td>
      </tr>
      <tr>
        <td className="border border-[#bc9c22] px-4 py-2">Becoming 103</td>
        <td className="border border-[#bc9c22] px-4 py-2">3-Day Intensive Becoming Method™ Training Retreat</td>
        <td className="border border-[#bc9c22] px-4 py-2">Oct. 20th-22nd</td>
        <td className="border border-[#bc9c22] px-4 py-2">3-Day Retreat<br />Location: Toronto</td>
      </tr>
    </tbody>
  </table>

  <div className="mt-6">
    <h3 className="text-lg font-semibold">Orientation</h3>
    <p className="text-gray-700">
      Student Orientation - January 14th, 2026 - 12:00 to 2:00 pm EST
    </p>
    <p className="text-gray-700">
      Student Orientation - September 3rd, 2025 - 12:00 to 2:00 pm EST
    </p>
  </div>

  <div className="mt-4">
    <h3 className="text-lg font-semibold">Holidays</h3>
    <p className="text-gray-700">
      Reading Week: February 16 – 20, 2026
    </p>
    <p className="text-gray-700">
      Good Friday: April 3, 2026
    </p>
    <p className="text-gray-700">
      Reading Week: October 13th, 2025 - October 17th, 2025
    </p>
    <p className="text-gray-700">
      Tuesday, September 30, 2025 - National Truth and Reconciliation Day
    </p>
  </div>
</div>
            
          </>
       
        
          <>
            <div className="bg-[#3d3101] text-white mt-4 py-10 rounded-[30px]">
              <div className="container mx-auto text-center">
                <h1 className="text-[35px] ">
                  Course Schedule : Fall 2025
                </h1>
                <h2 className="text-2xl mt-2 seasons">
                  Friday, January 9, 2026 to Friday, April 24, 2026
                </h2>
              </div>
            </div>

            <div className="overflow-x-auto mt-6 ">
              <table className="w-full border-collapse border border-[#bc9c22] text-left text-gray-700 rounded-[30px]">
                <thead>
                  <tr className="bg-[#3d3101]">
                    <th className="border border-[#bc9c22] text-white px-4 py-2">
                      Course Code
                    </th>
                    <th className="border border-[#bc9c22] text-white px-4 py-2">
                      Course Name
                    </th>
                    <th className="border border-[#bc9c22] text-white px-4 py-2">
                      Time
                    </th>
                    <th className="border border-[#bc9c22] text-white px-4 py-2">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Becoming 301
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Authentic & Intuitive Communication for Trauma Recovery
                      Specialists
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      9:00-11:00
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Becoming 302
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Holistic Therapeutic Assessments in Practice
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      11:30-13:30
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Becoming 303
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Psychotherapeutic Standards of Practice
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      14:00-16:00
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Becoming 304
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      1000-Hour Psychotherapeutic Practicum
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Flexible with supervision
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Movement with 15 clients through Becoming Institute’s
                      16-week Mindful Fitness program
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Becoming 305
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Major Community Project
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Flexible with supervision
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Becoming 306
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Final Practice Exam
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      April 28th-May 2, 2026
                    </td>
                    <td className="border border-[#bc9c22] px-4 py-2">
                      Written exam + application
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-6">
                <h3 className="text-lg font-semibold">Orientation</h3>
                <p className="text-gray-700">
                  Student Orientation - January 14th, 2026 - 12:00 to 2:00 pm
                  EST
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Holidays</h3>
                <p className="text-gray-700">
                  Reading Week: February 16 – 20, 2026
                </p>
                <p className="text-gray-700">Good Friday: April 3, 2026</p>
              </div>
            </div>
          </>
        
      </div>
    </>
  );
};

export default CourseSchedule;














