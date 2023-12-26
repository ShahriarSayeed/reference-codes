type CustomFormSectionPropsType = {
  sectionTitle: string
  sectionSubTitle: string
  children: React.ReactNode
  haveBottomBorder?: boolean
}

const CustomFormSection = (props: CustomFormSectionPropsType) => {
  const { sectionTitle, sectionSubTitle, haveBottomBorder, children } = props
  return (
    <div
      className={
        'mt-6 pb-12 ' + (haveBottomBorder && 'border-b border-gray-900/10')
      }
    >
      <h2
        data-testid={'form-section-title'}
        className="text-base font-semibold leading-7 text-gray-900"
      >
        {sectionTitle}
      </h2>
      <p
        data-testid={'form-section-sub-title'}
        className="mt-1 text-sm leading-6 text-gray-600"
      >
        {sectionSubTitle}
      </p>

      <div className="rw-input-grid-div">{children}</div>
    </div>
  )
}

export default CustomFormSection
