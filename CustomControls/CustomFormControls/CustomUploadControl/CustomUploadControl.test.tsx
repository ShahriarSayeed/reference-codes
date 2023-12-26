import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import CustomUploadControl from './CustomUploadControl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomUploadControl Component', () => {
  const colSpan = 'full' // span range 1-6 or full
  const label = 'Photo'
  const uploadTextLabel = 'Change'
  const inputName = 'cover-photo'
  const inputId = 'cover-photo'

  it('renders successfully', () => {
    expect(() => {
      render(
        <CustomUploadControl
          colSpan={colSpan}
          label={label}
          uploadTextLabel={uploadTextLabel}
          inputId={inputId}
          inputName={inputName}
          validation={() => {}}
        />
      )
    }).not.toThrow()
  })

  describe('Upload file', () => {
    beforeEach(() => {
      render(
        <CustomUploadControl
          colSpan={colSpan}
          label={label}
          uploadTextLabel={uploadTextLabel}
          inputId={inputId}
          inputName={inputName}
          validation={() => {}}
        />
      )
    })

    it('should have label', () => {
      const element = screen.getByTestId('custom-upload-control-label')

      expect(element).toBeInTheDocument()
    })

    it('should have file input label', () => {
      const element = screen.getByTestId('custom-upload-control-text')

      expect(element).toBeInTheDocument()
    })

    it('should have file input', () => {
      const element = screen.getByTestId('custom-upload-control-input')

      expect(element).toBeInTheDocument()
    })

    it('should upload file from file input', async () => {
      const file1 = new File(['file1'], 'file1.png', { type: 'image/png' })

      const element = screen.getByTestId(
        'custom-upload-control-input'
      ) as HTMLInputElement
      await userEvent.upload(element, file1)

      expect(element.files[0].name).toBe('file1.png')
    })
  })
})
