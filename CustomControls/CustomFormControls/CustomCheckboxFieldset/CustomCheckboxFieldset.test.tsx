import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import CustomCheckboxControl from '../CustomCheckboxControl/CustomCheckboxControl'

import CustomCheckboxFieldset from './CustomCheckboxFieldset'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomCheckboxFieldset Component', () => {
  const title = 'By Email'
  const label = 'Comments'
  const subLabel = 'Get notified when someones posts a comment on a posting.'
  const inputName = 'comment'
  const inputId = 'comment'

  it('renders successfully', () => {
    expect(() => {
      render(
        <CustomCheckboxFieldset title={title}>
          <CustomCheckboxControl
            label={label}
            subLabel={subLabel}
            inputName={inputName}
            inputId={inputId}
          />
        </CustomCheckboxFieldset>
      )
    }).not.toThrow()
  })

  beforeEach(() => {
    render(
      <CustomCheckboxFieldset title={title}>
        <CustomCheckboxControl
          label={label}
          subLabel={subLabel}
          inputName={inputName}
          inputId={inputId}
        />
      </CustomCheckboxFieldset>
    )
  })

  it('should print title if title props supplied', () => {
    const element = screen.getByTestId('custom-checkbox-fieldset-title')

    expect(element).toBeInTheDocument()
  })

  it('renders successfully with CustomCheckboxControl as child component', async () => {
    const element = screen.getByTestId('custom-checkbox-input')

    expect(element).toBeInTheDocument()
  })

  it('should have checkable checkbox field in child CustomCheckboxControl', async () => {
    const inputElement = screen.getByTestId(
      'custom-checkbox-input'
    ) as HTMLInputElement
    await userEvent.click(inputElement)

    expect(inputElement.checked).toBe(true)
  })
})
