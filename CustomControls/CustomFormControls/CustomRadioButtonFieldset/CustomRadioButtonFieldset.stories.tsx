// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomRadioButtonFieldset> = (args) => {
//   return <CustomRadioButtonFieldset {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomRadioButtonControl from '../CustomCheckboxControl/CustomCheckboxControl'

import CustomRadioButtonFieldset from './CustomRadioButtonFieldset'

export const generated = () => {
  const title = 'Push Notifications'
  const subTitle = 'These are delivered via SMS to your mobile phone.'

  const label = 'Everything'
  const inputId = 'push-everything'
  const inputName = 'push-notifications'

  const label2 = 'Same as email'
  const inputId2 = 'push-email'
  const inputName2 = 'push-notifications'

  return (
    <CustomRadioButtonFieldset title={title} subTitle={subTitle}>
      <CustomRadioButtonControl
        label={label}
        inputId={inputId}
        inputName={inputName}
      />
      <CustomRadioButtonControl
        label={label2}
        inputId={inputId2}
        inputName={inputName2}
      />
    </CustomRadioButtonFieldset>
  )
}

export default {
  title:
    'Components/CustomControls/CustomFormControls/CustomRadioButtonFieldset',
  component: CustomRadioButtonFieldset,
} as ComponentMeta<typeof CustomRadioButtonFieldset>
