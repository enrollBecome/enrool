import supabase from "@/utils/supabase"; // Import the singleton instance
import supabaseClient, { supabaseUrl } from "@/utils/supabase-authenticated";

export async function addNewMail(token, _, mailData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("mail")
    .insert([mailData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Mail");
  }

  return data;
}

export async function getMailById(applicationId) {
  
    const { data, error } = await supabase
      .from("mail")
      .select("*")
      .eq("applicationid", applicationId)
       
    
    if (error) {
      console.error("Error fetching Application by ID:", error);
      return null; 
    }
  
    return data; 
  }

  export async function getMailByMailId(mailId) {
  
    const { data, error } = await supabase
      .from("mail")
      .select("*")
      .eq("id", mailId)
       
    
    if (error) {
      console.error("Error fetching mail by mail ID:", error);
      return null; 
    }
  
    return data; 
  }