// ===========================
// Global Variables & State
// ===========================
let selectedLanguage = '';
let currentCategory = '';
let currentWordIndex = 0;
let currentQuizCategory = '';
let currentQuestionIndex = 0;
let quizScore = 0;
let quizAnswers = [];
let currentUser = null;

// ===========================
// Lesson Data Structure
// ===========================
const lessonData = {
    greetings: {
        english: [
            { kannada: 'ನಮಸ್ಕಾರ', pronunciation: 'Namaskara', translation: 'Hello' },
            { kannada: 'ಶುಭೋದಯ', pronunciation: 'Shubhodaya', translation: 'Good Morning' },
            { kannada: 'ಶುಭ ರಾತ್ರಿ', pronunciation: 'Shubha Ratri', translation: 'Good Night' },
            { kannada: 'ಧನ್ಯವಾದಗಳು', pronunciation: 'Dhanyavadagalu', translation: 'Thank You' },
            { kannada: 'ದಯವಿಟ್ಟು', pronunciation: 'Dayavittu', translation: 'Please' },
            { kannada: 'ಕ್ಷಮಿಸಿ', pronunciation: 'Kshemisi', translation: 'Sorry' },
            { kannada: 'ವಿದಾಯ', pronunciation: 'Vidaya', translation: 'Goodbye' }
        ],
        hindi: [
            { kannada: 'ನಮಸ್ಕಾರ', pronunciation: 'Namaskara', translation: 'नमस्ते (Namaste)' },
            { kannada: 'ಶುಭೋದಯ', pronunciation: 'Shubhodaya', translation: 'सुप्रभात (Suprabhat)' },
            { kannada: 'ಶುಭ ರಾತ್ರಿ', pronunciation: 'Shubha Ratri', translation: 'शुभ रात्रि (Shubh Ratri)' },
            { kannada: 'ಧನ್ಯವಾದಗಳು', pronunciation: 'Dhanyavadagalu', translation: 'धन्यवाद (Dhanyavad)' },
            { kannada: 'ದಯವಿಟ್ಟು', pronunciation: 'Dayavittu', translation: 'कृपया (Krupaya)' },
            { kannada: 'ಕ್ಷಮಿಸಿ', pronunciation: 'Kshemisi', translation: 'क्षमा करें (Kshama Karen)' },
            { kannada: 'ವಿದಾಯ', pronunciation: 'Vidaya', translation: 'अलविदा (Alvida)' }
        ],
        tamil: [
            { kannada: 'ನಮಸ್ಕಾರ', pronunciation: 'Namaskara', translation: 'வணக்கம் (Vanakkam)' },
            { kannada: 'ಶುಭೋದಯ', pronunciation: 'Shubhodaya', translation: 'காலை வணக்கம் (Kalai Vanakkam)' },
            { kannada: 'ಶುಭ ರಾತ್ರಿ', pronunciation: 'Shubha Ratri', translation: 'இனிய இரவு (Iniya Iravu)' },
            { kannada: 'ಧನ್ಯವಾದಗಳು', pronunciation: 'Dhanyavadagalu', translation: 'நன்றி (Nandri)' },
            { kannada: 'ದಯವಿಟ್ಟು', pronunciation: 'Dayavittu', translation: 'தயவு செய்து (Thayavu Seithu)' },
            { kannada: 'ಕ್ಷಮಿಸಿ', pronunciation: 'Kshemisi', translation: 'மன்னிக்கவும் (Mannikkavum)' },
            { kannada: 'ವಿದಾಯ', pronunciation: 'Vidaya', translation: 'பிரியாவிடை (Piriyavidai)' }
        ],
        telugu: [
            { kannada: 'ನಮಸ್ಕಾರ', pronunciation: 'Namaskara', translation: 'నమస్కారం (Namaskaram)' },
            { kannada: 'ಶುಭೋದಯ', pronunciation: 'Shubhodaya', translation: 'శుభోదయం (Shubhodayam)' },
            { kannada: 'ಶುಭ ರಾತ್ರಿ', pronunciation: 'Shubha Ratri', translation: 'శుభరాత్రి (Shubharatri)' },
            { kannada: 'ಧನ್ಯವಾದಗಳು', pronunciation: 'Dhanyavadagalu', translation: 'ధన్యవాదాలు (Dhanyavadalu)' },
            { kannada: 'ದಯವಿಟ್ಟು', pronunciation: 'Dayavittu', translation: 'దయచేసి (Dayachesi)' },
            { kannada: 'ಕ್ಷಮಿಸಿ', pronunciation: 'Kshemisi', translation: 'క్షమించండి (Kshaminchhandi)' },
            { kannada: 'ವಿದಾಯ', pronunciation: 'Vidaya', translation: 'వీడ్కోలు (Veedkolu)' }
        ],
        malayalam: [
            { kannada: 'ನಮಸ್ಕಾರ', pronunciation: 'Namaskara', translation: 'നമസ്കാരം (Namaskaaram)' },
            { kannada: 'ಶುಭೋದಯ', pronunciation: 'Shubhodaya', translation: 'സുപ്രഭാതം (Suprabhatham)' },
            { kannada: 'ಶುಭ ರಾತ್ರಿ', pronunciation: 'Shubha Ratri', translation: 'ശുഭ രാത്രി (Shubha Raathri)' },
            { kannada: 'ಧನ್ಯವಾದಗಳು', pronunciation: 'Dhanyavadagalu', translation: 'നന്ദി (Nanni)' },
            { kannada: 'ದಯವಿಟ್ಟು', pronunciation: 'Dayavittu', translation: 'ദയവായി (Dhayavayi)' },
            { kannada: 'ಕ್ಷಮಿಸಿ', pronunciation: 'Kshemisi', translation: 'ക്ഷമിക്കണം (Kshemikkanam)' },
            { kannada: 'ವಿದಾಯ', pronunciation: 'Vidaya', translation: 'വിട (Vida)' }
        ]
    },
    numbers: {
        english: [
            { kannada: 'ಒಂದು', pronunciation: 'Ondu', translation: 'One' },
            { kannada: 'ಎರಡು', pronunciation: 'Eradu', translation: 'Two' },
            { kannada: 'ಮೂರು', pronunciation: 'Mooru', translation: 'Three' },
            { kannada: 'ನಾಲ್ಕು', pronunciation: 'Naalku', translation: 'Four' },
            { kannada: 'ಐದು', pronunciation: 'Aidu', translation: 'Five' },
            { kannada: 'ಆರು', pronunciation: 'Aaru', translation: 'Six' },
            { kannada: 'ಏಳು', pronunciation: 'Yelu', translation: 'Seven' },
            { kannada: 'ಎಂಟು', pronunciation: 'Entu', translation: 'Eight' },
            { kannada: 'ಒಂಬತ್ತು', pronunciation: 'Ombattu', translation: 'Nine' },
            { kannada: 'ಹತ್ತು', pronunciation: 'Hattu', translation: 'Ten' }
        ],
        hindi: [
            { kannada: 'ಒಂದು', pronunciation: 'Ondu', translation: 'एक (Ek)' },
            { kannada: 'ಎರಡು', pronunciation: 'Eradu', translation: 'दो (Do)' },
            { kannada: 'ಮೂರು', pronunciation: 'Mooru', translation: 'तीन (Teen)' },
            { kannada: 'ನಾಲ್ಕು', pronunciation: 'Naalku', translation: 'चार (Char)' },
            { kannada: 'ಐದು', pronunciation: 'Aidu', translation: 'पांच (Paanch)' },
            { kannada: 'ಆರು', pronunciation: 'Aaru', translation: 'छह (Chhah)' },
            { kannada: 'ಏಳು', pronunciation: 'Yelu', translation: 'सात (Saat)' },
            { kannada: 'ಎಂಟು', pronunciation: 'Entu', translation: 'आठ (Aath)' },
            { kannada: 'ಒಂಬತ್ತು', pronunciation: 'Ombattu', translation: 'नौ (Nau)' },
            { kannada: 'ಹತ್ತು', pronunciation: 'Hattu', translation: 'दस (Das)' }
        ],
        tamil: [
            { kannada: 'ಒಂದು', pronunciation: 'Ondu', translation: 'ஒன்று (Ondru)' },
            { kannada: 'ಎರಡು', pronunciation: 'Eradu', translation: 'இரண்டு (Irandu)' },
            { kannada: 'ಮೂರು', pronunciation: 'Mooru', translation: 'மூன்று (Moondru)' },
            { kannada: 'ನಾಲ್ಕು', pronunciation: 'Naalku', translation: 'நான்கு (Naangu)' },
            { kannada: 'ಐದು', pronunciation: 'Aidu', translation: 'ஐந்து (Ainthu)' },
            { kannada: 'ಆರು', pronunciation: 'Aaru', translation: 'ஆறு (Aaru)' },
            { kannada: 'ಏಳು', pronunciation: 'Yelu', translation: 'ஏழு (Yezhu)' },
            { kannada: 'ಎಂಟು', pronunciation: 'Entu', translation: 'எட்டு (Ettu)' },
            { kannada: 'ಒಂಬತ್ತು', pronunciation: 'Ombattu', translation: 'ஒன்பது (Onbathu)' },
            { kannada: 'ಹತ್ತು', pronunciation: 'Hattu', translation: 'பத்து (Paththu)' }
        ],
        telugu: [
            { kannada: 'ಒಂದು', pronunciation: 'Ondu', translation: 'ఒకటి (Okati)' },
            { kannada: 'ಎರಡು', pronunciation: 'Eradu', translation: 'రెండు (Rendu)' },
            { kannada: 'ಮೂರು', pronunciation: 'Mooru', translation: 'మూడు (Moodu)' },
            { kannada: 'ನಾಲ್ಕು', pronunciation: 'Naalku', translation: 'నాలుగు (Naalugu)' },
            { kannada: 'ಐದು', pronunciation: 'Aidu', translation: 'ఐదు (Aidu)' },
            { kannada: 'ಆರು', pronunciation: 'Aaru', translation: 'ఆరు (Aaru)' },
            { kannada: 'ಏಳು', pronunciation: 'Yelu', translation: 'ఏడు (Yedu)' },
            { kannada: 'ಎಂಟು', pronunciation: 'Entu', translation: 'ఎనిమిది (Enimidi)' },
            { kannada: 'ಒಂಬತ್ತು', pronunciation: 'Ombattu', translation: 'తొమ్మిది (Thommidi)' },
            { kannada: 'ಹತ್ತು', pronunciation: 'Hattu', translation: 'పది (Padi)' }
        ],
        malayalam: [
            { kannada: 'ಒಂದು', pronunciation: 'Ondu', translation: 'ഒന്ന് (Onnu)' },
            { kannada: 'ಎರಡು', pronunciation: 'Eradu', translation: 'രണ്ട് (Randu)' },
            { kannada: 'ಮೂರು', pronunciation: 'Mooru', translation: 'മൂന്ന് (Moonnu)' },
            { kannada: 'ನಾಲ್ಕು', pronunciation: 'Naalku', translation: 'നാല് (Naalu)' },
            { kannada: 'ಐದು', pronunciation: 'Aidu', translation: 'അഞ്ച് (Anchu)' },
            { kannada: 'ಆರು', pronunciation: 'Aaru', translation: 'ആറ് (Aaru)' },
            { kannada: 'ಏಳು', pronunciation: 'Yelu', translation: 'ഏഴ് (Yezhu)' },
            { kannada: 'ಎಂಟು', pronunciation: 'Entu', translation: 'എട്ട് (Ettu)' },
            { kannada: 'ಒಂಬತ್ತು', pronunciation: 'Ombattu', translation: 'ഒമ്പത് (Ompathu)' },
            { kannada: 'ಹತ್ತು', pronunciation: 'Hattu', translation: 'പത്ത് (Patthu)' }
        ]
    },
    phrases: {
        english: [
            { kannada: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?', pronunciation: 'Neevu hegiddiri?', translation: 'How are you?' },
            { kannada: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ', pronunciation: 'Naanu chennagiddene', translation: 'I am fine' },
            { kannada: 'ನಿಮ್ಮ ಹೆಸರೇನು?', pronunciation: 'Nimma hesarenu?', translation: 'What is your name?' },
            { kannada: 'ನನ್ನ ಹೆಸರು...', pronunciation: 'Nanna hesaru...', translation: 'My name is...' },
            { kannada: 'ಸಂತೋಷವಾಯಿತು', pronunciation: 'Santhoshavayitu', translation: 'Nice to meet you' },
            { kannada: 'ನನಗೆ ಕನ್ನಡ ಬರುವುದಿಲ್ಲ', pronunciation: 'Nanage Kannada baruvudilla', translation: 'I don\'t speak Kannada' }
        ],
        hindi: [
            { kannada: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?', pronunciation: 'Neevu hegiddiri?', translation: 'आप कैसे हैं? (Aap kaise hain?)' },
            { kannada: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ', pronunciation: 'Naanu chennagiddene', translation: 'मैं ठीक हूँ (Main theek hoon)' },
            { kannada: 'ನಿಮ್ಮ ಹೆಸರೇನು?', pronunciation: 'Nimma hesarenu?', translation: 'आपका नाम क्या है? (Aapka naam kya hai?)' },
            { kannada: 'ನನ್ನ ಹೆಸರು...', pronunciation: 'Nanna hesaru...', translation: 'मेरा नाम... (Mera naam...)' },
            { kannada: 'ಸಂತೋಷವಾಯಿತು', pronunciation: 'Santhoshavayitu', translation: 'खुशी हुई (Khushi hui)' },
            { kannada: 'ನನಗೆ ಕನ್ನಡ ಬರುವುದಿಲ್ಲ', pronunciation: 'Nanage Kannada baruvudilla', translation: 'मुझे कन्नड़ नहीं आती (Mujhe Kannada nahi aati)' }
        ],
        tamil: [
            { kannada: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?', pronunciation: 'Neevu hegiddiri?', translation: 'நீங்கள் எப்படி இருக்கிறீர்கள்? (Neengal eppadi irukkireergal?)' },
            { kannada: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ', pronunciation: 'Naanu chennagiddene', translation: 'நான் நலமாக இருக்கிறேன் (Naan nalamaaga irukkiren)' },
            { kannada: 'ನಿಮ್ಮ ಹೆಸರೇನು?', pronunciation: 'Nimma hesarenu?', translation: 'உங்கள் பெயர் என்ன? (Ungal peyar enna?)' },
            { kannada: 'ನನ್ನ ಹೆಸರು...', pronunciation: 'Nanna hesaru...', translation: 'என் பெயர்... (En peyar...)' },
            { kannada: 'ಸಂತೋಷವಾಯಿತು', pronunciation: 'Santhoshavayitu', translation: 'சந்தித்ததில் மகிழ்ச்சி (Sandhiththathil maghizhchi)' },
            { kannada: 'ನನಗೆ ಕನ್ನಡ ಬರುವುದಿಲ್ಲ', pronunciation: 'Nanage Kannada baruvudilla', translation: 'எனக்கு கன்னடம் தெரியாது (Enakku Kannadam theriyaathu)' }
        ],
        telugu: [
            { kannada: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?', pronunciation: 'Neevu hegiddiri?', translation: 'మీరు ఎలా ఉన్నారు? (Meeru ela unnaru?)' },
            { kannada: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ', pronunciation: 'Naanu chennagiddene', translation: 'నేను బాగున్నాను (Nenu baagunnanu)' },
            { kannada: 'ನಿಮ್ಮ ಹೆಸರೇನು?', pronunciation: 'Nimma hesarenu?', translation: 'మీ పేరు ఏమిటి? (Mee peru emiti?)' },
            { kannada: 'ನನ್ನ ಹೆಸರು...', pronunciation: 'Nanna hesaru...', translation: 'నా పేరు... (Naa peru...)' },
            { kannada: 'ಸಂತೋಷವಾಯಿತು', pronunciation: 'Santhoshavayitu', translation: 'కలసినందుకు సంతోషం (Kalasinanduku santhosham)' },
            { kannada: 'ನನಗೆ ಕನ್ನಡ ಬರುವುದಿಲ್ಲ', pronunciation: 'Nanage Kannada baruvudilla', translation: 'నాకు కన్నడ రాదు (Naaku Kannada raadhu)' }
        ],
        malayalam: [
            { kannada: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?', pronunciation: 'Neevu hegiddiri?', translation: 'നിങ്ങൾ എങ്ങനെയുണ്ട്? (Ningal enganeyanundu?)' },
            { kannada: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ', pronunciation: 'Naanu chennagiddene', translation: 'ഞാൻ സുഖമാണ് (Njaan sukhamaanu)' },
            { kannada: 'ನಿಮ್ಮ ಹೆಸರೇನು?', pronunciation: 'Nimma hesarenu?', translation: 'നിങ്ങളുടെ പേര് എന്താണ്? (Ningalude peru enthaanu?)' },
            { kannada: 'ನನ್ನ ಹೆಸರು...', pronunciation: 'Nanna hesaru...', translation: 'എന്റെ പേര്... (Ente peru...)' },
            { kannada: 'ಸಂತೋಷವಾಯಿತು', pronunciation: 'Santhoshavayitu', translation: 'കാണാൻ സന്തോഷം (Kaanaan santhosham)' },
            { kannada: 'ನನಗೆ ಕನ್ನಡ ಬರುವುದಿಲ್ಲ', pronunciation: 'Nanage Kannada baruvudilla', translation: 'എനിക്ക് കന്നഡ അറിയില്ല (Enikku Kannada ariyilla)' }
        ]
    },
    food: {
        english: [
            { kannada: 'ಊಟ', pronunciation: 'Oota', translation: 'Food' },
            { kannada: 'ನೀರು', pronunciation: 'Neeru', translation: 'Water' },
            { kannada: 'ಅನ್ನ', pronunciation: 'Anna', translation: 'Rice' },
            { kannada: 'ರೊಟ್ಟಿ', pronunciation: 'Rotti', translation: 'Bread/Roti' },
            { kannada: 'ದೋಸೆ', pronunciation: 'Dose', translation: 'Dosa' },
            { kannada: 'ಇಡ್ಲಿ', pronunciation: 'Idli', translation: 'Idli' },
            { kannada: 'ಕಾಫಿ', pronunciation: 'Coffee', translation: 'Coffee' },
            { kannada: 'ಚಹಾ', pronunciation: 'Chaha', translation: 'Tea' }
        ],
        hindi: [
            { kannada: 'ಊಟ', pronunciation: 'Oota', translation: 'खाना (Khana)' },
            { kannada: 'ನೀರು', pronunciation: 'Neeru', translation: 'पानी (Paani)' },
            { kannada: 'ಅನ್ನ', pronunciation: 'Anna', translation: 'चावल (Chawal)' },
            { kannada: 'ರೊಟ್ಟಿ', pronunciation: 'Rotti', translation: 'रोटी (Roti)' },
            { kannada: 'ದೋಸೆ', pronunciation: 'Dose', translation: 'डोसा (Dosa)' },
            { kannada: 'ಇಡ್ಲಿ', pronunciation: 'Idli', translation: 'इडली (Idli)' },
            { kannada: 'ಕಾಫಿ', pronunciation: 'Coffee', translation: 'कॉफी (Coffee)' },
            { kannada: 'ಚಹಾ', pronunciation: 'Chaha', translation: 'चाय (Chai)' }
        ],
        tamil: [
            { kannada: 'ಊಟ', pronunciation: 'Oota', translation: 'உணவு (Unavu)' },
            { kannada: 'ನೀರು', pronunciation: 'Neeru', translation: 'தண்ணீர் (Thanneer)' },
            { kannada: 'ಅನ್ನ', pronunciation: 'Anna', translation: 'சாதம் (Saadham)' },
            { kannada: 'ರೊಟ್ಟಿ', pronunciation: 'Rotti', translation: 'ரொட்டி (Rotti)' },
            { kannada: 'ದೋಸೆ', pronunciation: 'Dose', translation: 'தோசை (Thosai)' },
            { kannada: 'ಇಡ್ಲಿ', pronunciation: 'Idli', translation: 'இட்லி (Idli)' },
            { kannada: 'ಕಾಫಿ', pronunciation: 'Coffee', translation: 'காபி (Kaapi)' },
            { kannada: 'ಚಹಾ', pronunciation: 'Chaha', translation: 'தேநீர் (Theneer)' }
        ],
        telugu: [
            { kannada: 'ಊಟ', pronunciation: 'Oota', translation: 'ఆహారం (Ahaaram)' },
            { kannada: 'ನೀರು', pronunciation: 'Neeru', translation: 'నీరు (Neeru)' },
            { kannada: 'ಅನ್ನ', pronunciation: 'Anna', translation: 'అన్నం (Annam)' },
            { kannada: 'ರೊಟ್ಟಿ', pronunciation: 'Rotti', translation: 'రొట్టె (Rotte)' },
            { kannada: 'ದೋಸೆ', pronunciation: 'Dose', translation: 'దోశ (Dosha)' },
            { kannada: 'ಇಡ್ಲಿ', pronunciation: 'Idli', translation: 'ఇడ్లీ (Idli)' },
            { kannada: 'ಕಾಫಿ', pronunciation: 'Coffee', translation: 'కాఫీ (Coffee)' },
            { kannada: 'ಚಹಾ', pronunciation: 'Chaha', translation: 'టీ (Tea)' }
        ],
        malayalam: [
            { kannada: 'ಊಟ', pronunciation: 'Oota', translation: 'ഭക്ഷണം (Bhakshanam)' },
            { kannada: 'ನೀರು', pronunciation: 'Neeru', translation: 'വെള്ളം (Vellam)' },
            { kannada: 'ಅನ್ನ', pronunciation: 'Anna', translation: 'ചോറ് (Choru)' },
            { kannada: 'ರೊಟ್ಟಿ', pronunciation: 'Rotti', translation: 'റൊട്ടി (Rotti)' },
            { kannada: 'ದೋಸೆ', pronunciation: 'Dose', translation: 'ദോശ (Dosha)' },
            { kannada: 'ಇಡ್ಲಿ', pronunciation: 'Idli', translation: 'ഇഡ്ഡലി (Iddali)' },
            { kannada: 'ಕಾಫಿ', pronunciation: 'Coffee', translation: 'കാപ്പി (Kaappi)' },
            { kannada: 'ಚಹಾ', pronunciation: 'Chaha', translation: 'ചായ (Chaaya)' }
        ]
    },
    travel: {
        english: [
            { kannada: 'ಎಲ್ಲಿ', pronunciation: 'Elli', translation: 'Where' },
            { kannada: 'ಹೇಗೆ', pronunciation: 'Hege', translation: 'How' },
            { kannada: 'ಬಸ್', pronunciation: 'Bus', translation: 'Bus' },
            { kannada: 'ರೈಲು', pronunciation: 'Railu', translation: 'Train' },
            { kannada: 'ಟ್ಯಾಕ್ಸಿ', pronunciation: 'Taxi', translation: 'Taxi' },
            { kannada: 'ಹೋಟೆಲ್', pronunciation: 'Hotel', translation: 'Hotel' },
            { kannada: 'ರಸ್ತೆ', pronunciation: 'Raste', translation: 'Road' },
            { kannada: 'ನಿಲ್ದಾಣ', pronunciation: 'Nildana', translation: 'Station' }
        ],
        hindi: [
            { kannada: 'ಎಲ್ಲಿ', pronunciation: 'Elli', translation: 'कहाँ (Kahan)' },
            { kannada: 'ಹೇಗೆ', pronunciation: 'Hege', translation: 'कैसे (Kaise)' },
            { kannada: 'ಬಸ್', pronunciation: 'Bus', translation: 'बस (Bus)' },
            { kannada: 'ರೈಲು', pronunciation: 'Railu', translation: 'ट्रेन (Train)' },
            { kannada: 'ಟ್ಯಾಕ್ಸಿ', pronunciation: 'Taxi', translation: 'टैक्सी (Taxi)' },
            { kannada: 'ಹೋಟೆಲ್', pronunciation: 'Hotel', translation: 'होटल (Hotel)' },
            { kannada: 'ರಸ್ತೆ', pronunciation: 'Raste', translation: 'सड़क (Sadak)' },
            { kannada: 'ನಿಲ್ದಾಣ', pronunciation: 'Nildana', translation: 'स्टेशन (Station)' }
        ],
        tamil: [
            { kannada: 'ಎಲ್ಲಿ', pronunciation: 'Elli', translation: 'எங்கே (Enge)' },
            { kannada: 'ಹೇಗೆ', pronunciation: 'Hege', translation: 'எப்படி (Eppadi)' },
            { kannada: 'ಬಸ್', pronunciation: 'Bus', translation: 'பேருந்து (Perunthu)' },
            { kannada: 'ರೈಲು', pronunciation: 'Railu', translation: 'ரயில் (Rayil)' },
            { kannada: 'ಟ್ಯಾಕ್ಸಿ', pronunciation: 'Taxi', translation: 'டாக்ஸி (Taxi)' },
            { kannada: 'ಹೋಟೆಲ್', pronunciation: 'Hotel', translation: 'ஹோட்டல் (Hotel)' },
            { kannada: 'ರಸ್ತೆ', pronunciation: 'Raste', translation: 'சாலை (Saalai)' },
            { kannada: 'ನಿಲ್ದಾಣ', pronunciation: 'Nildana', translation: 'நிலையம் (Nilaiyam)' }
        ],
        telugu: [
            { kannada: 'ಎಲ್ಲಿ', pronunciation: 'Elli', translation: 'ఎక్కడ (Ekkada)' },
            { kannada: 'ಹೇಗೆ', pronunciation: 'Hege', translation: 'ఎలా (Ela)' },
            { kannada: 'ಬಸ್', pronunciation: 'Bus', translation: 'బస్సు (Bussu)' },
            { kannada: 'ರೈಲು', pronunciation: 'Railu', translation: 'రైలు (Railu)' },
            { kannada: 'ಟ್ಯಾಕ್ಸಿ', pronunciation: 'Taxi', translation: 'టాక్సీ (Taxi)' },
            { kannada: 'ಹೋಟೆಲ್', pronunciation: 'Hotel', translation: 'హోటల్ (Hotel)' },
            { kannada: 'ರಸ್ತೆ', pronunciation: 'Raste', translation: 'రోడ్డు (Roddu)' },
            { kannada: 'ನಿಲ್ದಾಣ', pronunciation: 'Nildana', translation: 'స్టేషన్ (Station)' }
        ],
        malayalam: [
            { kannada: 'ಎಲ್ಲಿ', pronunciation: 'Elli', translation: 'എവിടെ (Evide)' },
            { kannada: 'ಹೇಗೆ', pronunciation: 'Hege', translation: 'എങ്ങനെ (Engane)' },
            { kannada: 'ಬಸ್', pronunciation: 'Bus', translation: 'ബസ് (Bus)' },
            { kannada: 'ರೈಲು', pronunciation: 'Railu', translation: 'തീവണ്ടി (Theevandi)' },
            { kannada: 'ಟ್ಯಾಕ್ಸಿ', pronunciation: 'Taxi', translation: 'ടാക്സി (Taxi)' },
            { kannada: 'ಹೋಟೆಲ್', pronunciation: 'Hotel', translation: 'ഹോട്ടൽ (Hotel)' },
            { kannada: 'ರಸ್ತೆ', pronunciation: 'Raste', translation: 'റോഡ് (Road)' },
            { kannada: 'ನಿಲ್ದಾಣ', pronunciation: 'Nildana', translation: 'സ്റ്റേഷൻ (Station)' }
        ]
    },
    culture: {
        english: [
            { kannada: 'ಸಂಸ್ಕೃತಿ', pronunciation: 'Sanskriti', translation: 'Culture' },
            { kannada: 'ಯಕ್ಷಗಾನ', pronunciation: 'Yakshagana', translation: 'Yakshagana (Folk Theatre)' },
            { kannada: 'ದಸರಾ', pronunciation: 'Dasara', translation: 'Dasara Festival' },
            { kannada: 'ಕರ್ನಾಟಕ ಸಂಗೀತ', pronunciation: 'Karnataka Sangeetha', translation: 'Carnatic Music' },
            { kannada: 'ಕವಿತೆ', pronunciation: 'Kavithe', translation: 'Poetry' },
            { kannada: 'ನಾಟಕ', pronunciation: 'Nataka', translation: 'Drama/Play' },
            { kannada: 'ಹಬ್ಬ', pronunciation: 'Habba', translation: 'Festival' }
        ],
        hindi: [
            { kannada: 'ಸಂಸ್ಕೃತಿ', pronunciation: 'Sanskriti', translation: 'संस्कृति (Sanskriti)' },
            { kannada: 'ಯಕ್ಷಗಾನ', pronunciation: 'Yakshagana', translation: 'यक्षगान (लोक नाट्य)' },
            { kannada: 'ದಸರಾ', pronunciation: 'Dasara', translation: 'दशहरा (Dussehra)' },
            { kannada: 'ಕರ್ನಾಟಕ ಸಂಗೀತ', pronunciation: 'Karnataka Sangeetha', translation: 'कर्नाटक संगीत (Karnatik Sangeet)' },
            { kannada: 'ಕವಿತೆ', pronunciation: 'Kavithe', translation: 'कविता (Kavita)' },
            { kannada: 'ನಾಟಕ', pronunciation: 'Nataka', translation: 'नाटक (Natak)' },
            { kannada: 'ಹಬ್ಬ', pronunciation: 'Habba', translation: 'त्योहार (Tyohar)' }
        ],
        tamil: [
            { kannada: 'ಸಂಸ್ಕೃತಿ', pronunciation: 'Sanskriti', translation: 'கலாச்சாரம் (Kalaacharam)' },
            { kannada: 'ಯಕ್ಷಗಾನ', pronunciation: 'Yakshagana', translation: 'யக்ஷகானா (நாட்டிய நாடகம்)' },
            { kannada: 'ದಸರಾ', pronunciation: 'Dasara', translation: 'தசரா (Thasara)' },
            { kannada: 'ಕರ್ನಾಟಕ ಸಂಗೀತ', pronunciation: 'Karnataka Sangeetha', translation: 'கர்நாடக இசை (Karnaadaga Isai)' },
            { kannada: 'ಕವಿತೆ', pronunciation: 'Kavithe', translation: 'கவிதை (Kavithai)' },
            { kannada: 'ನಾಟಕ', pronunciation: 'Nataka', translation: 'நாடகம் (Naadagam)' },
            { kannada: 'ಹಬ್ಬ', pronunciation: 'Habba', translation: 'திருவிழா (Thiruvizha)' }
        ],
        telugu: [
            { kannada: 'ಸಂಸ್ಕೃತಿ', pronunciation: 'Sanskriti', translation: 'సంస్కృతి (Sanskriti)' },
            { kannada: 'ಯಕ್ಷಗಾನ', pronunciation: 'Yakshagana', translation: 'యక్షగానం (నాటక రూపం)' },
            { kannada: 'ದಸರಾ', pronunciation: 'Dasara', translation: 'దసరా (Dasara)' },
            { kannada: 'ಕರ್ನಾಟಕ ಸಂಗೀತ', pronunciation: 'Karnataka Sangeetha', translation: 'కర్నాటక సంగీతం (Karnatik Sangeetham)' },
            { kannada: 'ಕವಿತೆ', pronunciation: 'Kavithe', translation: 'కవిత (Kavitha)' },
            { kannada: 'ನಾಟಕ', pronunciation: 'Nataka', translation: 'నాటకం (Natakam)' },
            { kannada: 'ಹಬ್ಬ', pronunciation: 'Habba', translation: 'పండుగ (Panduga)' }
        ],
        malayalam: [
            { kannada: 'ಸಂಸ್ಕೃತಿ', pronunciation: 'Sanskriti', translation: 'സംസ്കാരം (Samskaram)' },
            { kannada: 'ಯಕ್ಷಗಾನ', pronunciation: 'Yakshagana', translation: 'യക്ഷഗാനം (നാടക രൂപം)' },
            { kannada: 'ದಸರಾ', pronunciation: 'Dasara', translation: 'ദസറ (Dasara)' },
            { kannada: 'ಕರ್ನಾಟಕ ಸಂಗೀತ', pronunciation: 'Karnataka Sangeetha', translation: 'കർണാടക സംഗീതം (Karnaadaka Sangeetham)' },
            { kannada: 'ಕವಿತೆ', pronunciation: 'Kavithe', translation: 'കവിത (Kavitha)' },
            { kannada: 'ನಾಟಕ', pronunciation: 'Nataka', translation: 'നാടകം (Naadakam)' },
            { kannada: 'ಹಬ್ಬ', pronunciation: 'Habba', translation: 'ഉത്സവം (Uthsavam)' }
        ]
    }
};

// ===========================
// Quiz Questions
// ===========================
const quizData = {
    greetings: [
        {
            question: "What is the Kannada word for 'Hello'?",
            options: ['ನಮಸ್ಕಾರ', 'ಧನ್ಯವಾದಗಳು', 'ವಿದಾಯ', 'ಕ್ಷಮಿಸಿ'],
            correct: 0
        },
        {
            question: "How do you say 'Thank You' in Kannada?",
            options: ['ದಯವಿಟ್ಟು', 'ಧನ್ಯವಾದಗಳು', 'ನಮಸ್ಕಾರ', 'ಶುಭೋದಯ'],
            correct: 1
        },
        {
            question: "What does 'ಶುಭೋದಯ' mean?",
            options: ['Good Night', 'Good Morning', 'Thank You', 'Goodbye'],
            correct: 1
        },
        {
            question: "Which word means 'Please' in Kannada?",
            options: ['ನಮಸ್ಕಾರ', 'ಕ್ಷಮಿಸಿ', 'ದಯವಿಟ್ಟು', 'ವಿದಾಯ'],
            correct: 2
        },
        {
            question: "How do you say 'Goodbye' in Kannada?",
            options: ['ವಿದಾಯ', 'ನಮಸ್ಕಾರ', 'ಶುಭ ರಾತ್ರಿ', 'ಧನ್ಯವಾದಗಳು'],
            correct: 0
        }
    ],
    numbers: [
        {
            question: "What number is 'ಮೂರು'?",
            options: ['Two', 'Three', 'Four', 'Five'],
            correct: 1
        },
        {
            question: "How do you say 'Five' in Kannada?",
            options: ['ಐದು', 'ಆರು', 'ಏಳು', 'ನಾಲ್ಕು'],
            correct: 0
        },
        {
            question: "What does 'ಹತ್ತು' mean?",
            options: ['Eight', 'Nine', 'Ten', 'Seven'],
            correct: 2
        },
        {
            question: "Which is the Kannada word for 'One'?",
            options: ['ಎರಡು', 'ಒಂದು', 'ಮೂರು', 'ನಾಲ್ಕು'],
            correct: 1
        },
        {
            question: "What number is 'ಎಂಟು'?",
            options: ['Six', 'Seven', 'Eight', 'Nine'],
            correct: 2
        }
    ],
    phrases: [
        {
            question: "What does 'ನೀವು ಹೇಗಿದ್ದೀರಿ?' mean?",
            options: ['What is your name?', 'How are you?', 'Nice to meet you', 'Where are you from?'],
            correct: 1
        },
        {
            question: "How do you say 'My name is...' in Kannada?",
            options: ['ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ', 'ನನ್ನ ಹೆಸರು...', 'ನಿಮ್ಮ ಹೆಸರೇನು?', 'ಸಂತೋಷವಾಯಿತು'],
            correct: 1
        },
        {
            question: "What does 'ಸಂತೋಷವಾಯಿತು' mean?",
            options: ['I am fine', 'Nice to meet you', 'How are you?', 'My name is'],
            correct: 1
        },
        {
            question: "Which phrase means 'I am fine'?",
            options: ['ನಿಮ್ಮ ಹೆಸರೇನು?', 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ', 'ನನ್ನ ಹೆಸರು', 'ಸಂತೋಷವಾಯಿತು'],
            correct: 1
        },
        {
            question: "How do you ask 'What is your name?' in Kannada?",
            options: ['ನಿಮ್ಮ ಹೆಸರೇನು?', 'ನೀವು ಹೇಗಿದ್ದೀರಿ?', 'ನನ್ನ ಹೆಸರು', 'ಸಂತೋಷವಾಯಿತು'],
            correct: 0
        }
    ],
    food: [
        {
            question: "What is the Kannada word for 'Water'?",
            options: ['ಊಟ', 'ನೀರು', 'ಅನ್ನ', 'ಕಾಫಿ'],
            correct: 1
        },
        {
            question: "What does 'ದೋಸೆ' mean?",
            options: ['Idli', 'Dosa', 'Rice', 'Coffee'],
            correct: 1
        },
        {
            question: "How do you say 'Rice' in Kannada?",
            options: ['ರೊಟ್ಟಿ', 'ಊಟ', 'ಅನ್ನ', 'ಇಡ್ಲಿ'],
            correct: 2
        },
        {
            question: "What does 'ಚಹಾ' mean?",
            options: ['Coffee', 'Tea', 'Water', 'Food'],
            correct: 1
        },
        {
            question: "Which word means 'Food' in Kannada?",
            options: ['ನೀರು', 'ಊಟ', 'ಕಾಫಿ', 'ರೊಟ್ಟಿ'],
            correct: 1
        }
    ]
};

// ===========================
// Authentication Functions
// ===========================
// Check if API is available (use backend if available, fallback to localStorage)
const USE_BACKEND = true; // Set to false to use localStorage (for offline development)

async function checkAuthStatus() {
    if (USE_BACKEND && window.LearnKannadaAPI) {
        // Use backend API
        try {
            const response = await window.LearnKannadaAPI.auth.verify();
            if (response.success && response.user) {
                currentUser = response.user;
                showMainApp();
                initializeApp();
                createFloatingLetters();
                await loadProgress();
                updateProgressDisplay();
                return;
            }
        } catch (error) {
            console.log('Backend not available, using localStorage fallback');
        }
    }
    
    // Fallback to localStorage
    const session = getSession();
    if (session && session.user) {
        currentUser = session.user;
        showMainApp();
        initializeApp();
        createFloatingLetters();
        loadProgress();
        updateProgressDisplay();
    } else {
        showAuthModal();
    }
}

function getSession() {
    const sessionData = localStorage.getItem('kannadaSession');
    if (!sessionData) {
        return null;
    }
    
    try {
        const session = JSON.parse(sessionData);
        // Check if session is still valid (7 days)
        const sessionAge = Date.now() - session.timestamp;
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        
        if (sessionAge > sevenDays) {
            localStorage.removeItem('kannadaSession');
            return null;
        }
        
        return session;
    } catch (e) {
        return null;
    }
}

function saveSession(user) {
    const session = {
        user: user,
        timestamp: Date.now()
    };
    localStorage.setItem('kannadaSession', JSON.stringify(session));
}

function clearSession() {
    localStorage.removeItem('kannadaSession');
    if (window.LearnKannadaAPI) {
        window.LearnKannadaAPI.auth.logout();
    }
    currentUser = null;
}

function getUsers() {
    const usersData = localStorage.getItem('kannadaUsers');
    return usersData ? JSON.parse(usersData) : [];
}

function saveUsers(users) {
    localStorage.setItem('kannadaUsers', JSON.stringify(users));
}

async function signup(name, email, password) {
    if (USE_BACKEND && window.LearnKannadaAPI) {
        // Use backend API
        try {
            const response = await window.LearnKannadaAPI.auth.signup(name, email, password);
            if (response.success && response.user) {
                currentUser = response.user;
                return response;
            }
            return response;
        } catch (error) {
            console.error('Backend signup failed, using localStorage fallback');
        }
    }
    
    // Fallback to localStorage
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Email already registered. Please login instead.' };
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password, // In production, this should be hashed
        createdAt: Date.now()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Auto login after signup
    currentUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    saveSession(currentUser);
    
    return { success: true, message: 'Account created successfully!' };
}

async function login(email, password) {
    if (USE_BACKEND && window.LearnKannadaAPI) {
        // Use backend API
        try {
            const response = await window.LearnKannadaAPI.auth.login(email, password);
            if (response.success && response.user) {
                currentUser = response.user;
                return response;
            }
            return response;
        } catch (error) {
            console.error('Backend login failed, using localStorage fallback');
        }
    }
    
    // Fallback to localStorage
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return { success: false, message: 'Invalid email or password.' };
    }
    
    currentUser = { id: user.id, name: user.name, email: user.email };
    saveSession(currentUser);
    
    return { success: true, message: 'Login successful!' };
}

function logout() {
    clearSession();
    showAuthModal();
    hideMainApp();
    updateNavAuthState();
}

function showAuthModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.style.display = 'flex';
    }
    
    // Show login form by default
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    if (loginForm) loginForm.style.display = 'block';
    if (signupForm) signupForm.style.display = 'none';
    
    // Show/hide close button based on login status
    const closeAuthModal = document.getElementById('closeAuthModal');
    if (closeAuthModal) {
        closeAuthModal.style.display = currentUser ? 'block' : 'none';
    }
    
    // Clear form errors
    const loginError = document.getElementById('loginError');
    const signupError = document.getElementById('signupError');
    if (loginError) loginError.textContent = '';
    if (signupError) signupError.textContent = '';
}

function hideAuthModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.style.display = 'none';
    }
}

function showMainApp() {
    const mainApp = document.getElementById('mainApp');
    if (mainApp) {
        mainApp.style.display = 'block';
    }
    hideAuthModal();
    updateNavAuthState();
}

function hideMainApp() {
    const mainApp = document.getElementById('mainApp');
    if (mainApp) {
        mainApp.style.display = 'none';
    }
}

function updateNavAuthState() {
    const navUser = document.getElementById('navUser');
    const navAuth = document.getElementById('navAuth');
    const userName = document.getElementById('userName');
    
    if (currentUser) {
        if (navUser) navUser.style.display = 'block';
        if (navAuth) navAuth.style.display = 'none';
        if (userName) userName.textContent = currentUser.name;
    } else {
        if (navUser) navUser.style.display = 'none';
        if (navAuth) navAuth.style.display = 'block';
    }
}

function setupAuthEventListeners() {
    // Login button
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', showAuthModal);
    }
    
    // Close auth modal (only visible when logged in)
    const closeAuthModal = document.getElementById('closeAuthModal');
    if (closeAuthModal) {
        closeAuthModal.addEventListener('click', function() {
            hideAuthModal();
        });
    }
    
    // Switch to signup
    const switchToSignup = document.getElementById('switchToSignup');
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            const loginForm = document.getElementById('loginForm');
            const signupForm = document.getElementById('signupForm');
            if (loginForm) loginForm.style.display = 'none';
            if (signupForm) signupForm.style.display = 'block';
            
            // Clear errors
            const loginError = document.getElementById('loginError');
            const signupError = document.getElementById('signupError');
            if (loginError) loginError.textContent = '';
            if (signupError) signupError.textContent = '';
        });
    }
    
    // Switch to login
    const switchToLogin = document.getElementById('switchToLogin');
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            const loginForm = document.getElementById('loginForm');
            const signupForm = document.getElementById('signupForm');
            if (loginForm) loginForm.style.display = 'block';
            if (signupForm) signupForm.style.display = 'none';
            
            // Clear errors
            const loginError = document.getElementById('loginError');
            const signupError = document.getElementById('signupError');
            if (loginError) loginError.textContent = '';
            if (signupError) signupError.textContent = '';
        });
    }
    
    // Login form submit
    const loginFormElement = document.getElementById('loginFormElement');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const loginError = document.getElementById('loginError');
            const submitBtn = loginFormElement.querySelector('button[type="submit"]');
            
            // Disable button during request
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Logging in...';
            }
            
            try {
                const result = await login(email, password);
                if (result.success) {
                    hideAuthModal();
                    showMainApp();
                    initializeApp();
                    createFloatingLetters();
                    await loadProgress();
                    updateProgressDisplay();
                    // Clear form
                    document.getElementById('loginEmail').value = '';
                    document.getElementById('loginPassword').value = '';
                } else {
                    if (loginError) {
                        loginError.textContent = result.message;
                    }
                }
            } catch (error) {
                if (loginError) {
                    loginError.textContent = 'Login failed. Please try again.';
                }
            } finally {
                // Re-enable button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Login';
                }
            }
        });
    }
    
    // Signup form submit
    const signupFormElement = document.getElementById('signupFormElement');
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            const signupError = document.getElementById('signupError');
            const submitBtn = signupFormElement.querySelector('button[type="submit"]');
            
            // Validate passwords match
            if (password !== confirmPassword) {
                if (signupError) {
                    signupError.textContent = 'Passwords do not match.';
                }
                return;
            }
            
            if (password.length < 6) {
                if (signupError) {
                    signupError.textContent = 'Password must be at least 6 characters long.';
                }
                return;
            }
            
            // Disable button during request
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Creating account...';
            }
            
            try {
                const result = await signup(name, email, password);
                if (result.success) {
                    hideAuthModal();
                    showMainApp();
                    initializeApp();
                    createFloatingLetters();
                    await loadProgress();
                    updateProgressDisplay();
                    // Clear form
                    document.getElementById('signupName').value = '';
                    document.getElementById('signupEmail').value = '';
                    document.getElementById('signupPassword').value = '';
                    document.getElementById('signupConfirmPassword').value = '';
                } else {
                    if (signupError) {
                        signupError.textContent = result.message;
                    }
                }
            } catch (error) {
                if (signupError) {
                    signupError.textContent = 'Signup failed. Please try again.';
                }
            } finally {
                // Re-enable button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Sign Up';
                }
            }
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout? Your progress is saved.')) {
                logout();
            }
        });
    }
    
    // Close modal on outside click (only if logged in)
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                if (currentUser) {
                    hideAuthModal();
                } else {
                    // Prevent closing if not logged in
                    e.stopPropagation();
                }
            }
        });
    }
}

