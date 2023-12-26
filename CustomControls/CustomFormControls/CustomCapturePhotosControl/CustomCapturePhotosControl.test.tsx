import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import CustomCapturePhotosControl from './CustomCapturePhotosControl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const mockGetUserMedia = jest.fn(async () => {
  return new Promise<void>((resolve) => {
    resolve()
  })
})

Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: mockGetUserMedia,
  },
})

describe('CustomCapturePhotosControl', () => {
  const uploadTextLabel = 'Capture'
  const label = 'Capture Photos'
  const colSpan = 'full'
  const inputName = 'capturePhotosControl'
  const inputId = 'capturePhotosControl'
  const validation = {}
  const clickHandler = jest.fn()

  it('renders successfully', () => {
    expect(() => {
      render(
        <CustomCapturePhotosControl
          uploadTextLabel={uploadTextLabel}
          label={label}
          colSpan={colSpan}
          inputName={inputName}
          inputId={inputId}
          validation={validation}
        />
      )
    }).not.toThrow()
  })

  describe('render elements', () => {
    beforeEach(() => {
      render(
        <CustomCapturePhotosControl
          uploadTextLabel={uploadTextLabel}
          label={label}
          colSpan={colSpan}
          inputName={inputName}
          inputId={inputId}
          validation={validation}
          clickHandler={clickHandler}
        />
      )
    })

    it('should have proper colSpan class', () => {
      const element = screen.getByTestId('capture-photo-control-colspan')

      expect(element).toHaveClass(`col-span-` + colSpan)
    })

    it('should have label if label props supplied', () => {
      const element = screen.getByTestId('capture-photo-control-label')

      expect(element).toBeInTheDocument()
    })

    it('should have correct id', () => {
      const element = screen.getByTestId('capture-photo-control-button')

      expect(element).toHaveAttribute('id', inputId)
    })

    it('should have correct name', () => {
      const element = screen.getByTestId('capture-photo-control-button')

      expect(element).toHaveAttribute('name', inputName)
    })

    it('should capture button clickable', async () => {
      const buttonField = screen.getByTestId('capture-photo-control-button')
      await userEvent.click(buttonField)

      expect(clickHandler).toHaveBeenCalledTimes(1)
      expect(clickHandler).toBeCalled()
    })

    // shs 231025: fix it: write test later when find a stable mock package for webRTC getUserMedia function
    // it('should create blog URL when capture button clicked', async () => {

    // })
  })
})
