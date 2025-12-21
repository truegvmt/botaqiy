import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Coins, Flame, BookOpen, Target, Star, Shield, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProgress } from "@/hooks/useUserProgress";
import { supabase } from "@/integrations/supabase/client";
import EditProfileDialog from "@/components/EditProfileDialog";
import ShareStatsDialog from "@/components/ShareStatsDialog";

export default function Profile() {
  const { t, language } = useLanguage();
  const { progress, loading: progressLoading } = useUserProgress();
  const [profile, setProfile] = useState({
    username: language === 'ar' ? 'المستخدم' : 'User',
    description: language === 'ar' ? 'متحمس لتعلم اللغة العربية' : 'Arabic Learning Enthusiast',
    country: language === 'ar' ? 'السعودية' : 'Saudi Arabia',
    avatar: 'U'
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('username, description, country, avatar_url')
        .eq('id', user.id)
        .maybeSingle();
      
      if (data) {
        setProfile({
          username: data.username || 'User',
          description: data.description || (language === 'ar' ? 'متحمس لتعلم اللغة العربية' : 'Arabic Learning Enthusiast'),
          country: data.country || '',
          avatar: data.username?.charAt(0) || 'U'
        });
      }
    }
  };

  const stats = {
    totalCoins: progress.coins,
    currentStreak: progress.streak_days,
    totalCards: 0, // Will be calculated from sessions
    accuracy: 87,
    level: progress.level,
    xp: progress.level * 500
  };

  const badges = [
    { name: language === 'ar' ? 'الخطوات الأولى' : "First Steps", icon: Star, earned: true },
    { name: language === 'ar' ? 'محارب الأسبوع' : "Week Warrior", icon: Shield, earned: progress.streak_days >= 7 },
    { name: language === 'ar' ? 'جامع العملات' : "Coin Collector", icon: Coins, earned: progress.coins >= 100 },
    { name: language === 'ar' ? 'الأسبوع المثالي' : "Perfect Week", icon: Award, earned: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Profile Header */}
      <Card className="flashcard">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {profile.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center md:text-left space-y-2 flex-1">
              <h1 className="text-3xl font-bold">{profile.username}</h1>
              <p className="text-muted-foreground">{profile.description}</p>
              <p className="text-sm text-muted-foreground">{profile.country}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <div className="coin-counter">
                  <Coins className="w-4 h-4 mr-1" />
                  {stats.totalCoins} coins
                </div>
                <div className="streak-badge">
                  <Flame className="w-4 h-4 mr-1" />
                  {stats.currentStreak} day streak
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold text-accent">{t('level')} {stats.level}</div>
              <p className="text-sm text-muted-foreground">{stats.xp} XP</p>
              <div className="flex gap-2">
                <EditProfileDialog profile={profile} onSave={setProfile} />
                <ShareStatsDialog stats={stats} badges={badges} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-primary" />
            <div className="text-2xl font-bold">{stats.totalCards}</div>
            <p className="text-sm text-muted-foreground">{t('cardsStudied')}</p>
          </div>
        </Card>
        
        <Card className="text-center p-4">
          <div className="space-y-2">
            <Target className="w-8 h-8 mx-auto text-success" />
            <div className="text-2xl font-bold">{stats.accuracy}%</div>
            <p className="text-sm text-muted-foreground">{t('accuracy')}</p>
          </div>
        </Card>
        
        <Card className="text-center p-4">
          <div className="space-y-2">
            <Flame className="w-8 h-8 mx-auto text-streak-fire" />
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <p className="text-sm text-muted-foreground">{t('dayStreak')}</p>
          </div>
        </Card>
        
        <Card className="text-center p-4">
          <div className="space-y-2">
            <Coins className="w-8 h-8 mx-auto text-coin-gold" />
            <div className="text-2xl font-bold">{stats.totalCoins}</div>
            <p className="text-sm text-muted-foreground">{t('totalCoins')}</p>
          </div>
        </Card>
      </div>

      {/* Badges */}
      <Card className="flashcard">
        <CardHeader>
          <CardTitle>{t('achievementBadges')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.name} 
                className={`text-center p-4 rounded-xl border ${
                  badge.earned 
                    ? 'bg-accent/10 border-accent' 
                    : 'bg-muted/50 border-muted'
                }`}
              >
                <badge.icon 
                  className={`w-8 h-8 mx-auto mb-2 ${
                    badge.earned ? 'text-accent' : 'text-muted-foreground'
                  }`} 
                />
                <p className={`text-sm font-medium ${
                  badge.earned ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {badge.name}
                </p>
                {badge.earned && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {t('badgeEarned')}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}