export enum ITEM_USAGE {
    SPARE_PART = '25c189d0-0564-43a7-90d9-65b7083bea98',
    IN_SYSTEM_PART = 'a2aae89a-5cbe-4042-a726-44012b158226',
    EXPERIMENTAL_LOAN_POOL_PART = '89d68bc5-82cc-45cf-80aa-8edb86bf52f1',
    TEST_AND_MEASURMENT = '5defcd49-5307-4b21-94b1-870b8f61a919',
    STOCK_ITEM = '0c7a063d-2bb6-41ef-b808-a137e1deaaa0',
    OTHER = 'a5a2a316-fc23-45fd-b6b2-3dc2af4205ea',
}

export enum ITEM_USAGE_NAME {
    SPARE_PART = 'Spare Part',
    IN_SYSTEM_PART = 'In System Part',
    EXPERIMENTAL_LOAN_POOL_PART = 'Experimental Loan Pool Part',
    TEST_AND_MEASURMENT = 'Test and Measurement Equipment',
    STOCK_ITEM = 'Stock Item',
    OTHER = 'Other',
}

export const ITEM_USAGE_OPTION = {
    SPARE_PART: { uid: ITEM_USAGE.SPARE_PART, name: ITEM_USAGE_NAME.SPARE_PART },
    IN_SYSTEM_PART: {
        uid: ITEM_USAGE.IN_SYSTEM_PART,
        name: ITEM_USAGE_NAME.IN_SYSTEM_PART,
    },
    EXPERIMENTAL_LOAN_POOL_PART: {
        uid: ITEM_USAGE.EXPERIMENTAL_LOAN_POOL_PART,
        name: ITEM_USAGE_NAME.EXPERIMENTAL_LOAN_POOL_PART,
    },
    TEST_AND_MEASURMENT: {
        uid: ITEM_USAGE.TEST_AND_MEASURMENT,
        name: ITEM_USAGE_NAME.TEST_AND_MEASURMENT,
    },
    STOCK_ITEM: { uid: ITEM_USAGE.STOCK_ITEM, name: ITEM_USAGE_NAME.STOCK_ITEM },
    OTHER: { uid: ITEM_USAGE.OTHER, name: ITEM_USAGE_NAME.OTHER },
} as const

// Table id of the systems overview grid — doubles as its TanStack Query key,
// so other modules invalidate it after mutations that change row coloring.
export const SYSTEMS_TABLE_ID = 'systems'
