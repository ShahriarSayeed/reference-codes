// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomCapturePhotosControl> = (args) => {
//   return <CustomCapturePhotosControl {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomCapturePhotosControl from './CustomCapturePhotosControl'

// First install storybook-addon-state. then call clickHandler to change capturedBlobUrl state from here.
// And use this bellow base64 image data to check if captured image is shown on screen
// const sampleBase64Data = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM0AAAD
// NCAMAAAAsYgRbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5c
// cllPAAAABJQTFRF3NSmzMewPxIG//ncJEJsldTou1jHgAAAARBJREFUeNrs2EEK
// gCAQBVDLuv+V20dENbMY831wKz4Y/VHb/5RGQ0NDQ0NDQ0NDQ0NDQ0NDQ
// 0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0PzMWtyaGhoaGhoaGhoaGhoaGhoxtb0QGho
// aGhoaGhoaGhoaGhoaMbRLEvv50VTQ9OTQ5OpyZ01GpM2g0bfmDQaL7S+ofFC6x
// v3ZpxJiywakzbvd9r3RWPS9I2+MWk0+kbf0Hih9Y17U0nTHibrDDQ0NDQ0NDQ0
// NDQ0NDQ0NTXbRSL/AK72o6GhoaGhoRlL8951vwsNDQ0NDQ1NDc0WyHtDTEhD
// Q0NDQ0NTS5MdGhoaGhoaGhoaGhoaGhoaGhoaGhoaGposzSHAAErMwwQ2HwRQ
// AAAAAElFTkSuQmCC
// `

export const generated = () => {
  const uploadTextLabel = 'Capture'
  const label = 'Capture Photos'
  const colSpan = 'full'
  const inputName = 'capturePhotosControl'
  const inputId = 'capturePhotosControl'
  const validation = {}

  return (
    <CustomCapturePhotosControl
      uploadTextLabel={uploadTextLabel}
      label={label}
      colSpan={colSpan}
      inputName={inputName}
      inputId={inputId}
      validation={validation}
    />
  )
}

export default {
  title:
    'Components/CustomControls/CustomFormControls/CustomCapturePhotosControl',
  component: CustomCapturePhotosControl,
} as ComponentMeta<typeof CustomCapturePhotosControl>
