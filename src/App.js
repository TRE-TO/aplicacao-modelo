import React, { Component } from 'react';
import 'tachyons';
import { Cabecalho } from './componentes/Cabecalho';

class App extends Component {

  render() {
    return (
      <div className="fl w-100 ph3">
        
        <Cabecalho/>

        {this.props.children}

      </div>
    );
  }

}

export default App;
