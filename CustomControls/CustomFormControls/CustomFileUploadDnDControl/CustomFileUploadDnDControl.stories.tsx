// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomFileUploadDnDControl> = (args) => {
//   return <CustomFileUploadDnDControl {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomFileUploadDnDControl from './CustomFileUploadDnDControl'

export const generated = () => {
  const colSpan = 'full' // span range 1-6 or full
  const label = 'Cover photo'
  const inputName = 'cover-photo'
  const inputId = 'cover-photo'
  const allowedFileTyepes = ['PNG', 'JPG', 'GIF']
  const maxFileSizeInMB = 10
  return (
    <div className="grid grid-cols-1 sm:grid-cols-6">
      <CustomFileUploadDnDControl
        colSpan={colSpan}
        label={label}
        inputId={inputId}
        inputName={inputName}
        allowedFileTyepes={allowedFileTyepes}
        maxFileSizeInMB={maxFileSizeInMB}
        validation={() => {}}
      />
    </div>
  )
}

export default {
  title:
    'Components/CustomControls/CustomFormControls/CustomFileUploadDnDControl',
  component: CustomFileUploadDnDControl,
} as ComponentMeta<typeof CustomFileUploadDnDControl>
