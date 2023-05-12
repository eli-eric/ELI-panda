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
      message: 'Please check the URL in the address bar and try again.Probably you have no permission.'
    },
    property: {
      description: 'Description'
    },
    warning: 'Warning',
    fileManager: { deleteModal: { title: 'Warning', text: 'Are you sure you want to remove {fileName}?' } }
  },
  layout: {
    login: 'Log In',
    dashboard: 'Release History',
    catalogue: 'Catalogue',
    systems: 'Systems',
    systemsOverview: 'Systems',
    reports: 'Reports',
    orders: 'Orders',
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
    alert: { title: 'Wrong username or password.' }
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
    },
    edit: {
      deleteModal: {
        message: 'Are you sure you want to delete this category?'
      },
      copyModal: {
        message: 'Are you sure you want to copy this category?'
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
        criticalityClassUID: { label: 'Criticality Class' }, // codebook of criticalities - SYSTEM_CRITICALITY_CLASS
        parentUID: { label: 'ParentUID' } // codebook of criticalities - SYSTEM_CRITICALITY_CLASS
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
          },
          description: {
            label: 'Description'
          },
          conditionStatusUID: {
            label: 'Conditional Status'
          }
        }
      }
    },
    note: 'Note'
  },

  reportsPage: { head: 'Eli Panda - Reports' },
  ordersPage: {
    head: 'Eli Panda - Orders',
    ordersTable: {
      header: {
        name: 'Name',
        orderNumber: 'Order Number',
        requestNumber: 'Request Number',
        contractNumber: 'Contract Number',
        supplier: 'Supplier',
        requestor: 'Requestor',
        procurementResponsible: 'Procurement Responsible',
        orderStatus: 'Order Status',
        notes: 'Notes',
        orderDate: 'Order Date',
        lastUpdateTime: 'Last Update Time',
        lastUpdateBy: 'Last Update By'
      }
    },
    orderDetail: {
      form: {
        name: { label: 'Name', placeholder: 'Name' },
        orderNumber: { label: 'Order Number', placeholder: 'Order Number' },
        requestNumber: { label: 'Request Number', placeholder: 'Request Number' },
        contractNumber: { label: 'Contract Number', placeholder: 'Contract Number' },
        supplier: { label: 'Supplier', placeholder: '...type here' },
        orderStatus: { label: 'Order Status' },
        notes: { label: 'Notes' },
        orderDate: { label: 'Order Date' },
        procurementResponsible: { label: 'Procurement Responsible', placeholder: '...type here' },
        requestor: { label: 'Requestor', placeholder: '...type here' }
      }
    },
    deleteModal: { title: 'Warning', message: 'Are you sure you want to delete {orderName}?' },
    orderLines: {
      form: {
        name: { label: 'Name', placeholder: 'Name' },
        catalogueNumber: { label: 'Catalogue Number', placeholder: 'Catalogue Number' },
        systemName: { label: 'System Name', placeholder: 'System Name' },
        price: { label: 'Price', placeholder: '0.00' },
        quantity: { label: 'Quantity', placeholder: 'Quantity' },
        location: { label: 'Location', placeholder: 'Location' },
        itemUsage: { label: 'Item Usage' }
      },
      orderLinesTable: {
        header: {
          name: 'Name',
          catalogueNumber: 'Catalogue Number',
          system: 'System',
          price: 'Price',
          location: 'Location',
          itemUsage: 'Item Usage',
          eun: 'EUN',
          isDelivered: 'Delivered'
        }
      },
      deleteModal: { title: 'Warning', message: 'Are you sure you want to delete this order line?' }
    }
  },
  orderItem: { head: 'Eli Panda - Order Item' },
  defaul: { head: 'Eli Panda' }
}
