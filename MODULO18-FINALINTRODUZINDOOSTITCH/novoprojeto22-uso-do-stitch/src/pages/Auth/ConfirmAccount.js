import React, { Component } from 'react';

import './ConfirmAccount.css';

import {
  Stitch,
  UserPasswordAuthProviderClient,
} from 'mongodb-stitch-browser-sdk'; ///vai armazenar nosso 'confirmed user' LÁ NO PRÓPRIO STITCH (E não na nossa database mongodb atlas)....

class AuthPage extends Component {
  componentDidMount() {
    const queryUrl = window.location.search;
    const queryParams = new URLSearchParams(queryUrl);
    const token = queryParams.get('token');
    const tokenId = queryParams.get('tokenId');
    console.log('Account confirmed');

    const client = Stitch.defaultAppClient.auth.getProviderClient(
      UserPasswordAuthProviderClient.factory
    );

    client
      .confirmUser(token, tokenId)
      .then(() => {
        console.log('user confirmed');
        this.props.history.replace('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <main className="confirm-account-page">
        <p>Confirming Account...</p>
      </main>
    );
  }
}

export default AuthPage;
