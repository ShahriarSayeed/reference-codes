import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import RedwoodjsFormWrapper from 'src/components/CustomWrappers/RedwoodjsFormWrapper'

import CustomInputControl from '../CustomInputControl/CustomInputControl'

import CustomFormSection from './CustomFormSection'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomFormSection Component', () => {
  const sectionTitle = 'Sectioin test title'
  const sectionSubTitle =
    'This information will be displayed publicly so be careful what you share.'

  it('renders successfully', () => {
    expect(() => {
      render(
        <RedwoodjsFormWrapper>
          <CustomFormSection
            sectionTitle={sectionTitle}
            sectionSubTitle={sectionSubTitle}
          >
            {null}
          </CustomFormSection>
        </RedwoodjsFormWrapper>
      )
    }).not.toThrow()
  })

  beforeEach(() => {
    render(
      <RedwoodjsFormWrapper>
        <CustomFormSection
          sectionTitle={sectionTitle}
          sectionSubTitle={sectionSubTitle}
        >
          <CustomInputControl
            colSpan={4}
            label="First Name"
            preText="Mr. "
            inputName="firstName"
            inputId="firstName"
            placeholder="First Name"
            validation={{}}
          />
        </CustomFormSection>
      </RedwoodjsFormWrapper>
    )
  })

  it('should print section title if sectionTitle props supplied', () => {
    const element = screen.getByTestId('form-section-title')

    expect(element).toBeInTheDocument()
  })

  it('should print section sub-title if sectionSubTitle props supplied', () => {
    const element = screen.getByTestId('form-section-sub-title')

    expect(element).toBeInTheDocument()
  })

  it('renders successfully with CustomInputControl as child component', async () => {
    const element = screen.getByTestId('form-section-title')
    const inputElement = screen.getByTestId('input-control-textbox')

    expect(element).toBeInTheDocument()
    expect(inputElement).toBeInTheDocument()
  })

  it('should have value in input field when type text in child CustomInputControl', async () => {
    const inputElement = screen.getByTestId('input-control-textbox')

    const inputValue = 'Test input value'
    await userEvent.type(inputElement, inputValue)

    expect(inputElement).toHaveDisplayValue(inputValue)
  })
})
