// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomButtonControl> = (args) => {
//   return <CustomButtonControl {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomButtonControl from './CustomButtonControl'

export const generated = () => {
  const text = 'Delete'
  const className = 'rw-button-warning'

  return (
    <CustomButtonControl
      text={text}
      className={className}
      clickHandler={() => {}}
    />
  )
}

export default {
  title: 'Components/CustomControls/CustomFormControls/CustomButtonControl',
  component: CustomButtonControl,
} as ComponentMeta<typeof CustomButtonControl>
