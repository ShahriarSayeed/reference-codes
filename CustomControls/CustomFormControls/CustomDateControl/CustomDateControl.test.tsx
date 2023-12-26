import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import RedwoodjsFormWrapper from 'src/components/CustomWrappers/RedwoodjsFormWrapper'

import CustomDateControl from './CustomDateControl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomDateControl Component', () => {
  const inputName = 'test-date1'
  const inputId = 'test-date1'
  const label = 'Date'
  const colSpan = 4

  it('renders successfully', () => {
    expect(() => {
      render(
        <RedwoodjsFormWrapper>
          <CustomDateControl
            colSpan={colSpan}
            label={label}
            inputName={inputName}
            inputId={inputId}
            placeholder=""
            validation={{}}
          />
        </RedwoodjsFormWrapper>
      )
    }).not.toThrow()
  })

  it('should have proper colSpan class', () => {
    render(
      <RedwoodjsFormWrapper>
        <CustomDateControl
          colSpan={colSpan}
          label={label}
          inputName={inputName}
          inputId={inputId}
          placeholder=""
          validation={{}}
        />
      </RedwoodjsFormWrapper>
    )

    const element = screen.getByTestId('date-control-colspan')

    expect(element).toHaveClass(`sm:col-span-` + colSpan)
  })

  it('should have label if label props supplied', () => {
    render(
      <RedwoodjsFormWrapper>
        <CustomDateControl
          colSpan={colSpan}
          label={label}
          inputName={inputName}
          inputId={inputId}
          placeholder=""
          validation={{}}
        />
      </RedwoodjsFormWrapper>
    )

    const element = screen.getByTestId('date-control-label')

    expect(element).toBeInTheDocument()
  })

  describe('render input element', () => {
    beforeEach(() => {
      render(
        <RedwoodjsFormWrapper>
          <CustomDateControl
            colSpan={colSpan}
            label={label}
            inputName={inputName}
            inputId={inputId}
            placeholder=""
            validation={{}}
          />
        </RedwoodjsFormWrapper>
      )
    })

    it('should have correct id', () => {
      const element = screen.getByTestId('date-control-textbox')

      expect(element).toHaveAttribute('id', inputId)
    })

    it('should have correct name', () => {
      const element = screen.getByTestId('date-control-textbox')

      expect(element).toHaveAttribute('name', inputName)
    })

    it('should have date field with initial empty value', () => {
      const input = screen.getByTestId('date-control-textbox')

      expect(input).toHaveDisplayValue('')
    })

    it('should have value in date field when type text', async () => {
      const inputField = screen.getByTestId('date-control-textbox')
      const inputValue = '2020-05-12'
      await userEvent.click(inputField)
      await userEvent.type(inputField, inputValue)

      expect(inputField).toHaveDisplayValue(inputValue)
    })
  })
})
