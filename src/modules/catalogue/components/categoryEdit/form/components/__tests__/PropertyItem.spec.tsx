import { fireEvent, render, screen } from '@testing-library/react'
import type { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { IntlProvider } from 'react-intl'

import { messages } from '@/i18n/src/messages'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'

import PropertyItem from '../PropertyItem'

jest.mock('@/components/form/Listbox', () => ({
    __esModule: true,
    default: ({ name }: { name: string }) => <div data-testid={`listbox-${name}`} />,
}))
jest.mock('@/components/form/inputs', () => ({
    Input: ({ name }: { name: string }) => <input data-testid={`input-${name}`} />,
}))

const Wrapper: FC<
    PropsWithChildren<{ defaultValues?: Record<string, unknown> }>
> = ({ children, defaultValues }) => {
    const methods = useForm({ defaultValues })
    return (
        <IntlProvider locale="en" messages={messages.en}>
            <FormProvider {...methods}>
                <form>{children}</form>
            </FormProvider>
        </IntlProvider>
    )
}

describe('PropertyItem', () => {
    const renderWithType = (typeUid: string, extraProps: Record<string, unknown> = {}) =>
        render(
            <Wrapper
                defaultValues={{
                    groups: [
                        {
                            name: 'G',
                            properties: [
                                {
                                    name: 'Prop',
                                    type: { uid: typeUid, name: 'type' },
                                    ...extraProps,
                                },
                            ],
                        },
                    ],
                }}
            >
                <PropertyItem
                    name="groups.0.properties.0"
                    removeProp={jest.fn()}
                    index={0}
                    length={1}
                    moveUp={jest.fn()}
                    moveDown={jest.fn()}
                />
            </Wrapper>,
        )

    it('renders TEXT default input for TEXT property type', () => {
        renderWithType(PROPERTY_TYPE.TEXT)
        expect(
            screen.getByTestId('input-groups.0.properties.0.defaultValue'),
        ).toBeInTheDocument()
    })

    it('renders list of values UI only for LIST property type', () => {
        renderWithType(PROPERTY_TYPE.LIST, { listOfValues: ['a', 'b'] })
        // Listbox for defaultValue selected from listOfValues
        expect(
            screen.getByTestId('listbox-groups.0.properties.0.defaultValue'),
        ).toBeInTheDocument()
    })

    it('does NOT render list of values section for non-LIST types', () => {
        const { container } = renderWithType(PROPERTY_TYPE.TEXT)
        expect(container.textContent ?? '').not.toMatch(/propertyListOfValues/i)
    })

    it('calls removeProp with index when Remove button clicked', () => {
        const removeProp = jest.fn()
        render(
            <Wrapper
                defaultValues={{
                    groups: [
                        {
                            name: 'G',
                            properties: [
                                { name: 'Prop', type: { uid: PROPERTY_TYPE.TEXT } },
                            ],
                        },
                    ],
                }}
            >
                <PropertyItem
                    name="groups.0.properties.0"
                    removeProp={removeProp}
                    index={2}
                    length={3}
                    moveUp={jest.fn()}
                    moveDown={jest.fn()}
                />
            </Wrapper>,
        )
        const removeBtn = screen
            .getAllByRole('button')
            .find(b => /remove/i.test(b.textContent ?? ''))
        if (!removeBtn) throw new Error('remove button not found')
        fireEvent.click(removeBtn)
        expect(removeProp).toHaveBeenCalledWith(2)
    })

    it('renders unit and name inputs regardless of type', () => {
        renderWithType(PROPERTY_TYPE.BOOLEAN)
        expect(screen.getByTestId('input-groups.0.properties.0.name')).toBeInTheDocument()
        expect(
            screen.getByTestId('listbox-groups.0.properties.0.type'),
        ).toBeInTheDocument()
        expect(
            screen.getByTestId('listbox-groups.0.properties.0.unit'),
        ).toBeInTheDocument()
    })
})
