import { createContext, useState } from 'react'
interface FormContext {
  isEdit: boolean
  uid: string | undefined
  setUid: (_uid: string | undefined) => void

  setEdit: (_edit: boolean) => void
}

const FormContext = createContext({
  isEdit: false,
  uid: undefined,
  setEdit: _isEdit => {},
  setUid: _uid => {}
} as FormContext)

interface Props {
  children: React.ReactNode
}

export const FormContextProvider = ({ children }: Props) => {
  const [isEdit, setEdit] = useState<boolean>(false)
  const [uid, setUid] = useState<string | undefined>(undefined)

  return (
    <FormContext.Provider
      value={{
        uid,
        setUid,
        isEdit,
        setEdit
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
export default FormContext
