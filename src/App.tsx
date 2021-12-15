import React from 'react';
import Button, { ButtonType } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert'

function App() {
  return (
    <div className="App">
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

      <br />

      <div className="alert-components">
        <Alert alertType={AlertType.Success} closable>Success</Alert>
        {/* <Alert alertType={AlertType.Info} alertTitle='标题' alertContent='内容内容内容'>Info</Alert> */}
        {/* <Alert alertType={AlertType.Warning}>Warning</Alert> */}
        {/* <Alert alertType={AlertType.Error}>Error</Alert> */}
      </div>

    </div>
  );
}

export default App;