// ===========================
// Initialize App
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    setupAuthEventListeners();
    setupEventListeners();
});

function initializeApp() {
    // Initialize quiz UI - hide quiz card initially until a quiz is started
    const quizCard = document.getElementById('quizCard');
    if (quizCard) {
        quizCard.style.display = 'none';
    }
    
    const quizResults = document.getElementById('quizResults');
    if (quizResults) {
        quizResults.classList.remove('show');
    }
    
    // Don't display question yet - wait for user to start a quiz
    // displayQuestion() will be called when startQuiz() is invoked
}

function displayQuestion() {
    // Safety check: ensure quiz category is set
    if (!currentQuizCategory || !quizData[currentQuizCategory]) {
        console.error('Quiz category not set or invalid');
        return;
    }
    
    const questions = quizData[currentQuizCategory];
    if (!questions || questions.length === 0) {
        console.error('No questions found for category:', currentQuizCategory);
        return;
    }
    
    const question = questions[currentQuestionIndex];
    if (!question) {
        console.error('Question not found at index:', currentQuestionIndex);
        return;
    }
    
    const questionNumberEl = document.getElementById('questionNumber');
    const quizScoreEl = document.getElementById('quizScore');
    const quizQuestionEl = document.getElementById('quizQuestion');
    const optionsContainer = document.getElementById('quizOptions');
    const quizFeedbackEl = document.getElementById('quizFeedback');
    const quizNextBtn = document.getElementById('quizNextBtn');
    
    if (questionNumberEl) {
        questionNumberEl.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    }
    if (quizScoreEl) {
        quizScoreEl.textContent = `Score: ${quizScore}`;
    }
    if (quizQuestionEl) {
        quizQuestionEl.textContent = question.question;
    }
    
    // Display options
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option';
            optionDiv.textContent = option;
            optionDiv.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(optionDiv);
        });
    }
    
    if (quizFeedbackEl) {
        quizFeedbackEl.classList.remove('show');
    }
    if (quizNextBtn) {
        quizNextBtn.disabled = true;
    }
}

