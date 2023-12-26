import { render, screen } from '@redwoodjs/testing/web'

import CustomFormButtonsSection from './CustomFormButtonsSection'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomFormButtonsSection Control', () => {
  const deleteHandler = () => {}
  const cancelBackLink = '/timesheets'
  const saveDisabled = false

  it('renders successfully', () => {
    const isEditMode = true
    expect(() => {
      render(
        <CustomFormButtonsSection
          isEditMode={isEditMode}
          saveDisabled={saveDisabled}
          deleteHandler={deleteHandler}
          cancelBackLink={cancelBackLink}
        />
      )
    }).not.toThrow()
  })

  describe('Add new mode', () => {
    const isEditMode = false

    beforeEach(() => {
      render(
        <CustomFormButtonsSection
          isEditMode={isEditMode}
          saveDisabled={saveDisabled}
          cancelBackLink={cancelBackLink}
        />
      )
    })

    it('should have save submit button', () => {
      const element = screen.getByTestId('custom-form-save-button')

      expect(element).toBeInTheDocument()
    })

    it('should have cancel button', () => {
      const element = screen.getByTestId('custom-form-cancel-button')

      expect(element).toBeInTheDocument()
    })

    it('should not have delete button', () => {
      const element = screen.queryByTestId('custom-form-delete-button')

      expect(element).not.toBeInTheDocument()
    })
  })

  describe('Edit mode', () => {
    const isEditMode = true

    beforeEach(() => {
      render(
        <CustomFormButtonsSection
          isEditMode={isEditMode}
          saveDisabled={saveDisabled}
          deleteHandler={deleteHandler}
          cancelBackLink={cancelBackLink}
        />
      )
    })

    it('should have save submit button', () => {
      const element = screen.getByTestId('custom-form-save-button')

      expect(element).toBeInTheDocument()
    })

    it('should have cancel button', () => {
      const element = screen.getByTestId('custom-form-cancel-button')

      expect(element).toBeInTheDocument()
    })

    it('should have delete button', () => {
      const element = screen.queryByTestId('custom-form-delete-button')

      expect(element).toBeInTheDocument()
    })
  })

  describe('View mode', () => {
    const isViewMode = true

    beforeEach(() => {
      render(
        <CustomFormButtonsSection
          isViewMode={isViewMode}
          saveDisabled={saveDisabled}
          deleteHandler={deleteHandler}
          cancelBackLink={cancelBackLink}
        />
      )
    })

    it('should have edit button', () => {
      const element = screen.getByTestId('custom-form-edit-button')

      expect(element).toBeInTheDocument()
    })

    it('should have delete button', () => {
      const element = screen.queryByTestId('custom-form-delete-button')

      expect(element).toBeInTheDocument()
    })
  })
})
