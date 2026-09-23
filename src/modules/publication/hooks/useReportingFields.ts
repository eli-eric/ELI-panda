import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { useAccessControl } from '@/hooks/useAccessControl'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'

const { reporting } = message.publication

export const REPORTING_FIELD_NAME = 'reporting'

export const useReportingFields = () => {
    const disabled = !useAccessControl(ROLE.PUBLICATIONS_EDIT)()

    return useMakeFormFields({
        classification: {
            label: reporting.classification,
            name: `${REPORTING_FIELD_NAME}.classification`,
            rounded: 'rounded-md',
            disabled,
        },
        documentType: {
            label: reporting.documentType,
            name: `${REPORTING_FIELD_NAME}.documentType`,
            rounded: 'rounded-md',
            disabled,
        },
        departmentUids: {
            label: reporting.departments,
            name: `${REPORTING_FIELD_NAME}.departmentUids`,
            disabled,
            codebook: CODEBOOK.DEPARTMENT,
        },
        userCallUids: {
            label: reporting.userCalls,
            name: `${REPORTING_FIELD_NAME}.userCallUids`,
            disabled,
            codebook: CODEBOOK.USER_CALL,
        },
        userExperimentUids: {
            label: reporting.userExperiments,
            name: `${REPORTING_FIELD_NAME}.userExperimentUids`,
            disabled,
            codebook: CODEBOOK.USER_EXPERIMENT,
        },
        experimentalSystemUids: {
            label: reporting.experimentalSystems,
            name: `${REPORTING_FIELD_NAME}.experimentalSystemUids`,
            disabled,
            codebook: CODEBOOK.EXPERIMENTAL_SYSTEM,
        },
        journalRankingStatus: {
            label: reporting.rankingStatus,
            name: `${REPORTING_FIELD_NAME}.journalRankingStatus`,
            rounded: 'rounded-md',
            disabled,
        },
        reviewed: {
            label: reporting.reviewed,
            name: `${REPORTING_FIELD_NAME}.reviewed`,
            disabled,
        },
    })
}
