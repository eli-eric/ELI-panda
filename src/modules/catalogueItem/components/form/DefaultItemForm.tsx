import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React, { startTransition, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input } from '@/components/form/inputs'
import { Col, Grid } from '@/components/grid/Grid'
import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { useCategory } from '@/modules/catalogue/hooks/useCategory'

import useCatalogueFormFields from './CatalogueForm.fields'

const { form } = message.cataloguePage.itemDetail

const DefaultItemForm = () => {
    const { control } = useFormContext()
    const category = useWatch({ name: 'category', control })
    const manufacturerUrl = useWatch({ name: 'manufacturerUrl', control })
    const fields = useCatalogueFormFields()
    const [parentPath, setParentPath] = React.useState<string>('')
    const { formatMessage: fm } = useIntl()

    const { catalogueCategory } = useCategory(category?.uid)

    // Připraví URL pro Link komponentu
    const preparedUrl = manufacturerUrl
        ? manufacturerUrl.startsWith('http')
            ? manufacturerUrl
            : `https://${manufacturerUrl}`
        : ''

    useEffect(() => {
        startTransition(() => {
            if (catalogueCategory) {
                const categoryPathString = catalogueCategory.parentPath
                    ?.map((path: any) => path?.name)
                    .join(' > ')
                setParentPath(categoryPathString)
            }
        })
    }, [category, catalogueCategory])

    return (
        <Grid>
            <Col lg={6}>
                <Input {...fields.name} />
            </Col>
            <Col lg={6}>
                <Input {...fields.catalogueNumber} />
            </Col>
            <Col lg={12}>
                <ComboboxTree
                    {...fields.category}
                    customLabel={fm({ id: form.category.label }, { parentPath })}
                />
            </Col>
            <Col lg={6}>
                <Combobox {...fields.supplier} />
            </Col>
            <Col lg={6} className="flex gap-2 items-end">
                <div className="flex-1">
                    <Input {...fields.manufacturerUrl} />
                </div>
                {manufacturerUrl && manufacturerUrl.trim() !== '' ? (
                    <Tooltip
                        content={fm(
                            { id: form.manuFacturerUrl.tooltip.openUrl },
                            { url: preparedUrl },
                        )}
                    >
                        <Button type="button" variant="link" size="sm" className="h-9 px-2" asChild>
                            <Link href={preparedUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                            </Link>
                        </Button>
                    </Tooltip>
                ) : (
                    <Tooltip content={fm({ id: form.manuFacturerUrl.tooltip.enterUrl })}>
                        <Button
                            type="button"
                            variant="link"
                            size="sm"
                            disabled
                            className="h-9 px-2"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </Tooltip>
                )}
            </Col>
        </Grid>
    )
}

export default DefaultItemForm
