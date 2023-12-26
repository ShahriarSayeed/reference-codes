import { SelectField } from '@redwoodjs/forms'

import { ChevronDownIcon } from '@heroicons/react/20/solid'

// sd 230124
// use 'disabled' to toggle between text box and dropdown
//   (eg. when entering new ts, use job dropdown
//   whereas when editing an existing ts, use job text box)
// autoComplete='off' disables history pop-ups (what has been
//   entered in the past) when the first letter is typed in
// sd 230308 extra reinforcement of required validation
//   react controlled components don't allow null as its 'value'
//   (so must use '' empty string as useState initial value)
//   redwood's emptyAs prop (https://redwoodjs.com/docs/forms#default-treatment-of-empty-input-values)
//   converts '' to null so that null is correctly saved to the db,
//   but it still does not make validation={{required: true}} to fail
//   so use react hook form's validate function to manually include ''
//   in the required test. this works... only thing that doesn't work is
//   when the user rectify the field value, violation err msg does not
//   instantly disappear like other fields that use validation={{required: true}}
// sd 230321 ^^^ validation problem is fixed by adding validation to the
//   paired TextField (don't know why... this must also be something to do with
//   setState being async...)
// sd 230322 dropdown only opens on click. this forces users to click from the dropdown to close it
const ListBoxSelect = ({
  name,
  style,
  errorStyle,
  validation,
  value,
  handleChange,
  toggle,
  setToggle,
}) => {
  return (
    <>
      <SelectField
        name={name}
        className={style}
        errorClassName={errorStyle}
        value={value}
        validation={validation}
        onChange={(e) => handleChange(e.target.value)}
        onClick={() => {
          if (!toggle) {
            setToggle(!toggle)
          }
        }}
      />
      <div
        className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        onClick={() => {
          if (!toggle) {
            setToggle(!toggle)
          }
        }}
      >
        <ChevronDownIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
      </div>
    </>
  )
}

export default ListBoxSelect
