import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookie';

export default class Logout extends Component {

    constructor() {
        super();
        this.state = {
            sucesso: false
        }
    }

    componentWillMount() {
        fetch('/logout', {method: 'POST', headers: {'X-XSRF-TOKEN': cookie.load('XSRF-TOKEN')}, credentials: 'include'})
            .then(resposta => {
                if (resposta.status === 200) {
                    sessionStorage.removeItem('usuario');
                    this.setState({sucesso: true});
                }
            });
    }

    render() {
        if (this.state.sucesso) {
            return <Redirect to="/" />;
        }
        return <h1>Aguarde...</h1>;
    }
}