import React from 'react'
import ReactDOM from 'react-dom'
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
  onClose?: React.MouseEventHandler;
  children: React.ReactNode;
}

// 不是原生 DOM 如何绑定一些方法，比如 close 时触发的回调？
// type AlertProps = BaseAlertProps & React.Alert

// 将放置 alert 组件的容器插到 body 元素末尾
const div: HTMLElement = document.createElement('div')
document.body.append(div)

const Alert: React.FC<BaseAlertProps> = (props) => {
  const {
    className,
    alertType,
    alertTitle,
    alertContent,
    closable,
    onClose
  } = props
  // alert, alert-success, alert-info
  // alert-warning, alert-error
  const classes = classNames('alert', className, {
    [`alert-${alertType}`]: alertType,
    'closable': closable
  })

  return ReactDOM.createPortal(
    (
      <div className={classes}>
        <div className='alert-message'>
          <div className="alert-title">
            {alertTitle}
          </div>
          <div className="alert-content">
            {alertContent}
          </div>
        </div>
        {/* 右上角有无关闭按钮 */}
        {
          closable ? (
            <div className='alert-close'>
              <Button btnType={ButtonType.Text} onClick={onClose}>x</Button>
            </div>
          ) : (<></>)
        }
      </div>

    ), div)

}

export default Alert