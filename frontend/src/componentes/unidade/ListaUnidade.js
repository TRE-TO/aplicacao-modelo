import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookie';

export default class ListaUnidade extends Component {

    constructor(props) {
        super(props);
        this.state = {
          nome: '',
          sigla: '',
          unidades: [],
          fazerLogin: false
        }
    }

    componentDidMount() {
        fetch('/unidades', {headers: {'X-XSRF-TOKEN': cookie.load('XSRF-TOKEN')}, credentials: 'include'})
            .then(resp => {
                if (resp.status === 403) {
                    throw new Error('Sessão inválida.');
                }
                else {
                    return resp.json()
                }
            })
            .then(json => this.setState({unidades: json}))
            .catch(erro => this.setState({fazerLogin: true}));
    }

    trataAlteracao(nomeInput, e) {
        this.setState({[nomeInput]: e.target.value});
    }

    trataEnvio(e) {
        e.preventDefault();

        this.setState(estadoAnterior => ({ 
            unidades: estadoAnterior.unidades.concat(
                {nome: estadoAnterior.nome, email: estadoAnterior.sigla}
            )
        }));
    }

    render() {
        if (this.state.fazerLogin) {
            return <Redirect to="/login" />;
        }
        return (
            <div>

                <h2>Unidades</h2>

                <Link to="/unidade/nova" />

                <form className="bg-black-05 pa3" onSubmit={this.trataEnvio.bind(this)}>
                    <h3>Filtrar</h3>
                    <div className="measure">
                        <label htmlFor="nome" className="f6 b db mb2">Nome:</label>
                        <input id="nome" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" value={this.state.nome} onChange={this.trataAlteracao.bind(this, 'nome')} />
                    </div>
                    <div className="measure">
                        <label htmlFor="sigla" className="f6 b db mb2">Sigla:</label>
                        <input id="sigla" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" value={this.state.sigla} onChange={this.trataAlteracao.bind(this, 'sigla')} />
                    </div>
                    <button type="submit">Salvar</button>
                </form>

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

        let unidades = this.props.unidades.map(u => 
            <tr key={u.id}>
                <td className="pv3 pr3 bb b--black-20">{u.nome}</td>
                <td className="pv3 pr3 bb b--black-20">{u.sigla}</td>
            </tr>
        );

        return (
            <div className="pa4">
                <div className="overflow-auto">
                    <h2>Cadastradas</h2>
                    <table className="f6 w-100 mw8 center" cellspacing="0">
                        <tbody className="lh-copy">
                            {unidades}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}