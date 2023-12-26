type CustomRadioButtonFieldsetPropsType = {
  title: string
  subTitle?: string
  children: React.ReactNode
}

const CustomRadioButtonFieldset = (
  props: CustomRadioButtonFieldsetPropsType
) => {
  const { title, subTitle, children } = props

  return (
    <fieldset>
      <legend
        className="text-sm font-semibold leading-6 text-gray-900"
        data-testid="custom-radio-fieldset-title"
      >
        {title}
      </legend>
      {subTitle && (
        <p
          className="mt-1 text-sm leading-6 text-gray-600"
          data-testid="custom-radio-fieldset-sub-title"
        >
          {subTitle}
        </p>
      )}

      <div className="mt-6 space-y-6">{children}</div>
    </fieldset>
  )
}

export default CustomRadioButtonFieldset
