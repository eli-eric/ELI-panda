// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from '@faker-js/faker'
import type { NextApiRequest, NextApiResponse } from 'next'

const fakeData = [
  {
    uid: '9a7c0ec3-a310-434b-8ab6-2bc51094a800',
    name: 'Re-contextualized tangible architecture',
    path: [
      'd5d08ed3-23c7-442a-8fe6-ec3124522a94',
      'c236c8b6-4dcf-4e6b-a92e-0eafb1a5432f',
      'f7df7868-3f74-4fe6-a4fb-d076958d0126',
      'ba7baf57-0281-4705-b0ac-90ea0c6720eb',
      'ce5ff590-60f0-4cb5-b625-d21288af9ef8'
    ],
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016 Corrupti nostrum est atque esse vitae dolorem aliquam. Cum tempora ratione. Iusto provident aliquam dolorum magnam odio laudantium atque placeat impedit. Et sunt molestias similique est.\nError nobis quam sequi a omnis eaque voluptatem saepe perspiciatis. Quo sunt deleniti magnam rerum voluptas eaque magnam. Porro porro repellat est cumque inventore qui omnis amet. Amet quidem nobis maxime unde vitae officia aperiam quisquam fugit. Enim delectus quaerat provident dicta ea minima sint laudantium at. Quo molestiae quaerat nam eum atque aperiam eos ratione eum.',
    children: [
      '7e4fa611-071c-4259-8378-beb3656e119c',
      '32a057ca-5484-4254-acf4-9c572c0f81e8',
      'b7bb8313-181a-4157-bbe2-6b51fa8790e7',
      '793b083f-89ec-45fc-9814-556ae54336f5'
    ],
    importanceCode: '2dt27R{u<,',
    zoneCode: 'Hy,E*>9Y*j',
    subZoneCode: ',Y*>H-91<)',
    systemCode: 'Lpd^[4J|Pn',
    systemAlias: 'T?D@W(QN}:',
    locationCode: '6Mq]:(0ua"',
    ownerUID: 'BX*qJ+^ffw',
    catalogueUID: '5dff5c03-49a8-4401-aa17-926efa4f93d4'
  },
  {
    uid: '57392070-40c6-4be6-97e2-ee1e406dd6cf',
    name: 'Programmable content-based throughput',
    path: ['2a050219-c425-4b50-b15d-a2c85bbc5c08'],
    description:
      'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J Occaecati veniam at. Reiciendis totam dolores nostrum hic quae corrupti. Dolorem repudiandae ut facere iure adipisci possimus. Tempora a explicabo et ullam nam blanditiis rerum. Eum fugit ipsum quia necessitatibus similique corporis vitae occaecati soluta.\nQuos laboriosam sit vitae. Molestias dolores id maxime voluptatibus cupiditate optio. Laboriosam voluptate excepturi est minima fugit. Maxime praesentium ratione asperiores maxime.',
    children: ['ba8889d8-85c1-4814-86a9-e495b7269908'],
    importanceCode: '*Ss"w\'HO3\\',
    zoneCode: '`Z*O?,D/aA',
    subZoneCode: 'B3txsbN$T]',
    systemCode: '*;20^Kff6u',
    systemAlias: '?S_3LoIVsi',
    locationCode: 'RI((P.$wkk',
    ownerUID: 'v0-"(z#a(T',
    catalogueUID: '95d7759a-810d-4d2f-ab9d-7ac3fb92179a'
  },
  {
    uid: '25c26bc0-00d0-4b4a-885f-7d2d167a6075',
    name: 'Virtual client-server protocol',
    path: [
      '7a19ef7c-224f-4226-a2ea-51e7106d0633',
      '7e1842c0-e32c-4829-80fe-5b59be99edbd',
      '6c63c305-5317-4052-9cf0-e619fa239bf4',
      'ac61688c-d5c6-4d7c-b28e-3d2fa1090f22'
    ],
    description:
      'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals Sunt ipsam eligendi aspernatur eveniet. Corrupti reiciendis eius est officia tenetur velit rem id. Neque vitae tenetur consequatur atque. Voluptatem illo excepturi corrupti maxime et.\nVitae aperiam placeat corporis cupiditate cumque fuga voluptates. Laudantium consequuntur doloremque. Blanditiis ipsam aliquid hic autem. Veritatis minus culpa officiis commodi temporibus libero voluptas aspernatur omnis.',
    children: [
      '3ef0c8bf-5bbd-4e8c-b1e8-b857f6ab7d31',
      'e5dcb586-9dc5-43f3-8fa8-7f8baa099261',
      '03061532-0265-4263-9fa5-845f5fce4494',
      'f3fa0a5c-1093-472e-8662-be6c2fb80d26'
    ],
    importanceCode: 'n|g|Tl7HWg',
    zoneCode: '20AyC1%8w%',
    subZoneCode: 'A$)L-jVXg2',
    systemCode: '4/D)W"l:&C',
    systemAlias: '<n;C:Qrrgx',
    locationCode: 'lv?+14"}wP',
    ownerUID: '5alLB,GNU7',
    catalogueUID: '99eb88a8-794e-4af5-82f7-7c6b4e9e73a4'
  },
  {
    uid: '8d514edd-4dee-4011-8911-f8b43f0eff26',
    name: 'Grass-roots bi-directional collaboration',
    path: [
      'f2c439d3-3efa-4925-9d9f-94f7950ecb2e',
      '8fea7248-5243-427f-8a88-f899a0d7c138',
      '089695ec-b3dc-4e4f-8ace-a910a166159f',
      'cfd4412f-a35a-4fd7-aa27-3ca8b83ef9a2',
      'b5a7f41b-01d5-440e-9831-4f0c1aae4961',
      'c1daa8ff-1444-4c20-9877-b24c3495a78f',
      'de8b8b4b-45cb-4e6f-8e8e-4a26477bbf78'
    ],
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016 Fugiat sequi enim saepe porro accusamus optio et dolor quidem. Odio animi suscipit. Eum distinctio ratione.\nId ad unde a voluptates. Mollitia sequi veritatis reiciendis nesciunt sunt non. Porro cupiditate illum harum totam.',
    children: ['4bd3e69b-e2c8-462b-9311-25d778e7be89'],
    importanceCode: 'FN5Wkgm/a.',
    zoneCode: 'cDI?6EiQ8X',
    subZoneCode: 'F?B>ln<RLJ',
    systemCode: 'f.BFMdmPye',
    systemAlias: 'Xy=e%U"PC@',
    locationCode: 'zy?!W_nHXI',
    ownerUID: '5BFD!u@G57',
    catalogueUID: 'e28842c2-ebed-4c4c-8053-1dd1813d1fca'
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.headers.authorization) {
    if (req.method === 'GET') {
      const getFakeName = () => faker.company.catchPhrase()
      const getFakePath = (): string[] => {
        const length = faker.datatype.number({ min: 0, max: 10 })
        return [...Array(length)].map(() => faker.datatype.uuid())
      }
      const getFakeSystem = () => {
        const uid = faker.datatype.uuid()
        const name = getFakeName()
        return {
          uid,
          name,
          path: getFakePath(),
          description: `${faker.commerce.productDescription()} ${faker.lorem.paragraphs(2)}`,
          children: getFakePath(),
          importanceCode: faker.datatype.string(),
          zoneCode: faker.datatype.string(),
          subZoneCode: faker.datatype.string(),
          systemCode: faker.datatype.string(),
          systemAlias: faker.datatype.string(),
          locationCode: faker.datatype.string(),
          ownerUID: faker.datatype.string(),
          catalogueUID: faker.datatype.uuid()
        }
      }
      const fetchFakeSystems = () => {
        const res = [...Array(faker.datatype.number({ min: 1, max: 5 }))]
        return res.map(() => getFakeSystem())
      }
      res.status(200).json(fakeData)
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
