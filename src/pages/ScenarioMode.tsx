import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Target, Zap, Award, ArrowRight } from "lucide-react";
import { getScenariosByDifficulty } from "@/data/scenarios";

export default function ScenarioMode() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);

  const difficultyConfig = {
    easy: { 
      icon: Target, 
      color: 'text-green-500', 
      bgColor: 'bg-green-500/10',
      points: 10 
    },
    medium: { 
      icon: Zap, 
      color: 'text-yellow-500', 
      bgColor: 'bg-yellow-500/10',
      points: 20 
    },
    hard: { 
      icon: Award, 
      color: 'text-red-500', 
      bgColor: 'bg-red-500/10',
      points: 30 
    }
  };

  const handleScenarioSelect = (scenarioId: string) => {
    navigate(`/scenario-test/${scenarioId}`);
  };

  const filteredScenarios = selectedDifficulty 
    ? getScenariosByDifficulty(selectedDifficulty) 
    : [];

  return (
    <div className="container mx-auto py-8 px-6" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">{t("scenarioMode")}</h1>
          <p className="text-muted-foreground text-lg">{t("scenarioModeDesc")}</p>
        </div>

        {/* Difficulty Selection */}
        <div className="grid gap-6 md:grid-cols-3">
          {(['easy', 'medium', 'hard'] as const).map((difficulty) => {
            const config = difficultyConfig[difficulty];
            const Icon = config.icon;
            const isSelected = selectedDifficulty === difficulty;
            
            return (
              <Card 
                key={difficulty}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-primary shadow-lg scale-[1.02]' : ''
                }`}
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                <CardHeader className="space-y-3">
                  <div className={`w-14 h-14 rounded-xl ${config.bgColor} flex items-center justify-center mx-auto`}>
                    <Icon className={`w-7 h-7 ${config.color}`} />
                  </div>
                  <CardTitle className="text-center text-xl">
                    {t(difficulty)}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {t(`${difficulty}Desc`)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="text-sm px-4 py-1">
                    {config.points} {t("points")}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Scenario List */}
        {selectedDifficulty && (
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold">
              {t("chooseScenario")}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {filteredScenarios.map((scenario) => (
                <Card 
                  key={scenario.id} 
                  className="group cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => handleScenarioSelect(scenario.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{scenario.icon}</span>
                        <div>
                          <CardTitle className="text-lg">
                            {language === 'ar' ? scenario.titleAr : scenario.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {language === 'ar' ? scenario.descriptionAr : scenario.description}
                          </CardDescription>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {scenario.questions.length} {t("questions")}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {scenario.points} {t("points")}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedDifficulty && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">{t("selectDifficultyPrompt")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