function selectAnswer(selectedIndex) {
    // Safety checks
    if (!currentQuizCategory || !quizData[currentQuizCategory]) {
        console.error('Quiz category not set');
        return;
    }
    
    const questions = quizData[currentQuizCategory];
    if (!questions || !questions[currentQuestionIndex]) {
        console.error('Question not found');
        return;
    }
    
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    if (options.length === 0) {
        console.error('No options found');
        return;
    }
    
    // Disable all options
    options.forEach(opt => {
        opt.classList.add('disabled');
        opt.style.pointerEvents = 'none';
    });
    
    // Check if answer is correct
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        quizScore += 20;
        if (options[selectedIndex]) {
            options[selectedIndex].classList.add('correct');
        }
        showFeedback('Correct! ಅದ್ಭುತ (Adbhuta - Excellent)!', true);
    } else {
        if (options[selectedIndex]) {
            options[selectedIndex].classList.add('incorrect');
        }
        if (options[question.correct]) {
            options[question.correct].classList.add('correct');
        }
        showFeedback(`Incorrect. The correct answer is: ${question.options[question.correct]}`, false);
    }
    
    quizAnswers.push(isCorrect);
    
    const quizScoreEl = document.getElementById('quizScore');
    if (quizScoreEl) {
        quizScoreEl.textContent = `Score: ${quizScore}`;
    }
    
    const quizNextBtn = document.getElementById('quizNextBtn');
    if (quizNextBtn) {
        quizNextBtn.disabled = false;
    }
}

