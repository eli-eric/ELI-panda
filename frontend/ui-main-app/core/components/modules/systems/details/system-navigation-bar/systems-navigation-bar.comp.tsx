import { SystemTreeItem } from 'core/types/responses'
import { Dispatch, Fragment, SetStateAction } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const menuItems = [
  {
    title: 'System',
    selected: true
  },
  {
    title: 'Item',
    selected: false
  },
  {
    title: 'Catalogue Item',
    selected: false
  }
]

interface Props {
  item: SystemTreeItem
  setSelectedMenuItem: Dispatch<
    SetStateAction<{
      system: {
        selected: boolean
      }
      item: {
        selected: boolean
      }
      catalogue: {
        selected: boolean
      }
    }>
  >
  selectedMenuItem: {
    system: {
      selected: boolean
    }
    item: {
      selected: boolean
    }
    catalogue: {
      selected: boolean
    }
  }
}

const SystemNavigationBarComponent = ({ item, setSelectedMenuItem, selectedMenuItem }: Props) => {
  return (
    <nav className="flex" aria-label="Global">
      <div
        onClick={() => {
          setSelectedMenuItem({ system: { selected: true }, item: { selected: false }, catalogue: { selected: false } })
        }}
        className={classNames(
          selectedMenuItem.system.selected
            ? 'bg-primary-100 text-gray-900 shadow-lg'
            : 'text-gray-900 hover:shadow-lg hover:bg-gray-100 hover:z-20 cursor-pointer',
          'rounded-md py-2 pl-3 flex-1 text-lg font-medium border text-center'
        )}
      >
        System
      </div>
      {!item.children && (
        <Fragment>
          <div
            onClick={() => {
              setSelectedMenuItem({
                system: { selected: false },
                item: { selected: true },
                catalogue: { selected: false }
              })
            }}
            className={classNames(
              selectedMenuItem.item.selected
                ? 'bg-primary-100 text-gray-900 shadow-lg'
                : 'text-gray-900 hover:shadow-lg hover:bg-gray-100 cursor-pointer',
              'rounded-md py-2 pl-3 flex-1 text-lg font-medium border text-center'
            )}
          >
            <p>Item</p>
          </div>
          <div
            onClick={() => {
              setSelectedMenuItem({
                system: { selected: false },
                item: { selected: false },
                catalogue: { selected: true }
              })
            }}
            className={classNames(
              selectedMenuItem.catalogue.selected
                ? 'bg-primary-100 text-gray-900 shadow-lg'
                : 'text-gray-900 hover:shadow-lg hover:bg-gray-100 hover:z-20 cursor-pointer',
              'rounded-md py-2 pl-3 flex-1 text-lg font-medium border text-center'
            )}
          >
            <p>Catalogue Item</p>
          </div>
        </Fragment>
      )}
    </nav>
  )
}

export default SystemNavigationBarComponent
