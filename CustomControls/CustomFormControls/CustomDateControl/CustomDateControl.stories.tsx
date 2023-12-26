// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomDateControl> = (args) => {
//   return <CustomDateControl {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import RedwoodjsFormWrapper from 'src/components/CustomWrappers/RedwoodjsFormWrapper'

import CustomDateControl from './CustomDateControl'

export const generated = () => {
  const inputName = 'test-date1'
  const inputId = 'test-date1'
  const label = 'Date'
  const colSpan = 4

  return (
    <div className="rw-input-grid-div">
      <RedwoodjsFormWrapper>
        <CustomDateControl
          colSpan={colSpan}
          label={label}
          inputName={inputName}
          inputId={inputId}
          placeholder=""
          validation={{}}
        />
      </RedwoodjsFormWrapper>
    </div>
  )
}

export default {
  title: 'Components/CustomControls/CustomFormControls/CustomDateControl',
  component: CustomDateControl,
} as ComponentMeta<typeof CustomDateControl>
