// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Breadcrumbs> = (args) => {
//   return <Breadcrumbs {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'
import { BreadcrumbPage } from 'types/common'

import { BreadcrumbsContext } from 'src/context/BreadcrumbsContext'

import Breadcrumbs from './Breadcrumbs'

export const generated = () => {
  const breadcrumbs: BreadcrumbPage[] = [
    { name: 'Home', href: '/home', current: false },
    { name: 'Jobs', href: '/jobs', current: true },
  ]

  return (
    <BreadcrumbsContext.Provider
      value={{ breadcrumbs, setBreadcrumbs: () => {} }}
    >
      <Breadcrumbs />
    </BreadcrumbsContext.Provider>
  )
}

export default {
  title: 'Components/CustomControls/Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>
