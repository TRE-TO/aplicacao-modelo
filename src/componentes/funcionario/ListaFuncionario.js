import React, { Component } from 'react';

export default class ListaFuncionario extends Component {

    constructor(props) {
        super(props);
        this.state = {
          nome: '',
          email: '',
          funcionarios: [
              {id: 1, nome: 'José da Silva Santos', email: 'jose@tre-to.jus.br'},
              {id: 2, nome: 'Maria de Jesus Pereira', email: 'maria@tre-to.jus.br'},
              {id: 3, nome: 'Joaquim Teixeira Souza', email: 'joaquim@tre-to.jus.br'},
              {id: 4, nome: 'Ana Teresa Gonçalves', email: 'ana@tre-to.jus.br'},
              {id: 5, nome: 'Pedro Silva Soares', email: 'pedro@tre-to.jus.br'}
          ]
        }
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
        return (
            <div className="mw6 mw7-ns center pt4">

                <h2>Funcionários</h2>

                <form className="bg-black-05 pa3" onSubmit={this.trataEnvio.bind(this)}>
                    <h3>Cadastro</h3>
                    <div className="measure">
                        <label htmlFor="nome" class="f6 b db mb2">Nome:</label>
                        <input id="nome" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" value={this.state.nome} onChange={this.trataAlteracao.bind(this, 'nome')} />
                    </div>
                    <div className="measure">
                        <label htmlFor="email" class="f6 b db mb2">Email:</label>
                        <input id="email" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" value={this.state.email} onChange={this.trataAlteracao.bind(this, 'email')} />
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
        return (
            <div className="pa4">
                <div className="overflow-auto">
                    <h2>Cadastrados</h2>
                    <table className="f6 w-100 mw8 center" cellspacing="0">
                        <tbody class="lh-copy">
                            {this.props.funcionarios.map(f => 
                                <tr>
                                    <td className="pv3 pr3 bb b--black-20">{f.nome}</td>
                                    <td className="pv3 pr3 bb b--black-20">{f.email}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}