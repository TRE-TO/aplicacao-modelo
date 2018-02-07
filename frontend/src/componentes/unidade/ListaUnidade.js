import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ListaUnidade extends Component {

    constructor(props) {
        super(props);
        this.state = {
          unidades: [
            //   {id: 1, nome: 'Coordenadoria de Desenvolvimento de Sistemas', sigla: 'CDS'},
            //   {id: 2, nome: 'Seção de Desenvolvimento de Sistemas Administrativos', sigla: 'SEDSA'},
            //   {id: 3, nome: 'Seção de Sistemas e Administração Web', sigla: 'SESAW'},
            //   {id: 4, nome: 'Secretaria de Tecnologia da Informação', sigla: 'STI'}
          ]
        }
    }

    componentDidMount() {
        fetch('/unidades')
            .then(response => response.json())
            .then(json => this.setState({unidades: json}))
    }

    render() {
        return (
            <div>

                <h2>Unidades</h2>

                <Link to="/unidade/formulario">Nova</Link>

                {this.state.unidades.length === 0 ||
                <div>
                    <UnidadesCadastradas unidades={this.state.unidades} />
                </div>
                }
            </div>
        );
    }
}

class UnidadesCadastradas extends Component {
    render() {
        return (
            <div className="pa4">
                <div className="overflow-auto">
                    <h2>Cadastradas</h2>
                    <table className="f6 w-100 mw8 center" cellSpacing="0">
                        <tbody className="lh-copy">
                            {this.props.unidades.map(f => 
                                <tr key={f.id}>
                                    <td className="pv3 pr3 bb b--black-20">{f.nome}</td>
                                    <td className="pv3 pr3 bb b--black-20">{f.sigla}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}