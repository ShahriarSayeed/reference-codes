import { Form, FieldError, Label, DateField } from '@redwoodjs/forms'

/*
 * sd 221223
 * displays 2 date fields, dateFrom and dateTo
 * props
 *   setDates() to return selected date range to the parent component
 *     props are usually passed from parent to child (uni-directional)
 *     in order to pass props from child to parent, use a function (in this case setDates())
 *     (as object (a function is an object) parameters are passed by reference)
 *   initialDateFrom - initial dateFrom value (in yyyy-mm-dd format, eg. new Date().toISOString().split('T')[0])
 *   initialDateTo - initial dateTo value
 * selected date range is returned as a state, which is originally created in the parent component
 */
// sd 230314 refactor DateRangeFields component
//   define onDateChange in the parent component rather than the child component
//   to make the child component more flexible (can define something else for onDateChange in
//   another parent component)
const DateRangeFields = (props) => {
  // const onDateChange = (event) => {
  //   const { name, value } = event.target
  //   // needs prevState to retain the 'other' date (the date that did not change in this event)
  //   // without prevState, it becomes undefined
  //   props.setDates((prevState) => {
  //     return {
  //       ...prevState,
  //       [name]: value
  //     }
  //   })
  // }

  // shs 230928: temporary styles changed (i.e. !mt-2) in labels.
  // this component should be removed when CustomDataTable component will support Date Range filter feature.
  return (
    <Form className="flex flex-col content-center sm:flex-row">
      <Label
        name="dateFrom"
        className="rw-label !mt-2 w-32 flex-initial"
        errorClassName="rw-label rw-label-error"
      >
        Date From
      </Label>
      <DateField
        name="dateFrom"
        onChange={props.onDateChange}
        value={props.dateRange.dateFrom}
        className="rw-input w-64 flex-initial"
        errorClassName="rw-input rw-input-error"
      />
      <FieldError name="dateFrom" className="rw-field-error" />
      <div className="w-10 flex-none" />
      <Label
        name="dateTo"
        className="rw-label !mt-2 w-32 flex-initial"
        errorClassName="rw-label rw-label-error"
      >
        Date To
      </Label>
      <DateField
        name="dateTo"
        onChange={props.onDateChange}
        value={props.dateRange.dateTo}
        className="rw-input w-64 flex-initial"
        errorClassName="rw-input rw-input-error"
      />
      <FieldError name="dateTo" className="rw-field-error" />
    </Form>
  )
}

export default DateRangeFields
