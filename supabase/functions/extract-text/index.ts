import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid text input' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Clean and preprocess text
    const cleaned = text
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s\u0600-\u06FF.,!?;:()\-]/g, '')
      .trim();

    // Split into sentences
    const sentences = cleaned.split(/[.!?]+/).filter(s => s.trim().length > 0);

    return new Response(JSON.stringify({ 
      cleaned,
      sentences,
      wordCount: cleaned.split(/\s+/).length 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in extract-text function:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});