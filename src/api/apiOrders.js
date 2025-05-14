// Get Experienceal Background

import supabaseClient, { supabaseUrl } from "@/utils/supabase-authenticated";
import supabase from "@/utils/supabase";




  export async function getOrdersByApplicationId(applicationId) {
 

    const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("application_id", applicationId) 
    
  
  
  if (error) {
    console.error("Error fetching order", error);
    return []; 
  }
  
  return data; 
  }


export async function addNewOrder(token, _, orderData) {

    const supabase = await supabaseClient(token);
    
    const { data, error } = await supabase
      .from("orders")
      .insert([{
        ...orderData,
      }])
      .select();
  
      
    if (error) {
      console.error(error);
      throw new Error("Error Creating Order");
    }
  
    return data;
  }




  //delete Order

  export async function deleteOrder(orderId) {
    const { data, error } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId); 
  
    if (error) {
      console.error("Error deleting order", error);
      return null; 
    }
  
    return data; 
  }

  export async function findLastOrderForApplication(applicationId) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("application_id", applicationId)
      .order("created_at", { ascending: false }) // or use 'id' if you don't have 'created_at'
      .limit(1);
  
    if (error) {
      console.error("Error fetching last order", error);
      return null;
    }
  
    return data[0] || null;
  }
  