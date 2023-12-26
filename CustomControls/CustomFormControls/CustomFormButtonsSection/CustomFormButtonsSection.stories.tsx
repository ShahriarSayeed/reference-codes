// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomFormButtonsSection> = (args) => {
//   return <CustomFormButtonsSection {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomFormButtonsSection from './CustomFormButtonsSection'

export const generated = () => {
  const isEditMode = true
  const deleteHandler = () => {}

  return (
    <CustomFormButtonsSection
      isEditMode={isEditMode}
      cancelBackLink="/timesheets"
      deleteHandler={deleteHandler}
      saveDisabled={false}
    />
  )
}

export default {
  title:
    'Components/CustomControls/CustomFormControls/CustomFormButtonsSection',
  component: CustomFormButtonsSection,
} as ComponentMeta<typeof CustomFormButtonsSection>
