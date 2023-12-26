type CustomFormSectionPropsType = {
  title: string
  children: React.ReactNode
}

const CustomCheckboxFieldset = (props: CustomFormSectionPropsType) => {
  const { title, children } = props
  return (
    <fieldset>
      <legend
        data-testid="custom-checkbox-fieldset-title"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        {title}
      </legend>
      <div className="mt-6 space-y-6">{children}</div>
    </fieldset>
  )
}

export default CustomCheckboxFieldset
