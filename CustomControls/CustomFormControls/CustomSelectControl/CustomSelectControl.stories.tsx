// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomSelectControl> = (args) => {
//   return <CustomSelectControl {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomSelectControl from './CustomSelectControl'

export const generated = () => {
  const options = ['United States', 'Canada', 'Mexico']

  return (
    <div className="rw-input-grid-div">
      <CustomSelectControl
        colSpan={4}
        label="Country"
        inputId="country-select"
        inputName="country-select"
        validation={{}}
        options={options}
      />
    </div>
  )
}

export default {
  title: 'Components/CustomControls/CustomFormControls/CustomSelectControl',
  component: CustomSelectControl,
} as ComponentMeta<typeof CustomSelectControl>
