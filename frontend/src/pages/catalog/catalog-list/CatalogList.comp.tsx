import React, { Dispatch, SetStateAction } from 'react'
import moment from 'moment'
import { DataGridPro, GridSortModel } from '@mui/x-data-grid-pro'
import { Button } from '@mui/material'
import CustomLoadingOverlay from '@crema/core/GridLoadingOverlay'
import Tooltip from '@mui/material/Tooltip'
import AppBarComponent from '@crema/core/AppBar/AppBar.component'
import { CatalogItem } from 'types/models/Common'
import { message } from 'shared/localization/messages'
import { useIntl } from 'react-intl'

const messages = message.catalogList
const fieldMessage = message.catalogList.dataGridFields

interface Props {
  addNewCatalogItem: () => void
  handleSearchChange: () => void
  defaultFilter: string
  editCatalogItem: (id: any) => void
  deleteCatalogItem: (id: any) => void
  setPageNumber: Dispatch<SetStateAction<number>>
  setUrlParams: (name: string, value: string | null | undefined) => void
  setPageSize: Dispatch<SetStateAction<number>>
  isLoading: boolean
  rowsData: Array<CatalogItem>
  setSortModel: Dispatch<SetStateAction<GridSortModel>>
  pageSize: number
  pageNumber: number
  totalCount: number
  sortModel: GridSortModel
}

const CatalogComponent = ({
  addNewCatalogItem,
  handleSearchChange,
  defaultFilter,
  editCatalogItem,
  deleteCatalogItem,
  setPageNumber,
  setUrlParams,
  setPageSize,
  isLoading,
  rowsData,
  setSortModel,
  pageSize,
  pageNumber,
  totalCount,
  sortModel
}: Props) => {
  const intl = useIntl()
  return (
    <React.Fragment>
      <AppBarComponent
        onClick={addNewCatalogItem}
        onSearch={handleSearchChange}
        defaultFilter={defaultFilter}
        title={messages.title}
        buttonLabel={messages.button}
      />

      <div style={{ height: '100%', width: '100%', background: 'white', padding: '0' }}>
        <DataGridPro
          columns={[
            {
              field: 'Image',
              filterable: false,
              headerName: '',
              width: 50,
              disableColumnMenu: true,
              renderCell: ({ id, value }) => {
                if (value)
                  return (
                    <>
                      <Tooltip
                        placement="right"
                        title={
                          <React.Fragment>
                            <img width={150} height={150} src={value} alt="catalog item" />
                          </React.Fragment>
                        }
                      >
                        <img width={25} height={25} src={value} alt="catalog item" />
                      </Tooltip>
                    </>
                  )
                else return <></>
              }
            },
            {
              field: 'Name',
              filterable: false,
              headerName: intl.formatMessage({ id: fieldMessage.name }),
              width: 300,
              disableColumnMenu: true
            },
            {
              field: 'Category',
              filterable: false,
              sortable: false,
              headerName: intl.formatMessage({ id: fieldMessage.category }),
              disableColumnMenu: true
            },
            {
              field: 'Availability',
              filterable: false,
              sortable: false,
              headerName: intl.formatMessage({ id: fieldMessage.availability }),
              disableColumnMenu: true
            },
            {
              field: 'EstimatedPrice',
              filterable: false,
              type: 'number',
              sortable: false,
              headerName: intl.formatMessage({ id: fieldMessage.estimatedPrice }),
              disableColumnMenu: true
            },
            {
              field: 'Manufacturer',
              filterable: false,
              sortable: false,
              headerName: intl.formatMessage({ id: fieldMessage.manufacturer }),
              disableColumnMenu: true
            },
            {
              field: 'SupportedToDate',
              filterable: false,
              type: 'string',
              sortable: false,
              headerName: intl.formatMessage({ id: fieldMessage.supportedToDate }),
              valueGetter: ({ field, row }) => row[field] && moment(row[field]).format('DD.MM.YYYY'),
              width: 140,
              align: 'right',
              disableColumnMenu: true
            },
            {
              field: 'Facility',
              filterable: false,
              sortable: false,
              headerName: intl.formatMessage({ id: fieldMessage.facility }),
              disableColumnMenu: true,
              width: 135
            },
            {
              field: 'TypicalAvailableInDays',
              filterable: false,
              sortable: false,
              type: 'number',
              headerName: intl.formatMessage({ id: fieldMessage.typicalAvailableInDays }),
              disableColumnMenu: true
            },
            {
              field: 'Note',
              filterable: false,
              sortable: false,
              headerName: intl.formatMessage({ id: fieldMessage.note }),
              disableColumnMenu: true
            },
            {
              field: 'actions',
              type: 'actions',
              headerName: intl.formatMessage({ id: fieldMessage.actions }),
              width: 150,
              renderCell: ({ id }) => (
                <>
                  <Button onClick={() => editCatalogItem(id)}>Edit</Button>
                  <Button onClick={() => deleteCatalogItem(id)} color="warning">
                    Delete
                  </Button>
                </>
              )
            }
            //{ field: "id", filterable: false, sortable: false, headerName: "ID", width: 65, disableColumnMenu: true },
          ]}
          rows={rowsData}
          pagination
          density="compact"
          pageSize={pageSize}
          page={pageNumber}
          rowsPerPageOptions={[20, 50, 100]}
          rowCount={totalCount}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage, details) => {
            setPageNumber(newPage)
            setUrlParams('pageNumber', newPage.toString())
          }}
          onPageSizeChange={newPageSize => {
            setPageSize(newPageSize)
            setPageNumber(0)
            setUrlParams('pageSize', newPageSize.toString())
          }}
          sortModel={sortModel}
          onSortModelChange={model => {
            setSortModel(model)
            //setUrlParams(model);
          }}
          loading={isLoading}
          components={{
            LoadingOverlay: CustomLoadingOverlay
          }}
          onCellDoubleClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true
              editCatalogItem(params.id)
            }
          }}
        />
      </div>
    </React.Fragment>
  )
}

export default CatalogComponent
