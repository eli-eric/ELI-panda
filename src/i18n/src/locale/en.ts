export const messages = {
  common: {
    buttons: {
      close: 'Close',
      continue: 'Continue',
      cancel: 'Cancel',
      save: 'Save',
      home: 'Go Home'
    },
    custom404: {
      title: '404',
      notFound: 'Page not found',
      message:
        'Please check the URL in the address bar and try again.Probably you have no permission.'
    }
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
        select: 'Select Item',
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
      form: {
        name: { label: 'Name', placeholder: 'Name' },
        description: { label: 'Description', placeholder: 'Description' },
        systemTypeUID: { label: 'System Type' }, // system types codebook - SYSTEM_TYPE
        systemCode: { label: 'System Code', placeholder: 'System Code' },
        systemAlias: { label: 'System Alias', placeholder: 'System Alias' },
        locationUID: { label: 'Location', placeholder: 'Type here...' }, // locations codebook - LOCATION
        ownerUID: { label: 'Owner', placeholder: 'Type here...' }, // codebook of users{uid, name},  - USER
        importanceUID: { label: 'Importance' }, // codebook of importance - SYSTEM_IMPORTANCE
        zoneUID: { label: 'Zone' }, // codebook of zones - ZONE
        subZone: { label: 'Sub Zone' }, // codebook of subzones depend on selected zone SUB_ZONE (parentUID=ZONE.uid)
        criticalityClassUID: { label: 'Criticality Class' } // codebook of criticalities - SYSTEM_CRITICALITY_CLASS
      }
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
    },
    relations: {
      title: 'Relations',
      buttons: {
        addSpare: 'Add Spare'
      },
      deleteModal: {
        title: 'Warning',
        text: 'Are you sure you want to remove this Relation?',
        buttons: {
          continue: 'Continue',
          cancel: 'Cancel'
        }
      },
      tableHeader: {
        direction: 'Direction',
        systemName: 'Foreign System Name',
        type: 'Relation Type Code',
        relationUid: 'Relation UID',
        action: 'Action'
      },
      addRelationModal: {
        tableHeader: {
          name: 'Name',
          type: 'System Type',
          path: 'System Code Path'
        },
        buttons: {
          continue: 'Save',
          cancel: 'Cancel'
        }
      }
    },
    catalogueItem: {
      addButton: 'Find Catalogue Item',
      addItemModal: {
        form: {
          catalogueItemUID: {
            label: 'Catalogue Item',
            placeholder: '0'
          },
          itemUsageUID: {
            label: 'Item Usage UID'
          },
          eun: {
            label: 'EUN',
            placeholder: 'EUN'
          },
          name: {
            label: 'Name',
            placeholder: 'Name'
          },
          serialNumber: {
            label: 'Serial Number',
            placeholder: 'Serial Number'
          },
          batchNumber: {
            label: 'Batch Number',
            placeholder: 'Batch Number'
          },
          obsolete: {
            label: 'Obsolote',
            placeholder: 'Obsolote'
          },
          estimatedLifeTimeMonths: {
            label: 'Estimated Life Time Months',
            placeholder: 'Estimated Life Time Months'
          }
        }
      }
    },
    note: 'Note'
  },

  reportsPage: { head: 'Eli Panda - Reports' },
  defaul: { head: 'Eli Panda' }
}
