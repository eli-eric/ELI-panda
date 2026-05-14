import { fireEvent, render, screen } from '@testing-library/react'

import { CategoryListContainer } from '../CategoryList.cont'

let lastDisclosureProps: any = null

jest.mock('@/components/ui', () => ({
    Disclosure: (props: any) => {
        lastDisclosureProps = props
        return (
            <div data-testid="disclosure">
                <button
                    data-testid="toggle"
                    onClick={() => props.onChange?.(true)}
                >
                    toggle
                </button>
                {props.children}
            </div>
        )
    },
}))

let lastCategoryListProps: any = null
jest.mock('../CategoryList.comp', () => ({
    CategoryList: (props: any) => {
        lastCategoryListProps = props
        return <div data-testid="category-list" />
    },
}))

beforeEach(() => {
    lastDisclosureProps = null
    lastCategoryListProps = null
})

describe('CategoryListContainer', () => {
    it('renders Disclosure with "Categories" title + nested CategoryList', () => {
        render(
            <CategoryListContainer onChange={jest.fn()} setCategoryFilter={jest.fn()} />,
        )
        expect(screen.getByTestId('disclosure')).toBeInTheDocument()
        expect(screen.getByTestId('category-list')).toBeInTheDocument()
        expect(lastDisclosureProps.title).toBe('Categories')
    })

    it('forwards onChange to Disclosure', () => {
        const onChange = jest.fn()
        render(
            <CategoryListContainer onChange={onChange} setCategoryFilter={jest.fn()} />,
        )
        fireEvent.click(screen.getByTestId('toggle'))
        expect(onChange).toHaveBeenCalledWith(true)
    })

    it('forwards setCategoryFilter to CategoryList', () => {
        const setCategoryFilter = jest.fn()
        render(
            <CategoryListContainer
                onChange={jest.fn()}
                setCategoryFilter={setCategoryFilter}
            />,
        )
        expect(lastCategoryListProps.setCategoryFilter).toBe(setCategoryFilter)
    })
})
