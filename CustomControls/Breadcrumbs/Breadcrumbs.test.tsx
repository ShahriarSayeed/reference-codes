import { render, screen } from '@redwoodjs/testing/web'

import { BreadcrumbsContext } from 'src/context/BreadcrumbsContext'

import Breadcrumbs from './Breadcrumbs'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

// shs 230831: Testing useContext() with react-testing-library
// Breadcrumbs component is using useContext hook.
// To test component using useContext hook, use this type of customRenderFuncUsingContext function to render component to tests

// A custom provider to test it in isolation.
// This customRenderFuncUsingContext will be a fake Breadcrumb provider, which can controll to abstract of Breadcrumb provider issues.
// Source: //  https://stackoverflow.com/a/73441483

const customRenderFuncUsingContext = (
  ui,
  { breadcrumbs, ...renderOptions }
) => {
  return render(
    <BreadcrumbsContext.Provider
      value={{ breadcrumbs, setBreadcrumbs: () => {} }}
    >
      {ui}
    </BreadcrumbsContext.Provider>,
    renderOptions
  )
}

describe('Breadcrumbs Component', () => {
  let breadcrumbs

  beforeEach(() => {
    breadcrumbs = [
      { name: 'Home', href: '/home', current: false },
      { name: 'Jobs', href: '/jobs', current: true },
    ]
    return breadcrumbs
  })

  it('renders successfully', () => {
    expect(() => {
      customRenderFuncUsingContext(<Breadcrumbs />, { breadcrumbs })
    }).not.toThrow()
  })

  describe('generate breadcrumbs', () => {
    beforeEach(() => {
      customRenderFuncUsingContext(<Breadcrumbs />, { breadcrumbs })
    })

    it('should have root item', () => {
      const element = screen.getByTestId('breadcrumbs-item-root')

      expect(element).toBeInTheDocument()
    })

    it('should render all breadcrumb items passed as props', () => {
      breadcrumbs.forEach((breadcrumb) => {
        const name = breadcrumb.name
        const element = screen.getByTestId(`breadcrumbs-item-${name}`)

        expect(element).toBeInTheDocument()
      })
    })

    it('should be able to navigate to link page breadrumb item is not a active item', () => {
      const found = breadcrumbs.find((breadcrumb) => {
        return !breadcrumb.current
      })
      const element = screen.getByTestId(`breadcrumbs-link-${found.name}`)

      expect(element).toBeInTheDocument()
      expect(element).toHaveAttribute('href', found.href)
    })
  })
})
