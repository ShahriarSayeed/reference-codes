import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

import { render, screen } from '@redwoodjs/testing/web'

import SearchBarWithSort from './SearchBarWithSort'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SearchBarWithSort Component', () => {
  const inputName = 'searchbar-text'
  const inputPlaceholder = ''
  const selectName = 'searchbar-select'
  const selectValidation = {}
  const selectOptions = ['field1', 'field2', 'field3']
  const onFieldSelection = () => {}

  it('renders successfully', () => {
    expect(() => {
      render(
        <SearchBarWithSort
          inputName={inputName}
          inputPlaceholder={inputPlaceholder}
          selectName={selectName}
          selectValidation={selectValidation}
          selectOptions={selectOptions}
          onFieldSelection={onFieldSelection}
        />
      )
    }).not.toThrow()
  })

  describe('render input element', () => {
    beforeEach(() => {
      render(
        <SearchBarWithSort
          inputName={inputName}
          inputPlaceholder={inputPlaceholder}
          selectName={selectName}
          selectValidation={selectValidation}
          selectOptions={selectOptions}
          onFieldSelection={onFieldSelection}
        />
      )
    })

    it('should render search icon', () => {
      const element = screen.getByTestId('searchbar-input-search-icon')

      expect(element).toBeInTheDocument()
    })

    it('should render search input field', () => {
      const inputDesktop = screen.getByTestId('searchbar-input-desktop')
      const input = screen.getByTestId('searchbar-input')

      expect(inputDesktop).toBeInTheDocument()
      expect(input).toBeInTheDocument()
    })

    it('should have correct name for input field', () => {
      const element = screen.getByTestId('searchbar-input-desktop')

      expect(element).toHaveAttribute('name', inputName)
    })

    it('should have input field with initial empty value', () => {
      const inputDesktop = screen.getByTestId('searchbar-input-desktop')
      const input = screen.getByTestId('searchbar-input')

      expect(inputDesktop).toHaveDisplayValue('')
      expect(input).toHaveDisplayValue('')
    })

    it('should have value in input field when type text', async () => {
      const inputDesktop = screen.getByTestId('searchbar-input-desktop')
      const input = screen.getByTestId('searchbar-input')
      const inputValue = 'Test input value'

      await userEvent.type(inputDesktop, inputValue)
      await userEvent.type(input, inputValue)

      expect(inputDesktop).toHaveDisplayValue(inputValue)
      expect(input).toHaveDisplayValue(inputValue)
    })
  })

  describe('render sort direction icons', () => {
    beforeEach(() => {
      render(
        <SearchBarWithSort
          inputName={inputName}
          inputPlaceholder={inputPlaceholder}
          selectName={selectName}
          selectValidation={selectValidation}
          selectOptions={selectOptions}
          onFieldSelection={onFieldSelection}
        />
      )
    })

    it('should render ascending icon at initial', () => {
      const ascendingIcon = screen.getByTestId('searchbar-arrow-up-icon')

      expect(ascendingIcon).toBeInTheDocument()
    })

    it('should render descending icon after click on ascending icon', async () => {
      const ascendingIcon = screen.getByTestId('searchbar-arrow-up-icon')

      await act(async () => {
        await userEvent.click(ascendingIcon)
      })

      const descendingIcon = screen.getByTestId('searchbar-arrow-down-icon')
      expect(descendingIcon).toBeInTheDocument()
    })

    it('should render ascending icon after click on descending icon', async () => {
      const ascendingIcon = screen.getByTestId('searchbar-arrow-up-icon')

      await act(async () => {
        await userEvent.click(ascendingIcon) // after clicked on ascending icon, descending icon will be appeared
        await userEvent.click(ascendingIcon)
      })

      const descendingIcon = screen.getByTestId('searchbar-arrow-down-icon')
      expect(descendingIcon).toBeInTheDocument()
    })
  })

  describe('render select control', () => {
    beforeEach(() => {
      render(
        <SearchBarWithSort
          inputName={inputName}
          inputPlaceholder={inputPlaceholder}
          selectName={selectName}
          selectValidation={selectValidation}
          selectOptions={selectOptions}
          onFieldSelection={onFieldSelection}
        />
      )
    })

    it('should render select field', () => {
      const element = screen.getByTestId('searchbar-select')

      expect(element).toBeInTheDocument()
    })

    it('should have correct name for select field', () => {
      const element = screen.getByTestId('searchbar-select')

      expect(element).toHaveAttribute('name', selectName)
    })

    it('should be selected a value when select a option', async () => {
      const element = screen.getByTestId('searchbar-select')
      const selectedValue = selectOptions[1]
      await userEvent.selectOptions(element, selectedValue)

      expect(element).toHaveDisplayValue(selectedValue)
    })
  })
})