function showFeedback(message, isCorrect) {
    const feedback = document.getElementById('quizFeedback');
    if (feedback) {
        feedback.textContent = message;
        feedback.className = 'quiz-feedback show ' + (isCorrect ? 'correct' : 'incorrect');
    }
}

async function nextQuestion() {
    if (!currentQuizCategory || !quizData[currentQuizCategory]) {
        console.error('Quiz category not set');
        return;
    }
    
    const questions = quizData[currentQuizCategory];
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        await showResults();
    }
}

async function showResults() {
    const quizCard = document.getElementById('quizCard');
    if (quizCard) {
        quizCard.style.display = 'none';
    }
    
    const resultsDiv = document.getElementById('quizResults');
    const scoreDiv = document.getElementById('resultsScore');
    const messageDiv = document.getElementById('resultsMessage');
    
    if (!resultsDiv || !scoreDiv || !messageDiv) {
        console.error('Quiz results elements not found');
        return;
    }
    
    scoreDiv.textContent = `${quizScore}/100`;
    
    let message = '';
    if (quizScore >= 80) {
        message = '🎉 Outstanding! You\'re mastering Kannada! ಅದ್ಭುತ!';
    } else if (quizScore >= 60) {
        message = '👍 Good job! Keep practicing! ಚೆನ್ನಾಗಿದೆ!';
    } else if (quizScore >= 40) {
        message = '📚 Not bad! Review the lessons and try again!';
    } else {
        message = '💪 Keep learning! Practice makes perfect!';
    }
    
    messageDiv.textContent = message;
    resultsDiv.classList.add('show');
    
    // Update progress
    if (currentQuizCategory) {
        await updateQuizProgress(currentQuizCategory, quizScore);
    }
}

