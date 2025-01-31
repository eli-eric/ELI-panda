import type { FC } from 'react'

export const ServiceTypeItem: FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-200 via-gray-100 to-white shadow-lg rounded-lg border border-gray-300 p-4 transform transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2">
      <h3 className="text-gray-700 font-semibold">3D Tile</h3>
      <p className="text-gray-500">Hover to see the effect</p>
    </div>
  )
}
