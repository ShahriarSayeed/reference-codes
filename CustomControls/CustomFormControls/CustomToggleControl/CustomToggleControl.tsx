import { useState, Fragment } from 'react'

import { Switch } from '@headlessui/react'

import { TextField } from '@redwoodjs/forms'

import { classNames } from 'src/lib/common'

type CustomToggleControlPropsType = {
  inputName: string
  inputId: string
  srLabel?: string
}

const CustomToggleControl = (props: CustomToggleControlPropsType) => {
  const { inputName, inputId, srLabel } = props
  const [enabled, setEnabled] = useState(false)

  const onChangeHandler = () => {
    setEnabled(!enabled)
  }

  return (
    <>
      <Switch
        as={Fragment}
        checked={enabled}
        onChange={onChangeHandler}
        data-testid="custom-toggle-control"
      >
        {({ checked }) => (
          <button
            className={classNames(
              checked ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
            )}
          >
            {srLabel && (
              <span
                className="sr-only"
                data-testid="custom-toggle-control-srlabel"
              >
                {srLabel}
              </span>
            )}

            <span
              aria-hidden="true"
              className={classNames(
                checked ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              )}
            />
          </button>
        )}
      </Switch>
      <TextField
        name={inputName}
        id={inputId}
        value={enabled.toString()}
        validation={{}}
        hidden={true}
        data-testid="custom-toggle-control-input"
      />
    </>
  )
}

export default CustomToggleControl
