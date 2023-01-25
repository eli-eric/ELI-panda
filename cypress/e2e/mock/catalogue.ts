import { CatalogueItem } from 'core/types/responses'

const itemsData: CatalogueItem[] = [
  {
    uid: '0b2cde5f-77c8-47f0-8b68-1c4beca1b2fb',
    name: 'ATH 1603 M, DN 200 CF-F',
    details: [
      {
        value: '1360',
        propertyName: 'Pumping speed for N2',
        propertyUnit: 'L/sec',
        propertyGroup: 'TMP parameters'
      },
      { value: 'Magnet', propertyName: 'Bearing', propertyUnit: null, propertyGroup: 'TMP parameters' }
    ],
    description:
      '5-axis magnetically levitated turbopump with drag stage for a pump speed of up to 1360 l/s for N2\n    DN 200 CF-F flange for demanding UHV applications\n    Operation with OBC V4 integrated drive electronics\n    Installation in any orientation\n    Remote, Water cooled, Non-heated\n    CE marked and ROHS compliant',
    categoryName: 'Turbomolecular pumps',
    categoryPath: 'vacuum-technology/vacuum-pumps/turbomolecular-pumps',
    manufacturer: 'PFEIFFER VACUUM AUSTRIA GmbH',
    manufacturerUrl: 'https://webportal.pfeiffer-vacuum.com/en/shop/search?text=YC52215A',
    manufacturerNumber: 'YC52215A'
  },
  {
    uid: 'a56014ab-f3e2-4884-a600-38be506bdf5b',
    name: 'ATH 1603 M, DN 250 ISO-F',
    details: [
      {
        value: '1400',
        propertyName: 'Pumping speed for N2',
        propertyUnit: 'L/sec',
        propertyGroup: 'TMP parameters'
      },
      { value: 'Magnet', propertyName: 'Bearing', propertyUnit: null, propertyGroup: 'TMP parameters' }
    ],
    description:
      'ATH 1603 M, DN 250 ISO-F, with integrated drive electronics OBC V4, DeviceNet, water-cooled, non-heated\n5-axis magnetically levitated turbopump with drag stage for a pump speed of up to 1400 l/s for N2\nDN 250 ISO-F inlet flange\nOperation with OBC V4 integrated drive electronics\nInstallation in any orientation\nDeviceNet, Water cooled, Non-heated\nCE marked and ROHS compliant',
    categoryName: 'Turbomolecular pumps',
    categoryPath: 'vacuum-technology/vacuum-pumps/turbomolecular-pumps',
    manufacturer: 'PFEIFFER VACUUM AUSTRIA GmbH',
    manufacturerUrl: 'https://webportal.pfeiffer-vacuum.com/en/shop/product/YE66215A',
    manufacturerNumber: 'YE66215A'
  },
  {
    uid: 'a6ad8401-a29f-41eb-b4f6-824bfd74aa5c',
    name: 'ATH 2303 M, DN 250 ISO-F',
    details: [
      {
        value: '2150',
        propertyName: 'Pumping speed for N2',
        propertyUnit: 'L/sec',
        propertyGroup: 'TMP parameters'
      },
      { value: 'Magnet', propertyName: 'Bearing', propertyUnit: null, propertyGroup: 'TMP parameters' }
    ],
    description:
      '5-axis magnetically levitated turbopump with drag stage for a pump speed of up to 2150 l/s for N2\nDN 250 ISO-F inlet flange\nOperation with OBC V4 integrated drive electronics\nInstallation in any orientation\nRemote, Water cooled, Non-heated\nCE marked and ROHS compliant',
    categoryName: 'Turbomolecular pumps',
    categoryPath: 'vacuum-technology/vacuum-pumps/turbomolecular-pumps',
    manufacturer: 'PFEIFFER VACUUM AUSTRIA GmbH',
    manufacturerUrl:
      'http://www.pfeiffer-vacuum.com/products/turbopumps/magnetically-levitated/ath-2300-m/onlinecatalog.action?detailPdoId=12686',
    manufacturerNumber: 'TMBBA662405A'
  },
  {
    uid: '4137b0f1-c8f8-4771-8487-7ce9428b22f8',
    name: 'AXIS M1014',
    details: [
      { value: 'http', propertyName: 'Interface', propertyUnit: null, propertyGroup: 'Camera data' },
      { value: null, propertyName: 'Triggerable', propertyUnit: null, propertyGroup: 'Camera data' },
      { value: '12-24VDC', propertyName: 'Power supply', propertyUnit: null, propertyGroup: 'Camera data' },
      { value: null, propertyName: 'Lens mount', propertyUnit: null, propertyGroup: 'Housing' },
      { value: null, propertyName: 'Pixel bit depth', propertyUnit: 'bit', propertyGroup: 'Sensor' },
      { value: 'CMOS', propertyName: 'Sensor Type', propertyUnit: null, propertyGroup: 'Sensor' },
      { value: null, propertyName: 'Quantum efficiency', propertyUnit: null, propertyGroup: 'Sensor' },
      { value: '1', propertyName: 'Resolution', propertyUnit: 'MP', propertyGroup: 'Sensor' },
      { value: '30', propertyName: 'Frame Rate at full resolution', propertyUnit: 'fps', propertyGroup: 'Sensor' },
      { value: 'Color', propertyName: 'Chroma', propertyUnit: null, propertyGroup: 'Sensor' }
    ],
    description: '',
    categoryName: 'Cameras',
    categoryPath: 'beam-characterization/cameras',
    manufacturer: 'AXIS',
    manufacturerUrl: 'https://www.axis.com/products/axis-m1014/support',
    manufacturerNumber: 'AXIS M1014'
  },
  {
    uid: '0b3c8477-57c7-4237-8961-88f5a833ca71',
    name: 'AXIS M1045-LW',
    details: [
      { value: 'http', propertyName: 'Interface', propertyUnit: null, propertyGroup: 'Camera data' },
      { value: null, propertyName: 'Triggerable', propertyUnit: null, propertyGroup: 'Camera data' },
      { value: null, propertyName: 'Power supply', propertyUnit: null, propertyGroup: 'Camera data' },
      { value: null, propertyName: 'Lens mount', propertyUnit: null, propertyGroup: 'Housing' },
      { value: null, propertyName: 'Pixel bit depth', propertyUnit: 'bit', propertyGroup: 'Sensor' },
      { value: 'CMOS', propertyName: 'Sensor Type', propertyUnit: null, propertyGroup: 'Sensor' },
      { value: null, propertyName: 'Quantum efficiency', propertyUnit: null, propertyGroup: 'Sensor' },
      { value: '2', propertyName: 'Resolution', propertyUnit: 'MP', propertyGroup: 'Sensor' },
      { value: '30', propertyName: 'Frame Rate at full resolution', propertyUnit: 'fps', propertyGroup: 'Sensor' },
      { value: 'Color', propertyName: 'Chroma', propertyUnit: null, propertyGroup: 'Sensor' }
    ],
    description: '',
    categoryName: 'Cameras',
    categoryPath: 'beam-characterization/cameras',
    manufacturer: 'AXIS',
    manufacturerUrl: 'https://www.axis.com/products/axis-m1045-lw',
    manufacturerNumber: 'AXIS M1045-LW'
  },
  {
    uid: '3dce9967-4850-4eab-9d8a-469273e3f516',
    name: 'AXIS-PX',
    details: [
      { value: '', propertyName: 'Interface', propertyUnit: null, propertyGroup: 'Camera data' },
      { value: '', propertyName: 'Triggerable', propertyUnit: null, propertyGroup: 'Camera data' },
      { value: '23-28VDC', propertyName: 'Power supply', propertyUnit: null, propertyGroup: 'Camera data' },
      { value: '', propertyName: 'Lens mount', propertyUnit: null, propertyGroup: 'Housing' },
      { value: '', propertyName: 'Pixel bit depth', propertyUnit: 'bit', propertyGroup: 'Sensor' },
      { value: '', propertyName: 'Sensor Type', propertyUnit: null, propertyGroup: 'Sensor' },
      { value: '', propertyName: 'Quantum efficiency', propertyUnit: null, propertyGroup: 'Sensor' },
      { value: '', propertyName: 'Resolution', propertyUnit: 'MP', propertyGroup: 'Sensor' },
      { value: '', propertyName: 'Frame Rate at full resolution', propertyUnit: 'fps', propertyGroup: 'Sensor' },
      { value: '', propertyName: 'Chroma', propertyUnit: null, propertyGroup: 'Sensor' }
    ],
    description:
      'AXIS-PX is the only commercial x-ray streak camera that can streak 450 spatial resolution points (18 mm slit) with a time resolution of 700 fs (measured at FWHM).',
    categoryName: 'Cameras',
    categoryPath: 'beam-characterization/cameras',
    manufacturer: 'AXIS',
    manufacturerUrl: 'https://www.axis-photon.com/streak-camera/axis-px-subpicosecond-x-ray-streak-camera/',
    manufacturerNumber: 'AXIS-PX'
  },
  {
    uid: '10755657-2050-4125-95c1-a4ec5e772fb3',
    name: 'HiPace 300 M, DN 100, CF-F',
    details: [
      {
        value: '255',
        propertyName: 'Pumping speed for N2',
        propertyUnit: 'L/sec',
        propertyGroup: 'TMP parameters'
      },
      { value: 'Magnet', propertyName: 'Bearing', propertyUnit: null, propertyGroup: 'TMP parameters' }
    ],
    description:
      '5-axis magnetically levitated turbopump with a pumping speed of 255 l/s for N2\nIntegrated digital magnetic bearing controller TM 700\nInstallation in any orientation; flexible through connectivity of up to 4 accessory parts\nWith integrated water cooling for maximum gas throughput\nInterfaces: RS-485, Remote (Profibus/DeviceNet on request)\nThe turbopump features extremely low vibration and is oil-free\nWith In-field sensor calibration\nIncluding venting valve for pulsed venting\nProtection Class: IP 54\nExtensive accessories expand the range of applications',
    categoryName: 'Turbomolecular pumps',
    categoryPath: 'vacuum-technology/vacuum-pumps/turbomolecular-pumps',
    manufacturer: 'PFEIFFER VACUUM AUSTRIA GmbH',
    manufacturerUrl:
      'http://www.pfeiffer-vacuum.com/products/turbopumps/magnetically-levitated/hipace-300-m/onlinecatalog.action?detailPdoId=12158#product-downloads',
    manufacturerNumber: 'PM P03 952'
  }
]

export const catalogueCategories = [
  {
    uid: 'd929ea89-f2f7-4b27-9dbd-1ba552f11a06',
    code: 'beam-characterization',
    name: 'Beam characterization',
    parentPath: ''
  },
  { uid: 'c584bf8b-07e3-4758-8b62-4e05e2307d09', code: 'motion', name: 'Motion', parentPath: '' },
  { uid: '62df85f8-83fb-4be6-9b8b-45a3d5fcd917', code: 'vacuum-technology', name: 'Vacuum Technology', parentPath: '' }
]

export const catalogueItems = (numberOfResults: number) => {
  const responseData: CatalogueItem[] = []

  for (let i = 0; i < numberOfResults; i++) {
    responseData.push(itemsData[i])
  }

  return {
    catalogueItems: { totalCount: responseData.length, data: responseData }
  }
}

export const catalogueItem = () => {
  return itemsData[0]
}
