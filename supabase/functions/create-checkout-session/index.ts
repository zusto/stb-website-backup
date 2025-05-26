
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0"; // Use a specific version
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CREATE-CHECKOUT-SESSION] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("Stripe secret key not found");
      throw new Error("STRIPE_SECRET_KEY is not set in Supabase Edge Function secrets.");
    }
    logStep("Stripe key verified");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    const userEmail = user?.email || "guest@example.com"; // Fallback for unauthenticated or email-less user
    logStep("User email retrieved", { email: userEmail });
    
    const { basicDetails } = await req.json();
    if (!basicDetails) {
      logStep("Basic details not provided in request body");
      throw new Error("Basic details are required.");
    }
    logStep("Basic details received", basicDetails);

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16", // Use a fixed API version
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Check if customer exists
    let customerId;
    const customers = await stripe.customers.list({ email: basicDetails.email, limit: 1 });
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing Stripe customer found", { customerId });
    } else {
      // Create a new customer if one doesn't exist
      const customer = await stripe.customers.create({
        email: basicDetails.email,
        name: `${basicDetails.firstName} ${basicDetails.lastName}`,
        metadata: {
          dob: basicDetails.dateOfBirth,
          stb_user_id: user?.id || "N/A",
        }
      });
      customerId = customer.id;
      logStep("New Stripe customer created", { customerId });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Student Travel Buddy - FullTimer Membership",
              description: "One-time payment for 1-year access.",
              images: [], // Optional: Add product image URL here
            },
            unit_amount: 2000, // $20.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success`,
      cancel_url: `${req.headers.get("origin")}/payment-cancel`,
      metadata: {
        firstName: basicDetails.firstName,
        lastName: basicDetails.lastName,
        dateOfBirth: basicDetails.dateOfBirth,
        email: basicDetails.email,
        isStudent: String(basicDetails.isStudent),
        agreedToTerms: String(basicDetails.agreedToTerms),
        stb_user_id: user?.id || "N/A", // Store Supabase user ID if available
      },
    });
    logStep("Stripe checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ sessionId: session.id, url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    logStep("Error in function", { message: error.message, stack: error.stack });
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

