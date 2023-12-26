import { render, screen } from '@redwoodjs/testing/web'

import { standard as jobList } from 'src/components/TblJob/JobEmpTsRecentCell/JobEmpTsRecentCell.mock'

import ResultDropdown from './ResultDropdown'

describe('ResultDropdown Component', () => {
  it('renders successfully', async () => {
    const list = jobList().tblJobsByJobNumber
    const value = list[0]
    const showSuggestions = true
    const valueObjectHandler = null
    const toggle = true
    const setToggle = null

    expect(() => {
      render(
        <ResultDropdown
          value={value}
          showSuggestions={showSuggestions}
          valueObjectHandler={valueObjectHandler}
          toggle={toggle}
          setToggle={setToggle}
          list={list}
        />
      )
    }).not.toThrow()
  })

  describe('render elements when loading', () => {
    const value = ''
    const showSuggestions = true
    const valueObjectHandler = null
    const toggle = true
    const setToggle = null
    const list = 'Loading'

    beforeEach(() => {
      render(
        <ResultDropdown
          value={value}
          showSuggestions={showSuggestions}
          valueObjectHandler={valueObjectHandler}
          toggle={toggle}
          setToggle={setToggle}
          list={list}
        />
      )
    })

    it('should have only loading element when data is loading', () => {
      const loadingElement = screen.getByTestId(
        'searchable-dropdown-result-loading'
      )

      expect(loadingElement).toBeInTheDocument()
    })

    it('should not have result list element when data is loading', () => {
      const ulElement = screen.queryByTestId('searchable-dropdown-result-ul')

      expect(ulElement).not.toBeInTheDocument()
    })

    it('should not have not found element when data is loading', () => {
      const notfoundElement = screen.queryByTestId(
        'searchable-dropdown-result-notfound'
      )

      expect(notfoundElement).not.toBeInTheDocument()
    })
  })

  describe('render elements when not found', () => {
    const value = ''
    const showSuggestions = true
    const valueObjectHandler = null
    const toggle = true
    const setToggle = null
    const list = []

    beforeEach(() => {
      render(
        <ResultDropdown
          value={value}
          showSuggestions={showSuggestions}
          valueObjectHandler={valueObjectHandler}
          toggle={toggle}
          setToggle={setToggle}
          list={list}
        />
      )
    })

    it('should have not found element when no data found', () => {
      const loadingElement = screen.getByTestId(
        'searchable-dropdown-result-notfound'
      )

      expect(loadingElement).toBeInTheDocument()
    })

    it('should not have result list element when no data found', () => {
      const ulElement = screen.queryByTestId('searchable-dropdown-result-ul')

      expect(ulElement).not.toBeInTheDocument()
    })

    it('should not have loading element when no data found', () => {
      const notfoundElement = screen.queryByTestId(
        'searchable-dropdown-result-loading'
      )

      expect(notfoundElement).not.toBeInTheDocument()
    })
  })

  describe('render elements when data loaded', () => {
    const list = jobList().tblJobsByJobNumber
    const value = list[0].data
    const showSuggestions = true
    const valueObjectHandler = null
    const toggle = true
    const setToggle = null
    const secondaryTextFieldName = 'JobType'

    beforeEach(() => {
      render(
        <ResultDropdown
          value={value}
          showSuggestions={showSuggestions}
          valueObjectHandler={valueObjectHandler}
          toggle={toggle}
          setToggle={setToggle}
          list={list}
          secondaryTextFieldName={secondaryTextFieldName}
        />
      )
    })

    it('should have list item', () => {
      const liElement = screen.getByTestId(
        'searchable-dropdown-result-li-' + value
      )

      expect(liElement).toBeInTheDocument()
    })

    it('should have list item with value', async () => {
      const element = await screen.getByTestId(
        'searchable-dropdown-result-text-' + value
      ).textContent

      expect(element).toBe(value)
    })

    it('should have list item with secondary text value', async () => {
      const element = await screen.getByTestId(
        'searchable-dropdown-result-sec-text-' + value
      ).textContent

      expect(element).toBe(list[0][secondaryTextFieldName])
    })
  })
})
