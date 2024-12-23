import supabase from "@/utils/supabase"; // Import the singleton instance
import supabaseClient, { supabaseUrl } from "@/utils/supabase-authenticated";

export async function addNewApplication(token, _, applicationsData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .insert([applicationsData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Application");
  }

  return data;
}

export async function updateApplication(token, { application_id }, applicationData) {
  

  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .update(applicationData.applicationData)
   
    .eq("id", applicationData.application_id)
    .select();

  if (error) {
    console.error("Error Updating application", error);
    return null;
  }

  return data;
}

export async function getApplicationById(applicationId) {
  
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", applicationId)
    .single(); 
  
  if (error) {
    console.error("Error fetching Application by ID:", error);
    return null; 
  }

  return data; 
}


// export async function updateTestimonialApplication(token, { application_id }, applicationData) {
  
  
//   const random = Math.floor(Math.random() * 90000);
//   const resume = `resume-${random}-${applicationData.applicationData.resume[0].name}`;
//   const { error: resumeError } = await supabase.storage
//   .from("uploads")
//   .upload(resume, applicationData.applicationData.resume[0]);
  

// if (resumeError) throw new Error("Error uploading resume");

// const resumeUrl = `${supabaseUrl}/storage/v1/object/public/uploads/${resume}`;

// const filteredData = applicationData;
// delete filteredData.resume;

//   const supabase = await supabaseClient(token);
//   const { data, error } = await supabase
//     .from("applications")
//     .update([{
//       ...filteredData,
//       resume_url:resumeUrl,
//     }])
   
//     .eq("id", applicationData.application_id)
//     .select();

//   if (error) {
//     console.error("Error Updating application", error);
//     return null;
//   }

//   return data;
// }
export async function updateTestimonialApplication(token, _, educationData) {

  const supabase = await supabaseClient(token);
  const random = Math.floor(Math.random() * 90000);
  
  const resume = `resume-${random}-${educationData.applicationData.resume[0].name}`;
  
  const { error: resumeError } = await supabase.storage
  .from("uploads")
  .upload(resume, educationData.applicationData.resume[0]);
  

if (resumeError) throw new Error("Error uploading resume");

const resumeUrl = `${supabaseUrl}/storage/v1/object/public/uploads/${resume}`;

const filteredData = educationData.applicationData;
delete filteredData.resume;
  const { data, error } = await supabase
    .from("applications")
    .update([{
      ...filteredData,
      resume_url:resumeUrl,
    }])
    .eq("id",educationData.application_id)
    .select();

    
  if (error) {
    console.error(error);
    throw new Error("Error Creating Education");
  }

  return data;
}