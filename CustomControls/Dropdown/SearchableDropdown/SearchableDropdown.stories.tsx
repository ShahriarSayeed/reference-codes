// sd 230502
// this story causes err:
//   dex.js:56 TypeError: Cannot destructure property 'formState' of '(0 , _reactHookForm.useFormContext)(...)' as it is null.
//   at useErrorStyles (index.js:139:1)
// and useErrorStyles is in https://github.com/redwoodjs/redwood/blob/main/packages/forms/src/index.tsx
// sd could not debug. TblTimesheetForm story works without this story
// thus commented out for now
import { ComponentStory, ComponentMeta } from '@storybook/react'

import RedwoodjsFormWrapper from 'src/components/CustomWrappers/RedwoodjsFormWrapper'
import JobEmpTsRecentCell from 'src/components/TblJob/JobEmpTsRecentCell'

import SearchableDropdown from './SearchableDropdown'

// export default {
//   title: 'Components/SearchableDropdown',
//   component: SearchableDropdown,
// } as ComponentMeta<typeof SearchableDropdown>

// const Template: ComponentStory<typeof SearchableDropdown> = (args) => {
//   return (
//     <div className="rw-input-grid-div">
//       <RedwoodjsFormWrapper>
//         <SearchableDropdown {...args} />
//       </RedwoodjsFormWrapper>
//     </div>
//   )
// }

// export const generated = Template.bind({})
// generated.args = {
//   colSpan: 'full',
//   label: 'Assigned to',
//   name: 'Job_Number',
//   validation: { required: true },
//   disabled: false,
//   searchBy: 'Tom Cook',
//   handleSearchBy: () => {},
//   valueObject: {
//     jobNo: 'S1005',
//     jobDesc: 'Big Constuction Job 123 Railway Ave, Springfield',
//     taskNo: 12,
//     taskCode: '1001.02',
//   },
//   valueObjectHandler: null,
//   dataComponent: JobEmpTsRecentCell,
//   variables: {
//     empCode: 'AO',
//     includeDisbOnly: false,
//     excludeDisb: false,
//   },
// }

export const generated = () => {
  const colSpan = 6
  const label = 'Assigned to'
  const name = 'Job_Number'
  const validation = { required: true }
  const disabled = false
  const searchBy = 'Tom Cook'
  const handleSearchBy = () => {}
  const valueObject = {
    jobNo: 'S1005',
    jobDesc: 'Big Constuction Job 123 Railway Ave, Springfield',
    taskNo: 12,
    taskCode: '1001.02',
  }
  const valueObjectHandler = null
  const dataComponent = JobEmpTsRecentCell
  const variables = {
    empCode: 'AO',
    includeDisbOnly: false,
    excludeDisb: false,
  }

  return (
    <div className="rw-input-grid-div">
      <RedwoodjsFormWrapper>
        <SearchableDropdown
          colSpan={colSpan}
          label={label}
          name={name}
          validation={validation}
          disabled={disabled}
          searchBy={searchBy}
          handleSearchBy={handleSearchBy}
          valueObject={valueObject}
          valueObjectHandler={valueObjectHandler}
          dataComponent={dataComponent}
          variables={variables}
        />
      </RedwoodjsFormWrapper>
    </div>
  )
}

export default {
  title: 'Components/CustomControls/CustomFormControls/SearchableDropdown',
  component: SearchableDropdown,
} as ComponentMeta<typeof SearchableDropdown>

// const Template = (args) => {
//   return <TblTimesheetForm {...standard()} {...args} />
// }
// export const LoggedIn: ComponentStory<typeof SearchableDropdown> = (args) => {
//   return <SearchableDropdown {...args} />
// }

// const Template: ComponentStory<typeof TblTimesheetForm> = (args) => (
//   mockCurrentUser({ Employee_Code: 'AO' })
//   <TblTimesheetForm {...args} />
// )
