// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomFormSection> = (args) => {
//   return <CustomFormSection {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomInputControl from '../CustomInputControl/CustomInputControl'

import CustomFormSection from './CustomFormSection'

export const generated = () => {
  return (
    <CustomFormSection
      sectionTitle="Profile"
      sectionSubTitle="This information will be displayed publicly so be careful what you share."
    >
      <CustomInputControl
        colSpan={3}
        label="First Name"
        preText="Mr. "
        inputName="firstName"
        inputId="firstName"
        placeholder="First Name"
        validation={{}}
      />

      <CustomInputControl
        colSpan={2}
        label="Middle Name"
        inputName="middleName"
        inputId="middleName"
        placeholder="Middle Name"
        validation={{}}
      />

      <CustomInputControl
        colSpan={2}
        label="Last Name"
        inputName="lastName"
        inputId="lastName"
        placeholder="Last Name"
        validation={{}}
      />
    </CustomFormSection>
  )
}

export default {
  title: 'Components/CustomControls/CustomFormControls/CustomFormSection',
  component: CustomFormSection,
} as ComponentMeta<typeof CustomFormSection>
