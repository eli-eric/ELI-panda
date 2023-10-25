import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { Fragment, memo, useMemo, useRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import Combobox from '@/components/form/Combobox'
import { Form } from '@/components/form/Form'
import { Input, TextArea } from '@/components/form/Input'
import { Col, Grid } from '@/components/grid/Grid'
import { Heading } from '@/components/layout/Heading'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { FILE_TYPE } from '@/types/constants/files'
import { PATH } from '@/types/constants/paths'

import { useParentSystemDetail } from '../../hooks/useParentSystemDetail'
import { useSystemDetail } from '../../hooks/useSystemDetail'
import { useSystemSubmit } from '../../hooks/useSystemSubmit'
import type { SystemDetailFormType } from '../../types/form'
import Breadcrumbs from '../Breadcrumps'
import HeaderComponent from '../Header.comp'
import { PhysicalItemForm } from './PhysicalItemForm.comp'
import useSystemEditFormFields from './SystemForm.fields'
import { schema } from './SystemForm.schema'
import { SystemMainForm } from './SystemMain.form'

const MemoizedSystemGallery = memo(ImageGallery)

import type { ColumnDef } from '@tanstack/react-table'

import { LinkDecorator } from '@/components/decorators'
import Card from '@/components/layout/Card'
import { CellWithDelete } from '@/modules/roomCard/components/table/CellWithDelete'
import { ContactDeptButton } from '@/modules/roomCard/components/table/ContactDeptButton'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { classNames } from '@/utils'

import { AssignPhysicalItem } from '../AssignPhysicalItem'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const FormCard = ({ children, className }: CardProps) => (
  <div className={classNames('mx-auto max-w-7xl', className)}>{children}</div>
)

const SystemForm = () => {
  const { systemDetail, uid, disabledEdit } = useSystemDetail()
  //const cataloguePermission = usePermission([ROLE.CATALOGUE_EDIT])
  const fields = useSystemEditFormFields()

  const { parentUid, parentPath } = useParentSystemDetail()

  const systemImageRef = useRef<ImageGalleryRef>()

  const { submit, loadingSubmit } = useSystemSubmit(systemImageRef)

  const formMethods = useForm<SystemDetailFormType>({
    resolver: yupResolver(schema),
    defaultValues: systemDetail
  })

  const columnsOperators = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Authorized Operators',
        meta: { headerElement: <ContactDeptButton /> },

        columns: [
          {
            accessorKey: 'fullName',
            meta: { noHeader: true },
            cell: props => <CellWithDelete {...props} formName="contactPersonsDept" setDeleteItem={() => {}} />,
            size: 563
          }
        ]
      }
    ],
    []
  )
  const columnsMaintener = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Maintened by',
        meta: { headerElement: <ContactDeptButton /> },
        columns: [
          {
            accessorKey: 'fullName',
            meta: { noHeader: true },
            cell: props => <CellWithDelete {...props} formName="contactPersonsDept" setDeleteItem={() => {}} />,
            size: 563
          }
        ]
      }
    ],
    []
  )

  const { control } = formMethods
  const physicalItem = useWatch({ control, name: 'physicalItem' })

  const onSubmit = (data: any) => {
    // extract from data hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = data
    submit({ ...rest, parentUid })
  }

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} enableLeaveWarning={true}>
      <HeaderComponent loading={loadingSubmit} />
      <Card>
        <Breadcrumbs parentPath={parentPath || systemDetail?.parentPath} />
      </Card>
      <FormCard className="bg-sky-100 shadow-md rounded-lg border">
        <SystemMainForm {...{ physicalItem }}>
          <MemoizedSystemGallery
            ref={systemImageRef}
            setValue={formMethods.setValue}
            config={{ itemCategory: FILE_TYPE.SYSTEM, itemId: String(uid) }}
            className="w-full"
            hasEditRole={!disabledEdit}
          />
        </SystemMainForm>
        <Card className="border-t border-gray-400">
          <Grid>
            <Col sm={3} md={6}>
              <Combobox {...fields.responsible} />
            </Col>
            <Col sm={3} md={6}>
              <Input {...fields.parentSystem} />
            </Col>
            <Col sm={3} md={6}>
              <PandaTable
                {...{
                  tableId: 'roomCard-Contact',
                  columns: columnsOperators,
                  data: [{ fullName: 'Jan Novák' }, { fullName: 'Petr Novák' }, { fullName: 'Pavel Novák' }],
                  className: 'border-l border-gray-400 mb-0 pb-0  w-full'
                }}
              />
            </Col>

            <Col sm={3} md={6}>
              <PandaTable
                {...{
                  tableId: 'roomCard-Contact-dept',
                  columns: columnsMaintener,
                  data: [{ fullName: 'Jan Novák' }, { fullName: 'Petr Novák' }, { fullName: 'Pavel Novák' }],
                  className: 'border-l border-gray-400 mb-0 pb-0  w-full'
                }}
              />
            </Col>
          </Grid>
        </Card>

        <Card className="border-t border-gray-400 ">
          <Grid>
            <Col sm="full">
              <TextArea {...fields.description} />
            </Col>
          </Grid>
        </Card>
        <Card>
          <Card className="bg-amber-100 rounded-md  shadow-md">
            <Fragment>
              <Heading customText={'ITEM: ' + physicalItem?.catalogueItem?.name ?? 'No item Connectect'}>
                <div className="flex space-x-10">
                  {physicalItem?.catalogueItem?.uid && (
                    <Link href={PATH.CATALOGUE_ITEM + '/' + physicalItem.catalogueItem.uid} target={'_blank'}>
                      <LinkDecorator>View Catalogue Item</LinkDecorator>
                    </Link>
                  )}
                  <AssignPhysicalItem />
                </div>
              </Heading>
              {physicalItem && <PhysicalItemForm />}
            </Fragment>
          </Card>
        </Card>
      </FormCard>
      <DevTool control={formMethods.control} />
    </Form>
  )
}

export default SystemForm
