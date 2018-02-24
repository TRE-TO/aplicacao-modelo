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
          fazerLogin: false,
          pagina: 0,
          tamanho: 10,
          numPaginas: 1
        }
    }

    componentDidMount() {
        this.carregarInicial();
    }

    carregarInicial() {
        fetch(`/funcionarios/paginado/${this.state.pagina}/${this.state.tamanho}`, {headers: {'X-XSRF-TOKEN': cookie.load('XSRF-TOKEN')}, credentials: 'include'})
            .then(resp => {
                if (resp.status === 403) {
                    throw new Error('Sessão inválida.');
                }
                else {
                    return resp.json()
                }
            })
            .then(json => this.setState({funcionarios: json.content, numPaginas: json.totalPages}))
            .catch(erro => this.setState({fazerLogin: true}));
    }

    trataAlteracao(nomeInput, e) {
        this.setState({[nomeInput]: e.target.value});
    }

    trataPaginacao(e) {
        this.setState({pagina: e.target.id}, () => {
            this.trataEnvio(e);
        });
    }

    trataEnvio(e) {
        e.preventDefault();

        if (this.state.nome.length === 0) {
            this.carregarInicial();
        }
        else { 
            fetch(`/funcionarios/porTrechoNome/${this.state.nome}/${this.state.pagina}/${this.state.tamanho}`, {headers: {'X-XSRF-TOKEN': cookie.load('XSRF-TOKEN')}, credentials: 'include'})
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
    }

    render() {

        let indicePaginas = [];
        for (let i = 0; i < this.state.numPaginas; i++) {
            indicePaginas.push(i);
        }

        const paginas = indicePaginas.map(i => <button id={i} key={i} onClick={this.trataPaginacao.bind(this)} >{i+1}</button>);

        if (this.state.fazerLogin) {
            return <Redirect to="/login" />;
        }
        return (
            <div>

                <h2>Funcionários</h2>

                <form className="bg-black-05 pa3" onSubmit={this.trataEnvio.bind(this)}>
                    <h3>Filtrar</h3>
                    Página:<input type="text" value={this.state.pagina} onChange={this.trataAlteracao.bind(this, 'pagina')} />
                    Qtd. Página:<input type="text" value={this.state.tamanho} onChange={this.trataAlteracao.bind(this, 'tamanho')} />
                    <div className="measure">
                        <label htmlFor="nome" className="f6 b db mb2">Nome:</label>
                        <input id="nome" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" value={this.state.nome} onChange={this.trataAlteracao.bind(this, 'nome')} />
                    </div>
                    <button type="submit">Pesquisar</button>
                </form>

                {this.state.funcionarios.length === 0 ||
                <div>
                    <FuncionariosCadastrados funcionarios={this.state.funcionarios} />
                    {paginas}
                </div>
                }
            </div>
        );
    }
}

class FuncionariosCadastrados extends Component {
    render() {

        let funcionarios = this.props.funcionarios.map(f => 
            <tr key={f.id}>
                <td className="pv3 pr3 bb b--black-20">{f.nome}</td>
                <td className="pv3 pr3 bb b--black-20">{f.email}</td>
                <td className="pv3 pr3 bb b--black-20">{f.lotacao.sigla}</td>
            </tr>
        );

        return (
            <div className="pa4">
                <div className="overflow-auto">
                    <h2>Cadastrados</h2>
                    <table className="f6 w-100 mw8 center" cellSpacing="0">
                        <thead>
                            <th className="pv3 pr3 bb b--black-20">Nome</th>
                            <th className="pv3 pr3 bb b--black-20">Email</th>
                            <th className="pv3 pr3 bb b--black-20">Unidade</th>
                        </thead>
                        <tbody className="lh-copy">
                            {funcionarios}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}