import { SystemDetailInfo } from 'types/responses'
import { Fragment, useContext } from 'react'

import FormContext from 'store/form.context'
import ItemDetailComponent from '../../catalogue/item-detail/item-detail.comp'
import DisclosureComponent from './disclosure/disclosure.comp'
import ItemInfoComponent from './item-info/item-info.comp'
import SystemDetailContainer from './system-detail/system-detail.cont'
import SystemFormContainer from './system-detail/system-edit-form/system-form.cont'

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
  systemDetail: SystemDetailInfo
}

const SystemDetailsContainer = ({ systemDetail }: Props) => {
  const { isEdit, uid } = useContext(FormContext)
  return (
    <div className="flex-1 flex-col">
      {isEdit ? (
        <SystemFormContainer systemInfo={uid ? systemDetail.systemInfo : undefined} />
      ) : (
        <Fragment>
          {systemDetail.systemInfo && (
            <DisclosureComponent title="System" open={true}>
              <SystemDetailContainer systemInfo={systemDetail.systemInfo} />
            </DisclosureComponent>
          )}
          {systemDetail.itemInfo && (
            <DisclosureComponent title="Item">
              <ItemInfoComponent itemInfo={systemDetail.itemInfo} />
            </DisclosureComponent>
          )}
          {systemDetail.catalogueInfo && (
            <DisclosureComponent title="System">
              <ItemDetailComponent item={systemDetail.catalogueInfo} images={images} />
            </DisclosureComponent>
          )}
        </Fragment>
      )}
    </div>
  )
}

export default SystemDetailsContainer
