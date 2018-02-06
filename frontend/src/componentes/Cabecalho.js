import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Cabecalho extends Component {

    render() {
        return (
            <header className="bg-black-05">
                <nav className="pa3 pa4-ns">
                    <Link className="link dim black b f6 f5-ns dib mr3" to="/" title="Inicial">Sistema Repasse</Link>
                    <Link className="link dim gray f6 f5-ns dib mr3" to="/" title="Inicial">Inicial</Link>
                    <Link className="link dim gray f6 f5-ns dib mr3" to="/funcionario/lista" title="Funcionários">Funcionários</Link>
                    <Link className="link dim gray f6 f5-ns dib mr3" to="/unidade/lista" title="Unidades">Unidades</Link>
                </nav>
            </header>
        );
    }
}