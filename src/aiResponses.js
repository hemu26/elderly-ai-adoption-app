/**
 * Simple rule-based AI responses for common elderly queries.
 * In a production app, this would connect to an LLM API.
 */

const responses = {
  en: {
    greetings: [
      'Namaste! How can I help you today?',
      'Hello! I am AI Saathi. What would you like to know?',
    ],
    date: () => {
      const now = new Date();
      return `Today is ${now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
    },
    time: () => {
      const now = new Date();
      return `The current time is ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}.`;
    },
    health: [
      'For good health: drink 8 glasses of water daily, eat balanced meals with fruits and vegetables, walk 30 minutes every morning, and sleep 7-8 hours each night.',
      'To stay healthy: avoid too much salt and sugar, eat home-cooked meals, stay active with light exercise, and stay connected with loved ones.',
    ],
    food: [
      'Good foods for seniors: dal (lentils), green leafy vegetables, fruits like banana and papaya, milk and curd, whole grains like oats and brown rice, and nuts like almonds and walnuts.',
      'For a healthy diet: include proteins like dal, paneer, and eggs; calcium-rich foods like milk and curd; and plenty of colourful vegetables.',
    ],
    sleep: [
      'For better sleep: avoid tea or coffee after 5 PM, keep a regular bedtime, keep your room cool and dark, avoid screens before bed, and try warm milk before sleeping.',
    ],
    yoga: [
      'Yoga is excellent for seniors! It improves flexibility, reduces joint pain, helps with breathing, reduces stress, and improves balance. Even 20 minutes daily makes a big difference.',
    ],
    diabetes: [
      'For diabetes management: avoid sugary foods and drinks, eat small meals regularly, walk after meals, take your medicines on time, and check your blood sugar regularly. Always follow your doctor\'s advice.',
    ],
    smartphone: [
      'To use a smartphone: the home button takes you back to the main screen, you can increase text size in Settings > Accessibility, use voice input by pressing the microphone icon on the keyboard, and video call family using WhatsApp or Google Meet.',
    ],
    exercise: [
      'Good exercises for seniors: morning walks (30 minutes), gentle yoga, swimming, chair exercises if mobility is limited, and light stretching. Start slow and listen to your body.',
    ],
    ai: [
      'AI (Artificial Intelligence) is a technology that can understand language, answer questions, and help with tasks. I am an AI assistant - I am here to help you with health tips, information, and daily guidance.',
    ],
    default: [
      'That is a great question! I suggest speaking with your family or doctor for personalised advice. I can help with general health tips, daily information, and guidance on using technology.',
      'Thank you for asking. For specific medical questions, please consult your doctor. I am here to help with general wellness tips and information.',
      'I am still learning! For now, I can help with health tips, daily information, and answers to common questions. Please feel free to ask anything.',
    ],
  },
  hi: {
    greetings: ['नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूँ?'],
    date: () => {
      const now = new Date();
      return `आज ${now.toLocaleDateString('hi-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} है।`;
    },
    time: () => {
      const now = new Date();
      return `अभी का समय ${now.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })} है।`;
    },
    health: ['अच्छे स्वास्थ्य के लिए: हर दिन 8 गिलास पानी पिएं, फलों और सब्जियों के साथ संतुलित भोजन करें, हर सुबह 30 मिनट टहलें, और हर रात 7-8 घंटे सोएं।'],
    food: ['बुज़ुर्गों के लिए अच्छे खाद्य पदार्थ: दाल, हरी पत्तेदार सब्जियाँ, केला और पपीता जैसे फल, दूध और दही, ओट्स और ब्राउन राइस जैसे अनाज, और बादाम-अखरोट।'],
    sleep: ['बेहतर नींद के लिए: शाम 5 बजे के बाद चाय-कॉफी बंद करें, सोने का एक नियमित समय रखें, कमरे को ठंडा रखें, सोने से पहले मोबाइल न देखें, और सोने से पहले गर्म दूध पिएं।'],
    yoga: ['योग बुज़ुर्गों के लिए बहुत अच्छा है! यह लचीलापन बढ़ाता है, जोड़ों का दर्द कम करता है, सांस लेने में मदद करता है, तनाव कम करता है और संतुलन में सुधार करता है।'],
    diabetes: ['मधुमेह के लिए: मीठा खाना और पेय से बचें, नियमित रूप से छोटे भोजन करें, खाने के बाद टहलें, समय पर दवाई लें और नियमित रूप से रक्त शर्करा जाँचें।'],
    smartphone: ['स्मार्टफोन के लिए: होम बटन मुख्य स्क्रीन पर ले जाता है, सेटिंग्स में टेक्स्ट का आकार बड़ा कर सकते हैं, कीबोर्ड पर माइक्रोफोन से बोल सकते हैं।'],
    exercise: ['बुज़ुर्गों के लिए व्यायाम: सुबह की सैर (30 मिनट), हल्का योग, तैराकी, अगर गतिशीलता कम हो तो कुर्सी व्यायाम और हल्की स्ट्रेचिंग।'],
    ai: ['AI (कृत्रिम बुद्धिमत्ता) एक तकनीक है जो भाषा समझ सकती है, सवालों के जवाब दे सकती है और कामों में मदद कर सकती है।'],
    default: ['यह एक अच्छा सवाल है! व्यक्तिगत सलाह के लिए अपने परिवार या डॉक्टर से बात करें। मैं सामान्य स्वास्थ्य सुझाव और जानकारी में मदद कर सकता हूँ।'],
  },
};

const keywords = {
  date: ['date', 'day', 'today', 'तारीख', 'आज', 'दिन', 'தேதி', 'రోజు', 'তারিখ'],
  time: ['time', 'clock', 'hour', 'समय', 'बजे', 'நேரம்', 'సమయం', 'সময়'],
  health: ['health', 'healthy', 'fit', 'स्वस्थ', 'स्वास्थ्य', 'ஆரோக்கியம்', 'ఆరోగ్యం', 'স্বাস্থ্য'],
  food: ['food', 'eat', 'diet', 'खाना', 'खाद्य', 'उचित आहार', 'உணவு', 'ఆహారం', 'খাবার'],
  sleep: ['sleep', 'rest', 'insomnia', 'नींद', 'सोना', 'தூக்கம்', 'నిద్ర', 'ঘুম'],
  yoga: ['yoga', 'योग', 'யோகா', 'యోగా', 'যোগ'],
  diabetes: ['diabetes', 'sugar', 'मधुमेह', 'शुगर', 'நீரிழிவு', 'డయాబెటిస్', 'ডায়াবেটিস'],
  smartphone: ['smartphone', 'phone', 'mobile', 'app', 'फोन', 'मोबाइल', 'தொலைபேசி', 'ఫోన్', 'ফোন'],
  exercise: ['exercise', 'walk', 'gym', 'व्यायाम', 'टहलना', 'உடற்பயிற்சி', 'వ్యాయామం', 'ব্যায়াম'],
  ai: ['ai', 'artificial', 'robot', 'technology', 'ai क्या', 'what is ai', 'AI என்ன', 'AI అంటే'],
};

function matchKeyword(text) {
  const lower = text.toLowerCase();
  for (const [category, words] of Object.entries(keywords)) {
    if (words.some((w) => lower.includes(w.toLowerCase()))) {
      return category;
    }
  }
  return 'default';
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getAIResponse(question, lang = 'en') {
  const langResponses = responses[lang] || responses.en;
  const category = matchKeyword(question);

  const categoryResponse = langResponses[category];
  if (!categoryResponse) {
    return pickRandom(langResponses.default || responses.en.default);
  }

  if (typeof categoryResponse === 'function') {
    return categoryResponse();
  }

  return pickRandom(categoryResponse);
}
