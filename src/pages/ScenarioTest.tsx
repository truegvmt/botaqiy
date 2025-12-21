import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Trophy, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import { ChatBubble, ChatContainer } from "@/components/ChatBubble";
import { getScenarioById, type RuleBasedScenario } from "@/data/scenarios";

export default function ScenarioTest() {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { addCoins, refresh } = useUserProgress();
  
  const [scenario, setScenario] = useState<RuleBasedScenario | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  useEffect(() => {
    if (scenarioId) {
      const loadedScenario = getScenarioById(scenarioId);
      if (loadedScenario) {
        setScenario(loadedScenario);
      } else {
        toast({
          title: t("error"),
          description: t("scenarioNotFound"),
          variant: "destructive",
        });
        navigate("/scenario-mode");
      }
    }
  }, [scenarioId]);

  const handleAnswer = async () => {
    if (selectedAnswer === null || !scenario) return;

    const isCorrect = selectedAnswer === scenario.questions[currentQuestion].correctAnswer;
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    // Wait for feedback display
    setTimeout(() => {
      setShowFeedback(false);
      
      if (currentQuestion < scenario.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        finishTest(isCorrect);
      }
    }, 1500);
  };

  const finishTest = async (lastCorrect: boolean) => {
    if (!scenario) return;
    
    const finalCorrect = correctAnswers + (lastCorrect ? 1 : 0);
    const accuracy = finalCorrect / scenario.questions.length;
    const points = Math.round(scenario.points * accuracy);
    
    setEarnedPoints(points);
    
    // Add coins
    if (points > 0) {
      await addCoins(points);
      await refresh();
    }

    // Save score to database if authenticated
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('user_scores').insert({
          scenario_id: scenario.id, // Rule-based ID like 'easy-1'
          user_id: user.id,
          difficulty: scenario.difficulty,
          score: points,
          total_questions: scenario.questions.length,
          correct_answers: finalCorrect
        });
      }
    } catch (error) {
      console.error('Error saving score:', error);
    }

    setShowResults(true);
    toast({
      title: t("testCompleted"),
      description: `${t("earned")} ${points} ${t("coins")}!`
    });
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setShowResults(false);
    setShowFeedback(false);
    setEarnedPoints(0);
  };

  if (!scenario) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const accuracy = Math.round((correctAnswers / scenario.questions.length) * 100);
    
    return (
      <div className="container mx-auto py-8 px-6" dir={language === "ar" ? "rtl" : "ltr"}>
        <Card className="max-w-2xl mx-auto text-center animate-scale-in">
          <CardHeader className="pb-4">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-accent" />
            </div>
            <CardTitle className="text-2xl">
              {t("testCompleted")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">
                  {correctAnswers}/{scenario.questions.length}
                </div>
                <p className="text-sm text-muted-foreground">{t("correctAnswers")}</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-accent">
                  +{earnedPoints}
                </div>
                <p className="text-sm text-muted-foreground">{t("coinsEarned")}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t("accuracy")}</span>
                <span className="font-semibold">{accuracy}%</span>
              </div>
              <Progress value={accuracy} className="h-3" />
            </div>

            <div className="flex gap-4 justify-center pt-4">
              <Button onClick={() => navigate("/scenario-mode")} size="lg">
                {t("backToScenarios")}
              </Button>
              <Button variant="outline" onClick={restartTest} size="lg">
                <RefreshCw className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {t("retake")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / scenario.questions.length) * 100;
  const current = scenario.questions[currentQuestion];

  return (
    <div className="container mx-auto py-8 px-6" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{scenario.icon}</span>
            <div>
              <h1 className="text-xl font-bold">
                {language === 'ar' ? scenario.titleAr : scenario.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? scenario.descriptionAr : scenario.description}
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{t("question")} {currentQuestion + 1} / {scenario.questions.length}</span>
            <span className="font-semibold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Chat-style Question */}
        <Card>
          <CardContent className="p-6 space-y-6">
            <ChatContainer>
              <ChatBubble 
                message={language === 'ar' ? current.questionAr : current.question}
                avatar={scenario.icon}
              />
            </ChatContainer>

            {/* Answer Options */}
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => !showFeedback && setSelectedAnswer(parseInt(value))}
              disabled={showFeedback}
            >
              <div className="space-y-3">
                {(language === 'ar' ? current.optionsAr : current.options).map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectAnswer = index === current.correctAnswer;
                  const showCorrect = showFeedback && isCorrectAnswer;
                  const showWrong = showFeedback && isSelected && !isCorrectAnswer;

                  return (
                    <div 
                      key={index} 
                      className={`flex items-center gap-3 p-4 border rounded-xl transition-all ${
                        showCorrect ? 'border-green-500 bg-green-500/10' :
                        showWrong ? 'border-red-500 bg-red-500/10' :
                        isSelected ? 'border-primary bg-primary/5' :
                        'hover:bg-secondary/50'
                      }`}
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                        {option}
                      </Label>
                      {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      {showWrong && <XCircle className="w-5 h-5 text-red-500" />}
                    </div>
                  );
                })}
              </div>
            </RadioGroup>

            {/* Feedback Message */}
            {showFeedback && (
              <div className={`p-4 rounded-xl text-center animate-scale-in ${
                lastAnswerCorrect ? 'bg-green-500/10 text-green-700' : 'bg-red-500/10 text-red-700'
              }`}>
                <p className="font-semibold">
                  {lastAnswerCorrect ? t("correctAnswer") : t("wrongAnswer")}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleAnswer}
              disabled={selectedAnswer === null || showFeedback}
              className="w-full"
              size="lg"
            >
              {currentQuestion === scenario.questions.length - 1 ? t("finish") : t("next")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
