export const adminUsersIt = {
  title: "Gestione utenti",
  description: "Cerca, gestisci e assegna ruoli a ogni utente registrato.",
  totalUsers: "{count} utenti totali",
  searchPlaceholder: "Cerca per nome, email o ID utente...",
  filterRole: "Ruolo",
  filterStatus: "Stato",
  allRoles: "Tutti i ruoli",
  allStatuses: "Tutti gli stati",
  statusActive: "Attivo",
  statusSuspended: "Sospeso",
  noUsers: "Nessun utente registrato ancora.",
  noResults: "Nessun utente corrisponde alla ricerca o ai filtri.",
  columnUser: "Utente",
  columnEmail: "Email",
  columnStatus: "Stato",
  columnRole: "Ruolo",
  columnTier: "Abbonamento",
  columnJoined: "Registrato",
  columnActions: "Azioni",
  unnamed: "Utente senza nome",
  noEmail: "Nessuna email registrata",
  userId: "ID utente",
  copyId: "Copia ID",
  idCopied: "ID utente copiato",
  viewProfile: "Visualizza profilo",
  changeRole: "Cambia ruolo",
  promote: "Promuovi ad Admin",
  demote: "Rimuovi accesso admin",
  suspend: "Sospendi account",
  activate: "Riattiva account",
  resetPassword: "Reimposta password",
  you: "Tu",
  promoteConfirmTitle: "Promuovere questo utente ad Admin?",
  promoteConfirmDescription:
    "{name} diventa Admin (assistenza) e ottiene l'accesso al pannello. Usa l'editor dei ruoli per un livello più preciso.",
  demoteConfirmTitle: "Rimuovere l'accesso admin?",
  demoteConfirmDescription:
    "\"{name}\" perderà tutti i permessi admin e diventerà un utente normale.",
  suspendConfirmTitle: "Sospendere questo account?",
  suspendConfirmDescription:
    "\"{name}\" non potrà accedere finché non verrà riattivato.",
  activateConfirmTitle: "Riattivare questo account?",
  activateConfirmDescription: "\"{name}\" potrà accedere di nuovo.",
  resetPasswordConfirmTitle: "Invia email di reimpostazione password?",
  resetPasswordConfirmDescription:
    "Un link sicuro di reimpostazione verrà inviato a {email}. La password memorizzata non viene mai mostrata.",
  resetPasswordSimulated:
    "Simulato in modalità sviluppo locale — in produzione, {email} riceverebbe un link di reimpostazione.",
  resetPasswordSent: "Email di reimpostazione password inviata a {email}",
  promoted: "Utente promosso ad admin",
  demoted: "Accesso admin rimosso",
  roleUpdated: "Ruolo aggiornato",
  statusUpdated: "Stato account aggiornato",
  confirm: "Conferma",
  cannotModifySelf: "Non puoi eseguire questa azione sul tuo account.",
  permissions: {
    viewUsers: "Vedere gli utenti",
    answerSupport: "Rispondere all'assistenza",
    suspendUsers: "Sospendere account",
    manageRoles: "Gestire i ruoli",
    manageAdminPermissions: "Modificare i permessi admin",
    manageContent: "Contenuti",
    manageQuizzes: "Quiz",
    manageBlog: "Blog",
    manageLanguages: "Lingue e livelli",
    manageBanners: "Banner",
    manageLanding: "Home page",
    manageSubscriptions: "Abbonamenti",
    manageBilling: "Contabilità",
    fullAccess: "Accesso completo",
  },
  tier: {
    free: "Nessun abbonamento",
    paid: "Utente {plan}",
    gifted: "Abbonamento regalato",
    giftedBy: "Regalato da {name}",
  },
  assignLanguages: "Assegna lingue",
  languagesUpdated: "Le lingue di questo docente sono state aggiornate",
  grantSubscription: "Regala un abbonamento",
  assignLanguagesDialog: {
    title: "Lingue di {name}",
    description:
      "Un docente può creare o rimuovere contenuti solo per le lingue selezionate qui.",
    save: "Salva lingue",
    emptyWarning:
      "Senza nessuna lingua selezionata, questo docente non potrà accedere ad alcun contenuto.",
  },
  grantDialog: {
    title: "Regala un abbonamento a {name}",
    description:
      "Il piano viene attivato senza pagamento e non entra nei dati di ricavo. Lo studente lo vede come un abbonamento qualsiasi.",
    planLabel: "Piano",
    languageLabel: "Lingua",
    periodLabel: "Periodo",
    months: "{count} mesi",
    noteLabel: "Nota",
    notePlaceholder: "es. compensazione per il disservizio",
    noteHint: "Questa nota è visibile solo agli admin.",
    save: "Regala abbonamento",
    granted: "Abbonamento regalato",
  },
  profileDialog: {
    title: "Profilo utente",
    accountInfo: "Informazioni account",
    fullName: "Nome completo",
    email: "Email",
    role: "Ruolo",
    status: "Stato",
    joined: "Registrato il",
    userId: "ID utente",
    permissions: "Permessi attuali",
    assignedLanguages: "Lingue assegnate: {languages}",
    noAssignedLanguages:
      "A questo docente non è ancora stata assegnata nessuna lingua.",
    close: "Chiudi",
    quizAttempts: "Risultati quiz",
    quizAttemptsLoading: "Caricamento cronologia quiz…",
    quizAttemptsEmpty: "Questo studente non ha ancora completato quiz.",
    quizAttemptsLoadError: "Impossibile caricare la cronologia quiz.",
    quizChecklistSummary: "{correct}/{total} corrette",
    correctCount: "{count} corrette",
    incorrectCount: "{count} errate",
    userAnswer: "Risposta dello studente",
    correctAnswer: "Risposta corretta",
    quizChecklistUnavailable:
      "La checklist dettagliata non è disponibile per questo tentativo.",
  },
  changeRoleDialog: {
    title: "Cambia ruolo per {name}",
    description: "Seleziona un nuovo ruolo. Le modifiche hanno effetto immediato.",
    selectLabel: "Ruolo",
    save: "Salva ruolo",
    superAdminSeats: "Posti da Super Admin occupati: {used} di {max}.",
    superAdminSeatsFull:
      "Tutti i {max} posti da Super Admin sono occupati. Liberane uno prima di assegnarne un altro.",
    superAdminConfirmTitle: "Promuovere a Super Admin?",
    superAdminConfirmDescription:
      "Vuoi davvero rendere \"{name}\" un Super Admin? Otterrà accesso completo, nessun altro admin potrà retrocederlo, sospenderlo o modificarlo, e la piattaforma consente al massimo {max} Super Admin.",
    superAdminConfirmAction: "Sì, rendilo Super Admin",
  },
  guard: {
    self: "Non puoi eseguire questa azione sul tuo account.",
    superAdminProtected:
      "Gli account Super Admin sono protetti. Da questo pannello nessuno può retrocedere, sospendere o cambiare il ruolo di un Super Admin.",
    superAdminOnly: "Solo un Super Admin può cambiare i ruoli.",
    superAdminLimit:
      "Limite di Super Admin raggiunto. Non è possibile aggiungerne altri.",
    suspendForbidden:
      "Il tuo ruolo non può sospendere account. Spetta al Super Admin e all'Head Admin.",
    headAdminPeer:
      "Gli Head Admin sono pari grado: solo un Super Admin può sospenderne uno, o un altro Super Admin.",
    permissionsForbidden:
      "Solo un Super Admin o un Head Admin può cambiare cosa può fare un ruolo.",
    roleNotEditable:
      "I permessi di questo ruolo sono fissati nel codice e non sono modificabili.",
    languageForbidden:
      "Questo contenuto appartiene a una lingua che non ti è stata assegnata.",
    languageNotScoped:
      "Questo ruolo non è limitato per lingua, quindi assegnarne una non ha senso.",
  },
  roles: {
    superAdmin: {
      label: "Super Admin",
      description:
        "Accesso completo a tutte le funzionalità, inclusa la gestione di ruoli e permessi.",
    },
    headAdmin: {
      label: "Head Admin",
      description:
        "Sorveglia gli admin: vede tutti gli account, può sospenderne uno e decide cosa possono fare gli admin — ma non cambia mai il ruolo di nessuno.",
    },
    admin: {
      label: "Admin",
      description:
        "Assistenza clienti: risponde ai ticket e alle domande degli studenti. Non può sospendere account.",
    },
    teacher: {
      label: "Docente",
      description:
        "Carica e rimuove contenuti e quiz, solo per le lingue che gli sono state assegnate.",
    },
    writer: {
      label: "Redattore",
      description: "Solo il pannello del blog: scrivere, modificare e pubblicare articoli.",
    },
    learner: {
      label: "Studente",
      description:
        "Un account registrato senza ruolo e senza abbonamento. Un piano a pagamento non è un ruolo: arriva dal pannello abbonamenti.",
    },
  },
  permissionsPanel: {
    title: "Ruoli e permessi",
    description:
      "Il riferimento completo degli accessi: sopra i ruoli admin, sotto gli abbonamenti a pagamento, letti dal pannello abbonamenti.",
    languageScoped: "Limitato per lingua",
    matrixTitle: "Cosa può fare ogni ruolo",
    permissionColumn: "Permesso",
    granted: "concesso",
    notGranted: "non concesso",
    groupPeople: "Persone e accessi",
    groupContent: "Contenuti",
    groupPlatform: "Piattaforma e denaro",
    editorHint:
      "Modificare cosa possono fare gli admin spetta al Super Admin e all'Head Admin.",
    editorTitle: "Modifica cosa può fare {role}",
    editorDescription:
      "Ogni funzionalità aggiunta in futuro al pannello diventa assegnabile da questo stesso elenco, automaticamente.",
    save: "Salva permessi",
    saved: "Permessi del ruolo aggiornati",
    lockedHint:
      "Le voci bloccate non sono mai assegnabili: sospensione, gestione di ruoli e permessi, abbonamenti e contabilità restano al Super Admin.",
    tiersTitle: "Abbonamenti a pagamento",
    tiersDescription:
      "Non sono ruoli: derivano dall'abbonamento attivo dello studente e mantengono la normale dashboard studente. Cosa sbloccano si decide nel pannello abbonamenti.",
    tierColumn: "Abbonamento",
    tierVocabulary: "Vocabolario",
    tierGrammar: "Grammatica",
    tierVideo: "Video",
    tierLevelExam: "Esame di livello",
    tierFree: "Nessun abbonamento",
    tierFreeHint: "Uno studente normale; solo le sezioni gratuite.",
    tierUser: "Utente {plan}",
    tierUserHint: "Cosa sblocca è impostato nel pannello abbonamenti.",
  },
} as const;
