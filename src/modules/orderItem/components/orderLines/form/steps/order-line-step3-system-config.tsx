import { useCallback, useEffect, useRef } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

import { Col, Grid } from '@/components/grid/Grid'
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/simple-table'
import type {
  OrderLineSystemConfig,
  OrderLineWizardFormType
} from '@/modules/orderItem/types/form'
import { SelectSystemComboBox } from '@/modules/shared/form/systemSelect/SelectSystem.combo'
import type { CodebookType } from '@/types/responses/codebook'

import { OrderLineConfigRow } from '../components/OrderLineConfigRow'
import useOrderLineFormFields from '../OrderLineForm.fields'

/**
 * Step 3: System Configuration
 *
 * Responsibilities:
 * 1. Initialize systemConfigs array based on quantity from Step 2
 * 2. Allow user to select global parent system for all order lines
 * 3. Allow user to configure each system (new vs existing)
 *
 * Architecture:
 * - useFieldArray for type-safe array management
 * - Single useEffect for initialization on mount/remount
 * - Callbacks for user interactions (parent system change, type change)
 */
export const OrderLineStep3SystemConfig = () => {
  const { setValue, control } = useFormContext<OrderLineWizardFormType>()

  const formFields = useOrderLineFormFields(true)

  // useFieldArray for proper React Hook Form integration
  const { fields, replace } = useFieldArray({
    control,
    name: 'systemConfigs'
  })

  // Watch form values
  const globalParentSystem = useWatch({
    control,
    name: 'globalParentSystem'
  })
  const name = useWatch({ control, name: 'name' })
  const quantity = useWatch({ control, name: 'quantity' }) || 1

  // Ref to ensure initialization happens only once on mount
  const isInitializedRef = useRef(false)

  // Initialize systemConfigs on component mount (Step 2 → Step 3 transition)
  // Runs ONCE - empty dependencies array
  useEffect(() => {
    // Guard: prevent multiple initializations
    if (isInitializedRef.current) return
    isInitializedRef.current = true

    // Lazy initialization: only initialize if configs are empty
    if (fields.length === 0 && quantity > 0) {
      const newConfigs: OrderLineSystemConfig[] = []
      for (let i = 0; i < quantity; i++) {
        newConfigs.push({
          index: i,
          itemName: name || '',
          parentSystem: globalParentSystem || null,
          systemType: 'new',
          systemName: name || '',
          selectedSystem: null
        })
      }
      replace(newConfigs)
    }
    // Empty deps = runs only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Callback: Handle global parent system change
  // Updates parentSystem for all "new" system configs immediately
  const handleParentSystemChange = useCallback(
    (parent: CodebookType | null) => {
      setValue('globalParentSystem', parent)

      // Batch update: prepare all changes at once
      const updatedConfigs = fields.map(field =>
        field.systemType === 'new'
          ? { ...field, parentSystem: parent }
          : field // "existing" configs keep their selectedSystemParent
      )
      replace(updatedConfigs)
    },
    [fields, setValue, replace]
  )

  // Callback: Handle system type change (new vs existing)
  const handleSystemTypeChange = useCallback(
    (
      index: number,
      type: 'new' | 'existing',
      selectedSystem?: CodebookType,
      selectedSystemParent?: CodebookType
    ) => {
      const updatedConfigs = [...fields]
      updatedConfigs[index] = {
        ...updatedConfigs[index],
        systemType: type,
        selectedSystem: type === 'existing' ? selectedSystem || null : null,
        // parentSystem is used for BOTH cases:
        // - For "new": use globalParentSystem
        // - For "existing": use parent of selected system (selectedSystemParent)
        parentSystem:
          type === 'existing'
            ? selectedSystemParent || null
            : globalParentSystem || null,
        systemName: type === 'new' ? name || '' : selectedSystem?.name || ''
      }
      replace(updatedConfigs)
    },
    [fields, replace, globalParentSystem, name]
  )

  return (
    <Grid className="pt-2">
      <Col sm="full">
        <div className="mb-6">
          <SelectSystemComboBox
            selectSystemField={{
              ...formFields.parentSystem,
              name: 'globalParentSystem'
            }}
            onChange={handleParentSystemChange}
          />
          <p className="text-sm text-muted-foreground mt-1">
            This parent system will be applied to all order lines
          </p>
        </div>
      </Col>

      <Col sm="full">
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">#</TableHead>
                <TableHead className="min-w-[200px]">Item Name</TableHead>
                <TableHead className="min-w-[200px]">Parent System</TableHead>
                <TableHead className="min-w-[180px]">System Type</TableHead>
                <TableHead className="min-w-[200px]">System Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <OrderLineConfigRow
                  key={field.id}
                  index={index}
                  config={field}
                  onTypeChange={handleSystemTypeChange}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Col>
    </Grid>
  )
}
