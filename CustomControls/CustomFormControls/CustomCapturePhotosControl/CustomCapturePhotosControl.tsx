import React, { useState } from 'react'

type CustomCapturePhotosControlPropsType = {
  colSpan: number | 'full'
  label: string
  uploadTextLabel: string
  inputName: string
  inputId: string
  validation: object
  clickHandler?: () => void
  disabled?: boolean
  rest?: unknown[]
}

const CustomCapturePhotosControl = (
  props: CustomCapturePhotosControlPropsType
) => {
  const {
    colSpan,
    label,
    uploadTextLabel,
    inputName,
    inputId,
    clickHandler,
    disabled,
    ...rest
  } = props
  const [capturedBlobUrl, setCapturedBlobUrl] = useState<string | null>(null)

  const onClickHandler = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          minAspectRatio: 1.333,
          minFrameRate: 30,
          width: 1280,
          heigth: 720,
          facingMode: {
            //Use the front camera
            exact: 'user',
          },
          autoplay: true,
        },
      })
      .then((mediaStream) => {
        if (mediaStream) {
          const videoTracks = mediaStream.getVideoTracks()
          const selectedVideoTrack = videoTracks[0]

          const imageCapture = new (window as any).ImageCapture(
            selectedVideoTrack
          )

          imageCapture
            .takePhoto()
            .then(function (blob) {
              const blobUrl = URL.createObjectURL(blob)
              setCapturedBlobUrl(blobUrl)
            })
            .catch(function (error) {
              console.log('Capture Photo error: ', error)
            })
        }
      })
    if (clickHandler) {
      clickHandler()
    }
  }

  return (
    <>
      <div
        className={`col-span-` + colSpan}
        data-testid="capture-photo-control-colspan"
      >
        <label
          htmlFor={inputName}
          className="rw-custom-control-label"
          data-testid="capture-photo-control-label"
        >
          {label}
        </label>

        <div className="mt-2 flex items-center gap-x-3">
          <button
            id={inputId}
            name={inputName}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={onClickHandler}
            disabled={disabled}
            data-testid={'capture-photo-control-button'}
            {...rest}
          >
            {uploadTextLabel}
          </button>

          {capturedBlobUrl && <img alt={''} src={capturedBlobUrl} />}
        </div>
      </div>
    </>
  )
}

export default CustomCapturePhotosControl
