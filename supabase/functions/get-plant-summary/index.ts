// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.


import {GoogleGenerativeAI} from "npm:@google/generative-ai";
import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.7.1'

console.log("Hello from Functions!")

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GeminiApiKey = Deno.env.get("GEMINI_API_KEY")!;

const genAI = new GoogleGenerativeAI(GeminiApiKey);

const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});


console.log("Hello from Functions!")

// @ts-ignore
Deno.serve(async (req) => {

  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', {headers: corsHeaders})
  }

  let data = await req.json()

  console.log("DATA: ", data);

  const prompt = "Give a fun fact about this plant: " + data.name + ". Do not use any markdown formatting in your response and keep it to a sentence or two. You are not responding to a question this is a fact that will be put into a fact screen.";
  const result = await model.generateContent(prompt);

  return new Response(
    JSON.stringify({ data: result.response.text() }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/get-plant-summary' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
