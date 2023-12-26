import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import { truncate } from 'src/lib/formatters'

import { tableHeader, standard } from './CustomData.mock'
import CustomDataTable from './CustomDataTable'
import {
  tableHeaders as tableHeadersLongData,
  standard as standardLongData,
} from './CustomDataWithTooLongHeaders.mock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomDataTable Component', () => {
  const idFieldName = 'id'
  const idFieldType = 'number'
  const searchBarInputName = 'searchbar-text'
  let searchBarInputPlaceholder = ''
  const searchBarSelectName = 'searchbar-select'
  const searchBarSelectOptions = ['field1', 'field2', 'field3']
  const searchBarOnFieldSelection = () => {}

  beforeEach(() => {
    searchBarInputPlaceholder = 'Test'
  })

  it('renders successfully', () => {
    const tableHeaders = []

    expect(() => {
      render(
        <CustomDataTable
          idFieldName={idFieldName}
          idFieldType={idFieldType}
          tableHeaders={tableHeaders}
          data={[]}
          searchBarInputName={searchBarInputName}
          searchBarInputPlaceholder={searchBarInputPlaceholder}
          searchBarSelectName={searchBarSelectName}
          searchBarSelectOptions={searchBarSelectOptions}
          searchBarOnFieldSelection={searchBarOnFieldSelection}
        />
      )
    }).not.toThrow()
  })

  describe('render dataTable with stacked columns on mobile', () => {
    const headers = tableHeader().tableColumns
    const data = standard().tableRows
    const firstColumnName = headers[0].fieldName
    const firstIdVal = data[0][firstColumnName]

    beforeEach(() => {
      render(
        <CustomDataTable
          idFieldName={idFieldName}
          idFieldType="number"
          searchBarInputName={searchBarInputName}
          searchBarInputPlaceholder={searchBarInputPlaceholder}
          searchBarSelectName={searchBarSelectName}
          searchBarSelectOptions={searchBarSelectOptions}
          searchBarOnFieldSelection={searchBarOnFieldSelection}
          showRouteName="tblTimesheet"
          showRouteIdFieldName="TimeSheet_Number"
          editRouteName="editTblTimesheet"
          editRouteIdFieldName="TimeSheet_Number"
          tableHeaders={headers}
          data={data}
        />
      )
    })

    it('should render one stacked column', async () => {
      const element = await screen.getByTestId('dl-' + firstIdVal)
      expect(element).toBeInTheDocument()
    })

    it('should render top stacked column', async () => {
      const topStackupColumns = headers.filter((header) => {
        if (header.isStackupTop) {
          return header
        }
      })

      expect(topStackupColumns).toHaveLength(1)
    })

    it('should render other stacked columns', async () => {
      const stackupColumns = headers.filter((header) => {
        if (header.isStackup) {
          return header
        }
      })

      expect(stackupColumns).toHaveLength(2)
    })
  })

  describe('render dataTable', () => {
    const tableHeaders = tableHeader().tableColumns
    const idFieldName = 'id'

    describe('render dataTable --> headers', () => {
      beforeEach(() => {
        render(
          <CustomDataTable
            idFieldName={idFieldName}
            idFieldType="number"
            tableHeaders={tableHeaders}
            data={[]}
            searchBarInputName={searchBarInputName}
            searchBarInputPlaceholder={searchBarInputPlaceholder}
            searchBarSelectName={searchBarSelectName}
            searchBarSelectOptions={searchBarSelectOptions}
            searchBarOnFieldSelection={searchBarOnFieldSelection}
          />
        )
      })

      it('should render header cell', async () => {
        await waitFor(() => {
          expect(
            screen.getByTestId(tableHeaders[0].headerTitle)
          ).toBeInTheDocument()
        })
      })

      it('should render all header cells', async () => {
        await waitFor(() => {
          tableHeaders.forEach((header) => {
            expect(screen.getByTestId(header.headerTitle)).toBeInTheDocument()
          })
        })
      })
    })

    describe('render dataTable --> rows', () => {
      const data = standard().tableRows
      const onDeleteItemHandler = jest.fn()

      it('should be equeal to header length and row columns length', async () => {
        const headerLength = tableHeaders.length
        const columnsLength = Object.keys(data[0]).length

        await waitFor(() => {
          expect(headerLength).toEqual(columnsLength)
        })
      })

      beforeEach(() => {
        render(
          <CustomDataTable
            idFieldName={idFieldName}
            idFieldType={idFieldType}
            tableHeaders={tableHeaders}
            data={data}
            searchBarInputName={searchBarInputName}
            searchBarInputPlaceholder={searchBarInputPlaceholder}
            searchBarSelectName={searchBarSelectName}
            searchBarSelectOptions={searchBarSelectOptions}
            searchBarOnFieldSelection={searchBarOnFieldSelection}
            showRouteName="tblTimesheet"
            showRouteIdFieldName="TimeSheet_Number"
            editRouteName="editTblTimesheet"
            editRouteIdFieldName="TimeSheet_Number"
            deleteItemHandler={onDeleteItemHandler}
          />
        )
      })

      it('should render single row', async () => {
        await waitFor(() => {
          const firstRow = data[0]
          const fields = Object.keys(tableHeaders)
          const firstFieldName = tableHeaders[fields[0]].fieldName
          const element = 'table-row-' + firstRow[firstFieldName]

          expect(screen.getByTestId(element)).toBeInTheDocument()
        })
      })

      it('should render single cell in a single row', async () => {
        await waitFor(() => {
          const firstRow = data[0]
          const fields = Object.keys(tableHeaders)
          const firstFieldName = tableHeaders[fields[0]].fieldName
          const firstRowCellValue = firstRow[firstFieldName]
          const regEx = new RegExp(firstRowCellValue, 'i')
          const elements = screen.getAllByRole('cell', { name: regEx })

          expect(elements[0]).toBeInTheDocument()
        })
      })

      // shs 231006: blocked redundent codes:
      // truncate functionality blocked in CustomDataTable as truncate function will be called in formatted data passed as props
      // thus truncate functionality test blocked also
      // it('should render truncated cell if truncateVal props supplied', async () => {
      //   await waitFor(() => {
      //     const firstRow = data[0]
      //     const fields = Object.keys(tableHeaders)

      //     const truncateFieldObj = tableHeaders[fields[2]]
      //     const truncateVal = parseInt(truncateFieldObj.truncateVal)

      //     const truncatedCellValue = truncate(
      //       firstRow[truncateFieldObj.fieldName],
      //       truncateVal
      //     )

      //     // console.log('truncatedCellValue:', truncatedCellValue)
      //     // console.log('truncateVal:', truncateVal)

      //     const regEx = new RegExp(truncatedCellValue, 'i')
      //     const elements = screen.getAllByRole('cell', { name: regEx })

      //     expect(elements[0]).toBeInTheDocument()
      //   })
      // })

      it('should render all cells in a single row', async () => {
        await waitFor(() => {
          Object.keys(tableHeaders).map((key) => {
            const firstRowData = data[0]
            const fieldName = tableHeaders[key].fieldName
            const rowCellValue = firstRowData[fieldName]
            const regEx = new RegExp(rowCellValue, 'i')
            const elements = screen.getAllByRole('cell', { name: regEx })

            expect(elements[0]).toBeInTheDocument()
          })
        })
      })

      it('should render all cells in all rows', async () => {
        await waitFor(() => {
          data.forEach((datum) => {
            Object.keys(tableHeaders).map((key) => {
              const rowData = datum
              const fieldName = tableHeaders[key].fieldName
              const rowCellValue = rowData[fieldName]
              const regEx = new RegExp(rowCellValue, 'i')
              const elements = screen.getAllByRole('cell', { name: regEx })

              expect(elements[0]).toBeInTheDocument()
            })
          })
        })
      })

      it('should navigate to details page when show link clicked', async () => {
        const firstLink = await screen.getByTestId(
          'details-link-' + data[0][idFieldName]
        )
        expect(firstLink).toHaveAttribute('href', '/timesheets/1')
      })

      it('should navigate to edit page when edit link clicked', async () => {
        await waitFor(() => {
          const firstLink = screen.getAllByRole('link', { name: 'Edit' })[0]
          expect(firstLink).toHaveAttribute('href', '/timesheets/1/edit')
        })
      })

      it('should delete link clickable', async () => {
        const firstLink = await screen.getAllByRole('link', {
          name: 'Delete',
        })[0]
        await userEvent.click(firstLink)
        expect(onDeleteItemHandler).toHaveBeenCalledTimes(1)
        expect(onDeleteItemHandler).toHaveBeenCalled()
      })
    })
  })

  describe('render dataTable --> huge data', () => {
    // shs 230810: With 100 totalHeaders and 2 totalRows, this test is requiring about 340,000 ms (5.6 mins) complete. Need to check later why
    const totalHeaders = 10 // Increase this value when need to test with many headers. Otherwise keep it smaller for less test runner time
    const totalRows = 2
    const testTimeout = 5000000 // Increase this value also if we need to test with many headers
    const tableHeadersLong = tableHeadersLongData(totalHeaders)

    const idFieldName = 'header0'

    describe(`with ${totalHeaders} headers`, () => {
      beforeEach(() => {
        render(
          <CustomDataTable
            idFieldName={idFieldName}
            idFieldType={idFieldType}
            searchBarInputName={searchBarInputName}
            searchBarInputPlaceholder={searchBarInputPlaceholder}
            searchBarSelectName={searchBarSelectName}
            searchBarSelectOptions={searchBarSelectOptions}
            searchBarOnFieldSelection={searchBarOnFieldSelection}
            tableHeaders={tableHeadersLong}
            data={[]}
          />
        )
      })

      it('should render all header cells', async () => {
        await waitFor(() => {
          tableHeadersLong.forEach((header) => {
            expect(screen.getByTestId(header.headerTitle)).toBeInTheDocument()
          })
        })
      })
    })

    describe(`with ${totalRows} rows`, () => {
      let data

      beforeEach(() => {
        data = standardLongData(tableHeadersLong, totalHeaders, totalRows)

        render(
          <CustomDataTable
            searchBarInputName={searchBarInputName}
            searchBarInputPlaceholder={searchBarInputPlaceholder}
            searchBarSelectName={searchBarSelectName}
            searchBarSelectOptions={searchBarSelectOptions}
            searchBarOnFieldSelection={searchBarOnFieldSelection}
            idFieldName={idFieldName}
            idFieldType="number"
            showRouteName="tblTimesheet"
            showRouteIdFieldName="TimeSheet_Number"
            editRouteName="editTblTimesheet"
            editRouteIdFieldName="TimeSheet_Number"
            tableHeaders={tableHeadersLong}
            data={data}
          />
        )
      })

      it(
        'should render all cells in all rows',
        async () => {
          await waitFor(() => {
            data.forEach((datum) => {
              Object.keys(tableHeadersLong).map((key) => {
                const rowData = datum
                const fieldName = tableHeadersLong[key].fieldName
                const rowCellValue = rowData[fieldName]
                // const regEx = new RegExp('^' + rowCellValue + '$', 'i')
                const regEx = new RegExp(rowCellValue, 'i')
                const elements = screen.getAllByRole('cell', { name: regEx })

                expect(elements[0]).toBeInTheDocument()
              })
            })
          })
        },
        testTimeout
      )
    })
  })

  describe('render dataTable with sortable columns', () => {
    const headers = tableHeader().tableColumns
    const data = standard().tableRows
    const idFieldName = 'id'

    beforeEach(() => {
      render(
        <CustomDataTable
          searchBarInputName={searchBarInputName}
          searchBarInputPlaceholder={searchBarInputPlaceholder}
          searchBarSelectName={searchBarSelectName}
          searchBarSelectOptions={searchBarSelectOptions}
          searchBarOnFieldSelection={searchBarOnFieldSelection}
          idFieldName={idFieldName}
          idFieldType="number"
          showRouteName="tblTimesheet"
          showRouteIdFieldName="TimeSheet_Number"
          editRouteName="editTblTimesheet"
          editRouteIdFieldName="TimeSheet_Number"
          tableHeaders={headers}
          data={data}
        />
      )
    })

    it('should render ascending sortable column', async () => {
      const findFirstAscendingHeader = headers.find((header) => {
        return !!header.isSortable
      })

      const element = await screen.getByTestId(
        'sort-down-' + findFirstAscendingHeader.fieldName
      )

      expect(element).toBeInTheDocument()
    })

    it('should render desending sortable column', async () => {
      const findFirstDesendingHeader = headers.find((header) => {
        return !!header.isSortable
      })
      const sortLinkElement = screen.getByRole('link', {
        name: findFirstDesendingHeader.headerTitle,
      })

      await waitFor(() => userEvent.click(sortLinkElement))

      const element = await screen.getByTestId(
        'sort-up-' + findFirstDesendingHeader.fieldName
      )

      expect(element).toBeInTheDocument()
    })

    it('should not render as sortable column if isSortable=false or isSortable key is missing', async () => {
      const nonSortableHeaders = headers.filter((header) => {
        return !header.isSortable
      })

      const element = screen.queryByTestId(
        'sort-down-' + nonSortableHeaders[0].fieldName
      )

      expect(element).not.toBeInTheDocument()
    })
  })

  describe('render dataTable without summary footer if summarizable column not exist', () => {
    const headers = tableHeader().tableColumns
    const data = standard().tableRows
    const idFieldName = 'id'

    const headersWithoutSummarizableField = headers.filter((header) => {
      return !header.isSummarizable
    })

    beforeEach(() => {
      render(
        <CustomDataTable
          searchBarInputName={searchBarInputName}
          searchBarInputPlaceholder={searchBarInputPlaceholder}
          searchBarSelectName={searchBarSelectName}
          searchBarSelectOptions={searchBarSelectOptions}
          searchBarOnFieldSelection={searchBarOnFieldSelection}
          idFieldName={idFieldName}
          idFieldType="number"
          showRouteName="tblTimesheet"
          showRouteIdFieldName="TimeSheet_Number"
          editRouteName="editTblTimesheet"
          editRouteIdFieldName="TimeSheet_Number"
          tableHeaders={headersWithoutSummarizableField}
          data={data}
        />
      )
    })

    it('should not render summary footer', async () => {
      render(
        <CustomDataTable
          searchBarInputName={searchBarInputName}
          searchBarInputPlaceholder={searchBarInputPlaceholder}
          searchBarSelectName={searchBarSelectName}
          searchBarSelectOptions={searchBarSelectOptions}
          searchBarOnFieldSelection={searchBarOnFieldSelection}
          idFieldName={idFieldName}
          idFieldType="number"
          showRouteName="tblTimesheet"
          showRouteIdFieldName="TimeSheet_Number"
          editRouteName="editTblTimesheet"
          editRouteIdFieldName="TimeSheet_Number"
          tableHeaders={headersWithoutSummarizableField}
          data={data}
        />
      )

      const element = await screen.queryByTestId('data-table-footer')

      expect(element).not.toBeInTheDocument()
    })
  })

  describe('render dataTable with with summary footer if summarizable column exist', () => {
    const headers = tableHeader().tableColumns
    const data = standard().tableRows
    const idFieldName = 'id'

    beforeEach(() => {
      render(
        <CustomDataTable
          searchBarInputName={searchBarInputName}
          searchBarInputPlaceholder={searchBarInputPlaceholder}
          searchBarSelectName={searchBarSelectName}
          searchBarSelectOptions={searchBarSelectOptions}
          searchBarOnFieldSelection={searchBarOnFieldSelection}
          idFieldName={idFieldName}
          idFieldType="number"
          showRouteName="tblTimesheet"
          showRouteIdFieldName="TimeSheet_Number"
          editRouteName="editTblTimesheet"
          editRouteIdFieldName="TimeSheet_Number"
          deleteItemHandler={() => {}}
          tableHeaders={headers}
          data={data}
          additionalTotalValue={100}
          additionalTotalTitle="Tax"
        />
      )
    })

    it('should render summary footer', async () => {
      const summarizableField = headers.find((header) => {
        return !!header.isSummarizable
      })

      const element = await screen.getByTestId('data-table-footer')

      expect(summarizableField).not.toBe(null)
      expect(element).toBeInTheDocument()
    })

    it('should have proper number of column span', async () => {
      // get the first row in data
      const firstRow = data[0]
      // get id field value of the first row
      const firstRowIdFieldVal = firstRow[idFieldName]

      const totalRenderedCellsInARow = await screen
        .getByTestId('table-row-' + firstRowIdFieldVal)
        .querySelectorAll('td').length
      const colSpan = await screen
        .getByTestId('data-table-subtotal-title-sm')
        .getAttribute('colSpan')

      // Here offset value 1. Which should be deducted to get actual column span
      const shouldBeColSpanVal = totalRenderedCellsInARow - 1

      expect(parseInt(colSpan)).toEqual(shouldBeColSpanVal)
    })

    it('should render summary sub-total value', async () => {
      let subTotalFromRows = 0
      const summaryFieldName = headers.find((header) => {
        return !!header.isSummarizable
      }).fieldName

      waitFor(() => {
        data.forEach((datum) => {
          const idFieldValue = datum[idFieldName]
          const priceVal = screen.getByTestId(
            'data-table-cell-' + summaryFieldName + '-' + idFieldValue
          ).textContent

          subTotalFromRows = subTotalFromRows + parseInt(priceVal)
        })
      })

      const subTotal = screen.getByTestId('data-table-subtotal').textContent

      expect(parseInt(subTotal)).toBe(subTotalFromRows)
    })

    it('should render summary additional value if additionalTotalValue props passed', async () => {
      const elementTitle = await screen.queryByTestId(
        'data-table-additional-total-title-sm'
      )
      const elementValue = await screen.queryByTestId(
        'data-table-additional-total'
      )

      expect(elementTitle).toBeInTheDocument()
      expect(elementValue).toBeInTheDocument()
    })

    it('should render summary total value', async () => {
      const subTotalVal = await screen.queryByTestId('data-table-subtotal')
        .textContent
      const additionalVal = await screen.queryByTestId(
        'data-table-additional-total'
      ).textContent

      const totalVal = screen.queryByTestId('data-table-total').textContent
      const total = parseInt(subTotalVal) + parseInt(additionalVal)

      expect(total).toBe(parseInt(totalVal))
    })
  })
})
