import { TextAreaField, FieldError } from '@redwoodjs/forms'

type CustomInputControlPropsType = {
  colSpan: number | 'full'
  label?: string
  subTitle?: string
  inputName: string
  inputId: string
  rows: number
  validation: object
  onChangeHandler?: (event) => void
  disabled?: boolean
}

const CustomTextareaControl = (props: CustomInputControlPropsType) => {
  const {
    colSpan,
    label,
    subTitle,
    inputName,
    inputId,
    rows,
    validation,
    onChangeHandler,
    disabled = false,
  } = props

  return (
    // shs 230825: Two proper ways to use this CustomTextareaControl.
    // 1. Use CustomFormSection as parent component.
    // 2. Use this bellow parent div in container page if CustomFormSection not used as perent component
    // And keep same grid-cols-1/sm:grid-cols-6 for all parent container places
    // <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">{This component}</div>

    <div
      data-testid="textarea-control-textbox-colspan"
      className={`sm:col-span-` + colSpan}
    >
      {label && (
        <label
          htmlFor={inputName}
          className="rw-custom-control-label"
          data-testid={'textarea-control-label'}
        >
          {label}
        </label>
      )}

      <div className="mt-2">
        <TextAreaField
          id={inputId}
          name={inputName}
          className="rw-textarea"
          errorClassName="rw-textarea rw-input-error"
          rows={rows}
          validation={validation}
          onChange={onChangeHandler}
          data-testid={'textarea-control-textbox'}
          disabled={disabled}
        />

        {subTitle && (
          <p className="mt-3 text-sm leading-6 text-gray-600">{subTitle}</p>
        )}
      </div>

      <FieldError name={inputName} className="rw-field-error" />
    </div>
  )
}

export default CustomTextareaControl
