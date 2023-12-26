import { UserCircleIcon } from '@heroicons/react/24/solid'

type CustomUploadControlPropsType = {
  colSpan: number | 'full'
  label: string
  uploadTextLabel: string
  inputName: string
  inputId: string
  validation: object
}

const CustomUploadControl = (props: CustomUploadControlPropsType) => {
  const { colSpan, label, uploadTextLabel, inputName, inputId } = props

  return (
    <div className={`col-span-` + colSpan}>
      <label
        htmlFor={inputName}
        className="rw-custom-control-label"
        data-testid="custom-upload-control-label"
      >
        {label}
      </label>

      <div className="mt-2 flex items-center gap-x-3">
        {/* shs 230829: Todo: Decide it later */}
        {/* This custom upload control may be used for other file uploading instead of using image file */}
        {/* So need to think more about using image like icon here */}
        {/* Or use two type of icon. One is UserCircleIcon another is file icon */}
        <UserCircleIcon
          className="h-12 w-12 text-gray-300"
          aria-hidden="true"
        />
        <label
          htmlFor={inputName}
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <span data-testid="custom-upload-control-text">
            {uploadTextLabel}
          </span>
          <input
            id={inputId}
            name={inputName}
            type="file"
            className="sr-only"
            data-testid="custom-upload-control-input"
          />
        </label>
      </div>
    </div>
  )
}

export default CustomUploadControl
