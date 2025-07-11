// BreadcrumpContainer.test.tsx
import { render, screen } from '@testing-library/react'
import React from 'react'

import { BreadcrumpContainer } from '../Breadcrump.cont'
import { BreadcrumpItem } from '../Breadcrump.item'

describe('BreadcrumpContainer', () => {
  it('renders multiple BreadcrumpItems correctly', () => {
    render(
      <BreadcrumpContainer testId="breadcrump" homeLink="/home">
        <BreadcrumpItem name="Category 1" link="/category1" />
        <BreadcrumpItem name="Category 2" link="/category2" />
        <BreadcrumpItem name="Category 3" link="/category3" />
      </BreadcrumpContainer>
    )

    // Ověření, že každá položka je správně renderována
    expect(screen.getByText('Category 1')).toBeInTheDocument()
    expect(screen.getByText('Category 2')).toBeInTheDocument()
    expect(screen.getByText('Category 3')).toBeInTheDocument()
  })

  it('renders home link when homeLink is provided and multiple items', () => {
    render(
      <BreadcrumpContainer testId="breadcrump" homeLink="/home">
        <BreadcrumpItem name="Category 1" link="/category1" />
        <BreadcrumpItem name="Category 2" link="/category2" />
        <BreadcrumpItem name="Category 3" link="/category3" />
      </BreadcrumpContainer>
    )

    // Ověření, že home link je správně renderován
    const homeLink = screen.getByTestId('breadcrump-home')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/home')

    // Ověření, že svg ikona má správné třídy
    const icon = homeLink.querySelector('svg')
    expect(icon).toHaveClass('h-4 w-4 shrink-0')
  })

  it('applies correct class names with multiple items', () => {
    render(
      <BreadcrumpContainer testId="breadcrump" homeLink="/home">
        <BreadcrumpItem name="Category 1" link="/category1" />
        <BreadcrumpItem name="Category 2" link="/category2" />
        <BreadcrumpItem name="Category 3" link="/category3" />
      </BreadcrumpContainer>
    )

    // Ověření, že jsou správně aplikovány class names
    const container = screen.getByTestId('breadcrump')
    expect(container).toHaveClass('relative bg-white dark:bg-gray-800')
  })
})
