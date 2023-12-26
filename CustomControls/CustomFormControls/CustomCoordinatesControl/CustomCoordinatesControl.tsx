import React, { useState } from 'react'

type CustomCoordinatesControlPropsType = {
  colSpan: number | 'full'
  label: string
  buttonText: string
  inputName: string
  inputId: string
  validation: object
  clickHandler?: () => void
  disabled?: boolean
  rest?: unknown[]
}

const CustomCoordinatesControl = (props: CustomCoordinatesControlPropsType) => {
  const {
    colSpan,
    label,
    buttonText,
    inputName,
    inputId,
    clickHandler,
    disabled,
    ...rest
  } = props
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)

  const onClickHandler = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      }
    })

    if (clickHandler) {
      clickHandler()
    }
  }

  return (
    <>
      <div
        className={`col-span-` + colSpan}
        data-testid="capture-lat-lng-control-colspan"
      >
        <label
          htmlFor={inputName}
          className="rw-custom-control-label"
          data-testid="capture-lat-lng-control-label"
        >
          {label}
        </label>

        <div className="mt-2 flex items-center gap-x-3">
          <button
            id={inputId}
            name={inputName}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={onClickHandler}
            disabled={disabled}
            data-testid={'capture-lat-lng-control-button'}
            {...rest}
          >
            {buttonText}
          </button>

          {latitude && longitude && (
            <div
              className="flex-column flex"
              data-testid={'capture-lat-lng-section'}
            >
              <div className="mr-4">latitude: {latitude}</div>
              <div>longitude: {longitude}</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CustomCoordinatesControl
