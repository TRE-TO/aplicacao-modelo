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
            <div>

                <h2>Funcionarios</h2>

                <form className="bg-washed-yellow pv2" onSubmit={this.trataEnvio.bind(this)}>
                    <h3>Cadastro</h3>
                    <div>
                        Nome: <input type="text" value={this.state.nome} onChange={this.trataAlteracao.bind(this, 'nome')} />
                    </div>
                    <div>
                        Email: <input type="text" value={this.state.email} onChange={this.trataAlteracao.bind(this, 'email')} />
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
            <div>
                <h2>Cadastrados</h2>
                <ol>
                    {this.props.funcionarios.map(f => <li>{f.nome}</li>)}
                </ol>
            </div>
        );
    }
}