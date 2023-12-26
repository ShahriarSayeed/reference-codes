// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomCoordinatesControl> = (args) => {
//   return <CustomCoordinatesControl {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomCoordinatesControl from './CustomCoordinatesControl'

export const generated = () => {
  const buttonText = 'Capture'
  const label = 'Latitude and Longitude'
  const colSpan = 'full'
  const inputName = 'captureLatLngControl'
  const inputId = 'captureLatLngControl'
  const validation = {}

  return (
    <CustomCoordinatesControl
      buttonText={buttonText}
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
    'Components/CustomControls/CustomFormControls/CustomCoordinatesControl',
  component: CustomCoordinatesControl,
} as ComponentMeta<typeof CustomCoordinatesControl>
