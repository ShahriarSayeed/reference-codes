// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomTextareaControl> = (args) => {
//   return <CustomTextareaControl {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomTextareaControl from './CustomTextareaControl'

export const generated = () => {
  return (
    <>
      <div className="rw-input-grid-div">
        <CustomTextareaControl
          colSpan="full"
          label="About"
          inputId="textarea-1"
          inputName="textarea-2"
          rows={3}
          subTitle="Write a few sentences about yourself."
          validation={{}}
        />
      </div>
    </>
  )
}

export default {
  title: 'Components/CustomControls/CustomFormControls/CustomTextareaControl',
  component: CustomTextareaControl,
} as ComponentMeta<typeof CustomTextareaControl>
