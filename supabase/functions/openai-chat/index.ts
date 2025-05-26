
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

interface ChatGptPromptData {
  name: string;
  city: string;
  country: string;
  holidayType: string; // e.g., "Cultural Exploration"
  userDescription?: string;
}

serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, city, country, holidayType, userDescription }: ChatGptPromptData = await req.json();
    const openAiApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAiApiKey) {
      console.error('OPENAI_API_KEY is not set in Supabase secrets.');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured on the server. Personalized description unavailable.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    let prompt = `You are a friendly and enthusiastic travel assistant for students. 
Generate a short, engaging, and personalized travel vibe description (2-3 sentences) for a student named ${name}.
They are interested in a ${holidayType} style trip to ${city}, ${country}.`;

    if (userDescription && userDescription.trim() !== "") {
      prompt += ` They also mentioned this about their ideal trip: "${userDescription}". Incorporate this specific interest naturally into the vibe description if possible.`;
    } else {
      prompt += ` Focus on what makes ${city} special for a ${holidayType} trip for a student.`;
    }
    
    prompt += ` Make it sound exciting and tailored to a student's perspective, highlighting unique experiences. Do not include greetings like "Hello ${name}" or any introductory phrases. Just provide the vibe description.`;

    const messages = [
      { role: 'system', content: 'You are a helpful travel assistant specializing in student travel.' },
      { role: 'user', content: prompt },
    ];

    const body = JSON.stringify({
      model: 'gpt-4o-mini', // Using a cost-effective and capable model
      messages: messages,
      temperature: 0.7,
      max_tokens: 150,
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(errorData.error?.message || `OpenAI API request failed with status ${response.status}`);
    }

    const resultJson = await response.json();
    const personalizedDescription = resultJson.choices?.[0]?.message?.content?.trim();

    if (!personalizedDescription) {
      console.error('No content in OpenAI response:', resultJson);
      throw new Error('Failed to get a valid description from OpenAI.');
    }
    
    return new Response(
      JSON.stringify({ personalizedDescription }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('Error in Supabase function:', error);
    return new Response(
        JSON.stringify({ error: error.message || 'An internal server error occurred.' }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
