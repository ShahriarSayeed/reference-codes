import { Link } from '@redwoodjs/router'

import CustomButtonControl from '../CustomButtonControl/CustomButtonControl'
import CustomSubmitButtonControl from '../CustomSubmitButtonControl/CustomSubmitButtonControl'

type CustomFormButtonsSectionPropsType = {
  isEditMode?: boolean
  isViewMode?: boolean
  saveDisabled: boolean
  editDisabled?: boolean
  cancelBackLink: string
  editHandler?: () => void
  deleteHandler?: () => void
}

const CustomFormButtonsSection = (props: CustomFormButtonsSectionPropsType) => {
  const {
    isEditMode,
    isViewMode,
    saveDisabled,
    cancelBackLink,
    editHandler,
    deleteHandler,
  } = props

  return (
    <div className="mt-6 flex items-center justify-between border-b border-gray-900/10 pb-6">
      {!isViewMode && (
        <div className="flex gap-x-6">
          <CustomSubmitButtonControl
            text="Save"
            data-testid="custom-form-save-button"
            disabled={saveDisabled}
          />

          <Link
            to={cancelBackLink}
            className="rw-button-default"
            data-testid="custom-form-cancel-button"
          >
            Cancel
          </Link>
        </div>
      )}

      {isViewMode && (
        <CustomButtonControl
          text="Edit"
          className="rw-button-primary"
          data-testid="custom-form-edit-button"
          clickHandler={editHandler}
          disabled={false}
        />
      )}

      {(isEditMode || isViewMode) && (
        <CustomButtonControl
          text="Delete"
          className="rw-button-warning"
          data-testid="custom-form-delete-button"
          clickHandler={deleteHandler}
          disabled={false}
        />
      )}
    </div>
  )
}

export default CustomFormButtonsSection
