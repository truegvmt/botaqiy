import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, Upload, Home, BookOpen, Gift, User, Info } from "lucide-react";

export default function TextInput() {
  const [text, setText] = useState("");
  const [flashcardCount, setFlashcardCount] = useState([10]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({ title: t("error"), description: t("enterText"), variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Extract and clean text
      const { data: extractData, error: extractError } = await supabase.functions.invoke('extract-text', {
        body: { text }
      });

      if (extractError) throw extractError;

      // Generate flashcards
      const { data: flashcardsData, error: flashcardsError } = await supabase.functions.invoke('generate-flashcards', {
        body: { text: extractData.cleaned, count: flashcardCount[0] }
      });

      if (flashcardsError) throw flashcardsError;

      // Save session
      const { data: session, error: sessionError } = await supabase
        .from('flashcard_sessions')
        .insert({
          user_id: user.id,
          title: `${t("session")} ${new Date().toLocaleDateString()}`,
          original_text: text,
          flashcard_count: flashcardCount[0],
          flashcards: flashcardsData.flashcards
        })
        .select()
        .single();

      if (sessionError) throw sessionError;

      toast({ title: t("flashcardsGenerated") });
      navigate(`/flashcard-review/${session.id}`);
    } catch (error: any) {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Navigation */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2">
            <Home className="h-4 w-4" />
            {t("home")}
          </Button>
        </Link>
        <Link to="/scenario-mode">
          <Button variant="outline" size="sm" className="gap-2">
            <BookOpen className="h-4 w-4" />
            {t("scenarioMode")}
          </Button>
        </Link>
        <Link to="/rewards">
          <Button variant="outline" size="sm" className="gap-2">
            <Gift className="h-4 w-4" />
            {t("rewards")}
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="outline" size="sm" className="gap-2">
            <User className="h-4 w-4" />
            {t("profile")}
          </Button>
        </Link>
        <Link to="/about">
          <Button variant="outline" size="sm" className="gap-2">
            <Info className="h-4 w-4" />
            {t("about")}
          </Button>
        </Link>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            {t("inputText")}
          </CardTitle>
          <CardDescription>{t("inputTextDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">{t("pasteText")}</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("textPlaceholder")}
              className="min-h-[300px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              {t("flashcardCount")}: {flashcardCount[0]}
            </label>
            <Slider
              value={flashcardCount}
              onValueChange={setFlashcardCount}
              min={5}
              max={30}
              step={1}
              className="w-full"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            <Upload className="w-4 h-4 mr-2" />
            {loading ? t("generating") : t("generateFlashcards")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
