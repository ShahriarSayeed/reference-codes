import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import CustomCoordinatesControl from './CustomCoordinatesControl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const mockGetCurrentPosition = jest.fn(async () => {
  return new Promise<object>((resolve) => {
    const position = { coords: { latitude: 100, longitude: 200 } }

    return resolve(position)
  })
})

Object.defineProperty(global.navigator, 'geolocation', {
  value: {
    getCurrentPosition: mockGetCurrentPosition,
  },
})

describe('CustomCoordinatesControl component', () => {
  const buttonText = 'Capture'
  const label = 'Latitude and Longitude'
  const colSpan = 'full'
  const inputName = 'captureLatLngControl'
  const inputId = 'captureLatLngControl'
  const validation = {}
  const clickHandler = jest.fn()

  it('renders successfully', () => {
    expect(() => {
      render(
        <CustomCoordinatesControl
          buttonText={buttonText}
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
        <CustomCoordinatesControl
          buttonText={buttonText}
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
      const element = screen.getByTestId('capture-lat-lng-control-colspan')

      expect(element).toHaveClass(`col-span-` + colSpan)
    })

    it('should have label if label props supplied', () => {
      const element = screen.getByTestId('capture-lat-lng-control-label')

      expect(element).toBeInTheDocument()
    })

    it('should have correct id', () => {
      const element = screen.getByTestId('capture-lat-lng-control-button')

      expect(element).toHaveAttribute('id', inputId)
    })

    it('should have correct name', () => {
      const element = screen.getByTestId('capture-lat-lng-control-button')

      expect(element).toHaveAttribute('name', inputName)
    })

    it('should capture button clickable', async () => {
      const buttonField = screen.getByTestId('capture-lat-lng-control-button')
      await userEvent.click(buttonField)

      expect(clickHandler).toHaveBeenCalledTimes(1)
      expect(clickHandler).toBeCalled()
    })

    // shs 231024: fix it: fix this test later when find a stable mock package for webRTC getCurrentPosition function
    // it('should show lattitude and longitude section when capture button clicked', async () => {
    //   const buttonField = screen.getByTestId('capture-lat-lng-control-button')

    //   await userEvent.click(buttonField)
    //   const latLngSection = screen.getByTestId('capture-lat-lng-section')
    //   expect(latLngSection).toBeInTheDocument()

    //   await userEvent.click(buttonField)

    //   // expect(clickHandler).toHaveBeenCalledTimes(2)
    //   // expect(clickHandler).toBeCalled()

    //   // const user = userEvent.setup({ delay: null })
    //   // await user.click(buttonField)
    //   // const latLngSection = screen.getByTestId('capture-lat-lng-section')
    //   // expect(latLngSection).toBeInTheDocument()

    //   // await waitFor(async () => {
    //   //   await user.click(buttonField)
    //   //   const latLngSection = screen.getByTestId('capture-lat-lng-section')
    //   //   expect(latLngSection).toBeInTheDocument()
    //   // })
    // })
  })
})
