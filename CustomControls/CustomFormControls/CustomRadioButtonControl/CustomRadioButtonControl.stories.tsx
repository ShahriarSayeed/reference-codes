// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomRadioButtonControl> = (args) => {
//   return <CustomRadioButtonControl {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomRadioButtonControl from './CustomRadioButtonControl'

export const generated = () => {
  const label = 'Everything'
  const inputId = 'push-everything'
  const inputName = 'push-notifications'

  return (
    <CustomRadioButtonControl
      label={label}
      inputId={inputId}
      inputName={inputName}
    />
  )
}

export default {
  title:
    'Components/CustomControls/CustomFormControls/CustomRadioButtonControl',
  component: CustomRadioButtonControl,
} as ComponentMeta<typeof CustomRadioButtonControl>
