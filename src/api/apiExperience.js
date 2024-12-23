// Get Experienceal Background

import supabaseClient, { supabaseUrl } from "@/utils/supabase-authenticated";
import supabase from "@/utils/supabase";




  export async function getExperienceByApplicationId(applicationId) {
 

    const { data, error } = await supabase
    .from("experience")
    .select("*")
    .eq("application_id", applicationId) 
    
  
  
  if (error) {
    console.error("Error fetching Experience", error);
    return []; 
  }
  
  return data; 
  }


export async function addNewExperience(token, _, experienceData) {

    const supabase = await supabaseClient(token);
    
    const { data, error } = await supabase
      .from("experience")
      .insert([{
        ...experienceData,
      }])
      .select();
  
      
    if (error) {
      console.error(error);
      throw new Error("Error Creating Experience");
    }
  
    return data;
  }




  //delete experience

  export async function deleteExperience(experienceId) {
    const { data, error } = await supabase
      .from("experience")
      .delete()
      .eq("id", experienceId); 
  
    if (error) {
      console.error("Error deleting Experience", error);
      return null; 
    }
  
    return data; 
  }