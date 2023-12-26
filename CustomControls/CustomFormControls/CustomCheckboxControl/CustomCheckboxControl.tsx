type CustomCheckboxControlPropsType = {
  label: string
  subLabel?: string
  inputName: string
  inputId: string
}

const CustomCheckboxControl = (props: CustomCheckboxControlPropsType) => {
  const { label, subLabel, inputId, inputName } = props

  return (
    <div className="relative flex gap-x-3">
      <div className="flex h-6 items-center">
        <input
          id={inputId}
          name={inputName}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          data-testid={'custom-checkbox-input'}
        />
      </div>
      <div className="text-sm leading-6">
        <label
          htmlFor={inputName}
          className="font-medium text-gray-900"
          data-testid={'custom-checkbox-label'}
        >
          {label}
        </label>
        {subLabel && (
          <p
            className="text-gray-500"
            data-testid={'custom-checkbox-sub-label'}
          >
            {subLabel}
          </p>
        )}
      </div>
    </div>
  )
}

export default CustomCheckboxControl
