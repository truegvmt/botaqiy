import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { scenarioId, difficulty, correctAnswers, totalQuestions, userId } = await req.json();
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Calculate points based on difficulty
    const pointsMap = {
      easy: 10,
      medium: 20,
      hard: 30
    };

    const basePoints = pointsMap[difficulty as keyof typeof pointsMap] || 10;
    const accuracyBonus = Math.floor((correctAnswers / totalQuestions) * basePoints);
    const totalPoints = basePoints + accuracyBonus;

    // Insert score record
    const { error: scoreError } = await supabaseClient
      .from('user_scores')
      .insert({
        user_id: userId,
        scenario_id: scenarioId,
        score: totalPoints,
        difficulty: difficulty
      });

    if (scoreError) throw scoreError;

    // Update user progress
    const { data: progress, error: progressError } = await supabaseClient
      .from('user_progress')
      .select('coins, level')
      .eq('user_id', userId)
      .single();

    if (progressError) throw progressError;

    const newCoins = progress.coins + totalPoints;
    const newLevel = Math.floor(newCoins / 100) + 1;

    const { error: updateError } = await supabaseClient
      .from('user_progress')
      .update({
        coins: newCoins,
        level: newLevel,
        last_activity_date: new Date().toISOString().split('T')[0]
      })
      .eq('user_id', userId);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ 
      points: totalPoints,
      newCoins,
      newLevel,
      accuracy: (correctAnswers / totalQuestions) * 100
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in calculate-score function:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});