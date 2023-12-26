// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SearchBarWithSort> = (args) => {
//   return <SearchBarWithSort {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import SearchBarWithSort from './SearchBarWithSort'

export const generated = () => {
  const inputName = 'searchbar-text'
  const inputPlaceholder = ''
  const selectName = 'searchbar-select'
  const selectValidation = {}
  const selectOptions = ['field1', 'field2', 'field3']
  const onFieldSelection = () => {}

  return (
    <SearchBarWithSort
      inputName={inputName}
      inputPlaceholder={inputPlaceholder}
      selectName={selectName}
      selectValidation={selectValidation}
      selectOptions={selectOptions}
      onFieldSelection={onFieldSelection}
    />
  )
}

export default {
  title: 'Components/CustomControls/SearchBarWithSort',
  component: SearchBarWithSort,
} as ComponentMeta<typeof SearchBarWithSort>
