import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListaFuncionario from './componentes/funcionario/ListaFuncionario';
import Inicial from './componentes/Inicial';

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Inicial} />
                <Route path="/funcionario/lista" component={ListaFuncionario} />
            </Switch>
        </App>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
