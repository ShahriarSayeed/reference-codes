import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import CustomErrorSection from './CustomErrorSection'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomErrorSection Component', () => {
  const errorHTTPStatusCode = 404
  const errorTitle = 'Page not found'
  const errorMsg = "Sorry, we couldn't find the page you're looking for."

  it('renders successfully', () => {
    expect(() => {
      render(
        <CustomErrorSection
          errorHTTPStatusCode={errorHTTPStatusCode}
          errorTitle={errorTitle}
          errorMsg={errorMsg}
        />
      )
    }).not.toThrow()
  })

  describe('render elements', () => {
    beforeEach(() => {
      render(
        <CustomErrorSection
          errorHTTPStatusCode={errorHTTPStatusCode}
          errorTitle={errorTitle}
          errorMsg={errorMsg}
        />
      )
    })

    it('should render HTTP Status Code if supplied', () => {
      const element = screen.getByTestId('custom-error-section-hsc')

      expect(element).toBeInTheDocument()
    })

    it('should render title', () => {
      const element = screen.getByTestId('custom-error-section-title')

      expect(element).toBeInTheDocument()
    })

    it('should render message', () => {
      const element = screen.getByTestId('custom-error-section-msg')

      expect(element).toBeInTheDocument()
    })

    it('should render home link', () => {
      const element = screen.getByTestId('custom-error-section-home-link')

      expect(element).toBeInTheDocument()
      expect(element).toHaveAttribute('href', routes.home())
    })

    // shs 230913: todo: change routes.home() to support route when it will be added
    it('should render support link', () => {
      const element = screen.getByTestId('custom-error-section-support-link')

      expect(element).toBeInTheDocument()
      expect(element).toHaveAttribute('href', routes.home())
    })
  })
})
