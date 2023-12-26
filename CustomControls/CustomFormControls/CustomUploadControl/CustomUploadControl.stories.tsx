// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomFileUploadControl> = (args) => {
//   return <CustomFileUploadControl {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomUploadControl from './CustomUploadControl'

export const generated = () => {
  const colSpan = 'full' // span range 1-6 or full
  const label = 'Photo'
  const uploadTextLabel = 'Change'
  const inputName = 'cover-photo'
  const inputId = 'cover-photo'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-6">
      <CustomUploadControl
        colSpan={colSpan}
        label={label}
        uploadTextLabel={uploadTextLabel}
        inputId={inputId}
        inputName={inputName}
        validation={() => {}}
      />
    </div>
  )
}

export default {
  title: 'Components/CustomControls/CustomFormControls/CustomUploadControl',
  component: CustomUploadControl,
} as ComponentMeta<typeof CustomUploadControl>
