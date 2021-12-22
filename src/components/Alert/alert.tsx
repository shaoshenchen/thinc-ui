import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import Button from '../Button/button'

type AlertType = 'success' | 'info' | 'warning' | 'error'

interface BaseAlertProps {
  className?: string;
  alertType?: AlertType;
  // alertTitle?: string; 暂时删去，用 alertType 代替
  alertContent?: string;
  closable?: boolean;
  onClose?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  children?: React.ReactNode;
}

// 将放置 Alert 组件的容器插到 body 元素末尾
const div: HTMLElement = document.createElement('div')
div.classList.add('alert-container')
document.body.append(div)

const Alert: React.FC<BaseAlertProps> = (props) => {
  const {
    className,
    alertType,
    // alertTitle,
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

  const getAlertTitle = () => {
    switch (alertType) {
      case 'success':
        return 'Success Tips'
      case 'info':
        return 'Informational Notes'
      case 'warning':
        return 'Warning'
      case 'error':
        return 'Error'
    }
  }

  return ReactDOM.createPortal(
    (
      <div className={classes}>
        <div className='alert-message'>
          <div className="alert-title">
            {getAlertTitle()}
          </div>
          <div className="alert-content">
            {alertContent}
          </div>
        </div>
        {/* 右上角有无关闭按钮 */}
        {
          closable ? (
            <div className='alert-close'>
              <Button btnType='text' onClick={onClose}>x</Button>
            </div>
          ) : (<></>)
        }
      </div>

    ), div)

}

export default Alert