import { render } from '@testing-library/react'
import Alert, { AlertType } from './alert'


describe('Alert component', () => {
  it('render different alert via alertType(success/info/warning/error)', () => {
    const successAlert = render(<Alert alertType={AlertType.Success}>success</Alert>)
    // const infoAlert = render(<Alert alertType={AlertType.Info}>info</Alert>)
    // const warningAlert = render(<Alert alertType={AlertType.Warning}>warning</Alert>)
    // const errorAlert = render(<Alert alertType={AlertType.Error}>error</Alert>)

    const successElement = successAlert.getByText('success')
    // const infoElement = infoAlert.getByText('info')
    // const warningElement = warningAlert.getByText('warning')
    // const errorElement = errorAlert.getByText('error')

    expect(successElement).toBeInTheDocument()
    // expect(infoElement).toBeInTheDocument()
    // expect(warningElement).toBeInTheDocument()
    // expect(errorElement).toBeInTheDocument()

    expect(successElement).toHaveClass('alert alert-success')
    // expect(infoElement).toHaveClass('alert alert-info')
    // expect(warningElement).toHaveClass('alert alert-warning')
    // expect(errorElement).toHaveClass('alert alert-error')
  })


  it('=== should render truly title and content in UI ===', () => {

  })


  it('can be closed via pressing Esc in keyboard', () => {

  })


  it('render a closing button if closable props is provided', () => {

  })
})