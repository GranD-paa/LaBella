export const adminUsersEn = {
  title: "User Management",
  description: "Search, manage, and assign roles to every registered user.",
  totalUsers: "{count} total users",
  searchPlaceholder: "Search by name, email, or user ID...",
  filterRole: "Role",
  filterStatus: "Status",
  allRoles: "All roles",
  allStatuses: "All statuses",
  statusActive: "Active",
  statusSuspended: "Suspended",
  noUsers: "No users registered yet.",
  noResults: "No users match your search or filters.",
  columnUser: "User",
  columnEmail: "Email",
  columnStatus: "Status",
  columnRole: "Role",
  columnTier: "Subscription",
  columnJoined: "Registered",
  columnActions: "Actions",
  unnamed: "Unnamed user",
  noEmail: "No email on file",
  userId: "User ID",
  copyId: "Copy ID",
  idCopied: "User ID copied",
  viewProfile: "View profile",
  changeRole: "Change role",
  promote: "Promote to Admin",
  demote: "Remove admin access",
  suspend: "Suspend account",
  activate: "Reactivate account",
  resetPassword: "Reset password",
  you: "You",
  promoteConfirmTitle: "Promote this user to Admin?",
  promoteConfirmDescription:
    "{name} becomes an Admin (support) and gets access to the admin panel. Use the role editor for a finer tier.",
  demoteConfirmTitle: "Remove admin access?",
  demoteConfirmDescription:
    "\"{name}\" will lose all admin permissions and become a regular learner.",
  suspendConfirmTitle: "Suspend this account?",
  suspendConfirmDescription:
    "\"{name}\" will not be able to sign in until reactivated.",
  activateConfirmTitle: "Reactivate this account?",
  activateConfirmDescription: "\"{name}\" will be able to sign in again.",
  resetPasswordConfirmTitle: "Send password reset email?",
  resetPasswordConfirmDescription:
    "A secure reset link will be sent to {email}. The stored password is never shown.",
  resetPasswordSimulated:
    "Simulated in local dev mode — in production, {email} would receive a reset link.",
  resetPasswordSent: "Password reset email sent to {email}",
  promoted: "User promoted to admin",
  demoted: "Admin access removed",
  roleUpdated: "Role updated",
  statusUpdated: "Account status updated",
  confirm: "Confirm",
  cannotModifySelf: "You cannot perform this action on your own account.",
  permissions: {
    viewUsers: "View users",
    answerSupport: "Answer support",
    suspendUsers: "Suspend accounts",
    manageRoles: "Manage roles",
    manageAdminPermissions: "Edit admin permissions",
    manageContent: "Content",
    manageQuizzes: "Quizzes",
    manageBlog: "Blog",
    manageLanguages: "Languages & levels",
    manageBanners: "Banners",
    manageLanding: "Landing page",
    manageSubscriptions: "Subscriptions",
    manageBilling: "Accounting",
    fullAccess: "Full access",
  },
  tier: {
    free: "No subscription",
    paid: "{plan} user",
    gifted: "Gifted subscription",
    giftedBy: "Gifted by {name}",
  },
  assignLanguages: "Assign languages",
  languagesUpdated: "This teacher's languages were updated",
  grantSubscription: "Gift a subscription",
  assignLanguagesDialog: {
    title: "{name}'s languages",
    description:
      "A teacher can only create or remove content for the languages selected here.",
    save: "Save languages",
    emptyWarning:
      "With no language selected, this teacher can reach no content at all.",
  },
  grantDialog: {
    title: "Gift a subscription to {name}",
    description:
      "The plan is activated with no payment and never reaches the revenue figures. The learner sees it as an ordinary subscription.",
    planLabel: "Plan",
    languageLabel: "Language",
    periodLabel: "Period",
    months: "{count} months",
    noteLabel: "Note",
    notePlaceholder: "e.g. compensation for the outage",
    noteHint: "This note is visible to admins only.",
    save: "Gift subscription",
    granted: "Subscription gifted",
  },
  profileDialog: {
    title: "User profile",
    accountInfo: "Account information",
    fullName: "Full name",
    email: "Email",
    role: "Role",
    status: "Status",
    joined: "Registered on",
    userId: "User ID",
    permissions: "Current permissions",
    assignedLanguages: "Assigned languages: {languages}",
    noAssignedLanguages: "This teacher has no language assigned yet.",
    close: "Close",
    quizAttempts: "Quiz results",
    quizAttemptsLoading: "Loading quiz history…",
    quizAttemptsEmpty: "This learner has not completed any quizzes yet.",
    quizAttemptsLoadError: "Could not load quiz history.",
    quizChecklistSummary: "{correct}/{total} correct",
    correctCount: "{count} correct",
    incorrectCount: "{count} incorrect",
    userAnswer: "Learner answer",
    correctAnswer: "Correct answer",
    quizChecklistUnavailable:
      "Detailed answer checklist is not available for this attempt.",
  },
  changeRoleDialog: {
    title: "Change role for {name}",
    description: "Select a new role. Changes take effect immediately.",
    selectLabel: "Role",
    save: "Save role",
    superAdminSeats:
      "Super Admin seats in use: {used} of {max}.",
    superAdminSeatsFull:
      "All {max} Super Admin seats are taken. Free one up before granting another.",
    superAdminConfirmTitle: "Promote to Super Admin?",
    superAdminConfirmDescription:
      "Are you sure you want to make \"{name}\" a Super Admin? They will get full access, no other admin will be able to demote, suspend, or edit them, and the platform allows at most {max} Super Admins.",
    superAdminConfirmAction: "Yes, make Super Admin",
  },
  guard: {
    self: "You cannot perform this action on your own account.",
    superAdminProtected:
      "Super Admin accounts are protected. No one can demote, suspend, or change the role of a Super Admin from this panel.",
    superAdminOnly: "Only a Super Admin can change roles.",
    superAdminLimit:
      "The Super Admin limit has been reached. No further Super Admins can be added.",
    suspendForbidden:
      "Your role cannot suspend accounts. That belongs to the Super Admin and the Head Admin.",
    headAdminPeer:
      "Head Admins are peers. Only a Super Admin can suspend one, or another Super Admin.",
    permissionsForbidden:
      "Only a Super Admin or a Head Admin can change what a role may do.",
    roleNotEditable:
      "This role's permissions are fixed in code and cannot be edited.",
    languageForbidden: "This content belongs to a language you were not assigned.",
    languageNotScoped:
      "This role is not scoped by language, so assigning one means nothing.",
  },
  roles: {
    superAdmin: {
      label: "Super Admin",
      description:
        "Full access to every feature, including role and permission management.",
    },
    headAdmin: {
      label: "Head Admin",
      description:
        "Watches the admin tier: sees every account, can suspend one, and decides what admins are allowed to do — but never changes anybody's role.",
    },
    admin: {
      label: "Admin",
      description:
        "Customer support: answers tickets and learner questions. Cannot suspend accounts.",
    },
    teacher: {
      label: "Teacher",
      description:
        "Uploads and removes content and quizzes, only for the languages assigned to them.",
    },
    writer: {
      label: "Writer",
      description: "The blog panel only: writing, editing and publishing posts.",
    },
    learner: {
      label: "Learner",
      description:
        "A signed-up account with no role and no subscription. A paid plan is not a role — it comes from the subscription panel.",
    },
  },
  permissionsPanel: {
    title: "Roles & permissions",
    description:
      "The full access reference: admin roles above, and the paid subscriptions below, read from the subscription panel.",
    languageScoped: "Language-scoped",
    editorHint:
      "Editing what admins may do belongs to the Super Admin and the Head Admin.",
    editorTitle: "Edit what {role} may do",
    editorDescription:
      "Any capability added to the panel later becomes grantable from this same list, automatically.",
    save: "Save permissions",
    saved: "Role permissions updated",
    lockedHint:
      "Locked entries can never be handed out: suspension, role and permission management, subscriptions and accounting stay with the Super Admin.",
    lockedPermission: "Locked - cannot be granted",
    tiersTitle: "Paid subscriptions",
    tiersDescription:
      "These are not roles: they come from a learner's live subscription and keep the ordinary learner dashboard. Change what they unlock in the subscription panel.",
    tierColumn: "Subscription",
    tierVocabulary: "Vocabulary",
    tierGrammar: "Grammar",
    tierVideo: "Video",
    tierLevelExam: "Level exam",
    tierFree: "No subscription",
    tierFreeHint: "An ordinary learner; free sections only.",
    tierUser: "{plan} user",
    tierUserHint: "What this unlocks is set in the subscription panel.",
  },
} as const;
