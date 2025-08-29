import type { FC } from 'react'
import type { Resolver } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type z from 'zod'
import type { ZodType } from 'zod'

import { Form } from '@/components/form/Form'
import { ModalHeaderButtons } from '@/components/header/modal-header.buttons'
import { SystemLevel } from '@/types/gql/graphql'

import { SystemDetailSection } from '../system-edit/components/sections/system-detail.section'
import { type SystemCreateFormData, systemCreateSchema } from './schema'
import { useSystemCreateHook } from './useSystemCreateHook'

export const customZodResolver = <TSchema extends ZodType<any, any, any>>(
  schema: TSchema
): Resolver<z.infer<TSchema>> => {
  return async (values, _context, _options) => {
    const result = schema.safeParse(values)
    if (result.success) {
      return {
        values: result.data,
        errors: {}
      }
    } else {
      const fieldErrors = Object.entries(
        result.error.flatten().fieldErrors
      ).reduce(
        (all, [key, messages]) => {
          if (messages && messages.length > 0) {
            all[key] = {
              type: 'manual',
              message: messages[0]
            }
          }
          return all
        },
        {} as Record<string, any>
      )

      return {
        values: {},
        errors: fieldErrors
      }
    }
  }
}

export const SystemCreateContainer: FC = () => {
  const formMethods = useForm<SystemCreateFormData>({
    resolver: customZodResolver(systemCreateSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      systemLevel: SystemLevel.KeySystems,
      location: null,
      zone: null,
      systemCode: null,
      attribute: null,
      description: ''
    }
  })

  const { createSystem, loading } = useSystemCreateHook()

  const onSubmit = (data: SystemCreateFormData) => {
    console.log('Create System:', data)
    //   createSystem(data)
  }

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <ModalHeaderButtons isFetching={loading} />

      <SystemDetailSection />
    </Form>
  )
}
