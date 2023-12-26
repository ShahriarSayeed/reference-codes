interface IProps {
  initialValue?: string
  valueObjectHandler?: (valueObject: object) => void
  toggle?: boolean
  setToggle?: (toggle: boolean) => void
}

const ResultListBox = ({
  initialValue,
  valueObjectHandler,
  toggle,
  setToggle,
  list,
}: IProps & any) => {
  if (list.length) {
    return (
      toggle && (
        <div className="rw-input-dropdown-result">
          <option value="" disabled>
            {initialValue}
          </option>
          {list.map((item) => {
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                key={item.TaskCode}
                data-taskno={item.Task_No}
                className="rw-input-dropdown-result-item"
                onClick={() => {
                  setToggle(false)
                  valueObjectHandler(item)
                }}
              >
                {item.TaskCode} - {item.strTaskName}
              </div>
            )
          })}
        </div>
      )
    )
  }

  return null
}

export default ResultListBox
