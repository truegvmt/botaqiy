import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Auth
    welcome: "Welcome",
    login: "Login",
    signup: "Sign Up",
    loginDesc: "Enter your credentials to access your account",
    signupDesc: "Create a new account to get started",
    username: "Username",
    email: "Email",
    password: "Password",
    enterUsername: "Enter your username",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    loading: "Loading...",
    loginSuccess: "Successfully logged in!",
    signupSuccess: "Account created successfully!",
    error: "Error",
    needAccount: "Need an account? Sign up",
    haveAccount: "Already have an account? Login",
    loginRequired: "Please login to continue",
    
    // Text Input
    inputText: "Input Text",
    inputTextDesc: "Upload or paste text to generate flashcards",
    pasteText: "Paste your text here",
    textPlaceholder: "Enter or paste Arabic text to generate flashcards...",
    flashcardCount: "Number of Flashcards",
    generateFlashcards: "Generate Flashcards",
    generating: "Generating...",
    enterText: "Please enter some text",
    flashcardsGenerated: "Flashcards generated successfully!",
    
    // Flashcard Review
    reviewFlashcards: "Review Flashcards",
    card: "Card",
    showAnswer: "Show Answer",
    showQuestion: "Show Question",
    previous: "Previous",
    next: "Next",
    goToScenarios: "Go to Scenarios",
    
    // Scenario Mode
    scenarioMode: "Scenario Mode",
    scenarioModeDesc: "Test your knowledge in realistic situations",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    easyDesc: "Basic application of concepts",
    mediumDesc: "Moderate challenge with context",
    hardDesc: "Advanced real-world scenarios",
    points: "points",
    previousScenarios: "Previous Scenarios",
    takeTest: "Take Test",
    scenarioGenerated: "Scenario generated successfully!",
    chooseScenario: "Choose a Scenario",
    selectDifficultyPrompt: "Select a difficulty level above to see available scenarios",
    questions: "questions",
    scenarioNotFound: "Scenario not found",
    
    // Scenario Test
    question: "Question",
    finish: "Finish",
    testCompleted: "Test Completed!",
    correctAnswers: "Correct Answers",
    earned: "You earned",
    goHome: "Go Home",
    retake: "Retake Test",
    backToScenarios: "Back to Scenarios",
    coinsEarned: "Coins Earned",
    accuracy: "Accuracy",
    correctAnswer: "Correct! Well done!",
    wrongAnswer: "Not quite right. Keep learning!",
    
    // Navigation
    home: "Home",
    profile: "Profile",
    rewards: "Rewards",
    logout: "Logout",
    about: "About",
    
    // Profile
    editProfile: "Edit Profile",
    shareStats: "Share Stats",
    coins: "Coins",
    level: "Level",
    streak: "Day Streak",
    dayStreak: "Day Streak",
    badges: "Badges",
    achievementBadges: "Achievement Badges",
    sessions: "Sessions Completed",
    description: "Description",
    country: "Country",
    badgeEarned: "Earned",
    
    // Rewards
    rewardsShop: "Rewards Shop",
    rewardsDesc: "Redeem your coins for exclusive rewards",
    unlockBadge: "Unlock Badge",
    unlockAvatar: "Unlock Avatar",
    session: "Session",
    coinsAvailable: "coins available",
    purchase: "Purchase",
    purchasing: "Purchasing...",
    purchased: "Purchased",
    purchaseSuccess: "Purchase Successful!",
    purchaseFailed: "Purchase failed. Please try again.",
    insufficientCoins: "Not enough coins",
    notEnoughCoinsDesc: "Earn more coins by completing scenarios!",
    
    // Dashboard
    startLearning: "Start Learning",
    continueSession: "Continue Session",
    mySessions: "My Sessions",
    dailyGoal: "Daily Goal",
    cardsRemaining: "cards remaining",
    currentStreak: "Current Streak",
    daysInRow: "days in a row",
    onFire: "On fire!",
    totalCoins: "Total Coins",
    earnedCoins: "earned coins",
    spendCoins: "Spend Coins",
    startSession: "Start SRS Session",
    continueWhere: "Continue where you left off",
    cardsStudied: "Cards Studied",
    activeDecks: "Active Decks",
    currentLevel: "Current Level",
    welcomeBack: "Welcome back!",
    readyToContinue: "Ready to continue your Arabic journey?",
    
    // Landing
    appName: "Botaqiy",
    textInput: "Text Input",
    tagline: "Arabic, Your Way",
    heroTitle: "Master Arabic Through Adaptive Learning",
    heroDesc: "Transform any text into personalized flashcards and realistic scenarios. Learn at your own pace with AI-powered adaptive difficulty.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    
    // About
    aboutApp: "About Botaqiy",
    appVision: "Our Vision",
    howItWorks: "How It Works",
    contactUs: "Contact Us",
    
    // Common
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
    confirm: "Confirm",
    back: "Back",
    offline: "Offline",
    online: "Online",
  },
  ar: {
    // Auth
    welcome: "مرحباً",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    loginDesc: "أدخل بياناتك للدخول إلى حسابك",
    signupDesc: "أنشئ حساباً جديداً للبدء",
    username: "اسم المستخدم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    enterUsername: "أدخل اسم المستخدم",
    enterEmail: "أدخل البريد الإلكتروني",
    enterPassword: "أدخل كلمة المرور",
    loading: "جارٍ التحميل...",
    loginSuccess: "تم تسجيل الدخول بنجاح!",
    signupSuccess: "تم إنشاء الحساب بنجاح!",
    error: "خطأ",
    needAccount: "تحتاج إلى حساب؟ سجّل الآن",
    haveAccount: "لديك حساب؟ سجّل الدخول",
    loginRequired: "يرجى تسجيل الدخول للمتابعة",
    
    // Text Input
    inputText: "إدخال النص",
    inputTextDesc: "قم بتحميل أو لصق نص لإنشاء بطاقات تعليمية",
    pasteText: "الصق نصك هنا",
    textPlaceholder: "أدخل أو الصق نصاً عربياً لإنشاء بطاقات تعليمية...",
    flashcardCount: "عدد البطاقات",
    generateFlashcards: "إنشاء البطاقات",
    generating: "جارٍ الإنشاء...",
    enterText: "يرجى إدخال نص",
    flashcardsGenerated: "تم إنشاء البطاقات بنجاح!",
    
    // Flashcard Review
    reviewFlashcards: "مراجعة البطاقات",
    card: "بطاقة",
    showAnswer: "إظهار الإجابة",
    showQuestion: "إظهار السؤال",
    previous: "السابق",
    next: "التالي",
    goToScenarios: "الذهاب إلى السيناريوهات",
    
    // Scenario Mode
    scenarioMode: "وضع السيناريو",
    scenarioModeDesc: "اختبر معرفتك في مواقف واقعية",
    easy: "سهل",
    medium: "متوسط",
    hard: "صعب",
    easyDesc: "تطبيق أساسي للمفاهيم",
    mediumDesc: "تحدٍ متوسط مع سياق",
    hardDesc: "سيناريوهات متقدمة من العالم الواقعي",
    points: "نقاط",
    previousScenarios: "السيناريوهات السابقة",
    takeTest: "خوض الاختبار",
    scenarioGenerated: "تم إنشاء السيناريو بنجاح!",
    chooseScenario: "اختر سيناريو",
    selectDifficultyPrompt: "اختر مستوى الصعوبة أعلاه لرؤية السيناريوهات المتاحة",
    questions: "أسئلة",
    scenarioNotFound: "السيناريو غير موجود",
    
    // Scenario Test
    question: "سؤال",
    finish: "إنهاء",
    testCompleted: "اكتمل الاختبار!",
    correctAnswers: "الإجابات الصحيحة",
    earned: "لقد ربحت",
    goHome: "العودة للرئيسية",
    retake: "إعادة الاختبار",
    backToScenarios: "العودة للسيناريوهات",
    coinsEarned: "العملات المكتسبة",
    accuracy: "الدقة",
    correctAnswer: "صحيح! أحسنت!",
    wrongAnswer: "ليس صحيحاً تماماً. واصل التعلم!",
    
    // Navigation
    home: "الرئيسية",
    profile: "الملف الشخصي",
    rewards: "المكافآت",
    logout: "تسجيل الخروج",
    about: "حول",
    
    // Profile
    editProfile: "تعديل الملف",
    shareStats: "مشاركة الإحصائيات",
    coins: "العملات",
    level: "المستوى",
    streak: "السلسلة اليومية",
    dayStreak: "السلسلة اليومية",
    badges: "الشارات",
    achievementBadges: "شارات الإنجاز",
    sessions: "الجلسات المكتملة",
    description: "الوصف",
    country: "البلد",
    badgeEarned: "مكتسبة",
    
    // Rewards
    rewardsShop: "متجر المكافآت",
    rewardsDesc: "استبدل عملاتك بمكافآت حصرية",
    unlockBadge: "فتح شارة",
    unlockAvatar: "فتح صورة رمزية",
    session: "جلسة",
    coinsAvailable: "عملة متاحة",
    purchase: "شراء",
    purchasing: "جارٍ الشراء...",
    purchased: "تم الشراء",
    purchaseSuccess: "تم الشراء بنجاح!",
    purchaseFailed: "فشل الشراء. يرجى المحاولة مرة أخرى.",
    insufficientCoins: "عملات غير كافية",
    notEnoughCoinsDesc: "اكسب المزيد من العملات بإكمال السيناريوهات!",
    
    // Dashboard
    startLearning: "بدء التعلم",
    continueSession: "متابعة الجلسة",
    mySessions: "جلساتي",
    dailyGoal: "الهدف اليومي",
    cardsRemaining: "بطاقات متبقية",
    currentStreak: "السلسلة الحالية",
    daysInRow: "أيام متتالية",
    onFire: "مشتعل!",
    totalCoins: "إجمالي العملات",
    earnedCoins: "عملات مكتسبة",
    spendCoins: "إنفاق العملات",
    startSession: "بدء جلسة SRS",
    continueWhere: "تابع من حيث توقفت",
    cardsStudied: "البطاقات المدروسة",
    activeDecks: "المجموعات النشطة",
    currentLevel: "المستوى الحالي",
    welcomeBack: "مرحباً بعودتك!",
    readyToContinue: "هل أنت مستعد لمواصلة رحلتك في العربية؟",
    
    // Landing
    appName: "Botaqiy",
    textInput: "إدخال النص",
    tagline: "العربية، بطريقتك",
    heroTitle: "إتقان العربية من خلال التعلم التكيفي",
    heroDesc: "حوّل أي نص إلى بطاقات تعليمية مخصصة وسيناريوهات واقعية. تعلم بسرعتك الخاصة مع صعوبة تكيفية مدعومة بالذكاء الاصطناعي.",
    getStarted: "ابدأ الآن",
    learnMore: "اعرف المزيد",
    
    // About
    aboutApp: "حول Botaqiy",
    appVision: "رؤيتنا",
    howItWorks: "كيف يعمل",
    contactUs: "اتصل بنا",
    
    // Common
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    close: "إغلاق",
    confirm: "تأكيد",
    back: "رجوع",
    offline: "غير متصل",
    online: "متصل",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
