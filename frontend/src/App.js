import React, { Component } from 'react';
import 'tachyons';
import { Cabecalho } from './componentes/Cabecalho';

class App extends Component {

  render() {
    return (

      <div className="fl w-100 ph3">

        <Cabecalho/>

        <div className="mw6 mw7-ns center pt4">

          {this.props.children}

        </div>

      </div>
    );
  }

}

export default App;
