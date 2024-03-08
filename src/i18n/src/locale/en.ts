export const messages = {
  common: {
    buttons: {
      close: 'Close',
      continue: 'Continue',
      cancel: 'Cancel',
      save: 'Save',
      home: 'Go Home',
      addNew: 'Add new item'
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
    fileManager: { deleteModal: { title: 'Warning', text: 'Are you sure you want to remove {fileName}?' } },
    form: { leaveWarning: { title: 'Warning', text: 'You have unsaved changes. Are you sure you want to leave?' } },
    files: { title: 'Files' }
  },
  layout: {
    login: 'Log In',
    dashboard: 'Dashboard',
    support: 'Support',
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
    head: 'ELI Panda - Sign In',
    title: 'Sign in to ELI - PANDA',
    form: {
      userName: 'User Name',
      password: 'Password',
      button: { default: 'Sign In', isLoading: 'Loading...' }
    },
    alert: { title: 'Wrong username or password.' }
  },
  dashboardPage: { head: 'ELI Panda - Dashboard' },
  cataloguePage: {
    head: 'ELI Panda - Catalogue',
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
        supplier: 'Supplier',
        supplierUrl: 'Supplier Url',
        partNumber: 'Part Number'
      }
    },
    itemDetail: {
      buttons: {
        back: 'Back',
        edit: 'Edit'
      },
      form: {
        name: { label: 'Catalogue Name', placeholder: 'Name' },
        description: { label: 'Description', placeholder: 'Description' },
        catalogueNumber: { label: 'Part Number', placeholder: 'Part Number' },
        category: { label: 'Category: {parentPath}', placeholder: 'Type here...' }, // codebook of categories - CATEGORY
        manufacturer: { label: 'Supplier/Manufacturer', placeholder: 'Type here...' }, // codebook of manufacturers - MANUFACTURER
        manufacturerNumber: { label: 'Manufacturer Number', placeholder: 'Manufacturer Number' },
        manuFacturerUrl: { label: 'Supplier/Manufacturer Url', placeholder: 'Supplier/Manufacturer Url' },
        catalogueCategory: { label: 'Catalogue Category' } // codebook of catalogue categories - CATALOGUE_CATEGORY
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
    head: 'ELI Panda - Systems',
    systemDetail: {
      form: {
        name: { label: 'Name', placeholder: 'Name' },
        isCritical: { label: 'Is Critical' },
        minimalSpareParstCount: { label: 'Minimal Spare Parts Count', placeholder: 'Minimal Spare Parts Count' },
        description: { label: 'Description', placeholder: 'Description' },
        systemType: { label: 'System Type' }, // system types codebook - SYSTEM_TYPE
        systemCode: { label: 'System Code', placeholder: 'System Code' },
        systemAlias: { label: 'System Alias', placeholder: 'System Alias' },
        systemLevel: { label: 'System Level' }, // system levels codebook - SYSTEM_LEVEL
        parentSystemFilter: { label: 'All subsystems for parent' }, // system levels codebook - SYSTEM_LEVEL
        team: {
          label: 'Responsible Team',
          placeholder: 'Select Team...'
        }, // codebook of systems{uid, name},  - SYSTEM
        location: { label: 'Location', placeholder: 'Type here...' }, // locations codebook - LOCATION
        responsiblePerson: { label: 'Responsible Person', placeholder: 'Responsible Person' },
        importance: { label: 'Importance' }, // codebook of importance - SYSTEM_IMPORTANCE
        zone: { label: 'Control System Zone' }, // codebook of zones - ZONE
        subZone: { label: 'Sub Zone' }, // codebook of subzones depend on selected zone SUB_ZONE (parentUID=ZONE.uid)
        criticalityClass: { label: 'Criticality Class' }, // codebook of criticalities - SYSTEM_CRITICALITY_CLASS
        parentUID: { label: 'ParentUID' }, // codebook of criticalities - SYSTEM_CRITICALITY_CLASS
        physicalItem: {
          itemUsage: { label: 'Item Usage' }, // codebook of item usage - ITEM_USAGE
          serialNumber: { label: 'Serial Number', placeholder: 'Serial Number' },
          eun: { label: 'Eun', placeholder: 'Eun' },
          price: { label: 'Price', placeholder: 'Price' },
          procurementStatus: { label: 'Procurement Status', placeholder: 'Procurement Status' }, // codebook of procurement status - PROCUREMENT_STATUS
          conditionStatus: { label: 'Condition Status', placeholder: 'Condition Status' }, // codebook of condition status - ITEM_CONDITION_STATUS
          notes: { label: 'Item notes' },
          general: {
            properties: {
              property: '<p><strong><small>{name}</small></strong>: <small>{value} {unit}</small></p>',
              title: '<label>{title}:</label>'
            }
          }
        }
      },
      deleteModal: {
        message: 'Are you sure you want to delete this {name} and all sub-systems?'
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
  reportsPage: { head: 'ELI Panda - Reports' },
  ordersPage: {
    head: 'ELI Panda - Orders',
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
        deliveryStatus: 'Delivery Status',
        notes: 'Notes',
        orderDate: 'Order Date',
        lastUpdateTime: 'Last Update Time',
        lastUpdateBy: 'Last Update By'
      }
    },
    orderDetail: {
      sectionHeadings: {
        orderLines: 'Order Lines'
      },
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
    deleteModal: { title: 'Warning', message: 'Are you sure you want to delete {name}?' },
    ordelineMissingModal: {
      title: 'Warning',
      message: 'Order lines is missing are you sure you want to continue?'
    },
    orderLines: {
      formHeadings: {
        itemInfo: 'Item Info',
        systemInfo: 'System Info'
      },
      form: {
        name: { label: 'Name', placeholder: 'Name' },
        catalogueNumber: { label: 'Part Number', placeholder: 'Part Number' },
        systemName: { label: 'Parent System', placeholder: 'Parent System' },
        price: { label: 'Price', placeholder: '0.00' },
        quantity: { label: 'Quantity', placeholder: 'Quantity' },
        location: { label: 'Location', placeholder: 'Location' },
        itemUsage: { label: 'Item Usage' },
        serialNumber: { label: 'Serial Number', placeholder: 'Serial Number' },
        eun: { label: 'EUN', placeholder: 'EUN' },
        manualEun: { label: 'Set EUN manually' },
        notes: { label: 'Notes', placeholder: 'Notes' }
      },
      orderLinesTable: {
        header: {
          name: 'Name',
          catalogueNumber: 'Part Number',
          system: 'Parent System',
          price: 'Price',
          location: 'Location',
          itemUsage: 'Item Usage',
          eun: 'EUN',
          isDelivered: 'Delivered',
          serialNumber: 'Serial Number',
          notes: 'Notes'
        }
      },
      deleteModal: { title: 'Warning', message: 'Are you sure you want to delete <medium>{name}</medium>?' },
      missingSerialNumber: { title: 'Warning', message: 'Serial number is missing, please fill it.' }
    }
  },
  codebooksPage: {
    selectCodebookForm: {
      codebook: {
        placeholder: 'select codebook'
      }
    }
  },
  roomCardsPage: {
    head: 'ELI Panda - Room Cards',
    form: {
      status: { label: 'Status', placeholder: 'Select Status' },
      name: { label: 'Name', placeholder: 'Name' },
      location: { label: 'Location', placeholder: 'Select Location' }
    },
    nestedForm: {
      role: { label: 'Select role' },
      employee: { label: 'Select employee' },
      team: { label: 'Select team' }
    }
  },
  orderItem: { head: 'ELI Panda - Order Item' },
  systemItem: { head: 'ELI Panda - System Item' },
  profilePage: {
    head: 'ELI Panda - Profile',
    general: {
      title: 'Profile',
      subTitle: 'Personal details.'
    },
    security: {
      title: 'Security',
      subTitle: 'Change your password.',
      api: 'REST API Token',
      apiDescription: 'Get your API key to use ELI Panda API.',
      apiDocs: 'REST API Documentation'
    },
    team: {
      title: 'Team',
      subTitle: 'Team details.'
    }
  },
  defaul: { head: 'ELI Panda' },
  admin: {
    head: 'ELI Panda - Administration',
    users: {
      form: {
        email: { label: 'Email', placeholder: 'Email' },
        isEnabled: { label: 'Is Enabled', placeholder: 'Is Enabled' },
        firstName: { label: 'First Name', placeholder: 'First Name' },
        employee: { label: 'Employee', placeholder: 'Find Employee' },
        lastName: { label: 'Last Name', placeholder: 'Last Name' },
        username: { label: 'Username', placeholder: 'Username' },
        facility: { label: 'Facility', placeholder: 'Facility' },
        password: { label: 'Password', placeholder: 'Password' },
        confirmPassword: { label: 'Confirm Password', placeholder: 'Confirm Password' }
      }
    }
  }
}
