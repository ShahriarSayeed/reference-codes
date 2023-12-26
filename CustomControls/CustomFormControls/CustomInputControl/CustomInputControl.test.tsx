import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import RedwoodjsFormWrapper from 'src/components/CustomWrappers/RedwoodjsFormWrapper'

import CustomInputControl from './CustomInputControl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomInputControl Component', () => {
  const inputName = 'test-input1'
  const inputId = 'test-input1'
  const label = 'Test label'
  const preText = 'Mr./Mrs./Ms.'
  const colSpan = 4

  it('renders successfully', () => {
    expect(() => {
      render(
        <RedwoodjsFormWrapper>
          <CustomInputControl
            colSpan={colSpan}
            inputName={inputName}
            inputId={inputId}
            label={label}
            preText={preText}
            validation={{}}
          />
        </RedwoodjsFormWrapper>
      )
    }).not.toThrow()
  })

  it('should have proper colSpan class', () => {
    render(
      <RedwoodjsFormWrapper>
        <CustomInputControl
          colSpan={colSpan}
          label={label}
          inputName={inputName}
          inputId={inputId}
          validation={{}}
        />
      </RedwoodjsFormWrapper>
    )

    const element = screen.getByTestId('input-control-colspan')

    expect(element).toHaveClass(`sm:col-span-` + colSpan)
  })

  it('should have label if label props supplied', () => {
    render(
      <RedwoodjsFormWrapper>
        <CustomInputControl
          colSpan={colSpan}
          label={label}
          inputName={inputName}
          inputId={inputId}
          validation={{}}
        />
      </RedwoodjsFormWrapper>
    )

    const element = screen.getByTestId('input-control-label')

    expect(element).toBeInTheDocument()
  })

  describe('render input element', () => {
    beforeEach(() => {
      render(
        <RedwoodjsFormWrapper>
          <CustomInputControl
            colSpan={colSpan}
            label={label}
            inputName={inputName}
            inputId={inputId}
            validation={{}}
          />
        </RedwoodjsFormWrapper>
      )
    })

    it('should have correct id', () => {
      const element = screen.getByTestId('input-control-textbox')

      expect(element).toHaveAttribute('id', inputId)
    })

    it('should have correct name', () => {
      const element = screen.getByTestId('input-control-textbox')

      expect(element).toHaveAttribute('name', inputName)
    })

    it('should have input field with initial empty value', () => {
      const input = screen.getByTestId('input-control-textbox')

      expect(input).toHaveDisplayValue('')
    })

    it('should have value in input field when type text', async () => {
      const inputField = screen.getByTestId('input-control-textbox')
      const inputValue = 'Test input value'
      await userEvent.type(inputField, inputValue)

      expect(inputField).toHaveDisplayValue(inputValue)
    })
  })
})
