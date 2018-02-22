import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import ListaFuncionario from './componentes/funcionario/ListaFuncionario';
import ListaUnidade from './componentes/unidade/ListaUnidade';
import {Formulario as FormularioUnidade} from './componentes/unidade/Formulario';
import Inicial from './componentes/Inicial';
import Login from './componentes/Login';
import Logout from './componentes/Logout';

let estahLogado = () => sessionStorage.getItem('usuario') !== null;

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Inicial} />
                <Route path="/funcionario/lista" render={() => estahLogado() ? <ListaFuncionario/> : <Redirect to="/"/> } />
                <Route path="/unidade/lista" render={() => estahLogado() ? <ListaUnidade/> : <Redirect to="/"/> } />
                <Route path="/unidade/formulario" render={() => estahLogado() ? <FormularioUnidade/> : <Redirect to="/"/> } />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
            </Switch>
        </App>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
