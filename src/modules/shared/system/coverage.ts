interface CoverageStatistics {
    sp_coverage?: number | null
}

export const isUnderCovered = (statistics?: CoverageStatistics | null): boolean =>
    statistics?.sp_coverage != null && statistics.sp_coverage < 1

// sp_coverage is a ratio (1 = fully covered), rendered as a percentage
// everywhere it surfaces.
export const formatCoverage = (spCoverage?: number | null): string | null =>
    spCoverage == null ? null : `${parseFloat((spCoverage * 100).toFixed(2))}%`
