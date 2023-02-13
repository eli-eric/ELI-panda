import Image from 'next/image'
import eliLogo from 'public/eli-logo-small.png'

interface Props {
  customClass: string
}

const EliLogoComponent = ({ customClass }: Props) => {
  return <Image className={customClass} src={eliLogo} alt="Eli Logo" width={200} height={200} priority={true} />
}

export default EliLogoComponent
