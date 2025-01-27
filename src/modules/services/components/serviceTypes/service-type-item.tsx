import type { FC } from 'react'

export const ServiceTypeItem: FC = () => {
  return (
    <button
      className="
          relative inline-flex items-center 
              px-6 py-3 
                  rounded-lg 
                      font-semibold 
                          transition-transform duration-300
                                    bg-white/50 
                                  backdrop-blur-lg
                                          shadow-gray-200 
                                              shadow-[inset_2px_2px_4px_rgba(255,255,255,0.6),inset_-2px_-2px_4px_rgba(0,0,0,0.04)]
                                                        text-gray-700 
                                                      border border-white/40
                                                                hover:-translate-y-1 
                                                              hover:shadow-xl 
                                                                  hover:shadow-gray-300 
                                                                      active:translate-y-0 
                                                                          active:shadow-lg

                                                                                    dark:bg-gray-800/40 
                                                                                  dark:backdrop-blur-md
                                                                                      dark:text-gray-200
                                                                                          dark:shadow-black/60
                                                                                              dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),inset_-2px_-2px_4px_rgba(0,0,0,0.6)]
                                                                                                  dark:border-gray-600/50
                                                                                                      dark:hover:shadow-lg
                                                                                                          dark:hover:shadow-black
                                                                                                            "
    >
      Glassy Clay Button
    </button>
  )

  return (
    <div className=" bg-gradient-to-br from-gray-200 via-gray-100 to-white shadow-lg rounded-lg border border-gray-300 p-4 transform transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2">
      <h3 className="text-gray-700 font-semibold">3D Tile</h3>
      <p className="text-gray-500">Hover to see the effect</p>
    </div>
  )
  return (
    <button className="border-gray-300 whitespace-nowrap overflow-auto border px-4 py-2 cursor-pointer rounded-md hover:shadow-lg hover:bg-gray-100">
      <span className="text-gray-600 text-sm">Service Type Item</span>
    </button>
  )
}
