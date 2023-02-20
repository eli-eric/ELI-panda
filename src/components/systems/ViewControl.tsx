import { Dispatch, SetStateAction } from 'react'

export default function ViewControl({
  viewControl,
  setViewControl,
}: {
  viewControl: {
    system: boolean
    relations: boolean
    catalogueItem: boolean | undefined
  }
  setViewControl: Dispatch<
    SetStateAction<{
      system: boolean
      relations: boolean
      catalogueItem: boolean | undefined
    }>
  >
}) {
  return (
    <div className="flex justify-end py-3 px-3">
      Display options:
      <fieldset className="space-x-5 flex flex-row">
        <legend className="sr-only">View</legend>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="system"
              aria-describedby="comments-description"
              name="system"
              type="checkbox"
              defaultChecked={viewControl.system}
              onClick={() =>
                setViewControl(viewControl => ({
                  ...viewControl,
                  system: !viewControl.system,
                }))
              }
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-medium text-gray-700">System Detail</label>
            <span id="comments-description" className="text-gray-500">
              <span className="sr-only">System Detail </span>
            </span>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="relations"
              aria-describedby="candidates-description"
              name="relations"
              type="checkbox"
              defaultChecked={viewControl.relations}
              onClick={() =>
                setViewControl(viewControl => ({
                  ...viewControl,
                  relations: !viewControl.relations,
                }))
              }
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-medium text-gray-700">Relations</label>
            <span id="candidates-description" className="text-gray-500">
              <span className="sr-only">Relations </span>
            </span>
          </div>
        </div>
        {viewControl.catalogueItem !== undefined && (
          <div className="relative flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="catalogueItem"
                aria-describedby="candidates-description"
                name="catalogueItem"
                type="checkbox"
                defaultChecked={viewControl.catalogueItem}
                onClick={() =>
                  setViewControl(viewControl => ({
                    ...viewControl,
                    catalogueItem: !viewControl.catalogueItem,
                  }))
                }
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">
                Catalogue Item
              </label>
              <span id="candidates-description" className="text-gray-500">
                <span className="sr-only">Catalogue Item</span>
              </span>
            </div>
          </div>
        )}
      </fieldset>
    </div>
  )
}
