export type ModalButtons = {
  noButtons?: boolean
  goBack?: Button
  goNext?: Button
}

export type Button = {
  text: string
  loading?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: (data: unknown | undefined) => void
}
