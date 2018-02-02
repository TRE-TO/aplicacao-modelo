import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Cadastro from './componentes/Cadastro';
import Inicial from './componentes/Inicial';

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Inicial} />
                <Route path="/cadastro" component={Cadastro} />
            </Switch>
        </App>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
