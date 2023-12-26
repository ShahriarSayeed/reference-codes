// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof AppHeader> = (args) => {
//   return <AppHeader {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import AppHeader from './AppHeader'

export const generated = () => {
  return <AppHeader />
}

export default {
  title: 'Components/CustomControls/AppHeader',
  component: AppHeader,
} as ComponentMeta<typeof AppHeader>
