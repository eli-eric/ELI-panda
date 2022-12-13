import { CatalogueItem } from 'core/types/responses'
import useSWR from 'swr'

import { useCatalogueItemDetailPath } from '../shared/hooks/usePath'
import ItemDetailHeaderComponent from './header/item-detail-header.comp'
import ItemDetailComponent from './item-detail.comp'

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

const ItemDetailContainer = () => {
  const catalogueItemPath = useCatalogueItemDetailPath()
  const { data: item } = useSWR<CatalogueItem>(catalogueItemPath)

  return (
    <div>
      <ItemDetailHeaderComponent />
      <ItemDetailComponent item={item} images={images} />
    </div>
  )
}
export default ItemDetailContainer
