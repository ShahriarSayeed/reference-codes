/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { TextField } from '@redwoodjs/forms'

interface SearchableDropdownInputProps {
  name: string
  validation: any
  disabled: boolean
  searchBy: string
  handleChange: (valueObject: object) => void
  toggle: boolean
  setToggle: (toggle: boolean) => void
  myKey?: string
}
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
// const Input = ({
//   name,
//   style,
//   errorStyle,
//   validation,
//   disabled,
//   value,
//   handleChange,
//   toggle,
//   setToggle,
// }) => {
const SearchableDropdownInput = ({
  name,
  validation,
  disabled,
  searchBy,
  handleChange,
  toggle,
  setToggle,
  myKey = '',
}: SearchableDropdownInputProps) => {
  // const formMethods = useForm()
  // const { setValue } = formMethods

  // useEffect(() => {
  //   // let's put react-hook-form controls set values in the next tick in event loop
  //   setTimeout(() => {
  //     setValue(name, searchBy)
  //   }, 100)
  // }, [setValue, name, searchBy])

  return (
    // shs 230905: As per design(tailwindcssUI template), this wrapper div with classes is necessary
    <div className="relative w-full rounded-md shadow-sm">
      <TextField
        name={name}
        // className="rw-searchable-dropdown-input"
        // errorClassName="rw-searchable-dropdown-input-error"
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        value={searchBy}
        validation={validation}
        // emptyAs={null}
        // validation={{
        //   validate: { required: v => !!v }
        // }}
        disabled={disabled}
        // hidden={disabled}
        autoComplete="off"
        // onChange={(e) => handleChange(e.target.value)}
        onChange={handleChange}
        onClick={() => {
          if (!toggle) {
            setToggle(!toggle)
          }
        }}
        key={myKey}
        data-testid="searchable-dropdown-input"
      />

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        onClick={() => {
          if (!toggle) {
            setToggle(!toggle)
          }
        }}
        hidden={disabled}
        data-testid="searchable-dropdown-updown-icon"
      >
        <ChevronUpDownIcon
          className={
            'h-5 w-5 text-gray-400 ' + (disabled ? 'invisible' : 'visible')
          }
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export default SearchableDropdownInput
