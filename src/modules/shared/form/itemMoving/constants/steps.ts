export enum STEPS {
  DESTINATION_SYSTEM = 1,
  EDIT_SYSTEM = 2,
  OVERVIEW = 3
}

export const STEPS_FLOW = [
  STEPS.DESTINATION_SYSTEM,
  STEPS.EDIT_SYSTEM,
  STEPS.OVERVIEW
]

export type Step = {
  id: number
  name: string
}
