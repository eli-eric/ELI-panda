// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PROPERTY_TYPE } from '@/types/catalogue/constants'
import type { NextApiRequest, NextApiResponse } from 'next'

import { CatalogueItems } from '../catalogue-mock-data'

const fakeItem = {
  uid: '18473f51-515e-44b3-b1a9-0c9dbab0be49',
  name: ' ACP 15',
  catalogueNumber: 'CKF00040',
  description:
    'Dry multi-stage Roots technology, SD versions, ACP pumps with a pumping speed of max. 15 m3/h, No particle contamination, thanks to frictionless design: no wearing parts in the pumped gases path, No hydrocarbon vapors backstreaming: ACP series pumps are free of lubricant inside the pumping module, Constant performances (Pumping speed, max. and ultimate pressure), High reliability: thanks to our expertise of dry multi-stage Roots pumps since 1988, Low maintenance costs: no annual field service, complete overhaul only every 20000 hours for ACP 15, Condensable vapor ability: with gas ballast ports and drainable silencer',
  category: {
    uid: '5888ff86-9a12-4a82-9fa7-9efbf858657b',
    name: 'Cryopumps - Vacuum Technology > Vacuum pumps'
  },
  manufacturer: {
    uid: '497af5c8-b5de-4e7f-ae53-9a17861c99ad',
    name: '100MEGA DISTRIBUTION s.r.o.'
  },
  manufacturerNumber: 'CKF00040',
  manufacturerUrl:
    'https://www.pfeiffer-vacuum.com/en/products/vacuum-generation/multi-stage-roots-pumps/light-duty-applications/air-cooled/low-noise-acp-kits/32098/low-noise-kit-acp-15',
  details: []
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(200).json(fakeItem)
}
