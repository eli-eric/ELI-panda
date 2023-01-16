import useAxios from 'core/helpers/use-axios'
import { BASE_URL } from 'core/types/constants/common'
import { ENDPOINTS } from 'core/types/constants/endpoints'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function SystemEditContainer() {
  const router = useRouter()
  const [formData, setFormData] = useState({}) // state to store form data
  const [axiosUrl, setAxiosUrl] = useState<string>()

  const url = BASE_URL + ENDPOINTS.systemDetail + '/' + router.query.uid
  const { loading } = useAxios({ url: axiosUrl ? axiosUrl : null, method: 'put', body: formData })

  const handleSubmit = e => {
    e.preventDefault()
    setAxiosUrl(url)
    router.reload()
  }
  return (
    <form className="space-y-6 w-full" action="#" method="PUT" onSubmit={handleSubmit}>
      <div className=" mt-2 ml-2 flex justify-start">
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-1 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-12 ">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  System Name
                </label>
                <input
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  type="text"
                  name="system-name"
                  id="system-name"
                  defaultValue="lkjllk"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-12">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    id="description"
                    name="description"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={''}
                  />
                </div>
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">System Type UID</label>
                <input
                  onChange={e => setFormData({ ...formData, systemTypeUid: e.target.value })}
                  type="text"
                  name="systemTypeUid"
                  id="text"
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Importance Code</label>
                <select
                  onChange={e => setFormData({ ...formData, importanceCode: e.target.value })}
                  id="importanceCode"
                  name="importanceCode"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option>(0)Low</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>

              <div className="col-span-3">
                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                  systemCode
                </label>
                <input
                  onChange={e => setFormData({ ...formData, systemCode: e.target.value })}
                  type="text"
                  name="systemCode"
                  id="systemCode"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-3 ">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  systemAlias
                </label>
                <input
                  onChange={e => setFormData({ ...formData, systemAlias: e.target.value })}
                  type="text"
                  name="systemAlias"
                  id="systemAlias"
                  autoComplete="address-level2"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-3 ">
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                  locationCode
                </label>
                <input
                  onChange={e => setFormData({ ...formData, locationCode: e.target.value })}
                  type="text"
                  name="locationCode"
                  id="locationCode"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-3 ">
                <label className="block text-sm font-medium text-gray-700">eun</label>
                <input
                  onChange={e => setFormData({ ...formData, eun: e.target.value })}
                  type="text"
                  name="eun"
                  id="eun"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-3 ">
                <label className="block text-sm font-medium text-gray-700">serialNumber</label>
                <input
                  onChange={e => setFormData({ ...formData, serialNumber: e.target.value })}
                  type="text"
                  name="serialNumber"
                  id="serialNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-3 ">
                <label className="block text-sm font-medium text-gray-700">batchNumber</label>
                <input
                  onChange={e => setFormData({ ...formData, batchNumber: e.target.value })}
                  type="text"
                  name="batchNumber"
                  id="batchNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-3 ">
                <label className="block text-sm font-medium text-gray-700">itemUsageCategoryCode</label>
                <input
                  onChange={e => setFormData({ ...formData, itemUsageCategoryCode: e.target.value })}
                  type="text"
                  name="itemUsageCategoryCode"
                  id="itemUsageCategoryCode"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-3 ">
                <label className="block text-sm font-medium text-gray-700">estimatedLifeTime</label>
                <input
                  onChange={e => setFormData({ ...formData, estimatedLifeTime: e.target.value })}
                  type="number"
                  name="estimatedLifeTime"
                  id="estimatedLifeTime"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
