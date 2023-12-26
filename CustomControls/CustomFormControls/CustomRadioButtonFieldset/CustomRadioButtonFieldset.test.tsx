import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import CustomRadioButtonControl from '../CustomRadioButtonControl/CustomRadioButtonControl'

import CustomRadioButtonFieldset from './CustomRadioButtonFieldset'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomRadioButtonFieldset Component', () => {
  const title = 'Push Notifications'
  const subTitle = 'These are delivered via SMS to your mobile phone.'

  const label = 'Everything'
  const inputId = 'push-everything'
  const inputName = 'push-notifications'

  const label2 = 'Same as email'
  const inputId2 = 'push-email'
  const inputName2 = 'push-notifications'

  it('renders successfully', () => {
    expect(() => {
      render(
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
    }).not.toThrow()
  })

  beforeEach(() => {
    render(
      <CustomRadioButtonFieldset title={title} subTitle={subTitle}>
        <CustomRadioButtonControl
          label={label}
          inputId={inputId}
          inputName={inputName}
        />
      </CustomRadioButtonFieldset>
    )
  })

  it('should print title if title props supplied', () => {
    const element = screen.getByTestId('custom-radio-fieldset-title')

    expect(element).toBeInTheDocument()
  })

  it('should print sub-title if sub-title props supplied', () => {
    const element = screen.getByTestId('custom-radio-fieldset-sub-title')

    expect(element).toBeInTheDocument()
  })

  it('renders successfully with CustomRadioButtonControl as child component', async () => {
    const element = screen.getByTestId('custom-radio-button-input')

    expect(element).toBeInTheDocument()
  })

  it('render successfully with checkable radio field as child CustomRadioButtonControl', async () => {
    const inputElement = screen.getByTestId(
      'custom-radio-button-input'
    ) as HTMLInputElement
    await userEvent.click(inputElement)

    expect(inputElement.checked).toBe(true)
  })
})
