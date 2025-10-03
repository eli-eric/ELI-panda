export const privacyPolicyConfig = {
  appName: 'Panda App',
  organization: 'ELI (Extreme Light Infrastructure)',
  lastUpdated: '2025-01-07',

  sections: {
    introduction: {
      title: 'Privacy Policy – Panda App',
      content:
        'Panda is an internal application used exclusively by authorized personnel within our organization. The app is designed for internal management of spare parts for high-energy and laser control systems.'
    },

    dataAccess: {
      title: 'Data Access',
      items: [
        'Users log in via Microsoft Azure Active Directory (AAD).',
        "The application accesses the user's domain account for authentication purposes only.",
        'No personal or sensitive user data is collected, stored, or shared with third parties.'
      ]
    },

    usageScope: {
      title: 'Usage Scope',
      content:
        'This application is not intended for public use. It is distributed solely for internal purposes within a controlled environment and does not offer functionality outside of the organization.'
    },

    dataStorage: {
      title: 'Data Storage',
      content:
        'All data processed by the application remains within the internal infrastructure of our institution and is not transferred externally.'
    },

    contact: {
      title: 'Contact',
      content:
        'For any questions regarding this privacy policy or the application, please contact our IT department.'
    }
  }
} as const

export type PrivacyPolicyConfig = typeof privacyPolicyConfig
