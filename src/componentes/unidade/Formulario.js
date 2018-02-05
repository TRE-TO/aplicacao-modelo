import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Formulario extends Component {

    constructor(props) {
        super(props);
        this.state = {
          nome: '',
          sigla: '',
          sucesso: false
        }
    }

    trataAlteracao(nomeInput, e) {
        this.setState({[nomeInput]: e.target.value});
    }

    trataEnvio(e) {
        e.preventDefault();

        this.setState({sucesso: true});
    }

    render() {
        if (this.state.sucesso) {
            return <Redirect to="/unidade/lista" />;
        }
        return (
            <form className="bg-black-05 pa3" onSubmit={this.trataEnvio.bind(this)}>
                <h3>Cadastro</h3>
                <div className="measure">
                    <label htmlFor="nome" class="f6 b db mb2">Nome:</label>
                    <input id="nome" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" value={this.state.nome} onChange={this.trataAlteracao.bind(this, 'nome')} />
                </div>
                <div className="measure">
                    <label htmlFor="sigla" class="f6 b db mb2">Sigla:</label>
                    <input id="sigla" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" value={this.state.sigla} onChange={this.trataAlteracao.bind(this, 'sigla')} />
                </div>
                <button type="submit">Salvar</button>
            </form>
        );
    }
}