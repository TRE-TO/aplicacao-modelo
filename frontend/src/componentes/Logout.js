import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookie';

export default class Logout extends Component {

    componentWillMount() {
        console.log('entrou no componentWillMount');
        fetch('/logout', {method: 'POST', headers: {'X-XSRF-TOKEN': cookie.load('XSRF-TOKEN')}, credentials: 'include'})
            .then(resposta => {
                if (resposta.status === 200) {
                    sessionStorage.removeItem('usuario');
                }
            });
    }

    render() {
        return <Redirect to="/" />;
    }
}