import { z } from 'zod'

const codebookSchema = z.object({
  uid: z.string(),
  name: z.string(),
  description: z.string().optional(),
  code: z.string().optional()
})

export const spareAssignmentSchema = z
  .object({
    oldItemCondition: codebookSchema,
    newItemLocation: codebookSchema,
    autoAssignParent: z.boolean(),
    newParentSystemUid: z.string().optional()
  })
  .refine(
    data => {
      // If autoAssignParent is false, newParentSystemUid is required
      if (!data.autoAssignParent) {
        return !!data.newParentSystemUid
      }
      return true
    },
    {
      message: 'Parent system is required when auto-assign is disabled',
      path: ['newParentSystemUid']
    }
  )

export type SpareAssignmentFormData = z.infer<typeof spareAssignmentSchema>
