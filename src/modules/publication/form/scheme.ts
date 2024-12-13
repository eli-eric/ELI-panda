import * as yup from 'yup'

export const validationSchemePeerReviewed = yup.object().shape({
  code: yup.string().required('Code is required'),
  doi: yup.string().required('DOI is required'),
  openAccessType: yup
    .object()
    .shape({
      uid: yup.string().required(),
      name: yup.string().required()
    })
    .required('Open Access Type is required'),
  title: yup.string().required('Title is required'),
  allAuthors: yup.string().required('All Authors is required'),
  allAuthorsCount: yup.string().required('All Authors Count is required'),
  eliAuthors: yup.string().required('ELI Authors is required'),
  eliAuthorsCount: yup.string().required('ELI Authors Count is required'),
  authorsDepartments: yup.array().of(
    yup.object().shape({
      department: yup
        .object()
        .shape({
          uid: yup.string().required(),
          name: yup.string().required()
        })
        .required('Department is required'),
      authorsCount: yup.string().required('Authors Count is required')
    })
  ),
  longJournalTitle: yup.string().required('Long Journal Title is required'),
  volume: yup.string().required('Volume is required'),
  pages: yup.string().required('Pages is required'),
  pagesCount: yup.string().required('Pages Count is required'),
  citeAs: yup.string().required('Cite As is required'),
  yearOfPublication: yup.string().required('Year of Publication is required'),
  abstract: yup.string().required('Abstract is required'),
  keywords: yup.string().required('Keywords is required'),
  oecdFord: yup.string().required('OECD Ford is required'),
  publishingCountry: yup
    .object()
    .shape({
      uid: yup.string().required(),
      name: yup.string().required()
    })
    .required('Publishing Country is required'),
  dateOfPublication: yup.string().required('Date of Publication is required')
})

export const validationSchemeOther = yup.object().shape({
  code: yup.string().required('Code is required'),
  openAccessType: yup
    .object()
    .shape({
      uid: yup.string().required(),
      name: yup.string().required()
    })
    .required('Open Access Type is required'),
  title: yup.string().required('Title is required'),
  allAuthors: yup.string().required('All Authors is required'),
  allAuthorsCount: yup.string().required('All Authors Count is required'),
  eliAuthors: yup.string().required('ELI Authors is required'),
  eliAuthorsCount: yup.string().required('ELI Authors Count is required'),
  authorsDepartments: yup.array().of(
    yup.object().shape({
      department: yup
        .object()
        .shape({
          uid: yup.string().required(),
          name: yup.string().required()
        })
        .required('Department is required'),
      authorsCount: yup.string().required('Authors Count is required')
    })
  ),
  longJournalTitle: yup.string().required('Long Journal Title is required'),
  pages: yup.string().required('Pages is required'),
  pagesCount: yup.string().required('Pages Count is required'),
  citeAs: yup.string().required('Cite As is required'),
  yearOfPublication: yup.string().required('Year of Publication is required'),
  abstract: yup.string().required('Abstract is required'),
  keywords: yup.string().required('Keywords is required'),
  publishingCountry: yup
    .object()
    .shape({
      uid: yup.string().required(),
      name: yup.string().required()
    })
    .required('Publishing Country is required'),
  dateOfPublication: yup.string().required('Date of Publication is required')
})
