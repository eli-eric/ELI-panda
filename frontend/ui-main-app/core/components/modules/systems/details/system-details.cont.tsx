import { SystemDetailInfo, SystemTreeItem } from 'core/types/responses'
import { useEffect, useState } from 'react'

import ItemDetailComponent from '../../catalogue/item-detail/item-detail.comp'
import { useCatalogueItemDetailPath } from '../../catalogue/shared/hooks/usePath'
import ItemInfoComponent from './item-info/item-info.comp'
import SystemInfoComponent from './system-info/system-info.comp'
import SystemNavigationBarComponent from './system-navigation-bar/systems-navigation-bar.comp'

const images = [
  {
    id: 1,
    src: 'http://localhost:5001/api/mock-server/catalogue/item/0056ed5a-e20b-4c15-b8c6-2312c23b1f4a/image',
    alt: '',
    name: ''
  },
  {
    id: 2,
    src: 'http://localhost:5001/api/mock-server/catalogue/item/1865aed8-f94d-49eb-8389-3b4fc5d983ab/image',
    alt: '',
    name: ''
  },
  {
    id: 3,
    src: 'http://localhost:5001/api/mock-server/catalogue/item/c664c559-650d-4733-90fe-74cef6c04186/image',
    alt: '',
    name: ''
  }
]

interface Props {
  selectedSystem: SystemTreeItem
  systemDetail: SystemDetailInfo
}

const SystemDetailsContainer = ({ selectedSystem, systemDetail }: Props) => {
  const catalogueItemPath = useCatalogueItemDetailPath(selectedSystem.uid)

  const [selectedMenuItem, setSelectedMenuItem] = useState({
    system: { selected: true },
    item: { selected: false },
    catalogue: { selected: false }
  })

  useEffect(() => {
    if (selectedSystem.children) {
      setSelectedMenuItem({
        system: { selected: true },
        item: { selected: false },
        catalogue: { selected: false }
      })
    }
  }, [selectedSystem])

  return (
    <div className="flex-1 flex-col">
      {selectedSystem && (
        <SystemNavigationBarComponent
          item={selectedSystem}
          setSelectedMenuItem={setSelectedMenuItem}
          selectedMenuItem={selectedMenuItem}
        />
      )}
      {selectedMenuItem.catalogue.selected && <ItemDetailComponent item={systemDetail.catalogueInfo} images={images} />}
      {selectedMenuItem.system.selected && <SystemInfoComponent systemInfo={systemDetail.systemInfo} />}
      {selectedMenuItem.item.selected && <ItemInfoComponent itemInfo={systemDetail.itemInfo} />}
    </div>
  )
}

export default SystemDetailsContainer
