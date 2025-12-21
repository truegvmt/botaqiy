import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PurchaseRequest {
  userId: string;
  rewardId: string;
  rewardName: string;
  rewardType: string;
  cost: number;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, rewardId, rewardName, rewardType, cost } = await req.json() as PurchaseRequest;

    console.log(`Processing purchase: User ${userId}, Reward ${rewardId}, Cost ${cost}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get current user progress
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('coins')
      .eq('user_id', userId)
      .single();

    if (progressError) {
      console.error('Error fetching progress:', progressError);
      throw new Error('Failed to fetch user progress');
    }

    const currentCoins = progress?.coins ?? 0;

    // Check if user has enough coins
    if (currentCoins < cost) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Insufficient coins',
          currentCoins,
          required: cost
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Deduct coins
    const newCoins = currentCoins - cost;
    const { error: updateError } = await supabase
      .from('user_progress')
      .update({ coins: newCoins })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error updating coins:', updateError);
      throw new Error('Failed to update coins');
    }

    // Record the purchase in user_rewards table (if it exists)
    // This is optional - the table may not exist yet
    try {
      await supabase
        .from('user_rewards')
        .insert({
          user_id: userId,
          reward_id: rewardId,
          reward_name: rewardName,
          reward_type: rewardType,
          cost_paid: cost,
          purchased_at: new Date().toISOString()
        });
    } catch (e) {
      // Table might not exist, that's okay
      console.log('Could not record purchase in user_rewards:', e);
    }

    console.log(`Purchase successful: New balance ${newCoins}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        newCoins,
        message: `Successfully purchased ${rewardName}`
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Purchase error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
