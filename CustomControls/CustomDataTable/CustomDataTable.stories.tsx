// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomDataTable> = (args) => {
//   return <CustomDataTable {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import { withConsole } from '@storybook/addon-console'
import type { ComponentMeta } from '@storybook/react'

import { standard, tableHeader } from './CustomData.mock'
import CustomDataTable from './CustomDataTable'
// import {
//   standard as standardLong,
//   tableHeaders as tableHeaderLong,
// } from './CustomDataWithTooLongHeaders.mock'

export const generated = () => {
  const idFieldName = 'id'
  const headers = tableHeader().tableColumns
  const data = standard().tableRows

  // const idFieldName = 'header0'
  // const totalHeaders = 50
  // const totalRows = 20
  // const tableHeadersLong = tableHeaderLong(totalHeaders)

  const searchBarInputName = 'searchbar-text'
  const searchBarInputPlaceholder = 'Search...'
  const searchBarSelectName = 'searchbar-select'
  const searchBarSelectOptions = ['field1', 'field2', 'field3']
  const searchBarOnFieldSelection = () => {}

  return (
    <CustomDataTable
      searchBarInputName={searchBarInputName}
      searchBarInputPlaceholder={searchBarInputPlaceholder}
      searchBarSelectName={searchBarSelectName}
      searchBarSelectOptions={searchBarSelectOptions}
      searchBarOnFieldSelection={searchBarOnFieldSelection}
      idFieldName={idFieldName}
      idFieldType="number"
      tableHeaders={headers}
      data={data}
      // tableHeaders={tableHeadersLong}
      // data={standardLong(tableHeadersLong, totalHeaders, totalRows)}
      showRouteName="tblTimesheet"
      showRouteIdFieldName="TimeSheet_Number"
      editRouteName="editTblTimesheet"
      editRouteIdFieldName="TimeSheet_Number"
      deleteItemHandler={() => {}}
      additionalTotalValue={100}
      additionalTotalTitle="Tax"
      addNewLink={''}
      addNewTitle={''}
    />
  )
}

const componentMeta = {
  title: 'Components/CustomControls/CustomDataTable',
  component: CustomDataTable,
} as ComponentMeta<typeof CustomDataTable>

export default withConsole()(componentMeta)
