import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Inicial from './Inicial';
import Cadastro from './Cadastro';

export class Cabecalho extends Component {

    render() {
        return (
            <header className="">
                <h1 className="">Sistema Repasse</h1>
                <Link className="ph1" to="/">Inicial</Link>
                <Link className="ph1" to="/Cadastro">Cadastro</Link>
            </header>
        );
    }
}