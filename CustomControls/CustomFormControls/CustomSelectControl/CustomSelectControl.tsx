import { useForm } from 'react-hook-form'

type CustomSelectControlPropsType = {
  colSpan: number | 'full'
  label?: string
  inputName: string
  inputId: string
  validation: object
  options: string[]
}

const CustomSelectControl = (props: CustomSelectControlPropsType) => {
  const { colSpan, label, inputId, inputName, validation, options } = props
  const {
    register,
    formState: { errors },
  } = useForm<any>()

  const renderOptions = () => {
    return options.map((item) => {
      return <option key={item}>{item}</option>
    })
  }

  return (
    // shs 230825: Two proper ways to use this CustomSelectControl.
    // 1. Use CustomFormSection as parent component.
    // 2. Use this bellow parent div in container page if CustomFormSection not used as perent component
    // And keep same grid-cols-1/sm:grid-cols-6 for all parent container places
    // <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">{This component}</div>

    // shs 230825: Use react-hook-form directly with native html controls. avoid redwoodjs/forms controls

    <div
      data-testid="custom-select-control-colspan"
      className={`sm:col-span-` + colSpan}
    >
      {label && (
        <label
          htmlFor={inputName}
          className="rw-custom-control-label"
          data-testid={'custom-select-control-label'}
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <select
          id={inputId}
          name={inputName}
          autoComplete={inputName}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          data-testid={'custom-select-control'}
          {...register(inputName, validation)}
        >
          <option>{''}</option>
          {renderOptions()}
        </select>
      </div>

      {errors[inputName] && (
        <p role="alert" className='rw-field-error"'>
          This field is required
        </p>
      )}
    </div>
  )
}

export default CustomSelectControl
