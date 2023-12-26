import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import CustomFileUploadDnDControl from './CustomFileUploadDnDControl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomFileUploadDnDControl Component', () => {
  const colSpan = 'full' // span range 1-6 or full
  const label = 'Cover photo'
  const inputName = 'cover-photo'
  const inputId = 'cover-photo'
  const allowedFileTyepes = ['PNG', 'JPG', 'GIF']
  const maxFileSizeInMB = 10

  it('renders successfully', () => {
    expect(() => {
      render(
        <CustomFileUploadDnDControl
          colSpan={colSpan}
          label={label}
          inputId={inputId}
          inputName={inputName}
          allowedFileTyepes={allowedFileTyepes}
          maxFileSizeInMB={maxFileSizeInMB}
          validation={() => {}}
        />
      )
    }).not.toThrow()
  })

  describe('Upload file', () => {
    beforeEach(() => {
      render(
        <CustomFileUploadDnDControl
          colSpan={colSpan}
          label={label}
          inputId={inputId}
          inputName={inputName}
          allowedFileTyepes={allowedFileTyepes}
          maxFileSizeInMB={maxFileSizeInMB}
          validation={() => {}}
        />
      )
    })

    it('should have label', () => {
      const element = screen.getByTestId('custom-fileupload-dnd-label')

      expect(element).toBeInTheDocument()
    })

    it('should have file input label', () => {
      const element = screen.getByTestId('custom-fileupload-dnd-label')

      expect(element).toBeInTheDocument()
    })

    it('should have file input', () => {
      const element = screen.getByTestId('custom-fileupload-dnd-input')

      expect(element).toBeInTheDocument()
    })

    it('should upload file from file input', async () => {
      const file1 = new File(['file1'], 'file1.png', { type: 'image/png' })

      const element = screen.getByTestId(
        'custom-fileupload-dnd-input'
      ) as HTMLInputElement
      await userEvent.upload(element, file1)

      expect(element.files[0].name).toBe('file1.png')
    })

    // shs 230829: Todo:
    // it('should drag and drop file into input area', async () => {
    //   // This test need to completed after using any DnD library like react-dnd
    //   // After that we need to implement tests depend on that DnD lib
    // })
  })
})
