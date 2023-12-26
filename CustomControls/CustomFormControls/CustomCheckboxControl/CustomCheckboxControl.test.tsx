import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import CustomCheckboxControl from './CustomCheckboxControl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomCheckboxControl Component', () => {
  const label = 'Comments'
  const subLabel = 'Get notified when someones posts a comment on a posting.'
  const inputName = 'comment'
  const inputId = 'comment'

  it('renders successfully', () => {
    expect(() => {
      render(
        <CustomCheckboxControl
          label={label}
          subLabel={subLabel}
          inputName={inputName}
          inputId={inputId}
        />
      )
    }).not.toThrow()
  })

  beforeEach(() => {
    render(
      <CustomCheckboxControl
        label={label}
        subLabel={subLabel}
        inputName={inputName}
        inputId={inputId}
      />
    )
  })

  it('should have label', () => {
    const element = screen.getByTestId('custom-checkbox-label')

    expect(element).toBeInTheDocument()
  })

  it('should have sub-label if sub-label props supplied', () => {
    const element = screen.getByTestId('custom-checkbox-sub-label')

    expect(element).toBeInTheDocument()
  })

  it('should have initially un-checked', async () => {
    const element = screen.getByTestId(
      'custom-checkbox-input'
    ) as HTMLInputElement

    expect(element.checked).toBe(false)
  })

  it('should be checked if clicked on checkbox', async () => {
    const element = screen.getByTestId(
      'custom-checkbox-input'
    ) as HTMLInputElement
    await userEvent.click(element)

    expect(element.checked).toBe(true)
  })
})