function restartQuiz() {
    if (!currentQuizCategory) {
        console.error('No quiz category to restart');
        return;
    }
    startQuiz(currentQuizCategory);
}

// ===========================
// Progress Tracking
// ===========================
async function updateLessonProgress(category) {
    // Try backend API first
    if (USE_BACKEND && window.LearnKannadaAPI) {
        try {
            const updatedProgress = await window.LearnKannadaAPI.progress.updateLessonProgress(category);
            if (updatedProgress) {
                // Update UI
                const card = document.querySelector(`[data-category="${category}"]`);
                if (card) {
                    const progressFill = card.querySelector('.progress-fill');
                    const progressText = card.querySelector('.progress-text');
                    if (progressFill) {
                        progressFill.style.width = '100%';
                        progressFill.setAttribute('data-progress', '100');
                    }
                    if (progressText) {
                        progressText.textContent = '100% Complete';
                    }
                }
                updateProgressDisplay();
                return;
            }
        } catch (error) {
            console.log('Backend update not available, using localStorage fallback');
        }
    }
    
    // Fallback to localStorage
    const progress = await getProgress();
    
    if (!progress.lessons.includes(category)) {
        progress.lessons.push(category);
        if (selectedLanguage && lessonData[category] && lessonData[category][selectedLanguage]) {
            progress.wordsLearned += lessonData[category][selectedLanguage].length;
        }
        await saveProgress(progress);
    }
    
    // Update UI
    const card = document.querySelector(`[data-category="${category}"]`);
    if (card) {
        const progressFill = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.progress-text');
        if (progressFill) {
            progressFill.style.width = '100%';
            progressFill.setAttribute('data-progress', '100');
        }
        if (progressText) {
            progressText.textContent = '100% Complete';
        }
    }
    
    updateProgressDisplay();
}

