import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

import { render, screen } from '@redwoodjs/testing/web'

import RedwoodjsFormWrapper from 'src/components/CustomWrappers/RedwoodjsFormWrapper'

import CustomToggleControl from './CustomToggleControl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomToggleControl Component', () => {
  const inputId = 'toggle-test-input'
  const inputName = 'toggle-test-input'
  const srLabel = 'testing toggle'

  it('renders successfully', () => {
    expect(() => {
      render(
        <RedwoodjsFormWrapper>
          <CustomToggleControl inputId={inputId} inputName={inputName} />
        </RedwoodjsFormWrapper>
      )
    }).not.toThrow()
  })

  describe('render toogle control', () => {
    beforeEach(() => {
      render(
        <RedwoodjsFormWrapper>
          <CustomToggleControl
            inputId={inputId}
            inputName={inputName}
            srLabel={srLabel}
          />
        </RedwoodjsFormWrapper>
      )
    })

    it('should have sr-label if supplied', () => {
      const element = screen.getByTestId('custom-toggle-control-srlabel')

      expect(element).toBeInTheDocument()
    })

    it('should have checked/true value when click on toogle', async () => {
      const toggleField = screen.getByTestId('custom-toggle-control')

      await act(async () => {
        await userEvent.click(toggleField)
      })

      const inputValue = 'true'
      const hiddenInputField = screen.getByTestId('custom-toggle-control-input')
      expect(hiddenInputField).toHaveValue(inputValue)
    })

    it('should have unchecked/false value when click again on toogle', async () => {
      const toggleField = screen.getByTestId('custom-toggle-control')

      await act(async () => {
        await userEvent.click(toggleField)
      })

      await act(async () => {
        await userEvent.click(toggleField)
      })

      const inputValue = 'false'
      const hiddenInputField = screen.getByTestId('custom-toggle-control-input')
      expect(hiddenInputField).toHaveValue(inputValue)
    })
  })
})
