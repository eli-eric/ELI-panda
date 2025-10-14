import type {
  PublicationOtherFormData,
  PublicationPeerReviewedFormData
} from '../form/scheme'

// Export properly inferred types from Zod schemas
export type PublicationPeerReviewedForm = PublicationPeerReviewedFormData
export type PublicationOtherForm = PublicationOtherFormData

// Generic union type for all publication forms
export type PublicationForm = PublicationPeerReviewedForm | PublicationOtherForm