async function updateQuizProgress(category, score) {
    // Get current progress to calculate words learned
    const currentProgress = await getProgress();
    const wordsLearned = currentProgress.wordsLearned || 0;
    
    // Try backend API first
    if (USE_BACKEND && window.LearnKannadaAPI) {
        try {
            const updatedProgress = await window.LearnKannadaAPI.progress.updateQuizProgress(
                category, 
                score, 
                wordsLearned
            );
            if (updatedProgress) {
                updateProgressDisplay();
                return;
            }
        } catch (error) {
            console.log('Backend update not available, using localStorage fallback');
        }
    }
    
    // Fallback to localStorage
    const progress = await getProgress();
    
    progress.quizzes[category] = score;
    progress.quizzesCompleted = Object.keys(progress.quizzes).length;
    
    // Calculate average score
    const scores = Object.values(progress.quizzes);
    if (scores.length > 0) {
        const sum = scores.reduce((a, b) => a + b, 0);
        progress.averageScore = Math.round(sum / scores.length);
    } else {
        progress.averageScore = 0;
    }
    
    await saveProgress(progress);
    updateProgressDisplay();
}

async function getProgress() {
    const defaultProgress = {
        lessons: [],
        quizzes: {},
        wordsLearned: 0,
        quizzesCompleted: 0,
        averageScore: 0
    };
    
    if (!currentUser) {
        return defaultProgress;
    }
    
    // Try backend API first
    if (USE_BACKEND && window.LearnKannadaAPI) {
        try {
            const progress = await window.LearnKannadaAPI.progress.getProgress();
            if (progress) {
                return progress;
            }
        } catch (error) {
            console.log('Backend progress not available, using localStorage fallback');
        }
    }
    
    // Fallback to localStorage
    const userProgressKey = `kannadaProgress_${currentUser.id}`;
    const saved = localStorage.getItem(userProgressKey);
    return saved ? JSON.parse(saved) : defaultProgress;
}

