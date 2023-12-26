// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomCheckboxFieldset> = (args) => {
//   return <CustomCheckboxFieldset {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomCheckboxControl from '../CustomCheckboxControl/CustomCheckboxControl'

import CustomCheckboxFieldset from './CustomCheckboxFieldset'

export const generated = () => {
  const title = 'By Email'
  const label = 'Comments'
  const subLabel = 'Get notified when someones posts a comment on a posting.'
  const inputName = 'comments'
  const inputId = 'comments'

  const label2 = 'Candidates'
  const subLabel2 = 'Get notified when a candidate applies for a job.'
  const inputName2 = 'candidates'
  const inputId2 = 'candidates'

  return (
    <CustomCheckboxFieldset title={title}>
      <CustomCheckboxControl
        label={label}
        subLabel={subLabel}
        inputName={inputName}
        inputId={inputId}
      />

      <CustomCheckboxControl
        label={label2}
        subLabel={subLabel2}
        inputName={inputName2}
        inputId={inputId2}
      />
    </CustomCheckboxFieldset>
  )
}

export default {
  title: 'Components/CustomControls/CustomFormControls/CustomCheckboxFieldset',
  component: CustomCheckboxFieldset,
} as ComponentMeta<typeof CustomCheckboxFieldset>
