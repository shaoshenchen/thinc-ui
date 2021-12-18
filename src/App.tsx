import React, { useEffect, useState } from 'react';
import Button, { ButtonType } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';


function App() {
  const alertTestText = {
    title: '这是一段很长很长的标题This is a large large title',
    content: '这是一段很长很长的内容This is a large large content这是一段很长很长的内容This is a large large content'
  }

  // state
  const [showAlertSuccess, setAlertSuccess] = useState(false)
  const [showAlertInfo, setAlertInfo] = useState(false)
  const [showAlertWarning, setAlertWarning] = useState(false)
  const [showAlertError, setAlertError] = useState(false)

  // 生命周期
  useEffect(() => {
    // 按下 Esc 时删除视图最上层的 alert
    const fn = (e: KeyboardEvent) => {
      const div = document.body.lastElementChild

      if (div?.tagName === 'DIV' && e.key === 'Escape') {
        const className: string | undefined = div?.lastElementChild?.className

        // 根据不同 alert 组件修改对应 state
        if (className?.includes('alert-success')) setAlertSuccess(false)
        if (className?.includes('alert-info')) setAlertInfo(false)
        if (className?.includes('alert-warning')) setAlertWarning(false)
        if (className?.includes('alert-error')) setAlertError(false)

        // 留着警醒自己！这一步是多余的，会连续删除两个节点！
        // div?.lastElementChild?.remove()
      }

    }
    document.body.onkeydown = fn
  }, [])

  return (
    <div className="App">
      <div className="tabs-components">
        <Tabs></Tabs>
      </div>

      <div className="menu-components">
        <Menu>
          <MenuItem>item - 0</MenuItem>
          <MenuItem disabled>item - 1</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>down - 1</MenuItem>
            <MenuItem>down - 2</MenuItem>
          </SubMenu>
          <MenuItem>item - 2</MenuItem>
        </Menu>

        <Menu mode='vertical'>
          <MenuItem>item - 0</MenuItem>
          <MenuItem disabled>item - 1</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>down - 1</MenuItem>
            <MenuItem>down - 2</MenuItem>
          </SubMenu>
          <MenuItem>item - 2</MenuItem>
        </Menu>
      </div>

      <div className="button-components">
        <div className="abled">
          <Button btnType={ButtonType.Primary}> Primary </Button>
          <Button className='thinc'> Default </Button>
          <Button btnType={ButtonType.Dashed}> Dash </Button>
          <Button btnType={ButtonType.Text}> Text </Button>
          <Button btnType={ButtonType.Link} href='https://www.baidu.com' target='_blank'> Link </Button>
        </div>

        <div className="disabled">
          <Button disabled> Default </Button>
          <Button btnType={ButtonType.Link} disabled> Link </Button>
        </div>
      </div>

      <div className="alert-components">
        <button onClick={() => setAlertSuccess(true)}>Success - {showAlertSuccess ? '关闭' : '显示'}</button>
        <button onClick={() => setAlertInfo(true)}>Info - {showAlertInfo ? '关闭' : '显示'}</button>
        <button onClick={() => setAlertWarning(true)}>Warning - {showAlertWarning ? '关闭' : '显示'}</button>
        <button onClick={() => setAlertError(true)}>Error - {showAlertError ? '关闭' : '显示'}</button>
        {/* 根据 state 显示不同类型的 alert */}
        {
          showAlertSuccess ? (
            <Alert
              alertType={AlertType.Success}
              alertTitle={alertTestText.title}
              alertContent={alertTestText.content}
              onClose={() => setAlertSuccess(false)}
              closable
            >
              Success
            </Alert>
          ) : (<></>)
        }
        {
          showAlertInfo ? (
            <Alert
              alertType={AlertType.Info}
              alertTitle={alertTestText.title}
              alertContent={alertTestText.content}
              onClose={() => setAlertInfo(false)}
              closable
            >
              Info
            </Alert>
          ) : (<></>)
        }
        {
          showAlertWarning ? (
            <Alert
              alertType={AlertType.Warning}
              alertTitle={alertTestText.title}
              alertContent={alertTestText.content}
              onClose={() => setAlertWarning(false)}
              closable
            >
              Warning
            </Alert>
          ) : (<></>)
        }
        {
          showAlertError ? (
            <Alert
              alertType={AlertType.Error}
              alertTitle={alertTestText.title}
              alertContent={alertTestText.content}
              onClose={() => setAlertError(false)}
              closable
            >
              Error
            </Alert>
          ) : (<></>)
        }
      </div >
    </div >
  );
}

export default App;
