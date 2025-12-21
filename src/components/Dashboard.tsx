import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Target, TrendingUp, Calendar, Play, Coins, Flame, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { progress, loading } = useUserProgress();

  // Mock daily stats (can be connected to real data later)
  const dailyGoal = 20;
  const dailyProgress = 15;
  const cardsStudied = 89;
  const accuracy = 87;
  const progressPercentage = (dailyProgress / dailyGoal) * 100;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Welcome Section */}
      <div className="text-center space-y-3 animate-fade-in-up">
        <h1 className="text-4xl font-bold text-foreground">{t("welcomeBack")}</h1>
        <p className="text-xl text-muted-foreground">{t("readyToContinue")}</p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
        {/* Daily Progress */}
        <Card className="flashcard">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-primary" />
              <span>{t("dailyGoal")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{dailyProgress} / {dailyGoal} {t("card")}</span>
                <span className="font-semibold">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
            <p className="text-sm text-muted-foreground">
              {dailyGoal - dailyProgress} {t("cardsRemaining")}
            </p>
          </CardContent>
        </Card>

        {/* Streak */}
        <Card className="flashcard">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Flame className="w-5 h-5 text-streak-fire" />
              <span>{t("currentStreak")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-streak-fire">{progress.streak_days}</div>
              <p className="text-sm text-muted-foreground">{t("daysInRow")}</p>
              {progress.streak_days >= 7 && (
                <div className="streak-badge inline-flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{t("onFire")}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Total Coins */}
        <Card className="flashcard">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Coins className="w-5 h-5 text-coin-gold" />
              <span>{t("totalCoins")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold text-coin-gold">{progress.coins.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">{t("earnedCoins")}</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/rewards')}
              >
                {t("spendCoins")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Section */}
      <div className="text-center space-y-6 animate-fade-in-up">
        <Button 
          onClick={() => navigate('/text-input')}
          className="luxury-button text-lg px-8 py-4 h-auto"
        >
          <Play className="w-6 h-6 mr-2 rtl:ml-2 rtl:mr-0" />
          {t("startLearning")}
        </Button>
        
        <p className="text-sm text-muted-foreground">
          {t("continueWhere")}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
        <Card className="text-center p-6">
          <div className="space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-primary" />
            <div className="text-2xl font-bold">{cardsStudied}</div>
            <p className="text-sm text-muted-foreground">{t("cardsStudied")}</p>
          </div>
        </Card>
        
        <Card className="text-center p-6">
          <div className="space-y-2">
            <TrendingUp className="w-8 h-8 mx-auto text-success" />
            <div className="text-2xl font-bold">{accuracy}%</div>
            <p className="text-sm text-muted-foreground">{t("accuracy")}</p>
          </div>
        </Card>
        
        <Card className="text-center p-6">
          <div className="space-y-2">
            <Calendar className="w-8 h-8 mx-auto text-accent" />
            <div className="text-2xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">{t("activeDecks")}</p>
          </div>
        </Card>
        
        <Card className="text-center p-6">
          <div className="space-y-2">
            <Star className="w-8 h-8 mx-auto text-coin-gold" />
            <div className="text-2xl font-bold">{t("level")} {progress.level}</div>
            <p className="text-sm text-muted-foreground">{t("currentLevel")}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
