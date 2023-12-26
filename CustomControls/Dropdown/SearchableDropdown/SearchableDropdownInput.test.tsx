import { render, screen } from '@redwoodjs/testing/web'

import RedwoodjsFormWrapper from 'src/components/CustomWrappers/RedwoodjsFormWrapper'

import SearchableDropdownInput from './SearchableDropdownInput'

describe('SearchableDropdownInput Component', () => {
  const name = 'Job_Number'
  const validation = { required: true }
  const disabled = false
  const value = ''
  const handleChange = null
  const toggle = true
  const setToggle = null

  it('renders successfully', () => {
    expect(() => {
      render(
        <SearchableDropdownInput
          name={name}
          disabled={disabled}
          validation={validation}
          searchBy={value}
          handleChange={handleChange}
          toggle={toggle}
          setToggle={setToggle}
        />,
        { wrapper: RedwoodjsFormWrapper }
      )
    }).not.toThrow()
  })

  describe('render input element', () => {
    beforeEach(() => {
      render(
        <RedwoodjsFormWrapper>
          <SearchableDropdownInput
            name={name}
            disabled={disabled}
            validation={validation}
            searchBy={value}
            handleChange={handleChange}
            toggle={toggle}
            setToggle={setToggle}
          />
        </RedwoodjsFormWrapper>
      )
    })

    it('should have correct name', () => {
      const element = screen.getByTestId('searchable-dropdown-input')

      expect(element).toHaveAttribute('name', name)
    })

    it('should have input field with initial empty value', () => {
      const input = screen.getByTestId('searchable-dropdown-input')

      expect(input).toHaveDisplayValue('')
    })
  })
})
