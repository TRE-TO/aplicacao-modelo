import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookie';

export default class ListaFuncionario extends Component {

    constructor(props) {
        super(props);
        this.state = {
          nome: '',
          email: '',
          funcionarios: [],
          fazerLogin: false
        }
    }

    componentDidMount() {
        fetch('/funcionarios', {headers: {'X-XSRF-TOKEN': cookie.load('XSRF-TOKEN')}, credentials: 'include'})
            .then(resp => {
                if (resp.status === 403) {
                    throw new Error('Sessão inválida.');
                }
                else {
                    return resp.json()
                }
            })
            .then(json => this.setState({funcionarios: json}))
            .catch(erro => this.setState({fazerLogin: true}));
    }

    trataAlteracao(nomeInput, e) {
        this.setState({[nomeInput]: e.target.value});
    }

    trataEnvio(e) {
        e.preventDefault();

        this.setState(estadoAnterior => ({ 
            funcionarios: estadoAnterior.funcionarios.concat(
                {nome: estadoAnterior.nome, email: estadoAnterior.email}
            )
        }));
    }

    render() {
        if (this.state.fazerLogin) {
            return <Redirect to="/login" />;
        }
        return (
            <div>

                <h2>Funcionários</h2>

                <form className="bg-black-05 pa3" onSubmit={this.trataEnvio.bind(this)}>
                    <h3>Cadastro</h3>
                    <div className="measure">
                        <label htmlFor="nome" className="f6 b db mb2">Nome:</label>
                        <input id="nome" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" value={this.state.nome} onChange={this.trataAlteracao.bind(this, 'nome')} />
                    </div>
                    <div className="measure">
                        <label htmlFor="email" className="f6 b db mb2">Email:</label>
                        <input id="email" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" value={this.state.email} onChange={this.trataAlteracao.bind(this, 'email')} />
                    </div>
                    <button type="submit">Salvar</button>
                </form>

                {this.state.funcionarios.length === 0 ||
                <div>
                    <FuncionariosCadastrados funcionarios={this.state.funcionarios} />
                </div>
                }
            </div>
        );
    }
}

class FuncionariosCadastrados extends Component {
    render() {

        let funcionarios = this.props.funcionarios.map(f => 
            <tr>
                <td className="pv3 pr3 bb b--black-20">{f.nome}</td>
                <td className="pv3 pr3 bb b--black-20">{f.email}</td>
            </tr>
        );

        return (
            <div className="pa4">
                <div className="overflow-auto">
                    <h2>Cadastrados</h2>
                    <table className="f6 w-100 mw8 center" cellspacing="0">
                        <tbody className="lh-copy">
                            {funcionarios}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}