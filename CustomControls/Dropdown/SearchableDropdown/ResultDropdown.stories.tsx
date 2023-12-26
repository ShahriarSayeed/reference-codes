import { ComponentMeta } from '@storybook/react'

// import { standard as workTypeList } from 'src/components/TlkpWorkType/WorkTypesForEmpCell/WorkTypesForEmpCell.mock'

import { standard as jobList } from 'src/components/TblJob/JobEmpTsRecentCell/JobEmpTsRecentCell.mock'

import ResultDropdown from './ResultDropdown'

// /** @type { import("@storybook/react").Meta } */
// export default {
//   title:
//     'Components/CustomControls/CustomFormControls/SearchableDropdown/ResultDropdown',
//   component: ResultDropdown,
// } as ComponentMeta<typeof ResultDropdown>

// export const generated: ComponentStory<typeof Input> = (args) => {
//   return <Input {...args} />
// }
export const generated = () => {
  const value = 'S1005'
  const showSuggestions = true
  const valueObjectHandler = null
  const toggle = true
  const setToggle = null
  const list = jobList().tblJobsByJobNumber
  const secondaryTextFieldName = 'JobType'

  return (
    <ResultDropdown
      value={value}
      showSuggestions={showSuggestions}
      valueObjectHandler={valueObjectHandler}
      toggle={toggle}
      setToggle={setToggle}
      list={list}
      secondaryTextFieldName={secondaryTextFieldName}
    />
  )
}

// export const jobDropdown = Template.bind({})
// jobDropdown.args = {
//   value: 'S1005',
//   showSuggestions: true,
//   valueObjectHandler: null,
//   toggle: true,
//   setToggle: null,
//   list: jobList().tblJobsByJobNumber,
//   secondaryTextFieldName: 'JobType',
// }

export default {
  title:
    'Components/CustomControls/CustomFormControls/SearchableDropdown/ResultDropdown',
  component: ResultDropdown,
} as ComponentMeta<typeof ResultDropdown>

// export const workTypeDropdown = Template.bind({})
// workTypeDropdown.args = {
//   value: 'SURV',
//   showSuggestions: true,
//   valueObjectHandler: null,
//   toggle: true,
//   setToggle: null,
//   list: workTypeList().tlkpWorkTypesForEmp,
// }
