import React from 'react'
import classNames from 'classnames'
import Button, { ButtonType } from '../Button/button'

export enum AlertType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error'
}

interface BaseAlertProps {
  className?: string;
  alertType?: AlertType;
  alertTitle?: string;
  alertContent?: string;
  closable?: boolean;
  children: React.ReactNode;
}

// 不是原生 DOM 如何绑定一些方法，比如 close 时触发的回调？
// type AlertProps = BaseAlertProps & React.Alert

const Alert: React.FC<BaseAlertProps> = (props) => {
  const {
    className,
    alertType,
    alertTitle,
    alertContent,
    closable
  } = props
  // alert, alert-success, alert-info
  // alert-warning, alert-error
  const classes = classNames('alert', className, {
    [`alert-${alertType}`]: alertType,
    'closable': closable
  })

  return (
    <div className={classes}>
      <div className='alert-message'>
        <div className="alert-title">
          {alertTitle}
        </div>
        <div className="alert-content">
          {alertContent}
        </div>
      </div>
      <div className='alert-close'>
        <Button btnType={ButtonType.Text}>x</Button>
      </div>
    </div>
  )
}

export default Alert