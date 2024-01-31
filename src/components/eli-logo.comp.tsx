import Image from 'next/image'
import eliLogoLight from 'public/eli-logo-small.png'
import eliLogoDark from 'public/eli-logo-small-dark.png'

import { useDarkModeStore } from '@/store/useDarkModeStore'

interface Props {
  customClass: string
}

const EliLogoComponent = ({ customClass }: Props) => {
  const dms = useDarkModeStore()

  return (
    <Image
      className={customClass}
      src={dms.isDark ? eliLogoDark : eliLogoLight}
      alt="Eli Logo"
      width={200}
      height={200}
      priority={true}
    />
  )
}

export default EliLogoComponent
