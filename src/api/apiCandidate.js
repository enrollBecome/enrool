import supabase from "@/utils/supabase"; // Import the singleton instance
import supabaseClient, { supabaseUrl } from "@/utils/supabase-authenticated";

export async function addNewCandidate(token, _, candidateData) {
  const supabase = await supabaseClient(token);
 
  const { data, error } = await supabase
    .from("candidate")
    .insert(candidateData)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Candidate");
  }

  return data;
}
