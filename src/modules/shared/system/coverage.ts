interface CoverageStatistics {
    sp_coverage?: number | null
}

export const isUnderCovered = (statistics?: CoverageStatistics | null): boolean =>
    statistics?.sp_coverage != null && statistics.sp_coverage < 1
