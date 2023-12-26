import React, { useEffect, useState } from 'react'

import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'

import { Link, routes } from '@redwoodjs/router'

import { truncate } from 'src/lib/formatters'

import SearchBarWithSort from '../SearchBarWithSort/SearchBarWithSort'

type CustomPropsType = {
  // data-table props: main props
  idFieldName: string
  idFieldType: 'number' | 'string'
  tableHeaders: object[]
  data: object[]

  // data-table props: action links props
  showRouteName?: string
  showRouteIdFieldName?: string
  editRouteName?: string
  editRouteIdFieldName?: string
  deleteItemHandler?: (id: number) => void

  // search-bar props
  searchBarInputName: string
  searchBarInputPlaceholder: string
  searchBarSelectName: string
  searchBarSelectOptions: string[]
  searchBarOnFieldSelection: () => void

  // footer props
  additionalTotalValue?: number
  additionalTotalTitle?: string

  // data-table header props
  addNewLink?: string
  addNewTitle?: string
}

const CustomDataTable = (props: CustomPropsType) => {
  const {
    // data-table props: main props
    idFieldName,
    idFieldType,
    tableHeaders,
    data,
    // data-table props: action links props
    showRouteName,
    showRouteIdFieldName,
    editRouteName,
    editRouteIdFieldName,
    deleteItemHandler,
    // search-bar props
    searchBarInputName,
    searchBarInputPlaceholder,
    searchBarSelectName,
    searchBarSelectOptions,
    searchBarOnFieldSelection,
    // footer props
    additionalTotalValue,
    additionalTotalTitle,
    // data-table header props
    addNewLink,
    addNewTitle,
  } = props

  const [stackTopFieldName, setStackTopFieldName] = useState('') // for mobile devices: store top stack column
  const [stackBellowFieldNames, setStackBellowFieldNames] = useState([]) // for mobile devices: store which columns will be shown under top stack column
  const [stackAfterFieldName, setStackAfterFieldName] = useState('') // for mobile devices: store the column which will be shown after stacked columns on mobile.
  const [formattedTableHeaders, setFormattedTableHeaders] = useState([])
  const [summarizableColumnName, setSummarizableColumnName] = useState<
    string | null
  >(null)
  const [subTotal, setSubTotal] = useState(0)
  const [footerColumnSpan, setFooterColumnSpan] = useState(0)
  const [summaryTotal, setSummaryTotal] = useState(0)
  const [truncateFields, setTruncateFields] = useState([]) // store which columns' value will be truncated

  // this hook calculate table headers
  // it store which column is stack top, which columns are under stack top column,
  // total headers, sort column name, truncate columns, formate headers etc
  useEffect(() => {
    // iterrate through columns headers to get meta data about each column in data-table

    // for mobile devices -->
    //    (i) get which field will be top of the stackup column and which fields are bellow of top stackup column
    //    (ii) only isStackupTop=true, isStackup=true and afterStackup=true marked columns will be shown on mobile devices
    //    (iii) there have no other space to show other columns
    if (tableHeaders && Array.isArray(tableHeaders)) {
      let stckTopFieldName // for mobile devices: store top stack column
      let stckAfterFieldName // for mobile devices: store the column which will be shown after stacked columns on mobile.

      let sumColumnName: string | null = null // store the column name which will be summarized and shown at footer of the table
      let tblHeaderLength = tableHeaders.length

      const stckBellowFieldNames = [] // for mobile devices: store which columns will be shown under top stack column
      const sortDirections = []
      const truncateFieldList = []

      // increase table header length if show link props supplied
      if (showRouteName) {
        tblHeaderLength = tblHeaderLength + 1
      }

      // increase table header length if edit link props supplied
      if (editRouteName) {
        tblHeaderLength = tblHeaderLength + 1
      }

      // increase table header length if delete event handler props supplied
      if (deleteItemHandler) {
        tblHeaderLength = tblHeaderLength + 1
      }

      // Here offset value 1. Which should be deducted to get actual column span
      const colSpan = tblHeaderLength - 1

      const formattedHeaders = tableHeaders?.map((item: object) => {
        // for mobile device: calculation of stack top,bellow and after columns
        if (item['isStackupTop']) {
          stckTopFieldName = item['fieldName']
        }
        if (item['isStackup']) {
          stckBellowFieldNames.push(item['fieldName'])
        }
        if (item['afterStackup']) {
          stckAfterFieldName = item['fieldName']
        }
        if (item['isSummarizable']) {
          sumColumnName = item['fieldName']
        }
        // for mobile device: end of calculation of stack top,bellow and after columns

        // determine which column will be sorted
        if (
          item['isSortable'] &&
          Boolean(item['isSortable']) &&
          item['isSortable'] === true
        ) {
          sortDirections.push({
            column: item,
            sortDirection: 'ASC',
          })

          return { ...item, sortDirection: 'ASC' }
        }

        // determine which columns' value will be truncated
        if (item['truncateVal']) {
          truncateFieldList.push({
            fieldName: item['fieldName'],
            truncateVal: item['truncateVal'],
          })
        }

        return { ...item }
      })

      setStackTopFieldName(stckTopFieldName)
      setStackBellowFieldNames(stckBellowFieldNames)
      setStackAfterFieldName(stckAfterFieldName)
      setFormattedTableHeaders(formattedHeaders)
      setSummarizableColumnName(sumColumnName)
      setFooterColumnSpan(colSpan)
      setTruncateFields(truncateFieldList)
    }
  }, [tableHeaders])

  // this hook calculate sub-total and summary total in Table Footer.
  useEffect(() => {
    if (summarizableColumnName) {
      let subTotalAmount = 0
      let totalAmount = 0

      data?.forEach((row) => {
        subTotalAmount = subTotalAmount + parseInt(row[summarizableColumnName])
      })

      if (additionalTotalValue) {
        totalAmount = subTotalAmount + additionalTotalValue
      } else {
        totalAmount = subTotalAmount
      }

      setSubTotal(subTotalAmount)
      setSummaryTotal(totalAmount)
    }
  }, [data, summarizableColumnName])

  // returns RW route of show link
  const getShowLinkRoutePath = (val: string) => {
    let fieldValue: string | number
    if (idFieldType === 'number') {
      fieldValue = parseInt(val)
    } else {
      fieldValue = val
    }

    return routes[showRouteName]({
      [showRouteIdFieldName]: fieldValue,
    })
  }

  // returns RW route of edit link
  const getEditLinkRoutePath = (val: string) => {
    let fieldValue: string | number
    if (idFieldType === 'number') {
      fieldValue = parseInt(val)
    } else {
      fieldValue = val
    }

    return routes[editRouteName]({
      [editRouteIdFieldName]: fieldValue,
    })
  }

  const handleDeleteItem = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: number
  ) => {
    event.preventDefault()
    deleteItemHandler(id)
  }

  const handleColumnSort = (
    event: React.MouseEvent<HTMLAnchorElement>,
    column: Object
  ) => {
    event.preventDefault()

    const resetHeaders = formattedTableHeaders.map((item: Object) => {
      if (item['fieldName'] === column['fieldName']) {
        if (item['sortDirection'] === 'ASC') {
          return { ...item, sortDirection: 'DSC' }
        }

        return { ...item, sortDirection: 'ASC' }
      }

      return { ...item }
    })

    setFormattedTableHeaders(resetHeaders)
  }

  // render table headers based on formattedTableHeaders state. formattedTableHeaders state built in useEffect hooks before
  const renderTableHeaders = () => {
    return formattedTableHeaders?.map((item: object, index: number) => {
      const visualIndex = index + 1
      let isSortable = false
      let tableCell
      let hidden

      // Only 1st column appear on mobile devices
      if (visualIndex === 1) {
        tableCell = ''
        hidden = ''
      }

      // 2nd to 4th columns appear from sm devices
      if (visualIndex >= 2 && visualIndex <= 4) {
        tableCell = 'sm:table-cell'
        hidden = 'hidden'
      }

      // 5th and rest of columns appear from md devices
      if (visualIndex >= 5) {
        tableCell = 'md:table-cell'
        hidden = 'hidden'
      }

      // If it is a afterStackup column, then clean above tableCell and hidden variable to make sure this field vissible on mobile devices
      if (item['afterStackup']) {
        tableCell = ''
        hidden = ''
      }

      // determine if column is sortable
      if (
        item['isSortable'] &&
        Boolean(item['isSortable']) &&
        item['isSortable'] === true
      ) {
        isSortable = true
      }

      return (
        <th
          key={item['headerTitle']}
          data-testid={item['headerTitle']}
          scope="col"
          className={`rw-table-header-cell ${hidden} ${tableCell}`}
        >
          {isSortable ? (
            <a
              href="/"
              onClick={(event) => handleColumnSort(event, item)}
              className="group inline-flex"
            >
              {item['headerTitle']}
              <span>
                {item['sortDirection'] === 'ASC' ? (
                  <ChevronDownIcon
                    data-testid={'sort-down-' + item['fieldName']}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronUpIcon
                    data-testid={'sort-up-' + item['fieldName']}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                )}
              </span>
            </a>
          ) : (
            item['headerTitle']
          )}
        </th>
      )
    })
  }

  // render each cell in a row
  const renderCell = (row: object) => {
    let hidden
    let topStackColumnVal = ''

    const bellowStackColumnValues = []
    // const nonStackColumnVal = []

    // calculations codes -->
    // for mobile devices: iterate all keys in a row
    Object.keys(row).forEach((key) => {
      // determine if it is a top stack column. get that top stack column value
      if (key === stackTopFieldName) {
        topStackColumnVal = row[key]
      }
      // determine if it is a bellow stack column. collect that bellow stack column value to put under top stack later
      else if (stackBellowFieldNames.includes(key)) {
        bellowStackColumnValues.push(row[key])
      }
      // // todo: unused codes. remove later
      // else {
      //   nonStackColumnVal.push(row[key])
      // }
    })

    // render cell codes -->
    // render each cell based on above calculation
    return Object.keys(row).map((key, index: number) => {
      let tableCell = ''
      const visualIndex = index + 1

      // 1st column
      if (visualIndex === 1) {
        tableCell = ''
        hidden = ''

        return (
          <td
            key={row[key]}
            data-testid={'data-table-cell-' + key + '-' + row[idFieldName]}
            role="cell"
            className={`rw-table-row-cell`}
          >
            {/* stacked top column. appear on all devices */}
            {topStackColumnVal}

            {/* for mobile devices: stacked bellow columns appear under stacked top column */}
            <dl
              className="font-normal sm:hidden"
              data-testid={'dl-' + row[Object.keys(row)[0]]}
            >
              {bellowStackColumnValues.map((val) => {
                return (
                  <React.Fragment key={val}>
                    <dt className="sr-only">Column Name</dt>
                    <dd
                      className="mt-1 truncate text-gray-700"
                      data-testid={'dd-' + row[Object.keys(row)[0]] + val}
                    >
                      {val}
                    </dd>
                  </React.Fragment>
                )
              })}
            </dl>
          </td>
        )
      }

      // 2nd to 4th columns appear from sm devices
      if (visualIndex >= 2 && visualIndex <= 4) {
        tableCell = 'sm:table-cell'
        hidden = 'hidden'
      }

      // 5th and rest of columns appear from md devices
      if (visualIndex >= 5) {
        tableCell = 'md:table-cell'
        hidden = 'hidden'
      }

      // todo: make this single if block to if/else block
      // If it is a afterStackup column, then clean above tableCell and hidden variable to make sure this field vissible on mobile devices
      if (key === stackAfterFieldName) {
        tableCell = ''
        hidden = ''
      }

      // shs 231006: blocked redundent codes:
      // truncate functionality blocked here as truncate function will be called in formatted data passed as props.
      // determine if it is a truncate column, truncate the value
      // let truncateValue: null | number = null

      // const truncateField = truncateFields.find((item) => {
      //   return item['fieldName'] === key
      // })

      // if (truncateField) {
      //   truncateValue = parseInt(truncateField['truncateVal'])
      // }

      return (
        <td
          key={key + index}
          data-testid={'data-table-cell-' + key + '-' + row[idFieldName]}
          role="cell"
          className={`rw-table-row-cell ${hidden} ${tableCell}`}
        >
          {/* shs 231006: blocked redundent codes: */}
          {/* truncate functionality blocked here as truncate function will be called in formatted data passed as props. */}
          {/* {truncateValue ? truncate(row[key], truncateValue) : row[key]} */}
          {row[key]}
        </td>
      )
    })
  }

  const renderTableRow = () => {
    return data?.map((row) => {
      return (
        <tr
          key={'table-row-' + row[idFieldName]}
          data-testid={'table-row-' + row[idFieldName]}
        >
          {/* Render each cell in a Row */}
          {renderCell(row)}

          {/* ********** Action links: Show, Edit, Delete links  ********* */}
          {/* Start: */}
          <td
            key={'table-cell-show-' + row[idFieldName]}
            className="rw-table-row-actions-cell"
          >
            {/* This part will be shown on every devices */}

            <Link
              to={getEditLinkRoutePath(row[idFieldName])}
              title={'Edit'}
              className="text-blue-600 hover:text-blue-900"
            >
              Edit
            </Link>

            {/* This part will be shown on mobile devices. From sm devices, it will be hidden by this code: sm:hidden */}
            <dl className="font-normal sm:hidden">
              <dt className="sr-only">Delete</dt>
              <dd className="mt-1 truncate text-gray-500">
                <a
                  href="/"
                  onClick={(event) => handleDeleteItem(event, row[idFieldName])}
                  className="hover:red-900 text-red-600"
                >
                  Delete
                </a>
              </dd>
            </dl>
          </td>

          {/* This part will be shown from sm devices. On mobile, this part will be hidden */}
          <td
            key={'table-cell-edit'}
            className="rw-table-row-actions-cell hidden sm:table-cell"
          >
            <a
              href="/"
              onClick={(event) => handleDeleteItem(event, row[idFieldName])}
              className="hover:red-900 text-red-600"
            >
              Delete
            </a>
          </td>

          {/* This part will be shown from sm devices. On mobile, this part will be hidden */}
          <td key={'table-cell-delete'} className="rw-table-row-actions-cell">
            <div className="flex justify-center">
              <Link
                to={getShowLinkRoutePath(row[idFieldName])}
                title={'Show detail'}
                className="font-normal"
                data-testid={'details-link-' + row[idFieldName]}
              >
                <ChevronRightIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </td>
          {/* End: */}
        </tr>
      )
    })
  }

  const renderSummaryFooter = () => {
    return (
      <tfoot data-testid={'data-table-footer'}>
        <tr>
          <th
            data-testid={'data-table-subtotal-title-sm'}
            scope="row"
            colSpan={footerColumnSpan}
            className="rw-table-footer-title-sm pt-6 font-normal text-gray-500 sm:table-cell"
          >
            Subtotal
          </th>
          <th
            scope="row"
            className="rw-table-footer-title pt-4 font-normal text-gray-500 sm:hidden"
          >
            Subtotal
          </th>
          <td
            data-testid={'data-table-subtotal'}
            className="rw-table-footer-amount pt-6 text-gray-500"
          >
            {subTotal}
          </td>
        </tr>
        {!!additionalTotalValue && (
          <tr>
            <th
              data-testid={'data-table-additional-total-title-sm'}
              scope="row"
              colSpan={footerColumnSpan}
              className="rw-table-footer-title-sm pt-4 text-gray-500 sm:table-cell"
            >
              {additionalTotalTitle}
            </th>
            <th
              scope="row"
              className="rw-table-footer-title pt-4 font-normal text-gray-500 sm:hidden"
            >
              {additionalTotalTitle}
            </th>
            <td
              data-testid={'data-table-additional-total'}
              className="rw-table-footer-amount pt-4 text-gray-500"
            >
              {additionalTotalValue}
            </td>
          </tr>
        )}

        <tr>
          <th
            scope="row"
            colSpan={footerColumnSpan}
            className="rw-table-footer-title-sm pt-4 font-semibold text-gray-900 sm:table-cell"
          >
            Total
          </th>
          <th
            scope="row"
            className="rw-table-footer-title pt-4 font-semibold text-gray-900 sm:hidden"
          >
            Total
          </th>
          <td
            data-testid={'data-table-total'}
            className="rw-table-footer-amount pt-4 font-semibold text-gray-900"
          >
            {summaryTotal}
          </td>
        </tr>
      </tfoot>
    )
  }

  return (
    <div className="mt-4 px-4 sm:px-6 lg:px-8">
      {/* shs 230728 Temporary blocked as ScaffoldLayout.tsx has same elements like in CustomDataTable.tsx
      Unblock this header section after make a decision where page header and add new button should be placed */}

      {/* <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{description}</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="flex rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <div className="rw-button-icon">+</div> {addTitle}
          </button>
        </div>
      </div> */}

      <div className="mt-4 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <SearchBarWithSort
            inputName={searchBarInputName}
            inputPlaceholder={searchBarInputPlaceholder}
            selectName={searchBarSelectName}
            selectOptions={searchBarSelectOptions}
            onFieldSelection={searchBarOnFieldSelection}
          />
        </div>

        {addNewLink && (
          <Link to={addNewLink} className="rw-button rw-button-green">
            <div className="rw-button-icon">+</div> {addNewTitle}
          </Link>
        )}
      </div>

      <div className="mt-0 flow-root sm:mt-6">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                {/* Render table header: Start */}
                <tr key="table-row-header-0">
                  {renderTableHeaders()}

                  {/* Action links: Show, Edit, Delete links */}
                  {/* Start: */}
                  {/* Short action header for mobile devices: show this action header in short form on mobile devices. Hide it from sm devices by setting sm:hidden */}
                  <th
                    key={'show-table-row-header-0'}
                    scope="col"
                    className="rw-table-header-cell sm:hidden"
                  >
                    <span>Actions</span>
                  </th>

                  {/* Full action header for other devices: show this action header in details from sm devices by setting sm:table-cell */}
                  {editRouteName && (
                    <th
                      key={'edit-table-row-header-2'}
                      scope="col"
                      className="rw-table-header-cell hidden sm:table-cell"
                    >
                      <span>Edit</span>
                    </th>
                  )}

                  {deleteItemHandler &&
                    typeof deleteItemHandler === 'function' && (
                      <th
                        key={'delete-table-row-header-3'}
                        scope="col"
                        className="rw-table-header-cell hidden sm:table-cell"
                      >
                        <span>Delete</span>
                      </th>
                    )}

                  {showRouteName && (
                    <th
                      key={'show-table-row-header-1'}
                      scope="col"
                      className="rw-table-header-cell hidden sm:table-cell"
                    >
                      <span>&nbsp;</span>
                    </th>
                  )}
                  {/* End: */}
                </tr>
              </thead>
              {/* Render table header: End */}

              {/* Render table rows: Start */}
              {data && Array.isArray(data) && <tbody>{renderTableRow()}</tbody>}
              {/* Render table rows: End */}

              {/* Render summary footer: Start */}
              {summarizableColumnName && renderSummaryFooter()}
              {/* Render summary footer: End */}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomDataTable
