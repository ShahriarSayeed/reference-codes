import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import CustomRadioButtonControl from './CustomRadioButtonControl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomRadioButtonControl', () => {
  const label = 'Everything'
  const inputId = 'push-everything'
  const inputName = 'push-notifications'

  it('renders successfully', () => {
    expect(() => {
      render(
        <CustomRadioButtonControl
          label={label}
          inputId={inputId}
          inputName={inputName}
        />
      )
    }).not.toThrow()
  })

  beforeEach(() => {
    render(
      <CustomRadioButtonControl
        label={label}
        inputName={inputName}
        inputId={inputId}
      />
    )
  })

  it('should have label', () => {
    const element = screen.getByTestId('custom-radio-button-label')

    expect(element).toBeInTheDocument()
  })

  it('should have initially un-checked', async () => {
    const element = screen.getByTestId(
      'custom-radio-button-input'
    ) as HTMLInputElement

    expect(element.checked).toBe(false)
  })

  it('should be checked if clicked on radio button', async () => {
    const element = screen.getByTestId(
      'custom-radio-button-input'
    ) as HTMLInputElement
    await userEvent.click(element)

    expect(element.checked).toBe(true)
  })
})
