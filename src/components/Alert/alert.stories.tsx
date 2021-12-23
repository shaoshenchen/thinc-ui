import { storiesOf } from "@storybook/react";
import Alert from "./alert";


// 将放置 Alert 组件的容器插到 body 元素末尾
// const div = document.getElementsByClassName('alert-container')


/**
 * 
 * @param alertType 
 * 根据 alertType 设置 Alert 的 alertTitle
 * JSX 不能直接作为 HTMLElement 插入 DOM 树
 * 步骤：
 *  1. 找到 div 容器
 *  2. 
 */
type AlertType = 'success' | 'info' | 'warning' | 'error'
const addAlert = (alertType: AlertType) => (
  <Alert
    alertType={alertType}
    alertContent='context'
    closable
  />
)
const DefaultAlert = () => (
  // {/* Alert 根据 alertType 输出 */ }
  //       {/* 
  //         addAlert(alertType) 往 div 增加一条 alert
  //       */}
  <>
    <button onClick={() => addAlert('success')}>add Success</button>
    <button onClick={() => addAlert('info')}>add Info</button>
    <button onClick={() => addAlert('warning')}>add Warning</button>
    <button onClick={() => addAlert('error')}>add Error</button>
  </>
)

storiesOf('Alert', module)
  .add('默认 Alert', DefaultAlert)