import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Brain,
  Zap,
  Trophy,
  Sparkles,
  Target,
  ChevronRight,
  Star,
  BookOpen,
  Award,
  Languages,
  Upload,
  FileText,
  TestTube,
} from "lucide-react";
import dallahLogo from "@/assets/dallah-logo.png";

const translations = {
  en: {
    hero: {
      tagline: "Master Arabic through intelligent adaptive learning and AI-powered scenarios",
      startLearning: "Start Learning",
      learnMore: "Learn More",
      premiumLearning: "Premium Learning",
      adaptiveLearning: "Adaptive Learning",
    },
    badges: {
      aiPowered: "AI-Powered Flashcards",
      scenarioBased: "Scenario Testing",
      adaptive: "Adaptive Difficulty",
      rewards: "Gamified Rewards",
    },
    features: {
      title: "Why Choose Botaqiy?",
      subtitle: "Experience a revolutionary approach to learning Arabic",
      intelligentSRS: {
        title: "AI-Powered Flashcards",
        desc: "Transform any text into personalized flashcards with our AI. Adaptive difficulty adjusts to your learning pace for maximum retention.",
      },
      scenarioBased: {
        title: "Scenario-Based Testing",
        desc: "Apply your knowledge in realistic situations. AI-generated scenarios test your understanding in context.",
      },
      adaptiveDifficulty: {
        title: "Adaptive Difficulty",
        desc: "System adjusts from easy to hard based on your performance. Challenge yourself and earn more points as you improve.",
      },
      gamifiedRewards: {
        title: "Gamified Rewards",
        desc: "Earn coins and unlock rewards. Complete scenarios at different difficulty levels: Easy (10pts), Medium (20pts), Hard (30pts).",
      },
      textToLearning: {
        title: "Text to Learning",
        desc: "Upload any Arabic text, PDF, or document. Our AI extracts key concepts and generates targeted flashcards automatically.",
      },
      luxuriousExperience: {
        title: "Beautiful Interface",
        desc: "Immerse yourself in a beautifully crafted interface with smooth animations and elegant design.",
      },
    },
    journey: {
      title: "Your Learning Journey",
      subtitle: "Four simple steps to mastering Arabic",
      step1: { title: "Upload Text", desc: "Upload or paste any Arabic text you want to learn from" },
      step2: { title: "Generate Flashcards", desc: "AI creates personalized flashcards adapted to your level" },
      step3: { title: "Test in Scenarios", desc: "Apply knowledge in realistic AI-generated scenarios" },
      step4: { title: "Earn & Progress", desc: "Complete tests, earn points, and track your progress" },
    },
    cta: {
      title: "Ready to Master Arabic?",
      subtitle: "Join Botaqiy today and experience the most engaging way to learn Arabic through intelligent flashcards and AI-powered scenarios.",
      getStarted: "Get Started Free",
      exploreMore: "Learn More",
    },
    footer: {
      subtitle: "Elevating Arabic learning through intelligent AI-powered education",
      about: "About",
      profile: "Profile",
      rewards: "Rewards",
    },
  },
  ar: {
    hero: {
      tagline: "إتقان العربية من خلال التعلم التكيفي الذكي والسيناريوهات المدعومة بالذكاء الاصطناعي",
      startLearning: "ابدأ التعلم",
      learnMore: "اعرف المزيد",
      premiumLearning: "تعلم مميز",
      adaptiveLearning: "تعلم تكيفي",
    },
    badges: {
      aiPowered: "بطاقات ذكية",
      scenarioBased: "اختبار سيناريو",
      adaptive: "صعوبة تكيفية",
      rewards: "مكافآت مُلعَّبة",
    },
    features: {
      title: "لماذا تختار Botaqiy؟",
      subtitle: "اختبر نهجاً ثورياً لتعلم اللغة العربية",
      intelligentSRS: {
        title: "بطاقات تعليمية مدعومة بالذكاء الاصطناعي",
        desc: "حوّل أي نص إلى بطاقات تعليمية مخصصة باستخدام الذكاء الاصطناعي. صعوبة تكيفية تتكيف مع وتيرة تعلمك لأقصى احتفاظ.",
      },
      scenarioBased: {
        title: "اختبار قائم على السيناريوهات",
        desc: "طبّق معرفتك في مواقف واقعية. سيناريوهات يولدها الذكاء الاصطناعي تختبر فهمك في السياق.",
      },
      adaptiveDifficulty: {
        title: "صعوبة تكيفية",
        desc: "النظام يتكيف من سهل إلى صعب بناءً على أدائك. تحدَّ نفسك واكسب المزيد من النقاط كلما تحسنت.",
      },
      gamifiedRewards: {
        title: "مكافآت مُلعَّبة",
        desc: "اكسب العملات وافتح المكافآت. أكمل السيناريوهات بمستويات صعوبة مختلفة: سهل (10 نقاط)، متوسط (20 نقطة)، صعب (30 نقطة).",
      },
      textToLearning: {
        title: "من النص إلى التعلم",
        desc: "ارفع أي نص عربي أو PDF أو مستند. ذكاؤنا الاصطناعي يستخرج المفاهيم الأساسية ويولد بطاقات تعليمية مستهدفة تلقائياً.",
      },
      luxuriousExperience: {
        title: "واجهة جميلة",
        desc: "انغمس في واجهة مصممة بشكل جميل مع رسوم متحركة سلسة وتصميم أنيق.",
      },
    },
    journey: {
      title: "رحلة تعلمك",
      subtitle: "أربع خطوات بسيطة لإتقان اللغة العربية",
      step1: { title: "رفع النص", desc: "ارفع أو الصق أي نص عربي تريد التعلم منه" },
      step2: { title: "إنشاء البطاقات", desc: "الذكاء الاصطناعي ينشئ بطاقات تعليمية مخصصة متكيفة مع مستواك" },
      step3: { title: "الاختبار في السيناريوهات", desc: "طبّق المعرفة في سيناريوهات واقعية يولدها الذكاء الاصطناعي" },
      step4: { title: "اكسب وتقدّم", desc: "أكمل الاختبارات، اكسب النقاط، وتتبع تقدمك" },
    },
    cta: {
      title: "مستعد لإتقان اللغة العربية؟",
      subtitle: "انضم إلى Botaqiy اليوم واختبر أكثر الطرق إثارة لتعلم اللغة العربية من خلال البطاقات التعليمية الذكية والسيناريوهات المدعومة بالذكاء الاصطناعي.",
      getStarted: "ابدأ مجاناً",
      exploreMore: "اعرف المزيد",
    },
    footer: {
      subtitle: "رفع مستوى تعلم اللغة العربية من خلال التعليم الذكي المدعوم بالذكاء الاصطناعي",
      about: "حول",
      profile: "الملف الشخصي",
      rewards: "المكافآت",
    },
  },
};

