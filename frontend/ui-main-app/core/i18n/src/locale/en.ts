export const messages = {
  common: {
    buttons: { close: 'Close' }
  },
  layout: {
    login: 'Log In',
    dashboard: 'Release History',
    catalogue: 'Catalogue',
    systems: 'Systems',
    systemsOverview: 'Systems',
    reports: 'Reports',
    button: {
      signout: 'Sign Out'
    },
    userMenu: {
      profile: 'Profile',
      singout: 'Sign Out'
    },
    profile: {
      title: 'Profile',
      subTitle: 'Personal details.',
      fullName: 'Full name',
      email: 'Email address',
      facility: 'Facility',
      roles: 'Roles'
    }
  },
  authPage: {
    head: 'Eli Panda - Sign In',
    title: 'Sign in to ELI - PANDA',
    form: {
      userName: 'User Name',
      password: 'Password',
      button: { default: 'Sign In', isLoading: 'Loading...' }
    },
    alert: { title: 'Something went wrong!' }
  },
  dashboardPage: { head: 'Eli Panda - Dashboard' },
  cataloguePage: {
    head: 'Eli Panda - Catalogue',
    help: 'Select category or use Search bar',
    defaultMessage: {
      help: { text: 'Select category or use Search bar' },
      noResults: {
        title: 'No results found',
        text: 'We can’t find anything with that term at the moment, try searching something else.'
      }
    },
    pagination: {
      text: 'Showing <medium>{from}</medium> to <medium>{to}</medium> of <medium>{resultsCount}</medium> results'
    },
    itemList: {
      header: {
        uid: 'UID',
        name: 'Name',
        description: 'Description',
        categoryName: 'Category name',
        manufactorer: 'Manufacturer',
        manufacturerNumber: 'Manufacturer Number',
        manufacturerUrl: 'Manufacturer Url'
      }
    },
    itemDetail: {
      buttons: {
        back: 'Back',
        edit: 'Edit'
      }
    }
  },
  systemsPage: {
    head: 'Eli Panda - Systems',
    systemDetail: {
      name: 'Name',
      description: 'Description',
      importance: 'Importance',
      facilityZone: 'Facility Zone',
      type: 'Type',
      code: 'Code',
      alias: 'Alias',
      location: 'Location',
      owner: 'Owner'
    },
    itemDetail: {
      eun: 'Eun',
      serialNumber: 'Serial Number',
      batchNumber: 'Batch Number',
      assetNumber: 'Asset Number',
      itemUsageCategory: 'Item Usage Category',
      activated: 'Activated',
      conditionStatus: 'Condition Status',
      estimatedLifetime: 'Estimated Lifetime',
      obsolete: 'Obsolete',
      createdBy: 'Created By',
      note: 'Note'
    }
  },
  reportsPage: { head: 'Eli Panda - Reports' },
  defaul: { head: 'Eli Panda' }
}
