type CustomSubmitButtonPropsType = {
  text: string
  disabled?: boolean
  rest?: unknown[]
}

const CustomSubmitButtonControl = (props: CustomSubmitButtonPropsType) => {
  const { text, disabled, ...rest } = props

  return (
    <button
      type="submit"
      className="rw-button-primary"
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  )
}

export default CustomSubmitButtonControl
