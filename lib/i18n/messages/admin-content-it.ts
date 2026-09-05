export const adminContentIt = {
  wizardTitle: "Crea contenuto",
  wizardDescription:
    "Aggiungi contenuti didattici passo dopo passo: lingua, lezione, sezione e poi crea e pubblica quando sei pronto.",
  stepLanguage: "Lingua",
  stepLesson: "Lezione",
  stepCategory: "Categoria",
  stepContentType: "Tipo di contenuto",
  stepCreate: "Crea",
  askLanguage: "Per quale lingua vuoi aggiungere contenuto?",
  askLesson: "A quale lezione vuoi aggiungere contenuto?",
  askCategory: "Quale categoria di contenuto vuoi aggiungere?",
  askContentType: "Quale tipo di contenuto vuoi aggiungere?",
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
  publishedQuiz:
    "Quiz pubblicato. Gli studenti lo vedranno in Impara → {level} → Quiz.",
  addAnother: "Aggiungi altro contenuto",
  startOver: "Ricomincia",
  categories: {
    grammar: {
      title: "Grammatica",
      description: "Documenti che lo studente legge una pagina alla volta",
      features: "Aggiungi un titolo · Carica un PDF · Leggi nell'app",
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
    levelExam: {
      title: "Esame di livello",
      description:
        "L’esame completo per un intero livello CEFR. È a pagamento e dipende dal piano di abbonamento, a differenza dei quiz delle singole lezioni.",
      features: "Copre tutto il livello · Richiede abbonamento · Mostrato nella pagina della lingua",
    },
  },
  grammar: {
    formTitle: "Aggiungi un documento di grammatica",
    formDescription:
      "Dai un titolo alla sezione e carica il suo PDF. Gli studenti ne leggono le pagine nell'app; il file non viene mai inviato loro.",
    documentLabel: "PDF",
    choosePdf: "Scegli un PDF",
    documentHint: "Fino a {pages} pagine e {size}MB.",
    errors: {
      storageUnconfigured:
        "L'archivio file non è configurato, quindi non è ancora possibile caricare documenti.",
      fileRequired: "Scegli un PDF da caricare.",
      notPdf: "Qui si possono caricare solo file PDF.",
      tooLarge: "Questo PDF è troppo grande.",
      tooManyPages: "Questo PDF ha troppe pagine per un solo caricamento.",
      unreadable: "Non è stato possibile leggere il file come PDF.",
      renderFailed: "Non è stato possibile convertire le pagine del PDF.",
      uploadFailed:
        "Le pagine non sono state salvate, quindi non è stato registrato nulla. Riprova.",
    },
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
      "Crea domande a scelta multipla e scritte solo per la sezione Quiz. Grammatica e vocabolario hanno categorie separate e non compaiono qui.",
    quizTitle: "Titolo del quiz",
    quizTitlePlaceholder: "es. Quiz saluti A1",
    questionCountLabel: "Numero di domande",
    questionCountHint: "Scegli quante domande creare prima di compilarle.",
    questionsGenerated: "{count} campi domanda pronti",
  },
} as const;
