import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { CreateRelationshipModalComponent } from '../CreateRelationshipModal.comp'

const msgs: Record<string, string> = {
    'systemHierarchy.graph.createRelationship.source': 'Source System',
    'systemHierarchy.graph.createRelationship.target': 'Target System',
    'systemHierarchy.graph.createRelationship.type': 'Relationship Type',
    'systemHierarchy.graph.createRelationship.description': 'Description',
    'systemHierarchy.graph.createRelationship.descriptionPlaceholder': 'Describe...',
    'systemHierarchy.graph.createRelationship.submit': 'Create',
    'systemHierarchy.graph.createRelationship.cancel': 'Cancel',
}

const defaultProps = {
    sourceName: 'Pump A',
    targetName: 'Motor B',
    relationshipType: '',
    description: '',
    onRelationshipTypeChange: jest.fn(),
    onDescriptionChange: jest.fn(),
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
    isSubmitting: false,
}

const renderModal = (props = defaultProps) =>
    render(
        <IntlProvider locale="en" messages={msgs}>
            <CreateRelationshipModalComponent {...props} />
        </IntlProvider>,
    )

describe('CreateRelationshipModalComponent', () => {
    it('renders source and target names', () => {
        renderModal()
        expect(screen.getByText('Pump A')).toBeInTheDocument()
        expect(screen.getByText('Motor B')).toBeInTheDocument()
    })

    it('disables submit when no relationship type selected', () => {
        renderModal()
        const submitBtn = screen.getByText('Create')
        expect(submitBtn).toBeDisabled()
    })

    it('enables submit when relationship type selected', () => {
        renderModal({ ...defaultProps, relationshipType: 'POWERED_BY' })
        const submitBtn = screen.getByText('Create')
        expect(submitBtn).not.toBeDisabled()
    })

    it('calls onCancel when cancel clicked', () => {
        const onCancel = jest.fn()
        renderModal({ ...defaultProps, onCancel })
        fireEvent.click(screen.getByText('Cancel'))
        expect(onCancel).toHaveBeenCalled()
    })

    it('calls onSubmit when submit clicked', () => {
        const onSubmit = jest.fn()
        renderModal({ ...defaultProps, relationshipType: 'POWERED_BY', onSubmit })
        fireEvent.click(screen.getByText('Create'))
        expect(onSubmit).toHaveBeenCalled()
    })

    it('has testid', () => {
        renderModal()
        expect(screen.getByTestId('create-relationship-modal')).toBeInTheDocument()
    })
})
