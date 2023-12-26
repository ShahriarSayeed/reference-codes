import { FieldError, TextField, DateField } from '@redwoodjs/forms'

type CustomDateControlPropsType = {
  colSpan: number | 'full'
  label?: string
  inputName: string
  inputId: string
  placeholder?: string
  validation: object
  onChangeHandler?: (event) => void
  value?: string | number | readonly string[]
}

const CustomDateControl = (props: CustomDateControlPropsType) => {
  const { colSpan, label, inputName, validation, onChangeHandler, value } =
    props

  return (
    // shs 231002: Two proper ways to use this CustomDateControl.
    // 1. Use CustomFormSection as parent component.
    // 2. Use this bellow parent div in container page if CustomFormSection not used as perent component
    // And keep same grid-cols-1/sm:grid-cols-6 for all parent container places
    // <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">{This component}</div>
    <>
      <div
        data-testid="date-control-colspan"
        className={`sm:col-span-` + colSpan}
      >
        {label && (
          <label
            htmlFor={inputName}
            className="rw-custom-control-label"
            data-testid={'date-control-label'}
          >
            {label}
          </label>
        )}

        <div className="mt-2">
          <div className="rw-custom-input-wrapper">
            <DateField
              name={inputName}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={validation}
              data-testid={'date-control-textbox'}
              onChange={onChangeHandler}
              value={value}
            />
          </div>
        </div>

        <FieldError name={inputName} className="rw-field-error" />
      </div>
    </>
  )
}

export default CustomDateControl