async function saveProgress(progress) {
    if (!currentUser) {
        return;
    }
    
    // Try backend API first
    if (USE_BACKEND && window.LearnKannadaAPI) {
        try {
            // Progress is automatically saved on the backend when updating lessons/quizzes
            // But we can also explicitly update words learned if needed
            return;
        } catch (error) {
            console.log('Backend save not available, using localStorage fallback');
        }
    }
    
    // Fallback to localStorage
    const userProgressKey = `kannadaProgress_${currentUser.id}`;
    localStorage.setItem(userProgressKey, JSON.stringify(progress));
}

async function loadProgress() {
    const progress = await getProgress();
    
    if (!progress) {
        return;
    }
    
    // Update lesson cards with completion status
    const allCategories = ['greetings', 'numbers', 'phrases', 'food', 'travel', 'culture'];
    allCategories.forEach(category => {
        const card = document.querySelector(`[data-category="${category}"]`);
        if (card) {
            const progressFill = card.querySelector('.progress-fill');
            const progressText = card.querySelector('.progress-text');
            
            if (progress.lessons.includes(category)) {
                // Lesson is completed
                if (progressFill) {
                    progressFill.style.width = '100%';
                    progressFill.setAttribute('data-progress', '100');
                }
                if (progressText) {
                    progressText.textContent = '100% Complete';
                }
            } else {
                // Lesson not started
                if (progressFill) {
                    progressFill.style.width = '0%';
                    progressFill.setAttribute('data-progress', '0');
                }
                if (progressText) {
                    progressText.textContent = '0% Complete';
                }
            }
        }
    });
}

async function updateProgressDisplay() {
    const progress = await getProgress();
    
    const lessonsCompletedEl = document.getElementById('lessonsCompleted');
    const quizzesCompletedEl = document.getElementById('quizzesCompleted');
    const averageScoreEl = document.getElementById('averageScore');
    const totalWordsEl = document.getElementById('totalWords');
    
    // Total available lessons and quizzes
    const totalLessons = 6; // greetings, numbers, phrases, food, travel, culture
    const totalQuizzes = 4; // greetings, numbers, phrases, food (travel and culture don't have quizzes)
    
    // Validate and fix progress data
    if (!Array.isArray(progress.lessons)) {
        progress.lessons = [];
    }
    if (!progress.quizzes || typeof progress.quizzes !== 'object') {
        progress.quizzes = {};
    }
    if (typeof progress.wordsLearned !== 'number') {
        progress.wordsLearned = 0;
    }
    
    // Recalculate quizzes completed based on actual quiz data
    const actualQuizzesCompleted = Object.keys(progress.quizzes).filter(category => {
        return quizData[category] && typeof progress.quizzes[category] === 'number';
    }).length;
    
    // Update progress object if needed
    if (progress.quizzesCompleted !== actualQuizzesCompleted) {
        progress.quizzesCompleted = actualQuizzesCompleted;
        saveProgress(progress);
    }
    
    // Update display elements
    if (lessonsCompletedEl) {
        lessonsCompletedEl.textContent = `${progress.lessons.length} / ${totalLessons}`;
    }
    if (quizzesCompletedEl) {
        quizzesCompletedEl.textContent = `${actualQuizzesCompleted} / ${totalQuizzes}`;
    }
    if (averageScoreEl) {
        if (actualQuizzesCompleted > 0) {
            const scores = Object.values(progress.quizzes).filter(score => typeof score === 'number');
            if (scores.length > 0) {
                const sum = scores.reduce((a, b) => a + b, 0);
                const avg = Math.round(sum / scores.length);
                averageScoreEl.textContent = avg + '%';
            } else {
                averageScoreEl.textContent = '0%';
            }
        } else {
            averageScoreEl.textContent = 'N/A';
        }
    }
    if (totalWordsEl) {
        totalWordsEl.textContent = progress.wordsLearned || 0;
    }
    
    // Calculate overall progress
    // Total achievements: 6 lessons + 4 quizzes = 10
    const totalAchievements = totalLessons + totalQuizzes;
    const completedAchievements = progress.lessons.length + actualQuizzesCompleted;
    
    // Calculate percentage with proper rounding
    let overallPercent = 0;
    if (totalAchievements > 0) {
        overallPercent = Math.round((completedAchievements / totalAchievements) * 100);
    }
    
    // Ensure percentage is between 0 and 100
    const finalPercent = Math.min(100, Math.max(0, overallPercent));
    
    const overallFill = document.getElementById('overallProgress');
    const overallText = document.getElementById('overallPercentage');
    
    if (overallFill) {
        overallFill.style.width = finalPercent + '%';
        overallFill.setAttribute('data-progress', finalPercent);
    }
    if (overallText) {
        overallText.textContent = finalPercent + '% Complete';
    }
}

// ===========================
// Carousel Functions
// ===========================
let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) {
        return;
    }
    
    if (slides[currentSlide]) {
        slides[currentSlide].classList.remove('active');
    }
    
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
}

// ===========================
// Utility Functions
// ===========================
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe lesson cards and stats
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lesson-card, .progress-stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===========================
// Keyboard Shortcuts
// ===========================
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lessonModal');
    
    if (modal && modal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            showPreviousWord();
        } else if (e.key === 'ArrowRight') {
            showNextWord();
        } else if (e.key === 'Escape') {
            closeLessonModal();
        } else if (e.key === ' ') {
            e.preventDefault();
            playPronunciation();
        }
    }
});

// ===========================
// Welcome Message
// ===========================
setTimeout(() => {
    console.log('%c🎉 Welcome to LearnKannada.ai! 🎉', 'color: #C41E3A; font-size: 24px; font-weight: bold;');
    console.log('%cನಮಸ್ಕಾರ! Start your journey to master the beautiful Kannada language!', 'color: #FFD700; font-size: 16px;');
    console.log('%cBuilt with ❤️ for Karnataka', 'color: #8B0000; font-size: 14px;');
}, 1000);

// ===========================
// Service Worker (Optional - for offline support)
// ===========================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration can be added here for PWA support
        console.log('LearnKannada.ai is ready! 🚀');
    });
}

