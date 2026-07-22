export const adminLanguagesEn = {
  pageBadge: "Language management",
  pageHello: "Language hub, {name}",
  pageSubtitle:
    "Open or close language courses for learners across the platform.",
  backToDashboard: "Back to Dashboard",
  title: "Language Management",
  description:
    'Open additional language courses for learners, or keep them as "coming soon". Only super admins can change this.',
  columnLanguage: "Language",
  columnStatus: "Status",
  columnAction: "Action",
  open: "Open language",
  setComingSoon: "Set to coming soon",
  locked: "Always active",
  lockedHint: "This language already has full content and stays active.",
  restrictedNotice: "Only a super admin can open or close language courses.",
  confirmOpenTitle: "Open {name} for all learners?",
  confirmOpenDescription:
    '"{name}" will change from "coming soon" to active. Learners will be able to browse its levels immediately. Make sure lessons, vocabulary, grammar, and quizzes have been added for it in the content manager.',
  confirmCloseTitle: 'Set {name} back to "coming soon"?',
  confirmCloseDescription:
    '"{name}" will be hidden from learners again and marked as "coming soon".',
  openedSuccess: "{name} is now active",
  closedSuccess: "{name} is now marked as coming soon",
  curriculum: {
    title: "Curriculum & levels",
    description:
      "Rename lesson stages and grow any language beyond A1 by adding new CEFR levels (A2, B1, B2...). New levels get their own content slot automatically.",
    levelsCount: "{count} levels",
    defaultBadge: "Base level",
    defaultBadgeHint: "Ships with real content — can be renamed but not removed.",
    customBadge: "Custom",
    emptyState:
      "No levels yet for this language — use \"Add level\" to design its first stage.",
    addLevel: "Add level",
    addLevelTitle: "Add a new level",
    addLevelDescription:
      "Add a new level to the {language} curriculum. A matching lesson slot is created automatically so you can start adding content for it right away.",
    band: "CEFR stage",
    levelCodePreview: "Level code",
    levelTitleLabel: "Level title",
    levelTitlePlaceholder: "e.g. Past Tense Mastery",
    levelDescriptionLabel: "Level description",
    create: "Create level",
    editAriaLabel: "Edit level",
    editLevelTitle: "Rename level",
    editLevelDescription:
      "Update the title and description learners see for {code}.",
    saveChanges: "Save changes",
    resetToDefault: "Reset to default",
    resetConfirmTitle: "Reset {code} to its default name?",
    resetConfirmDescription:
      "This restores the original title and description for {code}.",
    deleteLevelTitle: "Delete {code}?",
    deleteLevelDescription:
      "This removes {code} from the {language} curriculum. Learners will no longer see it. Any content already created for it is kept but hidden.",
    levelAdded: "{code} was added to {language}",
    levelUpdated: "{code} was updated",
    levelDeleted: "{code} was removed",
    levelReset: "{code} was reset to its default name",
    cannotDeleteDefault: "Base levels can't be deleted, only renamed or reset.",
  },
};
