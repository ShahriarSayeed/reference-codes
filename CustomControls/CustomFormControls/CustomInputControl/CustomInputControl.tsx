import { FieldError, TextField } from '@redwoodjs/forms'

type CustomInputControlPropsType = {
  colSpan: number | 'full'
  label?: string
  preText?: string
  inputName: string
  inputId: string
  placeholder?: string
  validation: object
  onChangeHandler?: (event) => void
  inputMode?: 'decimal'
  value?: string | number | readonly string[]
}

const CustomInputControl = (props: CustomInputControlPropsType) => {
  const {
    colSpan,
    label,
    preText,
    inputName,
    validation,
    onChangeHandler,
    inputMode,
    value,
  } = props

  return (
    // shs 230825: Two proper ways to use this CustomInputControl.
    // 1. Use CustomFormSection as parent component.
    // 2. Use this bellow parent div in container page if CustomFormSection not used as perent component
    // And keep same grid-cols-1/sm:grid-cols-6 for all parent container places
    // <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">{This component}</div>

    <div
      data-testid="input-control-colspan"
      className={`sm:col-span-` + colSpan}
    >
      {label && (
        <label
          htmlFor={inputName}
          className="rw-custom-control-label"
          data-testid={'input-control-label'}
        >
          {label}
        </label>
      )}

      <div className="mt-2">
        <div className="rw-custom-input-wrapper">
          {preText && (
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
              {preText}
            </span>
          )}

          <TextField
            name={inputName}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={validation}
            autoComplete="off"
            onChange={onChangeHandler}
            inputMode={inputMode}
            data-testid={'input-control-textbox'}
            value={value}
          />
        </div>
      </div>

      <FieldError name={inputName} className="rw-field-error" />
    </div>
  )
}

export default CustomInputControl
