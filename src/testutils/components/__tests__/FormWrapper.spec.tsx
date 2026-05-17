import { renderHook } from '@testing-library/react'
import { useFormContext } from 'react-hook-form'

import { FormWrapper } from '../FormWrapper'

describe('FormWrapper', () => {
    it('provides a react-hook-form FormProvider context', () => {
        const { result } = renderHook(() => useFormContext(), {
            wrapper: ({ children }) => <FormWrapper>{children}</FormWrapper>,
        })
        // useFormContext returns the form methods object
        expect(result.current).toBeDefined()
        expect(typeof result.current.handleSubmit).toBe('function')
        expect(typeof result.current.control).toBe('object')
    })
})
