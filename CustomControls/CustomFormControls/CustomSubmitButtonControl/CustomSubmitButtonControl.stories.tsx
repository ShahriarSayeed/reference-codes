// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomSubmitButtonControl> = (args) => {
//   return <CustomSubmitButtonControl {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomSubmitButtonControl from './CustomSubmitButtonControl'

export const generated = () => {
  const text = 'Submit'

  return <CustomSubmitButtonControl text={text} />
}

export default {
  title:
    'Components/CustomControls/CustomFormControls/CustomSubmitButtonControl',
  component: CustomSubmitButtonControl,
} as ComponentMeta<typeof CustomSubmitButtonControl>
