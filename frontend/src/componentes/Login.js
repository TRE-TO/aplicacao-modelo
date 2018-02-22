import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookie';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            usuario: '',
            senha: '',
            status: '',
            sucesso: false
        };
    }

    trataAlteracao(nomeInput, evento) {
        this.setState({[nomeInput]: evento.target.value});
    }

    logar(evento) {
        evento.preventDefault();

        fetch('/preauth', {method: 'GET', credentials: 'include'})
            .then(response => {
                const body = new URLSearchParams();
                body.set('username', this.state.usuario);
                body.set('password', this.state.senha);

                fetch('/authenticate', {method: 'POST', body: body, credentials: 'include', headers: {'X-XSRF-TOKEN': cookie.load('XSRF-TOKEN')}})
                    .then(resp => {
                        if (resp.status === 401) {
                            throw new Error('Credenciais inválidas.');
                        }
                        this.getUsuario().bind(this);
                    })
                    .catch(erro => {
                        this.setState({status: erro.message});
                    });
            })
    }

    getUsuario() {
        fetch('/usuario', {method: 'GET', credentials: 'include', headers: {'X-XSRF-TOKEN': cookie.load('XSRF-TOKEN')}})
            .then(resp => resp.text())
            .then(resp => {
                sessionStorage.setItem('usuario', resp);
                this.setState({status: resp, sucesso: true});
            })
            .catch(erro => {
                this.setState({status: erro.message});
            });
    }

    render() {
        if (this.state.sucesso) {
            return <Redirect to="/funcionario/lista" />;
        }
        return (
            <div>
                <h3>Login</h3>
                <form className="bg-black-05 pa3" onSubmit={this.logar.bind(this)}>


                    <span>{this.state.status}</span><br/><br/>

                    <div className="measure">
                        <label htmlFor="usuario" className="f6 b db mb2">Usuário:</label>
                        <input id="usuario" type="text" onChange={this.trataAlteracao.bind(this, 'usuario')} className="input-reset ba b--black-20 pa2 mb2 db w-100" />
                    </div>

                    <div className="measure">
                        <label htmlFor="senha" className="f6 b db mb2">Senha:</label>
                        <input id="senha" type="password" onChange={this.trataAlteracao.bind(this, 'senha')} className="input-reset ba b--black-20 pa2 mb2 db w-100" />
                    </div>

                    <br/>

                    <button type="submit">Entrar</button>
                </form>

            </div>
        );
    }

}