/// <reference types="jest" />
import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import BreadcrumpItem from './Breadcrump.item'

describe('BreadcrumpItem', () => {
  it('renders link correctly', () => {
    render(<BreadcrumpItem name="Home" link="/home" />)

    const linkElement = screen.getByText('Home')
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', '/home')
  })

  it('renders button correctly when setCategoryFilter is provided', () => {
    const setCategoryFilter = jest.fn()
    render(
      <BreadcrumpItem
        name="Category"
        setCategoryFilter={setCategoryFilter}
        path={{ uid: '1', name: 'Category' }}
      />
    )

    const buttonElement = screen.getByText('Category')
    expect(buttonElement).toBeInTheDocument()
    fireEvent.click(buttonElement)
    expect(setCategoryFilter).toHaveBeenCalledWith({
      uid: '1',
      name: 'Category'
    })
  })

  it('renders text correctly when no link or setCategoryFilter is provided', () => {
    render(<BreadcrumpItem name="Category" />)

    const textElement = screen.getByText('Category')
    expect(textElement).toBeInTheDocument()
  })
})
