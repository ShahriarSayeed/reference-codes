import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

import { render, screen, MockProviders } from '@redwoodjs/testing/web'

import RedwoodjsFormWrapper from 'src/components/CustomWrappers/RedwoodjsFormWrapper'
import JobEmpTsRecentCell from 'src/components/TblJob/JobEmpTsRecentCell'

import SearchableDropdown from './SearchableDropdown'

describe('SearchableDropdown Component', () => {
  const colSpan = 4
  const label = 'Job Number'
  const name = 'Job_Number'
  const validation = { required: true }
  const disabled = false
  const value = ''
  const handleSearchBy = () => {}

  it('renders successfully', async () => {
    mockGraphQLQuery('FindTblJobsByJobNumber', () => {
      return {
        tblJobsByJobNumber: {
          data: 'S1001',
          Street_Number: '123',
          Street_Name: 'Railway Ave',
          Locality: 'Springfield',
          txtJobName: 'Big Constuction Job',
          JobType: 'Construction',
          Job_Description: 'Big Construction',
          Company_Name: 'ABC Company Limited',
        },
      }
    })

    expect(() => {
      render(
        <SearchableDropdown
          colSpan={colSpan}
          label={label}
          name={name}
          disabled={disabled}
          validation={validation}
          searchBy={value}
          handleSearchBy={handleSearchBy}
          valueObject={value}
          valueObjectHandler={null}
          dataComponent={JobEmpTsRecentCell}
          variables={{
            empCode: 'AO',
            includeDisbOnly: false,
            excludeDisb: false,
          }}
          secondaryTextFieldName="JobType"
        />,
        {
          wrapper: ({ children }) => (
            <MockProviders>
              <RedwoodjsFormWrapper>{children}</RedwoodjsFormWrapper>
            </MockProviders>
          ),
        }
      )
    }).not.toThrow()
  })

  describe('render elements', () => {
    beforeEach(() => {
      render(
        <SearchableDropdown
          colSpan={colSpan}
          label={label}
          name={name}
          disabled={disabled}
          validation={validation}
          searchBy={value}
          handleSearchBy={handleSearchBy}
          valueObject={value}
          valueObjectHandler={null}
          dataComponent={JobEmpTsRecentCell}
          variables={{
            empCode: 'AO',
            includeDisbOnly: false,
            excludeDisb: false,
          }}
        />,
        {
          wrapper: ({ children }) => (
            <MockProviders>
              <RedwoodjsFormWrapper>{children}</RedwoodjsFormWrapper>
            </MockProviders>
          ),
        }
      )
    })

    it('should have proper colSpan class', () => {
      const element = screen.getByTestId('searchable-dropdown-control')

      expect(element).toHaveClass(`sm:col-span-` + colSpan)
    })

    it('should have label if label props supplied', () => {
      const element = screen.getByTestId('searchable-dropdown-label')

      expect(element).toBeInTheDocument()
    })

    // shs 230921: this test required a wrapper component which will handle input change state value
    // thus blocked now
    // it('should have value in input field when type text', async () => {
    //   const inputField = screen.getByTestId('searchable-dropdown-input')
    //   const inputValue = 'Test input value'

    //   await act(async () => {
    //     await userEvent.type(inputField, inputValue)

    //     expect(inputField).toHaveDisplayValue(inputValue)
    //   })
    // })

    // test toggle state: when clicke on input
    it('should toggle on result list when clicked on input', async () => {
      const inputField = screen.getByTestId('searchable-dropdown-input')

      await act(async () => {
        await userEvent.click(inputField)
      })

      const resultElement = screen.getByTestId('searchable-dropdown-result-ul')
      expect(resultElement).toBeInTheDocument()
    })

    // test toggle state: when clicke on UpDown arrow
    it('should toggle on result list when clicked on up-down arrow icon', async () => {
      const iconField = screen.getByTestId('searchable-dropdown-updown-icon')

      await act(async () => {
        await userEvent.click(iconField)
      })

      const element = screen.getByTestId('searchable-dropdown-updown-icon')
      expect(element).toBeInTheDocument()
    })
  })

  describe('toggle result list', () => {
    beforeEach(() => {
      render(
        <SearchableDropdown
          colSpan={colSpan}
          label={label}
          name={name}
          disabled={disabled}
          validation={validation}
          searchBy={'S1001'}
          handleSearchBy={handleSearchBy}
          valueObject={''}
          valueObjectHandler={() => {}}
          dataComponent={JobEmpTsRecentCell}
          variables={{
            empCode: 'AO',
            includeDisbOnly: false,
            excludeDisb: false,
          }}
        />,
        {
          wrapper: ({ children }) => (
            <MockProviders>
              <RedwoodjsFormWrapper>{children}</RedwoodjsFormWrapper>
            </MockProviders>
          ),
        }
      )
    })

    it('should toggle off result list when clicked on any result item', async () => {
      const iconField = screen.getByTestId('searchable-dropdown-updown-icon')

      await act(async () => {
        await userEvent.click(iconField)
      })

      const mockId = 'S1001'
      const inputField = screen.getByTestId(
        'searchable-dropdown-result-li-' + mockId
      )

      await act(async () => {
        await userEvent.click(inputField)
      })

      const element = screen.queryByTestId('searchable-dropdown-result-ul')
      expect(element).not.toBeInTheDocument()
    })
  })
})
