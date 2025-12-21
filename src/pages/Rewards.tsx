import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Star, Shield, Lightbulb, Plus, Check, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Reward {
  id: string;
  name: string;
  nameAr: string;
  cost: number;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  descriptionAr: string;
}

const rewards: Reward[] = [
  { 
    id: 'golden-avatar', 
    name: "Golden Avatar", 
    nameAr: "صورة رمزية ذهبية",
    cost: 500, 
    type: "avatar", 
    icon: Star,
    description: "Stand out with a premium golden avatar frame.",
    descriptionAr: "تميّز بإطار صورة رمزية ذهبية فاخرة."
  },
  { 
    id: 'streak-shield', 
    name: "Streak Shield", 
    nameAr: "درع السلسلة",
    cost: 300, 
    type: "badge", 
    icon: Shield,
    description: "Protect your streak with 3 free freezes.",
    descriptionAr: "احمِ سلسلتك بـ3 تجميدات مجانية."
  },
  { 
    id: 'hint-pack', 
    name: "Hint Pack (5x)", 
    nameAr: "حزمة تلميحات (5×)",
    cost: 150, 
    type: "hint", 
    icon: Lightbulb,
    description: "Get hints to reveal part of answers.",
    descriptionAr: "احصل على تلميحات لكشف جزء من الإجابات."
  },
  { 
    id: 'extra-slot', 
    name: "Extra Deck Slot", 
    nameAr: "فتحة مجموعة إضافية",
    cost: 750, 
    type: "slot", 
    icon: Plus,
    description: "Expand with an additional deck slot.",
    descriptionAr: "وسّع بفتحة مجموعة إضافية."
  },
];

export default function Rewards() {
  const { t, language } = useLanguage();
  const { progress, deductCoins, refresh, isAuthenticated } = useUserProgress();
  const { toast } = useToast();
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [purchased, setPurchased] = useState<string[]>([]);

  const handlePurchase = async (reward: Reward) => {
    if (purchasing) return;
    
    if (!isAuthenticated) {
      toast({
        title: t("error"),
        description: t("loginRequired"),
        variant: "destructive"
      });
      return;
    }

    if (progress.coins < reward.cost) {
      toast({
        title: t("insufficientCoins"),
        description: t("notEnoughCoinsDesc"),
        variant: "destructive"
      });
      return;
    }

    setPurchasing(reward.id);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase.functions.invoke('purchase-reward', {
        body: {
          userId: user.id,
          rewardId: reward.id,
          rewardName: reward.name,
          rewardType: reward.type,
          cost: reward.cost
        }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error);

      await refresh();
      setPurchased(prev => [...prev, reward.id]);
      
      toast({
        title: t("purchaseSuccess"),
        description: `${language === 'ar' ? reward.nameAr : reward.name} - ${t("purchased")}!`
      });
    } catch (error: any) {
      console.error('Purchase error:', error);
      toast({
        title: t("error"),
        description: error.message || t("purchaseFailed"),
        variant: "destructive"
      });
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">{t('rewardsShop')}</h1>
        <p className="text-muted-foreground">{t('rewardsDesc')}</p>
        <div className="coin-counter inline-flex items-center text-lg">
          <Coins className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
          {progress.coins.toLocaleString()} {t('coinsAvailable')}
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {rewards.map((reward) => {
          const Icon = reward.icon;
          const isPurchasing = purchasing === reward.id;
          const isPurchased = purchased.includes(reward.id);
          const canAfford = progress.coins >= reward.cost;

          return (
            <Card key={reward.id} className="flashcard flex flex-col">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <CardTitle className="text-lg">
                  {language === 'ar' ? reward.nameAr : reward.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? reward.descriptionAr : reward.description}
                </p>
                <div className="space-y-3">
                  <div className="coin-counter inline-flex items-center">
                    <Coins className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                    {reward.cost}
                  </div>
                  <Button 
                    className="w-full" 
                    variant={isPurchased ? "secondary" : canAfford ? "default" : "outline"}
                    disabled={isPurchasing || isPurchased || !canAfford}
                    onClick={() => handlePurchase(reward)}
                  >
                    {isPurchasing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 animate-spin" />
                        {t('purchasing')}
                      </>
                    ) : isPurchased ? (
                      <>
                        <Check className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        {t('purchased')}
                      </>
                    ) : !canAfford ? (
                      t('insufficientCoins')
                    ) : (
                      t('purchase')
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
