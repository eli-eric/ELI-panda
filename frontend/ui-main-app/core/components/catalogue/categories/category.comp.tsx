import { useFetchImage } from 'core/helpers/hooks/useFetch'
import CataloguePathContext from 'core/store/catalogue-path.context'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Category } from 'types/responses'

interface Props {
  category: Category
}

const CategoryComponent = ({ category }: Props) => {
  //const objectURL = useFetchImage(`/catalogue/category/${category.uid}/image`)
  const router = useRouter()
  const { setCataloguePath } = useContext(CataloguePathContext)

  // const customImgLoader = ({ src }) => {
  //   return `${src}`
  // }

  const catalogSelectHandler = () => {
    const path = (!category.parentPath ? '/' : '/' + category.parentPath + '/') + category.code
    setCataloguePath(path)
    router.push('/catalogue' + path)
  }

  return (
    <button
      key={category.code}
      onClick={catalogSelectHandler}
      className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div className="flex-shrink-0">
        {/* {objectURL && (
          <Image
            loader={customImgLoader}
            className="h-10 w-10 rounded-full"
            src={objectURL}
            alt=""
            width={200}
            height={200}
          />
        )} */}
        <Image
          className="h-10 w-10 rounded-full"
          width={200}
          height={200}
          alt={category.code}
          src={
            'http://localhost:5001/api/mock-server/catalogue/category/' + category.uid + '/image'
          }
        />
      </div>
      <div className="min-w-0 flex-1">
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{category.name}</p>
        </a>
      </div>
    </button>
  )
}

export default CategoryComponent
