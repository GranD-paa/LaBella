/**
 * What is left of the quiz admin after the browse/edit table was retired:
 * the page shell, the question fields the content wizard reuses, and the
 * section names the admin dashboard and banner list still read.
 */
export const adminQuizzesIt = {
  pageBadge: "Gestione quiz",
  pageHello: "Hub quiz, {name}",
  pageSubtitle: "Crea, pubblica e monitora i quiz tra lingue, livelli, lezioni e sezioni.",
  fullAdminPanel: "Torna alla dashboard",
  quizQuestions: "Domande del quiz",
  statusPublished: "Pubblicato",
  statusDraft: "Bozza",
  unpublish: "Rimuovi pubblicazione",
  publish: "Pubblica",
  questionLabel: "Domanda {number}",
  removeQuestionAria: "Rimuovi domanda",
  questionType: "Tipo di domanda",
  selectType: "Seleziona tipo",
  questionText: "Testo della domanda",
  wizardQuestionPlaceholder: "Inserisci la domanda che vedranno gli studenti...",
  expectedAnswer: "Risposta attesa",
  expectedAnswerPlaceholder: "La risposta scritta corretta",
  correctAnswer: "Risposta corretta",
  explanationOptional: "Spiegazione (opzionale)",
  explanationPlaceholder: "Mostrata dopo l'invio del quiz",
  optionA: "Opzione A",
  optionB: "Opzione B",
  optionC: "Opzione C",
  optionD: "Opzione D",
  sections: {
    grammar: {
      title: "Grammatica",
      description: "Quiz focalizzati sulla grammatica",
    },
    vocabulary: {
      title: "Vocabolario",
      description: "Quiz di vocabolario",
    },
    visual: {
      title: "Visivo",
      description: "Quiz di apprendimento visivo",
    },
    quiz: {
      title: "Quiz",
      description: "Quiz generali di lezione",
    },
    custom: {
      title: "Personalizzato",
      description: "Quiz di sezione personalizzata",
    },
  },
} as const;
