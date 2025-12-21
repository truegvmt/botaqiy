import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { saveToStore, getFromStore, isOnline } from '@/lib/offline/db';

interface UserProgress {
  coins: number;
  level: number;
  streak_days: number;
  last_activity_date: string | null;
}

const DEFAULT_PROGRESS: UserProgress = {
  coins: 0,
  level: 1,
  streak_days: 0,
  last_activity_date: null
};

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Try to load from local storage for offline use
        const cachedProgress = await getFromStore<UserProgress & { user_id: string }>('user_progress', 'current');
        if (cachedProgress) {
          setProgress(cachedProgress);
        }
        setLoading(false);
        return;
      }

      setUserId(user.id);

      if (isOnline()) {
        const { data, error } = await supabase
          .from('user_progress')
          .select('coins, level, streak_days, last_activity_date')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          const progressData: UserProgress = {
            coins: data.coins ?? 0,
            level: data.level ?? 1,
            streak_days: data.streak_days ?? 0,
            last_activity_date: data.last_activity_date
          };
          setProgress(progressData);
          // Cache for offline use
          await saveToStore('user_progress', { ...progressData, user_id: user.id });
        }
      } else {
        // Load from cache when offline
        const cachedProgress = await getFromStore<UserProgress & { user_id: string }>('user_progress', user.id);
        if (cachedProgress) {
          setProgress(cachedProgress);
        }
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCoins = async (amount: number): Promise<boolean> => {
    if (!userId) return false;

    const newCoins = progress.coins + amount;
    if (newCoins < 0) return false; // Insufficient coins

    try {
      if (isOnline()) {
        const { error } = await supabase
          .from('user_progress')
          .update({ coins: newCoins })
          .eq('user_id', userId);

        if (error) throw error;
      }

      const updatedProgress = { ...progress, coins: newCoins };
      setProgress(updatedProgress);
      await saveToStore('user_progress', { ...updatedProgress, user_id: userId });

      return true;
    } catch (error) {
      console.error('Error updating coins:', error);
      return false;
    }
  };

  const addCoins = (amount: number) => updateCoins(amount);
  const deductCoins = (amount: number) => updateCoins(-amount);

  const refresh = () => loadProgress();

  return {
    progress,
    loading,
    addCoins,
    deductCoins,
    refresh,
    isAuthenticated: !!userId
  };
}