// ===========================
// Analytics & Tracking (Placeholder)
// ===========================
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Event: ${category} - ${action} - ${label}`);
}

// Track lesson completions
function trackLessonCompletion(category) {
    trackEvent('Lesson', 'Complete', category);
}

// Track quiz attempts
function trackQuizAttempt(category, score) {
    trackEvent('Quiz', 'Complete', `${category} - ${score}%`);
}

// ===========================
// Export functions for testing (optional)
// ===========================
window.LearnKannadaApp = {
    openLessonModal,
    startQuiz,
    getProgress,
    updateProgressDisplay
};

// ===========================
// Floating Letters Animation
// ===========================
function createFloatingLetters() {
    const container = document.getElementById('floatingLetters');
    if (!container) {
        return; // Container doesn't exist, skip creation
    }
    
    const letters = ['ಕ', 'ನ', 'ಡ', 'ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ'];
    
    for (let i = 0; i < 15; i++) {
        const letter = document.createElement('div');
        letter.className = 'floating-letter';
        letter.textContent = letters[Math.floor(Math.random() * letters.length)];
        letter.style.left = Math.random() * 100 + '%';
        letter.style.animationDelay = Math.random() * 15 + 's';
        letter.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        container.appendChild(letter);
    }
}

// ===========================
// Event Listeners Setup
// ===========================
function setupEventListeners() {
    // Language selection
    const baseLanguageEl = document.getElementById('baseLanguage');
    if (baseLanguageEl) {
        baseLanguageEl.addEventListener('change', handleLanguageSelection);
    }
    
    // Start learning button
    const startLearningBtn = document.getElementById('startLearning');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            if (selectedLanguage) {
                const lessonsSection = document.querySelector('#lessons');
                if (lessonsSection) {
                    lessonsSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                alert('Please select your native language first!');
            }
        });
    }
    
    // Lesson cards
    document.querySelectorAll('.lesson-card').forEach(card => {
        const lessonButton = card.querySelector('.lesson-button');
        if (lessonButton) {
            lessonButton.addEventListener('click', function(e) {
                e.stopPropagation();
                const category = card.getAttribute('data-category');
                if (category) {
                    openLessonModal(category);
                }
            });
        }
    });
    
    // Modal controls
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeLessonModal);
    }
    
    const prevWordBtn = document.getElementById('prevWord');
    if (prevWordBtn) {
        prevWordBtn.addEventListener('click', showPreviousWord);
    }
    
    const nextWordBtn = document.getElementById('nextWord');
    if (nextWordBtn) {
        nextWordBtn.addEventListener('click', showNextWord);
    }
    
    const playAudioBtn = document.getElementById('playAudio');
    if (playAudioBtn) {
        playAudioBtn.addEventListener('click', playPronunciation);
    }
    
    const recordAudioBtn = document.getElementById('recordAudio');
    if (recordAudioBtn) {
        recordAudioBtn.addEventListener('click', recordVoice);
    }
    
    // Quiz controls
    document.querySelectorAll('.quiz-category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-quiz');
            if (category) {
                startQuiz(category);
            }
        });
    });
    
    const quizNextBtn = document.getElementById('quizNextBtn');
    if (quizNextBtn) {
        quizNextBtn.addEventListener('click', nextQuestion);
    }
    
    const quizRestartBtn = document.getElementById('quizRestartBtn');
    if (quizRestartBtn) {
        quizRestartBtn.addEventListener('click', restartQuiz);
    }
    
    // Carousel controls
    const carouselPrevBtn = document.getElementById('carouselPrev');
    if (carouselPrevBtn) {
        carouselPrevBtn.addEventListener('click', () => changeSlide(-1));
    }
    
    const carouselNextBtn = document.getElementById('carouselNext');
    if (carouselNextBtn) {
        carouselNextBtn.addEventListener('click', () => changeSlide(1));
    }
    
    // Auto-advance carousel (only if carousel exists)
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    if (carouselSlides.length > 0) {
        setInterval(() => changeSlide(1), 5000);
    }
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu
                const navMenu = document.getElementById('navMenu');
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const navMenu = document.getElementById('navMenu');
            if (navMenu) {
                navMenu.classList.toggle('active');
            }
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// ===========================
// Language Selection
// ===========================
function handleLanguageSelection(e) {
    selectedLanguage = e.target.value;
    const selectedLangDisplay = document.getElementById('selectedLanguage');
    
    if (selectedLanguage) {
        const languageNames = {
            'english': 'English',
            'hindi': 'Hindi (हिंदी)',
            'tamil': 'Tamil (தமிழ்)',
            'telugu': 'Telugu (తెలుగు)',
            'malayalam': 'Malayalam (മലയാളം)'
        };
        
        selectedLangDisplay.textContent = `✓ Learn Kannada from ${languageNames[selectedLanguage]}`;
        selectedLangDisplay.style.display = 'block';
    } else {
        selectedLangDisplay.style.display = 'none';
    }
}

// ===========================
// Lesson Modal Functions
// ===========================
function openLessonModal(category) {
    if (!selectedLanguage) {
        alert('Please select your native language first!');
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }
    
    if (!lessonData[category] || !lessonData[category][selectedLanguage]) {
        console.error('Invalid category or language');
        alert('Lesson category not available.');
        return;
    }
    
    currentCategory = category;
    currentWordIndex = 0;
    
    const modal = document.getElementById('lessonModal');
    const modalTitle = document.getElementById('modalTitle');
    
    if (!modal || !modalTitle) {
        console.error('Modal elements not found');
        return;
    }
    
    const categoryTitles = {
        'greetings': 'Greetings - ನಮಸ್ಕಾರಗಳು',
        'numbers': 'Numbers - ಸಂಖ್ಯೆಗಳು',
        'phrases': 'Common Phrases - ಸಾಮಾನ್ಯ ವಾಕ್ಯಗಳು',
        'food': 'Food & Dining - ಆಹಾರ',
        'travel': 'Travel - ಪ್ರಯಾಣ',
        'culture': 'Culture - ಸಂಸ್ಕೃತಿ'
    };
    
    modalTitle.textContent = categoryTitles[category] || category;
    modal.classList.add('active');
    
    displayWord();
}

async function closeLessonModal() {
    const modal = document.getElementById('lessonModal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Mark lesson as completed and update progress
    if (currentCategory) {
        await updateLessonProgress(currentCategory);
    }
}

function displayWord() {
    if (!currentCategory || !selectedLanguage || !lessonData[currentCategory] || !lessonData[currentCategory][selectedLanguage]) {
        console.error('Invalid category or language');
        return;
    }
    
    const words = lessonData[currentCategory][selectedLanguage];
    if (!words || !words[currentWordIndex]) {
        console.error('Word not found');
        return;
    }
    
    const word = words[currentWordIndex];
    
    const wordKannadaEl = document.getElementById('wordKannada');
    const wordPronunciationEl = document.getElementById('wordPronunciation');
    const wordTranslationEl = document.getElementById('wordTranslation');
    const wordCounterEl = document.getElementById('wordCounter');
    const prevWordBtn = document.getElementById('prevWord');
    const nextWordBtn = document.getElementById('nextWord');
    
    if (wordKannadaEl) {
        wordKannadaEl.textContent = word.kannada;
    }
    if (wordPronunciationEl) {
        wordPronunciationEl.textContent = `(${word.pronunciation})`;
    }
    if (wordTranslationEl) {
        wordTranslationEl.textContent = word.translation;
    }
    if (wordCounterEl) {
        wordCounterEl.textContent = `${currentWordIndex + 1} / ${words.length}`;
    }
    
    // Update navigation buttons
    if (prevWordBtn) {
        prevWordBtn.disabled = currentWordIndex === 0;
    }
    if (nextWordBtn) {
        nextWordBtn.disabled = currentWordIndex === words.length - 1;
    }
}

function showPreviousWord() {
    if (!currentCategory || !selectedLanguage || !lessonData[currentCategory] || !lessonData[currentCategory][selectedLanguage]) {
        return;
    }
    
    if (currentWordIndex > 0) {
        currentWordIndex--;
        displayWord();
    }
}

function showNextWord() {
    if (!currentCategory || !selectedLanguage || !lessonData[currentCategory] || !lessonData[currentCategory][selectedLanguage]) {
        return;
    }
    
    const words = lessonData[currentCategory][selectedLanguage];
    if (words && currentWordIndex < words.length - 1) {
        currentWordIndex++;
        displayWord();
    }
}

// ===========================
// Audio Functions
// ===========================
function playPronunciation() {
    if (!currentCategory || !selectedLanguage || !lessonData[currentCategory] || !lessonData[currentCategory][selectedLanguage]) {
        console.error('Cannot play pronunciation: invalid category or language');
        return;
    }
    
    const words = lessonData[currentCategory][selectedLanguage];
    if (!words || !words[currentWordIndex]) {
        console.error('Word not found for pronunciation');
        return;
    }
    
    const word = words[currentWordIndex];
    const button = document.getElementById('playAudio');
    
    if (!button) {
        console.error('Play audio button not found');
        return;
    }
    
    // Visual feedback
    button.style.background = 'var(--gold)';
    button.style.color = 'var(--text-dark)';
    
    // Simulate pronunciation (in real app, would use text-to-speech API)
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word.pronunciation);
        utterance.lang = 'kn-IN'; // Kannada language code
        utterance.rate = 0.8; // Slower for learning
        
        utterance.onend = function() {
            button.style.background = '';
            button.style.color = '';
        };
        
        speechSynthesis.speak(utterance);
    } else {
        alert(`Pronunciation: ${word.pronunciation}`);
        setTimeout(() => {
            button.style.background = '';
            button.style.color = '';
        }, 1000);
    }
}

function recordVoice() {
    const button = document.getElementById('recordAudio');
    if (!button) {
        console.error('Record audio button not found');
        return;
    }
    
    if (!button.classList.contains('recording')) {
        // Start recording
        button.classList.add('recording');
        button.innerHTML = '<span class="audio-icon">⏹️</span> Stop Recording';
        
        // Simulate recording (in real app, would use Web Speech API)
        setTimeout(() => {
            button.classList.remove('recording');
            button.innerHTML = '<span class="audio-icon">🎤</span> Record Your Voice';
            alert('Great job! Keep practicing your pronunciation.');
        }, 3000);
    } else {
        // Stop recording
        button.classList.remove('recording');
        button.innerHTML = '<span class="audio-icon">🎤</span> Record Your Voice';
    }
}

// ===========================
// Quiz Functions
// ===========================
function startQuiz(category) {
    if (!selectedLanguage) {
        alert('Please select your native language first!');
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }
    
    // Validate category exists in quiz data
    if (!quizData[category] || !Array.isArray(quizData[category]) || quizData[category].length === 0) {
        console.error('Invalid quiz category:', category);
        alert('Quiz category not available. Please try another category.');
        return;
    }
    
    currentQuizCategory = category;
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = [];
    
    // Update UI
    document.querySelectorAll('.quiz-category-btn').forEach(btn => btn.classList.remove('active'));
    const clickedBtn = document.querySelector(`[data-quiz="${category}"]`);
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }
    
    // Hide quiz results if visible
    const quizResults = document.getElementById('quizResults');
    if (quizResults) {
        quizResults.classList.remove('show');
    }
    
    // Show quiz card
    const quizCard = document.getElementById('quizCard');
    if (quizCard) {
        quizCard.style.display = 'block';
    }
    
    // Scroll to quiz section
    const quizSection = document.getElementById('quiz');
    if (quizSection) {
        quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Display first question
    displayQuestion();
    
    // Track quiz start
    trackQuizAttempt(category, 0);
}