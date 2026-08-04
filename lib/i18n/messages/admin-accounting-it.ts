export const adminAccountingIt = {
  pageBadge: "Contabilità",
  pageHello: "Contabilità e ricavi, {name}",
  pageSubtitle:
    "Ogni pagamento, abbonato e mancato rinnovo — con il tasso di cambio usato per ogni pagamento in Rial.",
  backToDashboard: "Torna alla Dashboard",

  kpi: {
    netRevenue: "Ricavi netti",
    netRevenueHint: "Da sempre, al netto dei rimborsi",
    thisMonth: "Questo mese",
    vsLastMonth: "{percent}% rispetto al mese scorso",
    noComparison: "Nessun ricavo il mese scorso",
    mrr: "MRR",
    mrrHint: "Ricavi mensili ricorrenti",
    arpu: "ARPU",
    arpuHint: "Media per abbonato",
    activeSubscribers: "Abbonati attivi",
    subscriptionsCount: "{count} abbonamenti",
    churnRate: "Tasso di abbandono",
    churnHint: "{count} non rinnovati questo mese",
    refunded: "Rimborsato",
    payments: "{count} pagamenti",
  },

  chart: {
    title: "Andamento dei ricavi",
    subtitle: "Ricavi netti per mese, al netto dei rimborsi",
    empty: "Nessun ricavo registrato finora.",
    monthLabel: "{month}",
    tooltipGross: "Lordo",
    tooltipRefunds: "Rimborsi",
    tooltipNet: "Netto",
    tooltipCount: "{count} pagamenti",
  },

  breakdown: {
    byLanguage: "Ricavi per lingua",
    byPlan: "Ricavi per piano",
    empty: "Ancora nulla da suddividere.",
  },

  tabs: {
    ledger: "Transazioni",
    subscribers: "Abbonati",
    lapsed: "Non rinnovati",
    expiring: "In scadenza",
    settings: "Impostazioni",
  },

  ledger: {
    title: "Registro transazioni",
    description:
      "Ogni tentativo di pagamento, dal più recente. Il registro è solo in aggiunta.",
    date: "Data",
    user: "Studente",
    plan: "Piano",
    amount: "Importo",
    method: "Metodo",
    status: "Stato",
    reference: "Riferimento",
    empty: "Nessun pagamento finora.",
    exportCsv: "Esporta CSV",
    paidInRial: "{amount} al tasso {rate}",
  },

  status: {
    pending: "In attesa",
    succeeded: "Pagato",
    failed: "Fallito",
    refunded: "Rimborsato",
    canceled: "Annullato",
  },

  provider: {
    stripe: "Stripe",
    zarinpal: "ZarinPal",
    manual: "Manuale",
  },

  subscribers: {
    title: "Abbonati attivi",
    description: "Chi ha un abbonamento attivo in questo momento.",
    language: "Lingua",
    plan: "Piano",
    renewsOn: "Rinnovo",
    startedOn: "Inizio",
    empty: "Nessun abbonato attivo.",
    cancelling: "Annullamento a fine periodo",
  },

  lapsed: {
    title: "Non rinnovati",
    description:
      "Abbonamenti oltre il periodo pagato. Quelli ancora nel periodo di tolleranza sono spesso recuperabili.",
    endedOn: "Terminato",
    inGrace: "Nel periodo di tolleranza",
    gone: "Scaduto",
    empty: "Nessun abbonamento scaduto.",
  },

  expiring: {
    title: "In scadenza entro 7 giorni",
    description: "Rinnovi imminenti — quelli che meritano un promemoria.",
    daysLeft: "{count} giorni rimasti",
    tomorrow: "Scade domani",
    today: "Scade oggi",
    empty: "Nulla in scadenza questa settimana.",
  },

  settings: {
    title: "Prezzi e gateway",
    description:
      "Fonte del tasso di cambio, margine e quali metodi di pagamento sono attivi.",
    currentRate: "Tasso attuale",
    rateSource: "Fonte",
    rateUpdated: "Aggiornato {time}",
    rateNever: "Nessun tasso ancora recuperato",
    rialPerEur: "{amount} Rial / €1",
    tomanPerEur: "{amount} Toman / €1",
    irrEnabled: "Mostra prezzi in Rial",
    irrEnabledHint: "Mostra un prezzo in Rial e abilita i gateway iraniani.",
    fxSource: "Fonte del tasso di cambio",
    fxSourceTgju: "TGJU — mercato libero (consigliato)",
    fxSourceNavasan: "Navasan — richiede una chiave API",
    fxSourceManual: "Manuale — imposto io il tasso",
    fxSourceHint:
      "I servizi internazionali riportano il tasso ufficiale iraniano, molto lontano da quello di mercato. Queste fonti seguono il mercato libero.",
    fxMargin: "Margine (%)",
    fxMarginHint:
      "Aggiunto al tasso di mercato per coprire lo spread e le commissioni del gateway.",
    irrRounding: "Arrotonda i prezzi in Rial a",
    irrRoundingHint:
      "I prezzi vengono arrotondati per eccesso a un multiplo di questo, così finiscono con degli zeri.",
    fxManualRate: "Tasso manuale (Rial per €1)",
    fxMaxDeviation: "Rifiuta variazioni oltre (%)",
    fxMaxDeviationHint:
      "Un aggiornamento che salta più di così viene trattenuto per revisione invece di essere applicato — di solito significa che la fonte ha cambiato unità.",
    gateways: "Metodi di pagamento",
    stripeEnabled: "Stripe (carte internazionali, EUR)",
    zarinpalEnabled: "ZarinPal (gateway iraniani, Rial)",
    manualEnabled: "Inserimento manuale (bonifico)",
    gracePeriod: "Periodo di tolleranza (giorni)",
    gracePeriodHint:
      "Per quanto tempo l'accesso continua dopo la fine del periodo prima di essere interrotto.",
    save: "Salva impostazioni",
    saved: "Impostazioni salvate",
    refreshRate: "Aggiorna il tasso ora",
    rateRefreshed: "Tasso di cambio aggiornato",
    rateRejected: "Tasso rifiutato: {reason}",
  },

  manual: {
    title: "Registra un pagamento",
    description:
      "Per denaro ricevuto fuori da un gateway — bonifico o trasferimento tra carte. Attiva subito l'abbonamento.",
    user: "Studente",
    userPlaceholder: "Seleziona uno studente",
    plan: "Piano",
    language: "Lingua",
    currency: "Valuta",
    reference: "Riferimento / n. ricevuta",
    referencePlaceholder: "Facoltativo",
    submit: "Registra pagamento e attiva",
    recorded: "Pagamento registrato e abbonamento attivato",
  },

  refund: {
    action: "Rimborsa",
    title: "Rimborsa pagamento",
    description:
      "Registra un rimborso su questo pagamento. La voce originale resta — i rimborsi sono una riga a sé nel registro.",
    amount: "Importo (EUR)",
    reason: "Motivo",
    submit: "Registra rimborso",
    done: "Rimborso registrato",
  },
};
