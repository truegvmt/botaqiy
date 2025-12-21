-- =============================================
-- BOTAQIY DATABASE SCHEMA
-- Comprehensive schema for the Arabic learning app
-- =============================================

-- =============================================
-- 1. PROFILES TABLE
-- Stores user profile information
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  avatar_url TEXT,
  description TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- =============================================
-- 2. USER PROGRESS TABLE
-- Tracks coins, level, streak for gamification
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  coins INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- 3. FLASHCARD SESSIONS TABLE
-- Stores user's flashcard study sessions
-- =============================================
CREATE TABLE IF NOT EXISTS public.flashcard_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  original_text TEXT NOT NULL,
  flashcards JSONB NOT NULL,
  flashcard_count INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.flashcard_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions" ON public.flashcard_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions" ON public.flashcard_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" ON public.flashcard_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- 4. SCENARIOS TABLE
-- Stores generated scenarios for testing
-- =============================================
CREATE TABLE IF NOT EXISTS public.scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.flashcard_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  questions JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scenarios" ON public.scenarios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own scenarios" ON public.scenarios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- 5. USER SCORES TABLE
-- Records scenario test results
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scenario_id TEXT NOT NULL, -- Can be UUID or rule-based scenario ID (e.g., 'easy-1')
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  score INTEGER NOT NULL,
  total_questions INTEGER DEFAULT 3,
  correct_answers INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scores" ON public.user_scores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scores" ON public.user_scores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- 6. REWARDS TABLE (Reference Data)
-- Defines available rewards in the shop
-- =============================================
CREATE TABLE IF NOT EXISTS public.rewards (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  cost INTEGER NOT NULL,
  type TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default rewards
INSERT INTO public.rewards (id, name, name_ar, description, description_ar, cost, type, icon) VALUES
  ('golden-avatar', 'Golden Avatar', 'صورة رمزية ذهبية', 'Stand out with a premium golden avatar frame.', 'تميّز بإطار صورة رمزية ذهبية فاخرة.', 500, 'avatar', 'star'),
  ('streak-shield', 'Streak Shield', 'درع السلسلة', 'Protect your streak with 3 free freezes.', 'احمِ سلسلتك بـ3 تجميدات مجانية.', 300, 'badge', 'shield'),
  ('hint-pack', 'Hint Pack (5x)', 'حزمة تلميحات (5×)', 'Get hints to reveal part of answers.', 'احصل على تلميحات لكشف جزء من الإجابات.', 150, 'hint', 'lightbulb'),
  ('extra-slot', 'Extra Deck Slot', 'فتحة مجموعة إضافية', 'Expand with an additional deck slot.', 'وسّع بفتحة مجموعة إضافية.', 750, 'slot', 'plus')
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- 7. USER REWARDS TABLE
-- Tracks rewards purchased by users
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_id TEXT NOT NULL,
  reward_name TEXT NOT NULL,
  reward_type TEXT NOT NULL,
  cost_paid INTEGER NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rewards" ON public.user_rewards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own rewards" ON public.user_rewards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- 8. SYNC QUEUE TABLE (Offline Support)
-- Stores pending sync operations
-- =============================================
CREATE TABLE IF NOT EXISTS public.sync_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('create', 'update', 'delete')),
  table_name TEXT NOT NULL,
  data JSONB NOT NULL,
  synced BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.sync_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own sync queue" ON public.sync_queue
  FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', 'User'));
  
  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at columns
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS update_user_progress_updated_at ON public.user_progress;
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================
CREATE INDEX IF NOT EXISTS idx_flashcard_sessions_user_id ON public.flashcard_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_scenarios_user_id ON public.scenarios(user_id);
CREATE INDEX IF NOT EXISTS idx_scenarios_session_id ON public.scenarios(session_id);
CREATE INDEX IF NOT EXISTS idx_user_scores_user_id ON public.user_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_user_rewards_user_id ON public.user_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_queue_user_synced ON public.sync_queue(user_id, synced);
