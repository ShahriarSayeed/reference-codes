type CustomRadioButtonControlPropsType = {
  label: string
  inputName: string
  inputId: string
}

const CustomRadioButtonControl = (props: CustomRadioButtonControlPropsType) => {
  const { label, inputId, inputName } = props

  return (
    <div className="flex items-center gap-x-3">
      <input
        id={inputId}
        name={inputName}
        type="radio"
        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
        data-testid="custom-radio-button-input"
      />
      <label
        htmlFor={inputId}
        className="rw-custom-control-label"
        data-testid="custom-radio-button-label"
      >
        {label}
      </label>
    </div>
  )
}

export default CustomRadioButtonControl
