import React from 'react';
import './styles/common/index.scss'

function App(props) {
  return (
    <div className="container">
      {props.children}
    </div>
  );
}

export default App;
