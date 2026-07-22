export const adminLanguagesIt = {
  pageBadge: "Gestione lingue",
  pageHello: "Centro lingue, {name}",
  pageSubtitle:
    "Apri o chiudi i corsi di lingua per gli studenti su tutta la piattaforma.",
  backToDashboard: "Torna alla Dashboard",
  title: "Gestione lingue",
  description:
    'Apri altri corsi di lingua per gli studenti oppure mantienili come "in arrivo". Solo un super admin può modificare questa impostazione.',
  columnLanguage: "Lingua",
  columnStatus: "Stato",
  columnAction: "Azione",
  open: "Apri lingua",
  setComingSoon: 'Imposta come "in arrivo"',
  locked: "Sempre attivo",
  lockedHint: "Questa lingua ha già contenuti completi e resta sempre attiva.",
  restrictedNotice: "Solo un super admin può aprire o chiudere i corsi di lingua.",
  confirmOpenTitle: "Aprire {name} per tutti gli studenti?",
  confirmOpenDescription:
    '"{name}" passerà da "in arrivo" ad attivo. Gli studenti potranno subito esplorare i suoi livelli. Assicurati che lezioni, vocabolario, grammatica e quiz siano già stati aggiunti nella gestione contenuti.',
  confirmCloseTitle: 'Rimettere {name} in "in arrivo"?',
  confirmCloseDescription:
    '"{name}" verrà nuovamente nascosto agli studenti e contrassegnato come "in arrivo".',
  openedSuccess: "{name} è ora attivo",
  closedSuccess: "{name} è ora contrassegnato come in arrivo",
  curriculum: {
    title: "Programma e livelli",
    description:
      "Rinomina le fasi delle lezioni e fai crescere qualsiasi lingua oltre l'A1 aggiungendo nuovi livelli CEFR (A2, B1, B2...). I nuovi livelli ottengono automaticamente il proprio spazio per i contenuti.",
    levelsCount: "{count} livelli",
    defaultBadge: "Livello base",
    defaultBadgeHint: "Ha già contenuti reali: può essere rinominato ma non rimosso.",
    customBadge: "Personalizzato",
    emptyState:
      "Ancora nessun livello per questa lingua: usa \"Aggiungi livello\" per progettarne la prima fase.",
    addLevel: "Aggiungi livello",
    addLevelTitle: "Aggiungi un nuovo livello",
    addLevelDescription:
      "Aggiungi un nuovo livello al programma di {language}. Viene creato automaticamente uno spazio per i contenuti corrispondente, così puoi iniziare subito ad aggiungerne.",
    band: "Fase CEFR",
    levelCodePreview: "Codice livello",
    levelTitleLabel: "Titolo del livello",
    levelTitlePlaceholder: "es. Padroneggiare il passato",
    levelDescriptionLabel: "Descrizione del livello",
    create: "Crea livello",
    editAriaLabel: "Modifica livello",
    editLevelTitle: "Rinomina livello",
    editLevelDescription:
      "Aggiorna il titolo e la descrizione che gli studenti vedono per {code}.",
    saveChanges: "Salva modifiche",
    resetToDefault: "Ripristina predefinito",
    resetConfirmTitle: "Ripristinare {code} al suo nome predefinito?",
    resetConfirmDescription:
      "Verranno ripristinati il titolo e la descrizione originali per {code}.",
    deleteLevelTitle: "Eliminare {code}?",
    deleteLevelDescription:
      "Questo rimuove {code} dal programma di {language}. Gli studenti non lo vedranno più. I contenuti già creati per esso vengono conservati ma nascosti.",
    levelAdded: "{code} è stato aggiunto a {language}",
    levelUpdated: "{code} è stato aggiornato",
    levelDeleted: "{code} è stato rimosso",
    levelReset: "{code} è stato ripristinato al suo nome predefinito",
    cannotDeleteDefault:
      "I livelli base non possono essere eliminati, solo rinominati o ripristinati.",
  },
};
