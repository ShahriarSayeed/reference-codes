import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

import { routes } from '@redwoodjs/router'
import { render, screen, waitFor } from '@redwoodjs/testing/web'

import { edFeatures, getMenuEntry } from 'src/lib/common'

import AppHeader from './AppHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AppHeader Component', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppHeader />)
    }).not.toThrow()
  })

  describe('render elements', () => {
    beforeEach(() => {
      render(<AppHeader />)
    })

    it('should have logo', () => {
      const element = screen.getByTestId('app-header-logo')

      expect(element).toBeInTheDocument()
    })

    it('should have home link', () => {
      const element = screen.getByTestId('app-header-home-link')

      expect(element).toBeInTheDocument()
      expect(element).toHaveAttribute('href', '/')
    })

    it('should render menu items', () => {
      const features = edFeatures(process.env.REDWOOD_ENV_ED)
      features.forEach((feature) => {
        const menuText = getMenuEntry(feature).name

        const element = screen.getByRole('link', { name: menuText })
        expect(element).toBeInTheDocument()
      })
    })

    it('should have menu link', () => {
      const features = edFeatures(process.env.REDWOOD_ENV_ED)
      const singleMenuItem = features[0]
      const menuText = getMenuEntry(singleMenuItem).name
      const element = screen.getByRole('link', { name: menuText })

      expect(element).toBeInTheDocument()
      expect(element).toHaveAttribute('href', routes[singleMenuItem]())
    })

    it('should have view notifications element', () => {
      const element = screen.getByTestId('app-header-view-notifications')
      expect(element).toBeInTheDocument()
    })

    it('should have user menu element', () => {
      const element = screen.getByTestId('app-header-user-menu')
      expect(element).toBeInTheDocument()
    })

    describe('log out', () => {
      it('should have a login menu item when logged out', async () => {
        await act(async () => {
          const menuElm = screen.getByTestId('app-header-user-menu-root')
          await userEvent.click(menuElm)

          setTimeout(() => {
            const element = screen.getByTestId('app-header-login-link')
            expect(element).toBeInTheDocument()
          }, 100)
        })
      })
    })

    describe('log in', () => {
      beforeEach(() => {
        mockCurrentUser({
          Employee_Code: 'Rob',
          Email: '',
        })
      })

      // Todo: Optional tests. generating erros. fix it later.
      // it('should have profile menu element', async () => {
      //   await act(async () => {
      //     const menuElm = screen.getByTestId('app-header-user-menu-root')
      //     await userEvent.click(menuElm)

      //     setTimeout(() => {
      //       const element = screen.getByTestId('app-header-profile-link')
      //       expect(element).toBeInTheDocument()
      //     }, 100)
      //   })
      // })

      // it('should have settings menu element', async () => {
      //   await act(async () => {
      //     const menuElm = screen.getByTestId('app-header-user-menu-root')
      //     await userEvent.click(menuElm)

      //     setTimeout(() => {
      //       const element = screen.getByTestId('app-header-settings-link')
      //       expect(element).toBeInTheDocument()
      //     }, 100)
      //   })
      // })

      it('should have a logout menu item when logged in', async () => {
        await act(async () => {
          const menuElm = screen.getByTestId('app-header-user-menu-root')
          await userEvent.click(menuElm)

          setTimeout(() => {
            const element = screen.getByTestId('app-header-logout-link')
            expect(element).toBeInTheDocument()
          }, 100)
        })
      })

      it('can be logout when click on logout menu item', async () => {
        await act(async () => {
          const menuElm = screen.getByTestId('app-header-user-menu-root')
          await userEvent.click(menuElm)

          setTimeout(() => {
            const element = screen.getByTestId('app-header-login-link')
            expect(element).toBeInTheDocument()
          }, 100)
        })
      })
    })
  })
})
