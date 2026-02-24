import type { RelationshipGraphResponse } from '../types/graph'

/**
 * Comprehensive mock data for the relationship graph view.
 * Used until the backend `/systems/relationship-graph` endpoint is available.
 */
export const MOCK_GRAPH_DATA: RelationshipGraphResponse = {
    nodes: [
        // Technology Units
        {
            uid: 'tu-cooling',
            name: 'Cooling System',
            systemCode: 'TU-COOL-001',
            systemLevel: 'TECHNOLOGY_UNIT',
            systemType: { uid: 'st-hvac', name: 'HVAC' },
        },
        {
            uid: 'tu-power',
            name: 'Power Distribution',
            systemCode: 'TU-PWR-001',
            systemLevel: 'TECHNOLOGY_UNIT',
            systemType: { uid: 'st-elec', name: 'Electrical' },
        },
        {
            uid: 'tu-vacuum',
            name: 'Vacuum System',
            systemCode: 'TU-VAC-001',
            systemLevel: 'TECHNOLOGY_UNIT',
            systemType: { uid: 'st-vac', name: 'Vacuum' },
        },
        // Key Systems
        {
            uid: 'ks-chiller-a',
            name: 'Chiller A',
            systemCode: 'KS-CHL-001',
            systemLevel: 'KEY_SYSTEMS',
            systemType: { uid: 'st-chiller', name: 'Chiller' },
        },
        {
            uid: 'ks-chiller-b',
            name: 'Chiller B',
            systemCode: 'KS-CHL-002',
            systemLevel: 'KEY_SYSTEMS',
            systemType: { uid: 'st-chiller', name: 'Chiller' },
        },
        {
            uid: 'ks-ups',
            name: 'UPS Main',
            systemCode: 'KS-UPS-001',
            systemLevel: 'KEY_SYSTEMS',
            systemType: { uid: 'st-ups', name: 'UPS' },
        },
        {
            uid: 'ks-transformer',
            name: 'Main Transformer',
            systemCode: 'KS-TRF-001',
            systemLevel: 'KEY_SYSTEMS',
            systemType: { uid: 'st-transformer', name: 'Transformer' },
        },
        {
            uid: 'ks-turbo-pump',
            name: 'Turbo Pump',
            systemCode: 'KS-TMP-001',
            systemLevel: 'KEY_SYSTEMS',
            systemType: { uid: 'st-pump', name: 'Pump' },
        },
        {
            uid: 'ks-ion-pump',
            name: 'Ion Pump',
            systemCode: 'KS-IOP-001',
            systemLevel: 'KEY_SYSTEMS',
            systemType: { uid: 'st-pump', name: 'Pump' },
        },
        {
            uid: 'ks-plc',
            name: 'PLC Controller',
            systemCode: 'KS-PLC-001',
            systemLevel: 'KEY_SYSTEMS',
            systemType: { uid: 'st-ctrl', name: 'Controller' },
        },
        {
            uid: 'ks-gauge',
            name: 'Vacuum Gauge',
            systemCode: 'KS-VGE-001',
            systemLevel: 'KEY_SYSTEMS',
            systemType: { uid: 'st-sensor', name: 'Sensor' },
        },
        // Subsystems & Parts
        {
            uid: 'sp-pump-motor',
            name: 'Pump Motor',
            systemCode: 'SP-MOT-001',
            systemLevel: 'SUBSYSTEMS_AND_PARTS',
            systemType: { uid: 'st-motor', name: 'Motor' },
        },
        {
            uid: 'sp-coolant-valve',
            name: 'Coolant Valve',
            systemCode: 'SP-VLV-001',
            systemLevel: 'SUBSYSTEMS_AND_PARTS',
            systemType: { uid: 'st-valve', name: 'Valve' },
        },
        {
            uid: 'sp-spare-chiller',
            name: 'Spare Chiller Unit',
            systemCode: 'SP-SCH-001',
            systemLevel: 'SUBSYSTEMS_AND_PARTS',
            systemType: { uid: 'st-chiller', name: 'Chiller' },
        },
        {
            uid: 'sp-backup-ups',
            name: 'Backup UPS Module',
            systemCode: 'SP-BUP-001',
            systemLevel: 'SUBSYSTEMS_AND_PARTS',
            systemType: { uid: 'st-ups', name: 'UPS' },
        },
    ],
    links: [
        // POWERED_BY relationships
        {
            uid: 'rel-001',
            source: 'ks-chiller-a',
            target: 'ks-transformer',
            relationship: 'POWERED_BY',
            description: 'Chiller A powered by main transformer',
        },
        {
            uid: 'rel-002',
            source: 'ks-chiller-b',
            target: 'ks-transformer',
            relationship: 'POWERED_BY',
            description: 'Chiller B powered by main transformer',
        },
        {
            uid: 'rel-003',
            source: 'ks-turbo-pump',
            target: 'ks-ups',
            relationship: 'POWERED_BY',
            description: 'Turbo pump on UPS-backed power',
        },
        {
            uid: 'rel-004',
            source: 'ks-ion-pump',
            target: 'ks-ups',
            relationship: 'POWERED_BY',
            description: 'Ion pump on UPS-backed power',
        },
        {
            uid: 'rel-005',
            source: 'ks-plc',
            target: 'ks-ups',
            relationship: 'POWERED_BY',
            description: 'PLC on uninterruptible supply',
        },
        {
            uid: 'rel-006',
            source: 'ks-ups',
            target: 'ks-transformer',
            relationship: 'POWERED_BY',
            description: 'UPS fed from main transformer',
        },
        // CONTROLLED_BY relationships
        {
            uid: 'rel-007',
            source: 'ks-chiller-a',
            target: 'ks-plc',
            relationship: 'CONTROLLED_BY',
            description: 'PLC controls chiller A operation',
        },
        {
            uid: 'rel-008',
            source: 'ks-chiller-b',
            target: 'ks-plc',
            relationship: 'CONTROLLED_BY',
            description: 'PLC controls chiller B operation',
        },
        {
            uid: 'rel-009',
            source: 'ks-turbo-pump',
            target: 'ks-plc',
            relationship: 'CONTROLLED_BY',
            description: 'PLC sequences turbo pump startup',
        },
        {
            uid: 'rel-010',
            source: 'sp-coolant-valve',
            target: 'ks-plc',
            relationship: 'CONTROLLED_BY',
            description: 'PLC actuates coolant valve',
        },
        // DEPENDS_ON relationships
        {
            uid: 'rel-011',
            source: 'tu-vacuum',
            target: 'tu-cooling',
            relationship: 'DEPENDS_ON',
            description: 'Vacuum system requires cooling for turbo pumps',
        },
        {
            uid: 'rel-012',
            source: 'tu-vacuum',
            target: 'tu-power',
            relationship: 'DEPENDS_ON',
            description: 'Vacuum system requires stable power',
        },
        {
            uid: 'rel-013',
            source: 'ks-turbo-pump',
            target: 'ks-chiller-a',
            relationship: 'DEPENDS_ON',
            description: 'Turbo pump requires cooling from chiller A',
        },
        {
            uid: 'rel-014',
            source: 'ks-gauge',
            target: 'ks-turbo-pump',
            relationship: 'DEPENDS_ON',
            description: 'Gauge readings depend on pump operation',
        },
        {
            uid: 'rel-015',
            source: 'sp-pump-motor',
            target: 'ks-turbo-pump',
            relationship: 'DEPENDS_ON',
            description: 'Motor is part of turbo pump assembly',
        },
        // IS_SPARE_FOR relationships
        {
            uid: 'rel-016',
            source: 'sp-spare-chiller',
            target: 'ks-chiller-a',
            relationship: 'IS_SPARE_FOR',
            description: 'Spare unit for Chiller A',
        },
        {
            uid: 'rel-017',
            source: 'sp-spare-chiller',
            target: 'ks-chiller-b',
            relationship: 'IS_SPARE_FOR',
            description: 'Spare unit also covers Chiller B',
        },
        {
            uid: 'rel-018',
            source: 'sp-backup-ups',
            target: 'ks-ups',
            relationship: 'IS_SPARE_FOR',
            description: 'Backup module for main UPS',
        },
    ],
}
