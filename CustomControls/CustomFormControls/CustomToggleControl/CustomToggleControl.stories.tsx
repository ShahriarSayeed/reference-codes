// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomToggleControl> = (args) => {
//   return <CustomToggleControl {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import RedwoodjsFormWrapper from 'src/components/CustomWrappers/RedwoodjsFormWrapper'

import CustomToggleControl from './CustomToggleControl'

export const generated = () => {
  const inputId = 'toggle-test-input'
  const inputName = 'toggle-test-input'

  return (
    <div className="rw-input-grid-div">
      <RedwoodjsFormWrapper>
        <CustomToggleControl inputId={inputId} inputName={inputName} />
      </RedwoodjsFormWrapper>
    </div>
  )
}

export default {
  title: 'Components/CustomControls/CustomFormControls/CustomToggleControl',
  component: CustomToggleControl,
} as ComponentMeta<typeof CustomToggleControl>
