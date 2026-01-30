'use client'
import { useIntl } from 'react-intl'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { message } from '@/i18n/src/messages'

import { privacyPolicyConfig } from '../config/privacy-policy'

export default function PrivacyPolicyComponent() {
    const { appName, organization, lastUpdated, sections } = privacyPolicyConfig
    const { formatMessage: fm } = useIntl()

    return (
        <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                    {sections.introduction.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {fm({ id: message.common.ui.internalApplicationFor })} {organization}
                </p>
            </div>

            <div className="space-y-6">
                {/* Introduction */}
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-foreground leading-relaxed">
                            {sections.introduction.content}
                        </p>
                    </CardContent>
                </Card>

                {/* Data Access */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                            {sections.dataAccess.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {sections.dataAccess.items.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                                    <span className="text-foreground leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Usage Scope */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                            {sections.usageScope.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground leading-relaxed">
                            {sections.usageScope.content}
                        </p>
                    </CardContent>
                </Card>

                {/* Data Storage */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                            {sections.dataStorage.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground leading-relaxed">
                            {sections.dataStorage.content}
                        </p>
                    </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                            {sections.contact.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground leading-relaxed">
                            {sections.contact.content}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Footer */}
            <Separator className="my-8" />
            <div className="text-center space-y-2">
                <p className="text-sm font-medium text-foreground">
                    {appName} {fm({ id: message.common.ui.separator })} {organization}
                </p>
                <p className="text-sm text-muted-foreground">
                    {fm({ id: message.common.ui.lastUpdated })}{' '}
                    {new Date(lastUpdated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
            </div>
        </div>
    )
}
