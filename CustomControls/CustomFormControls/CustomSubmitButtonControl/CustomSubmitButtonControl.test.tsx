import { render, screen } from '@redwoodjs/testing/web'

import CustomSubmitButtonControl from './CustomSubmitButtonControl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomSubmitButtonControl Component', () => {
  const text = 'Submit'

  it('renders successfully', () => {
    expect(() => {
      render(<CustomSubmitButtonControl text={text} />)
    }).not.toThrow()
  })

  describe('submit button control', () => {
    beforeEach(() => {
      render(<CustomSubmitButtonControl text={text} />)
    })

    it('should have text in the button', () => {
      const element = screen.getByRole('button', { name: text })

      expect(element).toBeInTheDocument()
    })

    it('should have button type=submit', () => {
      const element = screen.getByRole('button', { name: text })

      expect(element).toHaveAttribute('type', 'submit')
    })

    // no option to test call submit button as it has no event handler passed yet
    // later test it if submit envent handler passed as props
    // it('should be button clickable', async () => {
    //   const element = screen.getByRole('button', { name: text })
    //   await userEvent.click(element)

    //   expect(clickHandler).toHaveBeenCalledTimes(1)
    //   expect(clickHandler).toBeCalled()
    // })
  })
})
