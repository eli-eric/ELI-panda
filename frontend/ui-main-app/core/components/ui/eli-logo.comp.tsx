import Image from 'next/image'

interface Props {
  customClass: string
}

const EliLogoComponent = ({ customClass }: Props) => {
  return (
    <Image
      className={customClass}
      src="/../public/eli-logo-svg.svg"
      alt="Eli"
      width={200}
      height={200}
      priority={true}
    />
  )
}

export default EliLogoComponent
