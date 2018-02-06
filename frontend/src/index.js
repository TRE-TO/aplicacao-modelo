import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListaFuncionario from './componentes/funcionario/ListaFuncionario';
import ListaUnidade from './componentes/unidade/ListaUnidade';
import {Formulario as FormularioUnidade} from './componentes/unidade/Formulario';
import Inicial from './componentes/Inicial';

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Inicial} />
                <Route path="/funcionario/lista" component={ListaFuncionario} />
                <Route path="/unidade/lista" component={ListaUnidade} />
                <Route path="/unidade/formulario" component={FormularioUnidade} />
            </Switch>
        </App>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
