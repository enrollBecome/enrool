

import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useCallback } from 'react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51PaGSVDTA9vHHfvpE9vMaaDnggFP3VNi3P78mVQjrrcC7qGiomlcxxQ9LXyWkMJovnxhtEh5mYEfRLzXeUxNL88J00vTTFria9");

const Payment = () => {
    const fetchClientSecret = useCallback(async () => {
        try {
          const response = await fetch("http://127.0.0.1:54321/functions/v1/create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Origin": "http://localhost:5174",
            },
          });
      
          if (!response.ok) {
            throw new Error(`Backend error: ${response.status} ${response.statusText}`);
          }
      
          const data = await response.json();
          console.log("Response from backend:", data);
      
          if (!data.sessionId || typeof data.sessionId !== "string") {
            throw new Error("Invalid sessionId received from the backend.");
          }
      
          return data.sessionId; // Return the clientSecret as a string
        } catch (error) {
          console.error("Error in fetchClientSecret:", error);
          throw error; // Re-throw the error so Stripe knows
        }
      }, []);
      

  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}


export default Payment;