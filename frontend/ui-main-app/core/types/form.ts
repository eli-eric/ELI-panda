export type ModalButtons = {
  goBack: Button
  goNext: Button
}

export type Button = { text: string; onClick: (data: unknown | undefined) => void }
