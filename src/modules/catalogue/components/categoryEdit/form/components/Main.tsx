import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/form/inputs'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'

import type { CategoryFormType } from '../../types'

const Main = ({
    uid,
    imageRef,
}: {
    uid?: string
    imageRef?: React.MutableRefObject<ImageGalleryRef | null>
}) => {
    const { setValue } = useFormContext<CategoryFormType>()

    return (
        <div className="flex flex-col gap-4 pb-4">
            <ImageGallery
                ref={imageRef}
                allowMultipleImages={false}
                hasEditRole={true}
                config={{
                    itemCategory: FILE_TYPE.CATEGORY,
                    itemId: String(uid),
                }}
            />
            <div className="flex flex-col col-span-3 grow">
                <div className="mt-1">
                    <Input
                        name="name"
                        label="Name"
                        rounded="rounded-md"
                        onChange={v => {
                            const codeValue = v ? v.replace(/\s+/g, '-').toLowerCase() : ''
                            setValue('code', codeValue)
                        }}
                    />
                </div>
                <div className="mt-1">
                    <Input name="code" label="Code" disabled={true} rounded="rounded-md" />
                </div>
                <div className="mt-1">
                    <SystemTypeComboBox
                        systemTypeField={{ name: 'systemType', label: 'System Type' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Main
