import React, { Component } from 'react';

export default class Cadastro extends Component {

    constructor(props) {
        super(props);
        this.state = {
          nome: '',
          funcionarios: []
        }
    
        this.trataAlteracao = this.trataAlteracao.bind(this);
    }

    trataAlteracao(e) {
        this.setState({nome: e.target.value});
    }

    trataEnvio(e) {
        this.setState(estadoAnterior => ({ 
            funcionarios: estadoAnterior.funcionarios.concat(estadoAnterior.nome)
        }));
    }

    render() {
        return (
            <div>
                <p className="">
                    Nome do Funcionário: <input type="text" value={this.state.nome} onChange={this.trataAlteracao} />
                    <button onClick={this.trataEnvio.bind(this)}>Salvar</button>
                </p>

                {this.state.funcionarios.length === 0 ||
                <div>
                    <h2>Cadastrados</h2>
                    <ol>
                        {this.state.funcionarios.map(f => <li>{f}</li>)}
                    </ol>
                </div>
                }
            </div>
        );
    }
}