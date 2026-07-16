export type Lesson = {
  id: number
  chapter: number
  title: string
  status: 'done' | 'active' | 'locked'
  xp: number
  items: number
  words: string[]
}

export type Flashcard = {
  fr: string
  translation: string
  example: string
}

export type OldQuestion = {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  lesson: string
}

export type Course = {
  id: string
  name: string
  language: string
  flag: string
  level: string
  color: string
  enrolled: boolean
  progress: number
  streak: number
  wordsLearned: number
  lessonsCompleted: number
  accuracy: number
  lessons: Lesson[]
  flashcards: Flashcard[]
  oldQuestions: OldQuestion[]
}

export const COURSES: Course[] = [
  {
    id: 'fr-a2',
    name: 'French',
    language: 'French',
    flag: '🇫🇷',
    level: 'A2',
    color: '#2EC4B6',
    enrolled: true,
    progress: 43,
    streak: 4,
    wordsLearned: 143,
    lessonsCompleted: 3,
    accuracy: 87,
    lessons: [
      { id: 1, chapter: 1, title: 'Greetings & Introductions', status: 'done', xp: 50, items: 12, words: ['Bonjour', 'Merci', "S'il vous plaît", 'Au revoir'] },
      { id: 2, chapter: 1, title: 'Numbers 1–20', status: 'done', xp: 50, items: 20, words: ['Un', 'Deux', 'Trois', 'Quatre'] },
      { id: 3, chapter: 2, title: 'Colors & Descriptions', status: 'done', xp: 75, items: 15, words: ['Rouge', 'Bleu', 'Vert', 'Jaune'] },
      { id: 4, chapter: 3, title: 'Food & Restaurants', status: 'active', xp: 100, items: 18, words: ['Pain', 'Fromage', 'Vin', 'Eau'] },
      { id: 5, chapter: 3, title: 'Shopping & Prices', status: 'locked', xp: 100, items: 14, words: [] },
      { id: 6, chapter: 3, title: 'Directions & Transport', status: 'locked', xp: 125, items: 16, words: [] },
      { id: 7, chapter: 4, title: 'Family & Relationships', status: 'locked', xp: 125, items: 20, words: [] },
    ],
    flashcards: [
      { fr: 'le pain', translation: 'bread', example: "Je veux du pain, s'il vous plaît." },
      { fr: 'le fromage', translation: 'cheese', example: 'La France a plus de 300 fromages.' },
      { fr: 'le vin', translation: 'wine', example: 'Un verre de vin rouge, merci.' },
      { fr: "l'eau", translation: 'water', example: "De l'eau minérale, s'il vous plaît." },
      { fr: 'le restaurant', translation: 'restaurant', example: 'Ce restaurant est excellent.' },
      { fr: 'la carte', translation: 'menu / map', example: 'Puis-je avoir la carte?' },
      { fr: "l'addition", translation: 'bill / check', example: "L'addition, s'il vous plaît!" },
      { fr: 'délicieux', translation: 'delicious', example: 'Ce plat est vraiment délicieux.' },
    ],
    oldQuestions: [
      { id: 1, question: "What does 'bonjour' mean?", options: ['Goodbye', 'Hello', 'Please', 'Thank you'], correct: 1, explanation: "'Bonjour' is the standard French greeting meaning hello or good morning.", lesson: 'Greetings & Introductions' },
      { id: 2, question: "Which article is used with 'pain' (bread)?", options: ['la', 'le', 'les', "l'"], correct: 1, explanation: "'Pain' is masculine in French, so it uses the article 'le'.", lesson: 'Food & Restaurants' },
      { id: 3, question: "How do you say 'three' in French?", options: ['Deux', 'Un', 'Trois', 'Quatre'], correct: 2, explanation: "'Trois' is the French word for three.", lesson: 'Numbers 1–20' },
      { id: 4, question: "What color is 'rouge'?", options: ['Blue', 'Green', 'Yellow', 'Red'], correct: 3, explanation: "'Rouge' means red in French.", lesson: 'Colors & Descriptions' },
      { id: 5, question: "What does 'l'addition' mean at a restaurant?", options: ['The menu', 'The waiter', 'The bill', 'The reservation'], correct: 2, explanation: "In French restaurants, 'l'addition' refers to the bill or check.", lesson: 'Food & Restaurants' },
    ],
  },
  {
    id: 'es-a1',
    name: 'Spanish',
    language: 'Spanish',
    flag: '🇪🇸',
    level: 'A1',
    color: '#E84855',
    enrolled: true,
    progress: 15,
    streak: 1,
    wordsLearned: 32,
    lessonsCompleted: 1,
    accuracy: 72,
    lessons: [
      { id: 1, chapter: 1, title: 'Greetings & Farewells', status: 'done', xp: 50, items: 10, words: ['Hola', 'Adiós', 'Gracias', 'Por favor'] },
      { id: 2, chapter: 1, title: 'Numbers 1–10', status: 'active', xp: 50, items: 10, words: ['Uno', 'Dos', 'Tres', 'Cuatro'] },
      { id: 3, chapter: 2, title: 'Colors', status: 'locked', xp: 75, items: 12, words: [] },
      { id: 4, chapter: 2, title: 'Days of the Week', status: 'locked', xp: 75, items: 7, words: [] },
      { id: 5, chapter: 3, title: 'Food & Drinks', status: 'locked', xp: 100, items: 16, words: [] },
    ],
    flashcards: [
      { fr: 'hola', translation: 'hello', example: '¡Hola! ¿Cómo estás?' },
      { fr: 'gracias', translation: 'thank you', example: 'Muchas gracias por tu ayuda.' },
      { fr: 'uno', translation: 'one', example: 'Quiero uno, por favor.' },
      { fr: 'dos', translation: 'two', example: 'Tengo dos hermanos.' },
      { fr: 'rojo', translation: 'red', example: 'El tomate es rojo.' },
      { fr: 'agua', translation: 'water', example: 'Un vaso de agua, por favor.' },
    ],
    oldQuestions: [
      { id: 1, question: "What does 'hola' mean?", options: ['Goodbye', 'Please', 'Hello', 'Yes'], correct: 2, explanation: "'Hola' is the Spanish word for hello.", lesson: 'Greetings & Farewells' },
      { id: 2, question: "How do you say 'two' in Spanish?", options: ['Uno', 'Dos', 'Tres', 'Cuatro'], correct: 1, explanation: "'Dos' is the Spanish word for two.", lesson: 'Numbers 1–10' },
    ],
  },
  {
    id: 'ja-a1',
    name: 'Japanese',
    language: 'Japanese',
    flag: '🇯🇵',
    level: 'A1',
    color: '#FFD60A',
    enrolled: false,
    progress: 0,
    streak: 0,
    wordsLearned: 0,
    lessonsCompleted: 0,
    accuracy: 0,
    lessons: [
      { id: 1, chapter: 1, title: 'Hiragana Basics', status: 'active', xp: 60, items: 15, words: ['あ', 'い', 'う', 'え'] },
      { id: 2, chapter: 1, title: 'Greetings', status: 'locked', xp: 50, items: 10, words: [] },
      { id: 3, chapter: 2, title: 'Numbers', status: 'locked', xp: 75, items: 12, words: [] },
    ],
    flashcards: [
      { fr: 'おはよう', translation: 'good morning', example: 'おはようございます！' },
      { fr: 'ありがとう', translation: 'thank you', example: 'ありがとうございます。' },
    ],
    oldQuestions: [],
  },
  {
    id: 'de-b1',
    name: 'German',
    language: 'German',
    flag: '🇩🇪',
    level: 'B1',
    color: '#9B5DE5',
    enrolled: false,
    progress: 0,
    streak: 0,
    wordsLearned: 0,
    lessonsCompleted: 0,
    accuracy: 0,
    lessons: [
      { id: 1, chapter: 1, title: 'Der/Die/Das — Articles', status: 'active', xp: 75, items: 18, words: ['der Mann', 'die Frau', 'das Kind'] },
      { id: 2, chapter: 1, title: 'Modal Verbs', status: 'locked', xp: 100, items: 14, words: [] },
    ],
    flashcards: [
      { fr: 'Guten Morgen', translation: 'good morning', example: 'Guten Morgen! Wie geht es Ihnen?' },
      { fr: 'Danke', translation: 'thank you', example: 'Danke sehr!' },
    ],
    oldQuestions: [],
  },
]
