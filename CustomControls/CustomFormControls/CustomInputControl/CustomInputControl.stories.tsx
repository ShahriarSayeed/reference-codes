// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomInputControl> = (args) => {
//   return <CustomInputControl {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import RedwoodjsFormWrapper from 'src/components/CustomWrappers/RedwoodjsFormWrapper'

import CustomInputControl from './CustomInputControl'

export const generated = () => {
  return (
    <div className="rw-input-grid-div">
      <RedwoodjsFormWrapper>
        <CustomInputControl
          colSpan={4}
          label="First Name"
          preText="Mr. "
          inputName="firstName"
          inputId="firstName"
          placeholder="First Name"
          validation={{}}
        />
      </RedwoodjsFormWrapper>
    </div>
  )
}

export default {
  title: 'Components/CustomControls/CustomFormControls/CustomInputControl',
  component: CustomInputControl,
} as ComponentMeta<typeof CustomInputControl>
