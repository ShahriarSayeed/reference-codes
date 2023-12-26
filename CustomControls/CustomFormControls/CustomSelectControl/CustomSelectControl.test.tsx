import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import CustomSelectControl from './CustomSelectControl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomSelectControl Component', () => {
  const inputName = 'test-input1'
  const inputId = 'test-input1'
  const label = 'Test label'
  const options = ['United States', 'Canada', 'Mexico']
  const colSpan = 4

  it('renders successfully', () => {
    expect(() => {
      render(
        <CustomSelectControl
          colSpan={colSpan}
          label={label}
          inputName={inputName}
          inputId={inputId}
          options={options}
          validation={{}}
        />
      )
    }).not.toThrow()
  })

  it('should have proper colSpan class', () => {
    render(
      <CustomSelectControl
        colSpan={colSpan}
        label={label}
        inputName={inputName}
        inputId={inputId}
        options={options}
        validation={{}}
      />
    )

    const element = screen.getByTestId('custom-select-control-colspan')

    expect(element).toHaveClass(`sm:col-span-` + colSpan)
  })

  it('should have label if label props supplied', () => {
    render(
      <CustomSelectControl
        colSpan={colSpan}
        label={label}
        inputName={inputName}
        inputId={inputId}
        options={options}
        validation={{}}
      />
    )

    const element = screen.getByTestId('custom-select-control-label')

    expect(element).toBeInTheDocument()
  })

  describe('render select element', () => {
    beforeEach(() => {
      render(
        <CustomSelectControl
          colSpan={colSpan}
          label={label}
          inputName={inputName}
          inputId={inputId}
          options={options}
          validation={{}}
        />
      )
    })

    it('should have correct id', () => {
      const element = screen.getByTestId('custom-select-control')

      expect(element).toHaveAttribute('id', inputId)
    })

    it('should have correct name', () => {
      const element = screen.getByTestId('custom-select-control')

      expect(element).toHaveAttribute('name', inputName)
    })

    it('should be initially empty value selected', () => {
      const element = screen.getByTestId('custom-select-control')

      expect(element).toHaveDisplayValue('')
    })

    it('should be selected a value when select a option', async () => {
      const element = screen.getByTestId('custom-select-control')
      const selectedValue = options[2]
      await userEvent.selectOptions(element, selectedValue)

      expect(element).toHaveDisplayValue(selectedValue)
    })
  })
})
