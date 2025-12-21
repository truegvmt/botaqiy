-- Add missing columns to user_scores
ALTER TABLE public.user_scores 
ADD COLUMN IF NOT EXISTS total_questions INTEGER DEFAULT 3,
ADD COLUMN IF NOT EXISTS correct_answers INTEGER DEFAULT 0;

-- Drop foreign key constraint on user_scores.scenario_id if exists
ALTER TABLE public.user_scores 
DROP CONSTRAINT IF EXISTS user_scores_scenario_id_fkey;

-- Change scenario_id to TEXT if it's UUID
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_scores' 
    AND column_name = 'scenario_id' 
    AND data_type = 'uuid'
  ) THEN
    ALTER TABLE public.user_scores ALTER COLUMN scenario_id TYPE TEXT USING scenario_id::TEXT;
  END IF;
END $$;