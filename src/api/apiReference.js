import supabase from "@/utils/supabase";

export async function addNewReference( referenceData) {

  
    const { data, error } = await supabase
      .from("references")
      .insert([referenceData])
      .select();
  
    if (error) {
      console.error(error);
      throw new Error("Error Creating reference");
    }
  
    return data;
  }



  export async function getReferences() {
  
    const { data, error } = await supabase
      .from("references")
      .select("*")
  
       
    
    if (error) {
      console.error("Error fetching Rferences", error);
      return null; 
    }
  
    return data; 
  }