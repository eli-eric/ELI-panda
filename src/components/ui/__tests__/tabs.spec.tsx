import { render, screen } from '@testing-library/react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs'

describe('ui/Tabs', () => {
    it('renders trigger + content elements with data-slots', () => {
        const { container } = render(
            <Tabs defaultValue="a">
                <TabsList>
                    <TabsTrigger value="a">A</TabsTrigger>
                    <TabsTrigger value="b">B</TabsTrigger>
                </TabsList>
                <TabsContent value="a">Content A</TabsContent>
                <TabsContent value="b">Content B</TabsContent>
            </Tabs>,
        )
        expect(container.querySelector('[data-slot="tabs"]')).not.toBeNull()
        expect(container.querySelector('[data-slot="tabs-list"]')).not.toBeNull()
        expect(container.querySelectorAll('[data-slot="tabs-trigger"]').length).toBe(2)
    })

    it('default tab content is visible, other is hidden', () => {
        render(
            <Tabs defaultValue="a">
                <TabsList>
                    <TabsTrigger value="a">A</TabsTrigger>
                    <TabsTrigger value="b">B</TabsTrigger>
                </TabsList>
                <TabsContent value="a">Content A</TabsContent>
                <TabsContent value="b">Content B</TabsContent>
            </Tabs>,
        )
        expect(screen.getByText('Content A')).toBeInTheDocument()
        expect(screen.queryByText('Content B')).toBeNull()
    })

    it('controlled value prop switches active content', () => {
        const { rerender } = render(
            <Tabs value="a" onValueChange={() => {}}>
                <TabsList>
                    <TabsTrigger value="a">A</TabsTrigger>
                    <TabsTrigger value="b">B</TabsTrigger>
                </TabsList>
                <TabsContent value="a">Content A</TabsContent>
                <TabsContent value="b">Content B</TabsContent>
            </Tabs>,
        )
        expect(screen.getByText('Content A')).toBeInTheDocument()
        rerender(
            <Tabs value="b" onValueChange={() => {}}>
                <TabsList>
                    <TabsTrigger value="a">A</TabsTrigger>
                    <TabsTrigger value="b">B</TabsTrigger>
                </TabsList>
                <TabsContent value="a">Content A</TabsContent>
                <TabsContent value="b">Content B</TabsContent>
            </Tabs>,
        )
        expect(screen.getByText('Content B')).toBeInTheDocument()
        expect(screen.queryByText('Content A')).toBeNull()
    })
})
