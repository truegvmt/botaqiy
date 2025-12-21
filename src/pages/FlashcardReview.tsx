import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface Flashcard {
  front: string;
  back: string;
  difficulty: string;
}

export default function FlashcardReview() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  const loadSession = async () => {
    try {
      const { data, error } = await supabase
        .from('flashcard_sessions')
        .select('flashcards')
        .eq('id', sessionId)
        .maybeSingle();

      if (!data) {
        toast({
          title: t("error"),
          description: "Session not found",
          variant: "destructive",
        });
        navigate("/text-input");
        return;
      }

      if (error) throw error;
      setFlashcards(Array.isArray(data.flashcards) ? data.flashcards as unknown as Flashcard[] : []);
    } catch (error: any) {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">{t("loading")}</div>;
  }

  const progress = ((currentIndex + 1) / flashcards.length) * 100;
  const currentCard = flashcards[currentIndex];

  return (
    <div className="container mx-auto py-8 px-4" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("reviewFlashcards")}</h1>
          <Button variant="outline" onClick={() => navigate("/scenario-mode")}>
            {t("goToScenarios")}
          </Button>
        </div>

        <Progress value={progress} className="h-2" />

        <Card className="min-h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-center">
              {t("card")} {currentIndex + 1} / {flashcards.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
            <div className="text-2xl font-semibold">
              {showAnswer ? currentCard.back : currentCard.front}
            </div>

            <Button
              onClick={() => setShowAnswer(!showAnswer)}
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {showAnswer ? t("showQuestion") : t("showAnswer")}
            </Button>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("previous")}
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="gap-2"
          >
            {t("next")}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}