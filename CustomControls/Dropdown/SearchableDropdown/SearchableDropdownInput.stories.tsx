// sd 230502
// this story causes err:
//   dex.js:56 TypeError: Cannot destructure property 'formState' of '(0 , _reactHookForm.useFormContext)(...)' as it is null.
//   at useErrorStyles (index.js:139:1)
// and useErrorStyles is in https://github.com/redwoodjs/redwood/blob/main/packages/forms/src/index.tsx
// sd could not debug. TblTimesheetForm story works without this story
// thus commented out for now

import { ComponentStory, ComponentMeta } from '@storybook/react'

import RedwoodjsFormWrapper from 'src/components/CustomWrappers/RedwoodjsFormWrapper'

import SearchableDropdownInput from './SearchableDropdownInput'

export default {
  title:
    'Components/CustomControls/CustomFormControls/SearchableDropdown/SearchableDropdownInput',
  component: SearchableDropdownInput,
} as ComponentMeta<typeof SearchableDropdownInput>

const Template: ComponentStory<typeof SearchableDropdownInput> = (args) => {
  return (
    <RedwoodjsFormWrapper>
      <SearchableDropdownInput {...args} />
    </RedwoodjsFormWrapper>
  )
}

export const generated = Template.bind({})
generated.args = {
  name: 'Job_Number',
  style: 'rw-input',
  errorStyle: 'rw-input rw-input-error',
  validation: { required: true },
  disabled: false,
  searchBy: 'S1005',
  handleChange: null,
  toggle: true,
  setToggle: null,
}
