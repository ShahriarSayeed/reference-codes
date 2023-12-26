import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import CustomButtonControl from './CustomButtonControl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomButtonControl Component', () => {
  const text = 'Delete'
  const className = 'rw-button-warning'
  const clickHandler = jest.fn()

  it('renders successfully', () => {
    expect(() => {
      render(
        <CustomButtonControl
          text={text}
          className={className}
          clickHandler={clickHandler}
        />
      )
    }).not.toThrow()
  })

  describe('button control', () => {
    beforeEach(() => {
      render(
        <CustomButtonControl
          text={text}
          className={className}
          clickHandler={clickHandler}
        />
      )
    })

    it('should have text in the button', () => {
      const element = screen.getByRole('button', { name: text })

      expect(element).toBeInTheDocument()
    })

    it('should have text in the button', () => {
      const element = screen.getByRole('button', { name: text })

      expect(element).toBeInTheDocument()
    })

    it('should be button clickable', async () => {
      const element = screen.getByRole('button', { name: text })
      await userEvent.click(element)

      expect(clickHandler).toHaveBeenCalledTimes(1)
      expect(clickHandler).toBeCalled()
    })
  })
})