const Landing = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";

  return (
    <div className="min-h-screen bg-background overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Language Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleLanguage}
          variant="outline"
          size="icon"
          className="luxury-button shadow-lg"
        >
          <Languages className="w-5 h-5" />
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 geometric-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-background pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Logo/Brand */}
          <div className="space-y-4">
            <img src={dallahLogo} alt="Botaqiy Logo" className="w-24 h-24 mx-auto animate-fade-in" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Botaqiy
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-muted-foreground">
              Arabic Learning Made Intelligent
            </p>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {t.hero.tagline}
          </p>

          {/* Key Value Props */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Brain className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.badges.aiPowered}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <TestTube className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.badges.scenarioBased}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Zap className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.badges.adaptive}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Trophy className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.badges.rewards}
            </Badge>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="luxury-button text-lg px-8 py-6"
              onClick={() => navigate("/auth")}
            >
              {t.hero.startLearning}
              <ChevronRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2"
              onClick={() => navigate("/about")}
            >
              {t.hero.learnMore}
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 pt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <span className="font-semibold text-foreground">{t.hero.premiumLearning}</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="font-semibold text-foreground">{t.hero.adaptiveLearning}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {t.features.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Feature Cards */}
            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-[var(--luxury-shadow)]">
                  <Brain className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t.features.intelligentSRS.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.features.intelligentSRS.desc}
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[var(--card-shadow)]">
                  <TestTube className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t.features.scenarioBased.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.features.scenarioBased.desc}
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-[var(--luxury-shadow)]">
                  <Zap className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t.features.adaptiveDifficulty.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.features.adaptiveDifficulty.desc}
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[var(--card-shadow)]">
                  <Trophy className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t.features.gamifiedRewards.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.features.gamifiedRewards.desc}
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-[var(--luxury-shadow)]">
                  <Upload className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t.features.textToLearning.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.features.textToLearning.desc}
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[var(--card-shadow)]">
                  <Sparkles className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t.features.luxuriousExperience.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.features.luxuriousExperience.desc}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 geometric-pattern">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {t.journey.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.journey.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {[
              {
                step: "01",
                icon: Upload,
                title: t.journey.step1.title,
                description: t.journey.step1.desc,
              },
              {
                step: "02",
                icon: FileText,
                title: t.journey.step2.title,
                description: t.journey.step2.desc,
              },
              {
                step: "03",
                icon: TestTube,
                title: t.journey.step3.title,
                description: t.journey.step3.desc,
              },
              {
                step: "04",
                icon: Award,
                title: t.journey.step4.title,
                description: t.journey.step4.desc,
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <Card className="flashcard text-center h-full">
                  <div className="space-y-4">
                    <div className="text-6xl font-bold text-accent/20">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-[var(--luxury-shadow)]">
                      <item.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            {t.cta.title}
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-card text-card-foreground hover:bg-card/90"
              onClick={() => navigate("/auth")}
            >
              {t.cta.getStarted}
              <ChevronRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate("/about")}
            >
              {t.cta.exploreMore}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card/50 border-t">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="flex justify-center items-center gap-2">
            <img src={dallahLogo} alt="Botaqiy Logo" className="w-8 h-8" />
            <h3 className="text-2xl font-bold text-foreground">Botaqiy</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {t.footer.subtitle}
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <button onClick={() => navigate("/about")} className="hover:text-foreground transition-colors">
              {t.footer.about}
            </button>
            <button onClick={() => navigate("/profile")} className="hover:text-foreground transition-colors">
              {t.footer.profile}
            </button>
            <button onClick={() => navigate("/rewards")} className="hover:text-foreground transition-colors">
              {t.footer.rewards}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
