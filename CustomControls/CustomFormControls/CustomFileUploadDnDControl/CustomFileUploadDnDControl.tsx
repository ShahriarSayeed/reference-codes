import { PhotoIcon } from '@heroicons/react/20/solid'

type CustomFileUploadDnDControlPropsType = {
  colSpan: number | 'full'
  label: string
  inputName: string
  inputId: string
  allowedFileTyepes: string[]
  maxFileSizeInMB: number
  validation: object
}

const CustomFileUploadDnDControl = (
  props: CustomFileUploadDnDControlPropsType
) => {
  const {
    colSpan,
    label,
    inputName,
    inputId,
    allowedFileTyepes,
    maxFileSizeInMB,
  } = props

  return (
    <div
      data-testid="custom-fileupload-dnd-control"
      className={`col-span-` + colSpan}
    >
      <label
        htmlFor="cover-photo"
        className="rw-custom-control-label"
        data-testid="custom-fileupload-dnd-label"
      >
        {label}
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor={inputName}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              data-testid="custom-fileupload-dnd-input-label"
            >
              <span>Upload a file</span>
              <input
                id={inputId}
                name={inputName}
                type="file"
                className="sr-only"
                data-testid="custom-fileupload-dnd-input"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            {allowedFileTyepes.join(', ')} up to {maxFileSizeInMB}MB
          </p>
        </div>
      </div>
    </div>
  )
}

export default CustomFileUploadDnDControl
