import React from 'react';
import Button, { ButtonType } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button btnType={ButtonType.Primary}> Primary </Button>
        <Button> Default </Button>
        <Button btnType={ButtonType.Dashed}> Dash </Button>
        <Button btnType={ButtonType.Text}> Text </Button>
        <Button btnType={ButtonType.Link} href='https://www.baidu.com' target='_blank'> Link </Button>

        <br />

        <Button disabled> Default </Button>
        <Button btnType={ButtonType.Link} disabled> Link </Button>
      </header>
    </div>
  );
}

export default App;
