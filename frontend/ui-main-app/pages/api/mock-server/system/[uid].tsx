// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { SystemDetailInfo } from '../systems/systems-mock-data'

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { uid } = req.query

  const system = {
    uid: 'c8acb6e8-86a7-46e6-8e2b-bf2cc907fa97',
    name: 'Motorized Actuator',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed elit dui, pellentesque a, faucibus vel, interdum nec, diam. Quisque tincidunt scelerisque libero. Nunc auctor. Integer tempor. Maecenas aliquet accumsan leo. In sem justo, commodo ut, suscipit',
    importance: '(0)Low',
    facilityZone: 'ELI',
    type: 'Proin pede metus, vulp',
    code: '566778',
    alias: 'ELI dsfsdf',
    location: 'ELI HQ',
    owner: 'Já'
  }
  const item = {
    eun: '46e6-8e2b-bf2cc907fa97',
    serialNumber: '2345678909876543',
    batchNumber: '(0)Low', // List: (0)Low, (1)Standard, (2)High, (3)V.High
    assetNumber: '23456789098765',
    itemUsageCategory: 'Spare Part', // “Spare Part”, “In system Part”, “Experimental loan pool part” ,“Test and measurement equipment”, “Stock item”, “Other”
    activated: false,
    conditionStatus: 'new',
    estimatedLifetime: '3 years',
    obsolete: true,
    createdBy: 'Jiří Švácha',
    note: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed elit dui'
  }
  const catalogue = {
    uid: '78e1ff20-fa1b-497b-b29e-a513d5d46dc4',
    name: 'Z825B - 25 mm Motorized Actuator with Ø3/8" Barrel (0.5 m Cable)',
    details: [
      {
        value: '40',
        propertyName: 'Axial load capacity',
        propertyUnit: 'N',
        propertyGroup: 'Actuator properties'
      },
      {
        value: 'No',
        propertyName: 'Integrated encoder',
        propertyUnit: null,
        propertyGroup: 'Actuator properties'
      },
      {
        value: 'N/A',
        propertyName: 'Encoder resolution',
        propertyUnit: 'nm',
        propertyGroup: 'Actuator properties'
      },
      {
        value: '200',
        propertyName: 'Minimum incremental motion',
        propertyUnit: 'nm',
        propertyGroup: 'Actuator properties'
      },
      { value: 'Stepper motor', propertyName: 'Motor type', propertyUnit: null, propertyGroup: 'Motion' }
    ],
    description:
      '6 VDC Servo Actuator\n    Sub-micron Resolution\n    Maximum Velocity: 2.3 mm/s\n    Drop In Replacement for Most 25 mm Manual Actuators\n    Compatible with Stages and Mounts that Accept Ø3/8" (Ø9.525 mm) Barrels\n    Limit Switches for Zero Datum and Actuator Protection\n    Also Available in 6 mm and 12 mm Travel Versions',
    categoryName: 'Motorized actuators',
    categoryPath: 'motion/actuators/motorized-actuators',
    manufacturer: 'Thorlabs',
    manufacturerUrl: 'https://www.thorlabs.com/thorproduct.cfm?partnumber=Z825B',
    manufacturerNumber: 'Z825B'
  }

  const systemDetail: SystemDetailInfo = { systemInfo: system, itemInfo: item, catalogueInfo: catalogue }

  if (uid) return res.status(200).json(systemDetail)
  else res.status(400).json({ message: 'Not found' })
}
