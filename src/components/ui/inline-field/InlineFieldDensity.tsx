'use client'

import { createContext, useContext } from 'react'

// `compact` narrows the label column for side panels (e.g. the Edit System sheet's
// Details panel) without threading a prop through every inline field.
export type InlineFieldDensity = 'default' | 'compact'

const InlineFieldDensityContext = createContext<InlineFieldDensity>('default')

export const InlineFieldDensityProvider = InlineFieldDensityContext.Provider

export const useInlineFieldDensity = () => useContext(InlineFieldDensityContext)
