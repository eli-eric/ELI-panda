import type { Metadata } from 'next'

import PrivacyPolicyComponent from './components/PrivacyPolicyComponent'

export const metadata: Metadata = {
    title: 'Privacy Policy | Panda App',
    description:
        'Privacy Policy for Panda App - Internal spare parts management system for ELI facilities',
    robots: {
        index: false,
        follow: false,
    },
}

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen">
            <PrivacyPolicyComponent />
        </main>
    )
}
