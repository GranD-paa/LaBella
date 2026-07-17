export const adminContentIt = {
  wizardTitle: "Crea contenuto",
  wizardDescription:
    "Aggiungi contenuti didattici passo dopo passo: lingua, lezione, sezione e poi crea e pubblica quando sei pronto.",
  stepLanguage: "Lingua",
  stepLesson: "Lezione",
  stepCategory: "Sezione",
  stepCreate: "Crea",
  askLanguage: "Per quale lingua vuoi aggiungere contenuto?",
  askLesson: "A quale lezione vuoi aggiungere contenuto?",
  askCategory: "In quale sezione vuoi aggiungere contenuto?",
  selectedLanguage: "Lingua selezionata",
  selectedLesson: "Lezione selezionata",
  selectedCategory: "Sezione selezionata",
  noLessonMapped:
    "Nessuna lezione è associata a questo livello. Crea prima una lezione.",
  contextSummary: "{language} · {level} · {lesson}",
  saveDraft: "Salva come bozza",
  publishContent: "Pubblica contenuto",
  savedDraft: "Contenuto salvato come bozza",
  publishedContent: "Contenuto pubblicato",
  addAnother: "Aggiungi altro contenuto",
  startOver: "Ricomincia",
  categories: {
    grammar: {
      title: "Grammatica",
      description: "Spiegazioni, esempi ed esercizi grammaticali",
      features: "Aggiungi spiegazioni · Esempi · Esercizi",
    },
    vocabulary: {
      title: "Vocabolario importante con immagini",
      description: "Parole chiave con significati e supporto visivo",
      features: "Parole · Significati · Immagini · Pronuncia",
    },
    video: {
      title: "Lezioni video",
      description: "Contenuti video per questa lezione",
      features: "URL video · Titolo · Descrizione",
    },
    quiz: {
      title: "Quiz",
      description: "Domande a scelta multipla e a risposta aperta",
      features: "Scelta multipla · Domande scritte · Risposte e spiegazioni",
    },
  },
  grammar: {
    formTitle: "Aggiungi contenuto grammaticale",
    formDescription: "Crea una spiegazione grammaticale per la lezione selezionata.",
    exerciseLabel: "Esercizio o nota d'uso (opzionale)",
  },
  vocabulary: {
    formTitle: "Aggiungi vocabolario con immagine",
    formDescription: "Aggiungi una parola importante con traduzione e immagine.",
    pronunciationLabel: "Pronuncia (opzionale)",
    pronunciationPlaceholder: "es. /ˈkiao/",
    imageRequired: "L'URL dell'immagine è obbligatorio per il vocabolario visivo.",
  },
  video: {
    formTitle: "Aggiungi lezione video",
    formDescription: "Aggiungi contenuto video fornendo un URL video ospitato.",
    videoUrlLabel: "URL video",
    videoUrlPlaceholder: "https://…",
    thumbnailLabel: "URL miniatura (opzionale)",
    thumbnailPlaceholder: "https://…",
  },
  quiz: {
    formTitle: "Crea quiz",
    formDescription:
      "Crea domande a scelta multipla e scritte. Nulla viene pubblicato finché non scegli Pubblica.",
    quizTitle: "Titolo del quiz",
    quizTitlePlaceholder: "es. Quiz saluti A1",
  },
} as const;
