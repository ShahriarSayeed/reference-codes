// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomCheckboxControl> = (args) => {
//   return <CustomCheckboxControl {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomCheckboxControl from './CustomCheckboxControl'

export const generated = () => {
  const label = 'Comments'
  const subLabel = 'Get notified when someones posts a comment on a posting.'
  const inputName = 'comment'
  const inputId = 'comment'

  return (
    <CustomCheckboxControl
      label={label}
      subLabel={subLabel}
      inputName={inputName}
      inputId={inputId}
    />
  )
}

export default {
  title: 'Components/CustomControls/CustomFormControls/CustomCheckboxControl',
  component: CustomCheckboxControl,
} as ComponentMeta<typeof CustomCheckboxControl>
