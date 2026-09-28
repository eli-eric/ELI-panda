import { act, fireEvent, screen, waitFor, within } from '@testing-library/react'

import useQueryManager from '@/hooks/useQueryManager'
import useTableStateStore from '@/store/useTableStateStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'
import { CODEBOOK } from '@/types/constants/codebook'

import { PublicationsFilterSheet } from '../PublicationsFilterSheet.cont'
import type { PublicationsFilterOptionsResponse } from '../types/filter'

// The full sheet renders ~60 fields; debounced inputs need real timers.
jest.setTimeout(20000)

const TABLE_ID = 'publications'

const FILTER_OPTIONS: PublicationsFilterOptionsResponse = {
    years: ['2025', '2024'],
    quartils: ['Q1', 'Q2', 'Q3', 'Q4'],
    quartilBases: ['JIF'],
    languages: ['English'],
    eliPublications: ['YES', 'NO'],
    ranges: { impactFactor: { min: 0.2, max: 41.5 } },
    dateBounds: { dateOfPublication: { min: '2012-01-01', max: '2026-06-30' } },
}

const CODEBOOK_DATA: Partial<Record<CODEBOOK, { uid: string; name: string }[]>> = {
    [CODEBOOK.MEDIA_TYPE]: [
        { uid: 'mt-article', name: 'Journal article' },
        { uid: 'mt-book', name: 'Book' },
    ],
    [CODEBOOK.DEPARTMENT]: [{ uid: 'dep-physics', name: 'Physics' }],
}

jest.mock('next-usequerystate', () => ({
    useQueryState: () => [null, jest.fn()],
}))

jest.mock('next-auth/react', () => ({
    useSession: () => ({ data: null }),
}))

jest.mock('@/hooks/fetch/useCodebook', () => ({
    useCodebook: (codebook?: CODEBOOK) => ({
        data: { data: (codebook && CODEBOOK_DATA[codebook]) || [], metadata: undefined },
    }),
}))

jest.mock('@/modules/publications/hooks/usePublicationsFilterOptions', () => ({
    usePublicationsFilterOptions: () => ({ filterOptions: FILTER_OPTIONS }),
}))

jest.mock('../hooks/usePublicationsFilterSources', () => ({
    useGrantFilterOptions: () => ({ grantOptions: [] }),
    useResearcherFilterOptions: () => ({ researcherOptions: [] }),
}))

jest.mock('@/modules/shared/filters/FilterSaveSettings', () => ({
    FilterSaveSettings: () => <div data-testid="filter-save-settings" />,
}))

beforeAll(() => {
    // cmdk (Command list inside the comboboxes) relies on browser layout APIs.
    global.ResizeObserver = class {
        observe = jest.fn()
        unobserve = jest.fn()
        disconnect = jest.fn()
    }
    Element.prototype.scrollIntoView = jest.fn()
})

beforeEach(() => {
    act(() => useTableStateStore.getState().setColumnFilter(TABLE_ID, []))
})

/** Renders the `columnFilter` query param exactly as usePublications sends it to the API. */
const ColumnFilterProbe = () => {
    const { query } = useQueryManager(TABLE_ID, undefined, true)
    return <pre data-testid="column-filter">{query.columnFilter}</pre>
}

const renderSheet = () =>
    renderWithProviders(
        <>
            <PublicationsFilterSheet tableId={TABLE_ID} enableQueryURL={false} />
            <ColumnFilterProbe />
        </>,
    )

const sentFilters = (): { id: string; value: unknown }[] =>
    JSON.parse(screen.getByTestId('column-filter').textContent || '[]').map(
        ({ id, value }: { id: string; value: unknown }) => ({ id, value }),
    )

const fieldBlock = (label: string) =>
    screen.getByText(label, { selector: 'label' }).closest('div.space-y-1') as HTMLElement

const pickFromCombobox = (label: string, option: string) => {
    fireEvent.click(within(fieldBlock(label)).getByRole('combobox'))
    fireEvent.click(screen.getByRole('option', { name: option }))
}

describe('PublicationsFilterSheet', () => {
    it('renders every section, sourcing options from filter-options and codebooks', () => {
        renderSheet()

        ;[
            'Identification',
            'Journal',
            'Authors & departments',
            'Metrics',
            'Conference & book',
            'Other',
        ].forEach(section => expect(screen.getByRole('heading', { name: section })).toBeVisible())

        expect(screen.getByLabelText('YES')).toBeInTheDocument()
        expect(screen.getByLabelText('Journal article')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('41.5')).toHaveAttribute('name', 'maximpactFactor')
        expect(screen.getByTestId('mindateOfPublication')).toHaveAttribute('min', '2012-01-01')
        expect(screen.getByTestId('filter-save-settings')).toBeInTheDocument()
    })

    it('sends each filter under its API id in the contract value shape', async () => {
        renderSheet()

        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'laser' } })
        await waitFor(() => expect(sentFilters()).toContainEqual({ id: 'title', value: 'laser' }))

        fireEvent.click(screen.getByLabelText('Journal article'))
        pickFromCombobox('Year Of Publication', '2024')
        pickFromCombobox('Quartil', 'Q1')
        pickFromCombobox('Department', 'Physics')

        // Debounced range inputs are applied one at a time, as a user would.
        fireEvent.change(document.querySelector('input[name="minimpactFactor"]') as Element, {
            target: { value: '1.5' },
        })
        await waitFor(() =>
            expect(sentFilters()).toContainEqual({ id: 'impactFactor', value: { min: 1.5 } }),
        )
        fireEvent.change(screen.getByTestId('maxdateOfPublication'), {
            target: { value: '2024-12-31' },
        })
        await waitFor(() =>
            expect(sentFilters()).toContainEqual({
                id: 'dateOfPublication',
                value: { min: null, max: '2024-12-31' },
            }),
        )

        expect(sentFilters()).toEqual([
            { id: 'title', value: 'laser' },
            { id: 'mediaTypeCb', value: ['mt-article'] },
            { id: 'yearOfPublication', value: ['2024'] },
            { id: 'quartil', value: ['Q1'] },
            { id: 'department', value: { uid: 'dep-physics', name: 'Physics' } },
            { id: 'impactFactor', value: { min: 1.5 } },
            { id: 'dateOfPublication', value: { min: null, max: '2024-12-31' } },
        ])
    })

    it('drops a multiselect filter once its last value is removed', async () => {
        renderSheet()

        pickFromCombobox('Quartil', 'Q2')
        await waitFor(() => expect(sentFilters()).toEqual([{ id: 'quartil', value: ['Q2'] }]))

        fireEvent.click(screen.getByRole('option', { name: 'Q2' }))
        await waitFor(() => expect(sentFilters()).toEqual([]))
    })

    it('Clear filters empties the payload and resets the form', async () => {
        renderSheet()

        fireEvent.change(screen.getByLabelText('DOI'), { target: { value: '10.1000' } })
        await waitFor(() => expect(sentFilters()).toEqual([{ id: 'doi', value: '10.1000' }]))

        fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }))

        await waitFor(() => expect(sentFilters()).toEqual([]))
        expect(screen.getByLabelText('DOI')).toHaveValue('')
    })
})
