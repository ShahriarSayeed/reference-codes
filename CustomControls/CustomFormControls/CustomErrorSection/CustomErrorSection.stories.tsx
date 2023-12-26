// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomErrorSection> = (args) => {
//   return <CustomErrorSection {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomErrorSection from './CustomErrorSection'

export const generated = () => {
  const errorHTTPStatusCode = 404
  const errorTitle = 'Page not found'
  const errorMsg = "Sorry, we couldn't find the page you're looking for."

  return (
    <CustomErrorSection
      errorHTTPStatusCode={errorHTTPStatusCode}
      errorTitle={errorTitle}
      errorMsg={errorMsg}
    />
  )
}

export default {
  title: 'Components/CustomControls/CustomErrorSection',
  component: CustomErrorSection,
} as ComponentMeta<typeof CustomErrorSection>
