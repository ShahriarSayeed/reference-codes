import { useState } from 'react'

import { FieldError } from '@redwoodjs/forms'

import SearchableDropdownInput from './SearchableDropdownInput'

/* // sd 230125 this interface is commented out as
// sd doesn't know how to declare dataComponent type
// vvv err msg received on TblTimesheetForm SearchableDropdown tag dataComponent prop
// (property) IProps.dataComponent: React.FC<{}>
// Type '(props: { searchTerm: string; setSearchTerm: (searchTerm: string) => void; toggle: boolean; setToggle: (toggle: boolean) => void; searchBy?: string; totalRecCnt?: number; }) => Element' is not assignable to type 'FC<{}>'.
//   Types of parameters 'props' and 'props' are incompatible.
//     Type '{ children?: ReactNode; }' is missing the following properties from type '{ searchTerm: string; setSearchTerm: (searchTerm: string) => void; toggle: boolean; setToggle: (toggle: boolean) => void; searchBy?: string; totalRecCnt?: number; }': searchTerm, setSearchTerm, toggle, setTogglets(2322)
// SearchableDropdown.tsx(11, 3): The expected type comes from property 'dataComponent' which is declared here on type 'IntrinsicAttributes & IProps'
// vvv also DataComponent tag searchBy prop in this file has err
// (property) searchBy: string
// Type '{ searchBy: string; totalRecCnt: number; searchTerm: string; setSearchTerm: (searchTerm: any) => void; toggle: boolean; setToggle: Dispatch<SetStateAction<boolean>>; }' is not assignable to type 'IntrinsicAttributes & { children?: ReactNode; }'.
//   Property 'searchBy' does not exist on type 'IntrinsicAttributes & { children?: ReactNode; }'.ts(2322)
// sd doesn't know what it means
// come back to it when sd is more familiar with interface and types
interface IProps  {
  name: string
  style: string
  disabled: boolean
  handleOnChange: (value: string) => boolean
  dataComponent: React.FC
  totalRecCnt: number
} */

const SearchableDropdown = ({
  colSpan = 6,
  label,
  name,
  validation,
  disabled,
  searchBy,
  handleSearchBy,
  valueObject,
  valueObjectHandler,
  dataComponent: DataComponent,
  variables,
  secondaryTextFieldName = null,
}) => {
  // searchable dropdown - https://www.youtube.com/watch?v=7phcHMPum8g
  // click outside to close dropdown - https://www.youtube.com/watch?v=mwb6zgs9peU&t=310s

  // sd 230127 declare value and toggle states in the parent of this compoennt to get the value back propely
  // make sure to declare toggle state as well in the parent as 2 setStates beging apart
  // causes some funny behaviours

  // sd 230318 remove useEffect to force users to select an item from the dropdown
  // (now dropdown doesn't close unless user picks one)
  // // sd 230124 close the dropdown when outside Input is clicked
  // // the click is checked only once (ie. no matter how many times outside is clicked,
  // // toggle is set to false only after the first time)
  // useEffect(()=> {
  //   const closeDropdown = (e) => {
  //     if (e.composedPath()[0].name !== name) {
  //       handleToggle(false)
  //     }
  //   }
  //   document.body.addEventListener('click', closeDropdown)
  //   return () => document.body.removeEventListener('click', closeDropdown)
  // }, [])

  // const handleInputChange = (value) => {
  //   handleToggle(true)
  //   handleSearchBy(value)
  // }

  const [toggle, setToggle] = useState(false)

  // useEffect(() => {
  //   if (searchBy) {
  //     handleSearchBy(searchBy)
  //   }
  // }, [handleSearchBy, searchBy])

  const handleInputChange = (e) => {
    setToggle(true)
    handleSearchBy(e.target.value)
  }

  return (
    <div
      data-testid="searchable-dropdown-control"
      className={`sm:col-span-` + colSpan}
    >
      {label && (
        <label
          htmlFor={name}
          className="rw-custom-control-label"
          data-testid={'searchable-dropdown-label'}
        >
          {label}
        </label>
      )}

      <div className="relative mt-2">
        <SearchableDropdownInput
          name={name}
          validation={validation}
          disabled={disabled}
          searchBy={searchBy}
          handleChange={handleInputChange}
          toggle={toggle}
          setToggle={setToggle}
        />
        <DataComponent
          searchBy={searchBy}
          variables={variables}
          valueObject={valueObject}
          valueObjectHandler={valueObjectHandler}
          toggle={toggle}
          setToggle={setToggle}
          secondaryTextFieldName={secondaryTextFieldName}
        />
      </div>

      <FieldError name={name} className="rw-field-error" />
    </div>
  )
}

export default SearchableDropdown
