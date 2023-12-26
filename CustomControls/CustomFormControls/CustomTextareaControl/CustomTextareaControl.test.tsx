import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import RedwoodjsFormWrapper from 'src/components/CustomWrappers/RedwoodjsFormWrapper'

import CustomTextareaControl from './CustomTextareaControl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomTextareaControl', () => {
  const inputName = 'textarea1'
  const inputId = 'textarea1'
  const label = 'Test label'
  const subTitle = 'Test sub-title'
  const rows = 3
  const colSpan = 'full'

  it('renders successfully', () => {
    expect(() => {
      render(
        <RedwoodjsFormWrapper>
          <CustomTextareaControl
            colSpan={colSpan}
            inputName={inputName}
            inputId={inputId}
            label={label}
            subTitle={subTitle}
            rows={rows}
            validation={{}}
          />
        </RedwoodjsFormWrapper>
      )
    }).not.toThrow()
  })

  it('should have proper colSpan class', () => {
    render(
      <RedwoodjsFormWrapper>
        <CustomTextareaControl
          colSpan={colSpan}
          inputName={inputName}
          inputId={inputId}
          label={label}
          subTitle={subTitle}
          rows={rows}
          validation={{}}
        />
      </RedwoodjsFormWrapper>
    )

    const element = screen.getByTestId('textarea-control-textbox-colspan')

    expect(element).toHaveClass(`sm:col-span-` + colSpan)
  })

  it('should have label if label props supplied', () => {
    render(
      <RedwoodjsFormWrapper>
        <CustomTextareaControl
          colSpan={colSpan}
          label={label}
          inputName={inputName}
          inputId={inputId}
          validation={{}}
          subTitle={subTitle}
          rows={rows}
        />
      </RedwoodjsFormWrapper>
    )

    const element = screen.getByTestId('textarea-control-label')

    expect(element).toBeInTheDocument()
  })

  describe('render input element', () => {
    beforeEach(() => {
      render(
        <RedwoodjsFormWrapper>
          <CustomTextareaControl
            colSpan={colSpan}
            label={label}
            inputName={inputName}
            inputId={inputId}
            validation={{}}
            subTitle={subTitle}
            rows={rows}
          />
        </RedwoodjsFormWrapper>
      )
    })

    it('should have correct id', () => {
      const element = screen.getByTestId('textarea-control-textbox')

      expect(element).toHaveAttribute('id', inputId)
    })

    it('should have correct name', () => {
      const element = screen.getByTestId('textarea-control-textbox')

      expect(element).toHaveAttribute('name', inputName)
    })

    it('should have input field with initial empty value', () => {
      const input = screen.getByTestId('textarea-control-textbox')

      expect(input).toHaveDisplayValue('')
    })

    it('should have input value when set', async () => {
      const inputField = screen.getByTestId('textarea-control-textbox')
      const inputValue = 'Test input value'
      await userEvent.type(inputField, inputValue)

      expect(inputField).toHaveDisplayValue(inputValue)
    })
  })
})
