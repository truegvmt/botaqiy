# Data Persistence Guide for Botaqiy

This guide explains how user data is persisted in the Botaqiy application using Supabase (Lovable Cloud).

## Architecture Overview

Botaqiy uses Supabase for backend data persistence with Row Level Security (RLS) ensuring each user can only access their own data.

## Database Tables

### 1. `profiles`
Stores user profile information.
- **Primary Key**: `id` (UUID, references `auth.users`)
- **Fields**: `username`, `avatar_url`, `country`, `description`, `created_at`, `updated_at`
- **RLS**: Users can view all profiles, but only update their own

### 2. `user_progress`
Tracks user gamification data.
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `user_id` (references `auth.users`)
- **Fields**: `coins`, `level`, `streak_days`, `last_activity_date`
- **RLS**: Users can only view/update their own progress

### 3. `flashcard_sessions`
Stores generated flashcard sessions.
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `user_id` (references `auth.users`)
- **Fields**: `title`, `original_text`, `flashcard_count`, `flashcards` (JSONB)
- **RLS**: Users can only CRUD their own sessions

### 4. `scenarios` (for AI-generated scenarios)
Stores dynamically generated scenarios.
- **Primary Key**: `id` (UUID)
- **Foreign Keys**: `user_id`, `session_id`
- **Fields**: `title`, `description`, `difficulty`, `questions` (JSONB)
- **RLS**: Users can only view/create their own scenarios

### 5. `user_scores`
Tracks scenario test scores.
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `user_id` (references `auth.users`)
- **Fields**: `scenario_id` (TEXT), `difficulty`, `score`, `correct_answers`, `total_questions`
- **RLS**: Users can only view/insert their own scores

## Authentication Flow

1. User signs up/logs in via `/auth` page
2. Supabase Auth creates a record in `auth.users`
3. A database trigger `handle_new_user()` automatically creates:
   - A record in `profiles` with default username
   - A record in `user_progress` with default values (0 coins, level 1, 0 streak)

## How Data Persists

### On User Registration
```sql
-- Trigger function (already set up)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', 'User'));
  
  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Coin Transactions
Coins are updated via:
1. **Scenario completion**: `ScenarioTest.tsx` calls `addCoins()` after test
2. **Reward purchases**: `purchase-reward` edge function deducts coins

### Streak Calculation
The `useUserProgress` hook manages streak:
- Checks `last_activity_date` against current date
- Increments streak if consecutive days
- Resets to 1 if a day is missed

## Edge Functions

### `purchase-reward`
- Validates user authentication
- Checks sufficient coin balance
- Deducts coins atomically
- Records purchase in `user_rewards` table

### `generate-flashcards`
- Accepts text input
- Uses AI to generate flashcards
- Returns structured flashcard data

### `extract-text`
- Cleans and processes raw text input
- Prepares text for flashcard generation

## Setting Up for Development

1. **Ensure Lovable Cloud is enabled** in project settings

2. **Run migrations** (handled automatically by Lovable):
   - Tables are created via Supabase migrations
   - RLS policies are applied automatically

3. **Configure Auth**:
   - Email auto-confirm should be enabled
   - Social providers can be added in Supabase dashboard

## Security Best Practices

1. **Never expose `service_role` key** in client code
2. **All client queries** use `anon` key with RLS
3. **Edge functions** use `service_role` for privileged operations
4. **User data isolation** is enforced by `auth.uid() = user_id` policies

## Offline Support

The app includes offline support via IndexedDB (`src/lib/offline/db.ts`):
- Syncs progress when back online
- Caches user data locally
- Queue operations for later sync

## Troubleshooting

### User data not persisting
1. Check if user is authenticated: `supabase.auth.getUser()`
2. Verify RLS policies allow the operation
3. Check browser console for Supabase errors

### Coins not updating
1. Ensure `user_progress` record exists for user
2. Check `purchase-reward` function logs
3. Verify coin balance before purchase

### Streak resetting unexpectedly
1. Check timezone handling in `last_activity_date`
2. Verify the date comparison logic in `useUserProgress`

## Database Schema Reference

See `docs/SCHEMA.sql` for complete schema with all tables, constraints, and RLS policies.
