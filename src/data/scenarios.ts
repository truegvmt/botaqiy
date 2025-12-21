// Rule-based scenarios - 4 per difficulty level (12 total)
export interface ScenarioQuestion {
  question: string;
  questionAr: string;
  options: string[];
  optionsAr: string[];
  correctAnswer: number;
}

export interface RuleBasedScenario {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  points: number;
  questions: ScenarioQuestion[];
}

export const ruleBasedScenarios: RuleBasedScenario[] = [
  // EASY SCENARIOS (10 points each)
  {
    id: 'easy-1',
    title: 'At the Coffee Shop',
    titleAr: 'في المقهى',
    description: 'Order your favorite drink at a local café',
    descriptionAr: 'اطلب مشروبك المفضل في المقهى المحلي',
    difficulty: 'easy',
    icon: '☕',
    points: 10,
    questions: [
      {
        question: 'The waiter asks: "What would you like to drink?" What is the correct response?',
        questionAr: 'يسألك النادل: "ماذا تريد أن تشرب؟" ما هو الرد الصحيح؟',
        options: ['I want coffee, please', 'I am tired', 'Good morning', 'Where is the exit?'],
        optionsAr: ['أريد قهوة، من فضلك', 'أنا متعب', 'صباح الخير', 'أين المخرج؟'],
        correctAnswer: 0
      },
      {
        question: 'How do you ask for the bill?',
        questionAr: 'كيف تطلب الفاتورة؟',
        options: ['The bill, please', 'I am hungry', 'Thank you very much', 'See you later'],
        optionsAr: ['الفاتورة، من فضلك', 'أنا جائع', 'شكراً جزيلاً', 'أراك لاحقاً'],
        correctAnswer: 0
      },
      {
        question: 'The waiter says the coffee costs 15 dirhams. How do you respond politely?',
        questionAr: 'يقول النادل أن القهوة بـ15 درهم. كيف ترد بأدب؟',
        options: ['Here you go', 'That is expensive', 'I do not understand', 'What time is it?'],
        optionsAr: ['تفضل', 'هذا غالي', 'لا أفهم', 'كم الساعة؟'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'easy-2',
    title: 'Greeting Friends',
    titleAr: 'تحية الأصدقاء',
    description: 'Practice common greetings and introductions',
    descriptionAr: 'تدرب على التحيات والتعارف الشائعة',
    difficulty: 'easy',
    icon: '👋',
    points: 10,
    questions: [
      {
        question: 'Someone says "Assalamu Alaikum". What is the proper response?',
        questionAr: 'يقول شخص "السلام عليكم". ما هو الرد المناسب؟',
        options: ['Wa Alaikum Assalam', 'Good night', 'Thank you', 'Sorry'],
        optionsAr: ['وعليكم السلام', 'تصبح على خير', 'شكراً', 'آسف'],
        correctAnswer: 0
      },
      {
        question: 'How do you ask someone their name?',
        questionAr: 'كيف تسأل شخصاً عن اسمه؟',
        options: ['What is your name?', 'Where do you live?', 'How old are you?', 'What do you do?'],
        optionsAr: ['ما اسمك؟', 'أين تسكن؟', 'كم عمرك؟', 'ماذا تعمل؟'],
        correctAnswer: 0
      },
      {
        question: 'Your friend says "How are you?" How do you respond positively?',
        questionAr: 'صديقك يقول "كيف حالك؟" كيف ترد بإيجابية؟',
        options: ['I am fine, praise be to God', 'I am tired', 'Not good', 'I do not know'],
        optionsAr: ['بخير، الحمد لله', 'أنا متعب', 'لست بخير', 'لا أعرف'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'easy-3',
    title: 'At the Supermarket',
    titleAr: 'في السوبرماركت',
    description: 'Buy groceries and understand prices',
    descriptionAr: 'اشترِ البقالة وافهم الأسعار',
    difficulty: 'easy',
    icon: '🛒',
    points: 10,
    questions: [
      {
        question: 'How do you ask "Where is the milk?"',
        questionAr: 'كيف تسأل "أين الحليب؟"',
        options: ['Where is the milk?', 'How much is the milk?', 'I want milk', 'The milk is good'],
        optionsAr: ['أين الحليب؟', 'كم سعر الحليب؟', 'أريد حليب', 'الحليب جيد'],
        correctAnswer: 0
      },
      {
        question: 'The cashier says the total is 50 dirhams. What does "khamsin dirham" mean?',
        questionAr: 'يقول أمين الصندوق المجموع 50 درهم. ماذا تعني "خمسين درهم"؟',
        options: ['Fifty dirhams', 'Fifteen dirhams', 'Five dirhams', 'Five hundred dirhams'],
        optionsAr: ['خمسون درهماً', 'خمسة عشر درهماً', 'خمسة دراهم', 'خمسمائة درهم'],
        correctAnswer: 0
      },
      {
        question: 'You want to pay with card. How do you ask?',
        questionAr: 'تريد الدفع بالبطاقة. كيف تسأل؟',
        options: ['Can I pay with card?', 'Where is my card?', 'I lost my card', 'The card is broken'],
        optionsAr: ['هل يمكنني الدفع بالبطاقة؟', 'أين بطاقتي؟', 'فقدت بطاقتي', 'البطاقة مكسورة'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'easy-4',
    title: 'Telling Time',
    titleAr: 'إخبار الوقت',
    description: 'Learn to ask and tell the time',
    descriptionAr: 'تعلم كيف تسأل عن الوقت وتخبر به',
    difficulty: 'easy',
    icon: '🕐',
    points: 10,
    questions: [
      {
        question: 'How do you ask "What time is it?"',
        questionAr: 'كيف تسأل "كم الساعة؟"',
        options: ['What time is it?', 'What day is it?', 'When did you arrive?', 'How long?'],
        optionsAr: ['كم الساعة؟', 'أي يوم اليوم؟', 'متى وصلت؟', 'كم المدة؟'],
        correctAnswer: 0
      },
      {
        question: 'Someone says "As-sa\'a thalatha". What time is it?',
        questionAr: 'يقول شخص "الساعة ثلاثة". كم الساعة؟',
        options: ['3 o\'clock', '4 o\'clock', '2 o\'clock', '5 o\'clock'],
        optionsAr: ['الثالثة', 'الرابعة', 'الثانية', 'الخامسة'],
        correctAnswer: 0
      },
      {
        question: 'How do you say "half past seven"?',
        questionAr: 'كيف تقول "السابعة والنصف"؟',
        options: ['As-sa\'a sab\'a wa-nusf', 'As-sa\'a sab\'a', 'As-sa\'a thamania', 'As-sa\'a sitta'],
        optionsAr: ['الساعة سبعة ونصف', 'الساعة سبعة', 'الساعة ثمانية', 'الساعة ستة'],
        correctAnswer: 0
      }
    ]
  },

  // MEDIUM SCENARIOS (20 points each)
  {
    id: 'medium-1',
    title: 'At the Restaurant',
    titleAr: 'في المطعم',
    description: 'Navigate a full dining experience',
    descriptionAr: 'تنقل في تجربة طعام كاملة',
    difficulty: 'medium',
    icon: '🍽️',
    points: 20,
    questions: [
      {
        question: 'You want to make a reservation. What do you say?',
        questionAr: 'تريد حجز طاولة. ماذا تقول؟',
        options: ['I would like to reserve a table for two', 'The food is delicious', 'Where is the bathroom?', 'I am not hungry'],
        optionsAr: ['أريد حجز طاولة لشخصين', 'الطعام لذيذ', 'أين الحمام؟', 'لست جائعاً'],
        correctAnswer: 0
      },
      {
        question: 'The waiter asks about dietary restrictions. You are vegetarian. What do you say?',
        questionAr: 'يسأل النادل عن القيود الغذائية. أنت نباتي. ماذا تقول؟',
        options: ['I do not eat meat', 'I eat everything', 'I am allergic to fish', 'I love chicken'],
        optionsAr: ['لا آكل اللحم', 'آكل كل شيء', 'لدي حساسية من السمك', 'أحب الدجاج'],
        correctAnswer: 0
      },
      {
        question: 'You want to ask for a recommendation. How do you ask?',
        questionAr: 'تريد أن تطلب توصية. كيف تسأل؟',
        options: ['What do you recommend?', 'Is the food fresh?', 'When does the kitchen close?', 'Can I see the chef?'],
        optionsAr: ['بماذا تنصحني؟', 'هل الطعام طازج؟', 'متى يغلق المطبخ؟', 'هل يمكنني رؤية الطباخ؟'],
        correctAnswer: 0
      },
      {
        question: 'Your order is wrong. How do you politely complain?',
        questionAr: 'طلبك خاطئ. كيف تشتكي بأدب؟',
        options: ['Excuse me, this is not what I ordered', 'This is terrible!', 'I want to speak to the manager', 'I will not pay'],
        optionsAr: ['عفواً، هذا ليس ما طلبته', 'هذا فظيع!', 'أريد التحدث للمدير', 'لن أدفع'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'medium-2',
    title: 'Taking a Taxi',
    titleAr: 'ركوب التاكسي',
    description: 'Communicate with taxi drivers effectively',
    descriptionAr: 'تواصل مع سائقي التاكسي بفعالية',
    difficulty: 'medium',
    icon: '🚕',
    points: 20,
    questions: [
      {
        question: 'How do you tell the driver your destination?',
        questionAr: 'كيف تخبر السائق بوجهتك؟',
        options: ['To the airport, please', 'How much?', 'Is this the right car?', 'I am lost'],
        optionsAr: ['إلى المطار، من فضلك', 'كم السعر؟', 'هل هذه السيارة الصحيحة؟', 'أنا ضائع'],
        correctAnswer: 0
      },
      {
        question: 'You want to ask the driver to turn on the air conditioning. What do you say?',
        questionAr: 'تريد أن تطلب من السائق تشغيل المكيف. ماذا تقول؟',
        options: ['Can you turn on the AC, please?', 'It is very hot outside', 'I do not like the car', 'Where are we going?'],
        optionsAr: ['هل يمكنك تشغيل المكيف، من فضلك؟', 'الجو حار جداً بالخارج', 'لا أحب السيارة', 'إلى أين نذهب؟'],
        correctAnswer: 0
      },
      {
        question: 'You want to ask "How long will it take?" What do you say?',
        questionAr: 'تريد أن تسأل "كم تستغرق الرحلة؟" ماذا تقول؟',
        options: ['How long will it take?', 'Are we there yet?', 'Why is it so slow?', 'Can you go faster?'],
        optionsAr: ['كم تستغرق الرحلة؟', 'هل وصلنا؟', 'لماذا هذا البطء؟', 'هل يمكنك أن تسرع؟'],
        correctAnswer: 0
      },
      {
        question: 'You want to stop here. What do you tell the driver?',
        questionAr: 'تريد التوقف هنا. ماذا تقول للسائق؟',
        options: ['Stop here, please', 'Keep going', 'Turn right', 'Wait for me'],
        optionsAr: ['قف هنا، من فضلك', 'استمر', 'انعطف يميناً', 'انتظرني'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'medium-3',
    title: 'At the Doctor',
    titleAr: 'عند الطبيب',
    description: 'Explain symptoms and understand medical advice',
    descriptionAr: 'اشرح الأعراض وافهم النصائح الطبية',
    difficulty: 'medium',
    icon: '🏥',
    points: 20,
    questions: [
      {
        question: 'The doctor asks "What is the problem?" How do you say you have a headache?',
        questionAr: 'يسأل الطبيب "ما المشكلة؟" كيف تقول أن لديك صداع؟',
        options: ['I have a headache', 'I am fine', 'I have a question', 'I am here for a checkup'],
        optionsAr: ['عندي صداع', 'أنا بخير', 'لدي سؤال', 'أنا هنا للفحص'],
        correctAnswer: 0
      },
      {
        question: 'How do you describe how long you have been sick?',
        questionAr: 'كيف تصف منذ متى وأنت مريض؟',
        options: ['For three days', 'A long time ago', 'I do not remember', 'Every day'],
        optionsAr: ['منذ ثلاثة أيام', 'منذ زمن طويل', 'لا أتذكر', 'كل يوم'],
        correctAnswer: 0
      },
      {
        question: 'The doctor prescribes medicine. How do you ask "How many times a day?"',
        questionAr: 'يصف الطبيب دواء. كيف تسأل "كم مرة في اليوم؟"',
        options: ['How many times a day?', 'Is this medicine strong?', 'Where is the pharmacy?', 'How much does it cost?'],
        optionsAr: ['كم مرة في اليوم؟', 'هل هذا الدواء قوي؟', 'أين الصيدلية؟', 'كم سعره؟'],
        correctAnswer: 0
      },
      {
        question: 'How do you ask if you need to come back for a follow-up?',
        questionAr: 'كيف تسأل إذا كنت بحاجة للعودة للمتابعة؟',
        options: ['Do I need to come back?', 'Can I leave now?', 'Is the treatment finished?', 'Am I healthy?'],
        optionsAr: ['هل أحتاج أن أعود؟', 'هل يمكنني المغادرة الآن؟', 'هل انتهى العلاج؟', 'هل أنا بصحة جيدة؟'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'medium-4',
    title: 'Shopping for Clothes',
    titleAr: 'التسوق للملابس',
    description: 'Try on clothes and negotiate prices',
    descriptionAr: 'جرب الملابس وتفاوض على الأسعار',
    difficulty: 'medium',
    icon: '👔',
    points: 20,
    questions: [
      {
        question: 'How do you ask "Do you have this in a larger size?"',
        questionAr: 'كيف تسأل "هل لديكم هذا بمقاس أكبر؟"',
        options: ['Do you have this in a larger size?', 'This is too big', 'I want a different color', 'Where is the fitting room?'],
        optionsAr: ['هل لديكم هذا بمقاس أكبر؟', 'هذا كبير جداً', 'أريد لوناً مختلفاً', 'أين غرفة القياس؟'],
        correctAnswer: 0
      },
      {
        question: 'You want to try on the shirt. What do you ask?',
        questionAr: 'تريد تجربة القميص. ماذا تسأل؟',
        options: ['Can I try this on?', 'Is this on sale?', 'Do you accept returns?', 'Is this real cotton?'],
        optionsAr: ['هل يمكنني تجربة هذا؟', 'هل هذا في التخفيضات؟', 'هل تقبلون الإرجاع؟', 'هل هذا قطن حقيقي؟'],
        correctAnswer: 0
      },
      {
        question: 'The price seems high. How do you politely ask for a discount?',
        questionAr: 'السعر يبدو مرتفعاً. كيف تطلب خصماً بأدب؟',
        options: ['Is there a discount?', 'This is too expensive', 'I will not buy it', 'Lower the price'],
        optionsAr: ['هل هناك خصم؟', 'هذا غالي جداً', 'لن أشتريه', 'خفض السعر'],
        correctAnswer: 0
      },
      {
        question: 'You decided to buy. How do you say "I will take this one"?',
        questionAr: 'قررت الشراء. كيف تقول "سآخذ هذا"؟',
        options: ['I will take this one', 'I am still looking', 'Maybe later', 'Show me another one'],
        optionsAr: ['سآخذ هذا', 'لا زلت أبحث', 'ربما لاحقاً', 'أرني آخر'],
        correctAnswer: 0
      }
    ]
  },

  // HARD SCENARIOS (30 points each)
  {
    id: 'hard-1',
    title: 'Job Interview',
    titleAr: 'مقابلة عمل',
    description: 'Navigate a professional job interview',
    descriptionAr: 'تنقل في مقابلة عمل احترافية',
    difficulty: 'hard',
    icon: '💼',
    points: 30,
    questions: [
      {
        question: 'The interviewer asks "Tell me about yourself". How do you start professionally?',
        questionAr: 'يسأل المقابل "حدثني عن نفسك". كيف تبدأ باحترافية؟',
        options: ['I am Ahmed, I have 5 years of experience in marketing', 'My name is Ahmed, I like football', 'I am Ahmed, I need money', 'I am Ahmed, this is my first job'],
        optionsAr: ['أنا أحمد، لدي 5 سنوات خبرة في التسويق', 'اسمي أحمد، أحب كرة القدم', 'أنا أحمد، أحتاج المال', 'أنا أحمد، هذه وظيفتي الأولى'],
        correctAnswer: 0
      },
      {
        question: 'How do you describe your strengths professionally?',
        questionAr: 'كيف تصف نقاط قوتك باحترافية؟',
        options: ['I am organized and work well under pressure', 'I am the best', 'I do not have weaknesses', 'I am not sure'],
        optionsAr: ['أنا منظم وأعمل جيداً تحت الضغط', 'أنا الأفضل', 'ليس لدي نقاط ضعف', 'لست متأكداً'],
        correctAnswer: 0
      },
      {
        question: 'They ask about your salary expectations. What is a professional response?',
        questionAr: 'يسألون عن توقعاتك للراتب. ما هو الرد الاحترافي؟',
        options: ['Based on my experience, I expect between X and Y', 'I want a lot of money', 'Any salary is fine', 'How much do you pay?'],
        optionsAr: ['بناءً على خبرتي، أتوقع بين X و Y', 'أريد الكثير من المال', 'أي راتب مناسب', 'كم تدفعون؟'],
        correctAnswer: 0
      },
      {
        question: 'At the end, they ask "Do you have any questions?" What is appropriate?',
        questionAr: 'في النهاية يسألون "هل لديك أي أسئلة؟" ما هو المناسب؟',
        options: ['What are the opportunities for growth in this role?', 'No, I have no questions', 'When is lunch break?', 'How many vacation days do I get?'],
        optionsAr: ['ما هي فرص النمو في هذا الدور؟', 'لا، ليس لدي أسئلة', 'متى استراحة الغداء؟', 'كم يوم إجازة أحصل عليه؟'],
        correctAnswer: 0
      },
      {
        question: 'How do you professionally close the interview?',
        questionAr: 'كيف تختم المقابلة باحترافية؟',
        options: ['Thank you for your time, I look forward to hearing from you', 'So, did I get the job?', 'That is all, goodbye', 'Call me when you decide'],
        optionsAr: ['شكراً لوقتكم، أتطلع للسماع منكم', 'إذاً، هل حصلت على الوظيفة؟', 'هذا كل شيء، مع السلامة', 'اتصلوا بي عندما تقررون'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'hard-2',
    title: 'Renting an Apartment',
    titleAr: 'استئجار شقة',
    description: 'Negotiate and understand rental agreements',
    descriptionAr: 'تفاوض وافهم عقود الإيجار',
    difficulty: 'hard',
    icon: '🏠',
    points: 30,
    questions: [
      {
        question: 'How do you ask about the monthly rent?',
        questionAr: 'كيف تسأل عن الإيجار الشهري؟',
        options: ['How much is the monthly rent?', 'Is this apartment free?', 'Can I live here?', 'Is this place nice?'],
        optionsAr: ['كم الإيجار الشهري؟', 'هل هذه الشقة مجانية؟', 'هل يمكنني العيش هنا؟', 'هل هذا المكان جميل؟'],
        correctAnswer: 0
      },
      {
        question: 'You want to ask what is included in the rent. How do you ask?',
        questionAr: 'تريد أن تسأل ماذا يشمل الإيجار. كيف تسأل؟',
        options: ['Does the rent include utilities?', 'Is the furniture new?', 'Who are the neighbors?', 'When was this built?'],
        optionsAr: ['هل الإيجار يشمل الخدمات؟', 'هل الأثاث جديد؟', 'من هم الجيران؟', 'متى تم بناء هذا؟'],
        correctAnswer: 0
      },
      {
        question: 'How do you ask about the contract duration?',
        questionAr: 'كيف تسأل عن مدة العقد؟',
        options: ['How long is the lease contract?', 'Can I leave anytime?', 'Is this permanent?', 'When do I move in?'],
        optionsAr: ['ما مدة عقد الإيجار؟', 'هل يمكنني المغادرة في أي وقت؟', 'هل هذا دائم؟', 'متى أنتقل؟'],
        correctAnswer: 0
      },
      {
        question: 'You notice something broken. How do you ask who is responsible for repairs?',
        questionAr: 'لاحظت شيئاً مكسوراً. كيف تسأل من المسؤول عن الإصلاحات؟',
        options: ['Who is responsible for repairs?', 'This is broken', 'Fix this now', 'I will not pay for this'],
        optionsAr: ['من المسؤول عن الإصلاحات؟', 'هذا مكسور', 'أصلح هذا الآن', 'لن أدفع مقابل هذا'],
        correctAnswer: 0
      },
      {
        question: 'How do you ask about the security deposit?',
        questionAr: 'كيف تسأل عن التأمين؟',
        options: ['How much is the security deposit and when is it returned?', 'Do I pay extra?', 'Is this money gone?', 'Why do you need money?'],
        optionsAr: ['كم التأمين ومتى يُعاد؟', 'هل أدفع أكثر؟', 'هل هذا المال ضاع؟', 'لماذا تحتاجون المال؟'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'hard-3',
    title: 'Business Meeting',
    titleAr: 'اجتماع عمل',
    description: 'Participate effectively in business discussions',
    descriptionAr: 'شارك بفعالية في مناقشات العمل',
    difficulty: 'hard',
    icon: '📊',
    points: 30,
    questions: [
      {
        question: 'How do you politely interrupt to make a point?',
        questionAr: 'كيف تقاطع بأدب لإبداء رأي؟',
        options: ['Excuse me, may I add something?', 'Listen to me!', 'You are wrong', 'Stop talking'],
        optionsAr: ['عفواً، هل يمكنني إضافة شيء؟', 'استمعوا لي!', 'أنتم مخطئون', 'توقفوا عن الكلام'],
        correctAnswer: 0
      },
      {
        question: 'How do you express disagreement professionally?',
        questionAr: 'كيف تعبر عن الاختلاف باحترافية؟',
        options: ['I understand your point, but I have a different perspective', 'That is wrong', 'I disagree completely', 'No way'],
        optionsAr: ['أفهم وجهة نظرك، لكن لدي منظور مختلف', 'هذا خطأ', 'أختلف تماماً', 'مستحيل'],
        correctAnswer: 0
      },
      {
        question: 'How do you ask for clarification on a point?',
        questionAr: 'كيف تطلب توضيحاً لنقطة ما؟',
        options: ['Could you please elaborate on that?', 'What do you mean?', 'I do not understand', 'Say that again'],
        optionsAr: ['هل يمكنك التوضيح أكثر؟', 'ماذا تعني؟', 'لا أفهم', 'قل ذلك مرة أخرى'],
        correctAnswer: 0
      },
      {
        question: 'How do you suggest tabling a discussion for later?',
        questionAr: 'كيف تقترح تأجيل المناقشة؟',
        options: ['Perhaps we can discuss this in our next meeting?', 'Let us stop here', 'This is wasting time', 'I am bored with this'],
        optionsAr: ['ربما يمكننا مناقشة هذا في اجتماعنا القادم؟', 'دعونا نتوقف هنا', 'هذا مضيعة للوقت', 'أنا ملول من هذا'],
        correctAnswer: 0
      },
      {
        question: 'How do you propose a solution to a problem?',
        questionAr: 'كيف تقترح حلاً لمشكلة؟',
        options: ['I would like to suggest that we try approach X', 'Just do this', 'Someone should fix this', 'This is not my problem'],
        optionsAr: ['أود أن أقترح أن نجرب الطريقة X', 'افعلوا هذا فقط', 'يجب على شخص ما إصلاح هذا', 'هذه ليست مشكلتي'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'hard-4',
    title: 'Emergency Situations',
    titleAr: 'حالات الطوارئ',
    description: 'Handle emergencies and get help',
    descriptionAr: 'تعامل مع الطوارئ واحصل على المساعدة',
    difficulty: 'hard',
    icon: '🚨',
    points: 30,
    questions: [
      {
        question: 'You need to call for help. How do you say "Help me!"?',
        questionAr: 'تحتاج للنداء على المساعدة. كيف تقول "ساعدوني!"؟',
        options: ['Help me!', 'I am here', 'Can someone help?', 'Where is everyone?'],
        optionsAr: ['ساعدوني!', 'أنا هنا', 'هل يمكن لأحد المساعدة؟', 'أين الجميع؟'],
        correctAnswer: 0
      },
      {
        question: 'You need to report an accident. What do you say?',
        questionAr: 'تحتاج للإبلاغ عن حادث. ماذا تقول؟',
        options: ['There has been an accident, please send help immediately', 'Something happened', 'I saw something', 'Come here'],
        optionsAr: ['وقع حادث، أرسلوا المساعدة فوراً', 'حدث شيء', 'رأيت شيئاً', 'تعالوا هنا'],
        correctAnswer: 0
      },
      {
        question: 'How do you describe your location in an emergency?',
        questionAr: 'كيف تصف موقعك في حالة طوارئ؟',
        options: ['I am on X Street, near the Y building', 'I am somewhere', 'I do not know where I am', 'Find me'],
        optionsAr: ['أنا في شارع X، قرب مبنى Y', 'أنا في مكان ما', 'لا أعرف أين أنا', 'اعثروا علي'],
        correctAnswer: 0
      },
      {
        question: 'Someone is injured. How do you describe their condition?',
        questionAr: 'شخص مصاب. كيف تصف حالته؟',
        options: ['He is unconscious and not breathing properly', 'He looks bad', 'He is hurt', 'He needs help'],
        optionsAr: ['هو فاقد الوعي ولا يتنفس بشكل صحيح', 'يبدو سيئاً', 'هو مصاب', 'يحتاج مساعدة'],
        correctAnswer: 0
      },
      {
        question: 'The operator asks you to stay on the line. What do you say?',
        questionAr: 'يطلب منك عامل الهاتف البقاء على الخط. ماذا تقول؟',
        options: ['Yes, I will stay on the line. Please hurry!', 'Okay', 'I will wait', 'How long?'],
        optionsAr: ['نعم، سأبقى على الخط. أرجوكم أسرعوا!', 'حسناً', 'سأنتظر', 'كم من الوقت؟'],
        correctAnswer: 0
      }
    ]
  }
];

export function getScenariosByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): RuleBasedScenario[] {
  return ruleBasedScenarios.filter(s => s.difficulty === difficulty);
}

export function getScenarioById(id: string): RuleBasedScenario | undefined {
  return ruleBasedScenarios.find(s => s.id === id);
}
