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
        <Button className="bg-[#bc9c22] text-xl rounded-full py-6 px-9">
          Print
        </Button>{" "}
      </div>
      <div className="w-full lg:rounded-[60px] lg:p-[60px] mt-[20px] flex-col bg-white min-h-fit h-full flex ">
        {loading || !application ? (
          <div className="w-full absolute left-0 top-0 z-50 bg-white h-full min-h-fit flex justify-center items-center">
            <PropagateLoader color="#bc9c22" />
          </div>
        ) : (
          <>
            <div className="w-full flex-col ">
              <div className=" flex justify-between mb-10" id="header">
                <img className="w-28" src={logo} />
                <div className=" flex flex-col items-end">
                  <span>Lorem ipsum dolor sit ame</span>
                  <span>onsectetur adipiscing elit, sed do eiusmod</span>
                  <span>incididunt ut labore et dolore</span>
                </div>
              </div>
              <div className="w-full flex flex-col">
                {/* Personal Information */}
                <div className="w-full flex flex-col gap-4">
                  <div className=" w-full pl-6 h-fit flex bg-[#bc9c22] mb-6">
                    <span className="py-4 px-8 w-full bg-[#685711] text-xl text-white font-semibold ">
                      Personal Information{" "}
                    </span>
                  </div>
                  {/* Field 1 */}
                  <div className="mt-6 flex items-center">
        <label className="text-2xl font-semibold mr-4 min-w-36">Name :</label>
        <div className="text-xl w-full bg-slate-100 p-4 rounded ">
          {application.first_name}{" "} {application.middle_name}{" "} {application.last_name}
        </div>
      </div>

      {/* Field 2 */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center w-1/2">
          <label className="text-2xl font-semibold mr-4 min-w-36">Phone :</label>
          <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
            {application.phone}
          </div>
        </div>
        <div className="flex items-center w-1/2">
          <label className="text-2xl font-semibold mr-4 min-w-36">Email :</label>
          <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
            {application.email}
          </div>
        </div>
      </div>

      {/* Field 3 */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center w-1/2">
          <label className="text-2xl font-semibold mr-4 min-w-36">Gender :</label>
          <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
            {application.gender}
          </div>
        </div>
        <div className="flex items-center w-1/2">
          <label className="text-2xl font-semibold mr-4 min-w-36">Date of Birth :</label>
          <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
            {application.dob}
          </div>
        </div>
      </div>

      {/* Field 4 - Subfields in Same Row */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center w-1/2">
          <label className="text-2xl font-semibold mr-4 min-w-36">Subfield 1:</label>
          <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
            {application.first_name || "N/A"}
          </div>
        </div>
        <div className="flex items-center w-1/2">
          <label className="text-2xl font-semibold mr-4 min-w-36">Subfield 2:</label>
          <div className="text-xl flex-1 bg-slate-100 p-4 rounded ">
            {application.first_name || "N/A"}
          </div>
        </div>
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
