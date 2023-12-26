import { useState } from 'react'

import {
  BarsArrowUpIcon,
  BarsArrowDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'

import { TextField, Form, SelectField } from '@redwoodjs/forms'

type searchbarPropType = {
  inputName: string
  inputValidation?: object
  inputPlaceholder: string
  selectName: string
  selectValidation?: object
  selectOptions: string[]
  onFieldSelection: () => void
}

const SearchBarWithSort = (props: searchbarPropType) => {
  const {
    inputName,
    inputValidation,
    inputPlaceholder,
    selectName,
    selectValidation,
    selectOptions,
    onFieldSelection,
  } = props
  const [sortAsc, setSortSortAsc] = useState(true)

  const handleOnChange = () => {
    onFieldSelection()
  }

  const renderOptions = () => {
    return selectOptions?.map((item) => {
      return <option key={item}>{item}</option>
    })
  }

  return (
    <div className="pb-5 sm:flex sm:items-center sm:justify-between sm:pb-0">
      <div className="mt-3 sm:mt-0">
        <label htmlFor="mobile-search-candidate" className="sr-only">
          Search
        </label>
        <label htmlFor="desktop-search-candidate" className="sr-only">
          Search
        </label>
        <div className="flex rounded-md shadow-sm">
          <div className="relative flex-grow focus-within:z-10">
            <Form>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                  data-testid="searchbar-input-search-icon"
                />
              </div>
              <TextField
                name={inputName}
                id={inputName}
                className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                placeholder={inputPlaceholder}
                validation={inputValidation}
                data-testid="searchbar-input"
              />
              <TextField
                name={inputName}
                id={inputName}
                className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                placeholder={inputPlaceholder}
                validation={inputValidation}
                data-testid="searchbar-input-desktop"
              />
            </Form>
          </div>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {sortAsc ? (
              <BarsArrowUpIcon
                className="-ml-0.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
                onClick={() => setSortSortAsc(false)}
                data-testid="searchbar-arrow-up-icon"
              />
            ) : (
              <BarsArrowDownIcon
                className="-ml-0.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
                onClick={() => setSortSortAsc(true)}
                data-testid="searchbar-arrow-down-icon"
              />
            )}

            {/* Sort */}
            <Form>
              <SelectField
                name={selectName}
                className={
                  'block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                }
                errorClassName={''}
                onChange={handleOnChange}
                validation={selectValidation}
                data-testid="searchbar-select"
              >
                {renderOptions()}
              </SelectField>
            </Form>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBarWithSort
