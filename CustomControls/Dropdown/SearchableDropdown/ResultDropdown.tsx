import { Fragment } from 'react'

import { Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

import { classNames } from 'src/lib/common'

// sd 230123 props in IProps are all optional in case this component is called for 'Loading...'
interface IProps {
  value?: string
  showSuggestions?: boolean
  valueObjectHandler?: (valueObject: object) => void
  toggle?: boolean
  setToggle?: (toggle: boolean) => void
  secondaryTextFieldName?: string | null
}

// sd 230123 list is left out as type any as we don't know which data cell is passed to this component
const ResultDropdown = ({
  value,
  showSuggestions,
  valueObjectHandler,
  toggle,
  setToggle,
  list,
  secondaryTextFieldName,
}: IProps & any) => {
  if (list === 'Loading') {
    return (
      <div
        className="rw-input-dropdown-result"
        data-testid="searchable-dropdown-result-loading"
      >
        <div className="select-none border px-4 py-2 text-sm text-gray-500 hover:bg-transparent">
          Loading...
        </div>
      </div>
    )
  }

  // sd 230124 when the value is null, can show suggestions (eg. recently used jobs
  //   - whatever set in api/src/services)
  // sd 230202 added z-index (z-10) to the dropdown div
  //   without it, job result dropdown goes behind the work type Input box
  //   (don't know why as Input is not absolute, but it does anyway)
  //   z-index makes sure the result dropdown comes in front of other elements
  if (value || showSuggestions) {
    if (list && Array.isArray(list) && list.length > 0) {
      return (
        toggle && (
          <Transition
            show={toggle}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ul
              className="rw-input-dropdown-result"
              data-testid={'searchable-dropdown-result-ul'}
            >
              {list.map((item) => {
                const selected = item.data === value

                return (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                  <li
                    key={item.data}
                    className="rw-input-dropdown-result-item"
                    onClick={() => {
                      setToggle(false)
                      valueObjectHandler(item)
                    }}
                    data-testid={'searchable-dropdown-result-li-' + item.data}
                  >
                    {secondaryTextFieldName ? (
                      <>
                        <div className="flex">
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate'
                            )}
                            data-testid={
                              'searchable-dropdown-result-text-' + item.data
                            }
                          >
                            {item.data}
                          </span>

                          <span
                            className="ml-2 truncate text-gray-500 hover:text-indigo-200"
                            data-testid={
                              'searchable-dropdown-result-sec-text-' + item.data
                            }
                          >
                            {item[secondaryTextFieldName]}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {item.data}
                        </span>
                      </>
                    )}

                    {selected && (
                      <span
                        className={
                          'absolute inset-y-0 right-0 flex items-center pr-4 hover:text-white'
                        }
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </Transition>
        )
      )
    }

    return (
      <div
        className="rw-input-dropdown-result"
        data-testid="searchable-dropdown-result-notfound"
      >
        <div className="select-none border px-4 py-2 text-sm font-bold text-red-500 hover:bg-transparent">
          Not Found
        </div>
      </div>
    )
  }

  // when showSuggestions is off, show nothing when Input is null
  return null
}

export default ResultDropdown
