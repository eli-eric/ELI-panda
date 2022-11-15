import { signOut } from 'next-auth/react'

const LogoutButton = () => {
  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    signOut()
  }
  return (
    <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
      <a href="#" className="group block w-full flex-shrink-0">
        <div className="flex items-center">
          <button
            onClick={logoutHandler}
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Out
          </button>
        </div>
      </a>
    </div>
  )
}

export default LogoutButton
