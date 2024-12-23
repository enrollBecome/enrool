// Get Educational Background

import supabaseClient, { supabaseUrl } from "@/utils/supabase-authenticated";
import supabase from "@/utils/supabase";




  export async function getEducationByApplicationId(applicationId) {
 

    const { data, error } = await supabase
    .from("education")
    .select("*")
    .eq("application_id", applicationId) 
    
  
  
  if (error) {
    console.error("Error fetching Education", error);
    return []; 
  }
  
  return data; 
  }


export async function addNewEducation(token, _, educationData) {

    const supabase = await supabaseClient(token);
    const random = Math.floor(Math.random() * 90000);
    
    const transcript = `transcript-${random}-${educationData.transcript[0].name}`;
    
    const { error: transcriptError } = await supabase.storage
    .from("uploads")
    .upload(transcript, educationData.transcript[0]);
    

  if (transcriptError) throw new Error("Error uploading Transcript");
  
  const transcriptUrl = `${supabaseUrl}/storage/v1/object/public/uploads/${transcript}`;

  const filteredData = educationData;
  delete filteredData.transcript;
    const { data, error } = await supabase
      .from("education")
      .insert([{
        ...filteredData,
        transcript_url:transcriptUrl,
      }])
      .select();
  
      
    if (error) {
      console.error(error);
      throw new Error("Error Creating Education");
    }
  
    return data;
  }




  //delete education

  export async function deleteEducation(educationId) {
    const { data, error } = await supabase
      .from("education")
      .delete()
      .eq("id", educationId); 
  
    if (error) {
      console.error("Error deleting Education", error);
      return null; 
    }
  
    return data; 
  }