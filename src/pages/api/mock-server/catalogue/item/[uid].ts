// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { CatalogueItems } from '../catalogue-mock-data'

const fakeItem = {
  uid: 'c8acb6e8-86a7-46e6-8e2b-bf2cc907fa97',
  name: 'Z825BV - Vacuum-Compatible 25 mm Motorized Actuator with Ø3/8" Barrel Fitting',
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
    {
      value: 'Stepper motor',
      propertyName: 'Motor type',
      propertyUnit: null,
      propertyGroup: 'Motion'
    }
  ],
  description:
    'Vacuum-Compatible DC Motor Actuator, 25 mm Travel\n6 VDC Servo Actuator\nSub-micron Resolution\n2.3 mm/s Maximum Velocity\nDrop In Replacement for Most 12 mm Manual Actuators\nCompatible with Ø3/8" (Ø9.525 mm) Barrel-Fitting Stages and Mounts\nLimit Switches for Zero Datum and Actuator Protection\nRated Down To 10-6 Torr.',
  categoryName: 'Motorized actuators',
  categoryPath: 'motion/actuators/motorized-actuators',
  manufacturer: 'Thorlabs',
  manufacturerUrl: 'https://www.thorlabs.com/thorproduct.cfm?partnumber=Z825BV',
  manufacturerNumber: 'Z825BV'
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { uid } = req.query
  if (uid) {
    let item = CatalogueItems.filter(f => f.uid === uid)

    if (item.length > 0) return res.status(200).json(item[0])
    else res.status(200).json(fakeItem)
  }
}
