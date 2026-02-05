import type { Publication as PublicationItem } from '@/modules/publication/types/responses'
import type { Employee } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

export type Publication = {
    pdfFile: string // pdf file + blob/code - TBD, nazev soubory link na file bude v tabulce a moznost filtrace
    experimentalSystem?: string // codebook? - nevime, konkretni beam line
    userCall?: CodebookType // codebook dostaneme, navazany na user Experiment
    useExperiment?: CodebookType // codebook? odkud budem brat?
    publicationDOI: string // unikatni identifikator,
    openAccessType: CodebookType // viditelnost clanku na web of science.... boolean - mozna nejake mezi kategorie
    articleTitle: string
    longJournalTitle: string
    volume?: number
    issue?: number
    pagesFromTo?: string
    citation?: string
    impactFactor?: number
    quartile?: CodebookType // Q1, Q2, Q3, Q4, Q?
    categoryRank?: string // napr. 22/100, regex na cislo/cislo
    year: string
    publishDate?: string // datum publikace
    category: CodebookType // kategorie clanku - codebook - dostaneme seznam
    abstract: string
    keywords: string[]
    oecdFord: string // OECD-FORD
    language: CodebookType // predvybrat aj
    support?: CodebookType // Supported by Grant / Supported by Project - dodaji nam mozna volny text, nebo codebook
    utWoSNumber?: string // wos Accesion Number
    ISSN?: string // wos ISSN
    eISSN?: string // wos eISSN
    publishingState: CodebookType // codebook - zeme, kde byl clanek publikovan
    webLink?: string // odkaz na clanek
    pages: number
    eidScopus?: string // /www.scopus.com - Scopus EID, moznost automatizace
    eliAuthors: Employee[] // TBD
}

export type PublicationsResponse = {
    data: PublicationItem[]
    totalCount: number
}
