type CustomButtonControlPropsType = {
  text: string
  className: string
  clickHandler: () => void
  disabled: boolean
  rest?: unknown[]
}

const CustomButtonControl = (props: CustomButtonControlPropsType) => {
  const { text, clickHandler, className, disabled, ...rest } = props

  const onClickHandler = () => {
    clickHandler()
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClickHandler}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  )
}

export default CustomButtonControl
