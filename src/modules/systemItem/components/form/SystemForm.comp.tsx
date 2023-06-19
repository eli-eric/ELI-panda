import { useRouter } from 'next/router'

import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import useSystemDetail from '../../hooks/useSystemDetail'
import useSystemFormFields from './SystemForm.fields'

const systemFormMessages = message.systemsPage.systemDetail.form

const SystemFormComponent = () => {
  const fields = useSystemFormFields()
  const uid = useRouter().query.uid as string
  const { disabledEdit } = useSystemDetail()

  return (
    <Card>
      <Grid>
        <Col md={6} lg={12}>
          <h1 className="text-2xl justify-center font-semibold text-gray-900">{uid ? 'EDIT SYSTEM' : 'NEW SYSTEM'}</h1>
        </Col>
        <Col sm={3} md={2} lg={4} className="md:pr-4">
          <p className="w-full bg-red-500">@TODO: New image component</p>
        </Col>
        <Col sm={3} md={4} lg={8} className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-x-2 gap-y-4 mb-auto">
          <Col sm={3} md={4} lg={8}>
            <Input {...fields.name} disabled={disabledEdit} />
          </Col>
          <Col sm={3} md={4}>
            <Combobox
              name="owner"
              label={systemFormMessages.ownerUID.label}
              codebook={CODEBOOK.USER}
              disabled={disabledEdit}
            />
          </Col>
          <Col sm={3} md={4}>
            <p className="w-full h-full bg-red-500">@TODO: Parent(UID)</p>
          </Col>
          <Col sm={3} md={4} lg={8}>
            <Listbox
              name="importance"
              label={systemFormMessages.importanceUID.label}
              codebook={CODEBOOK.SYSTEM_IMPORTANCE}
              className="col-span-3 md:col-span-4 lg:col-span-8"
              disabled={disabledEdit}
            />
          </Col>
        </Col>
        <Col sm={3} md={6}>
          <Combobox
            name="location"
            label={systemFormMessages.locationUID.label}
            codebook={CODEBOOK.LOCATION}
            disabled={disabledEdit}
          />
        </Col>
        <Col sm={3} md={6}>
          <Listbox
            name="zone"
            label={systemFormMessages.zoneUID.label}
            codebook={CODEBOOK.ZONE}
            disabled={disabledEdit}
          />
        </Col>
        <Col sm={3} md={6}>
          <Listbox
            name="systemType"
            label={systemFormMessages.systemTypeUID.label}
            codebook={CODEBOOK.SYSTEM_TYPE}
            disabled={disabledEdit}
          />
        </Col>
        <Col sm={3}>
          {/* @TODO: system code should be disabled? */}
          <Input {...fields.systemCode} disabled={disabledEdit} />
        </Col>
        <Col sm={3}>
          <Input {...fields.systemAlias} disabled={disabledEdit} />
        </Col>
        <Col sm="full">
          <TextArea {...fields.description} disabled={disabledEdit} />
        </Col>
      </Grid>
    </Card>
  )
}

export default SystemFormComponent
