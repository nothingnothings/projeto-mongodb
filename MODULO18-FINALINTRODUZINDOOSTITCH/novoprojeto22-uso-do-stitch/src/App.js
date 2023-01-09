import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import ProductsPage from './pages/Product/Products';
import ProductPage from './pages/Product/Product';
import EditProductPage from './pages/Product/EditProduct';
import AuthPage from './pages/Auth/Auth';
import ConfirmAccountPage from './pages/Auth/ConfirmAccount';

import {
  Stitch,

  // AnonymousCredential ////usado para fazer AUTH DE __ 'ANON USERS' no seu app ( ou seja, users 'SEM CONTA', nenhuma conta necessária)...
  UserPasswordAuthProviderClient, ///usado para fazer auth de USERS COM 'USER + PASSWORD'... --> usado no REGISTERING DE USERS....
  UserPasswordCredential, ////também usado para fazer auth de users com 'USER + PASSWORD' (só que, no caso, esse objeto é usado para FAZER ___ LOGIN, E NÃO PARA REGISTER A USER...)
} from 'mongodb-stitch-browser-sdk';

class AppFront extends Component {
  state = {
    // isAuth: true, ///modo de development
    isAuth: false,
    productPage: 0,
    authMode: 'login',
    error: null,
  };

  // constructor() { ///approach de authentication com 'ANON USERS' (pouco utilizada, pq '''users''' sem conta são basicamente inúteis)...
  //   super();
  //   const mongodb = Stitch.initializeDefaultAppClient('application-0-acjfk');
  //   mongodb.auth.loginWithCredential(new AnonymousCredential()); ///login 'anônimo'... --> é uma das options de login do stitch, lá no site do 'realm'...
  // };

  constructor() {
    ///usado para o AUTH padrão, de 'user + password', contas normais, com email....
    super();
    this.client = Stitch.initializeDefaultAppClient('application-0-acjfk'); /// adicionamos esse client como PROPRIEDADE DESSA NOSSA CLASSE, PARA QUE SEJA POSSÍVEL O UTILIZAR EM OUTRAS FUNCTIONS DE NOSSA CLASS, e não só no constructor...

    // const client = client.auth.loginWithCredential(new AnonymousCredential());  /// use isso se vocÊ deseja MANTER O APPROACH DE AUTH DE 'USERS ANONIMOS'...
  
  
    this.client.callFunction('Greet'); ////uso de 'Functions' do stitch, ver site do stitch, que é onde as definimos....
  }

  logoutHandler = () => {
    this.setState({ isAuth: false });
  };

  authHandler = (event, authData) => {
    event.preventDefault();

    if (authData.email.trim() === '' || authData.password.trim() === '') {
      return;
    }

    let request;

    const emailPassClient = this.client.auth.getProviderClient(
      ///client será usado TANTO AQUI COMO _ NA __ PAGE __ DE 'ConfirmAccount', em que esse processo de 'CREATE AN ACCOUNT' é concluído..
      UserPasswordAuthProviderClient.factory
    );

    if (this.state.authMode === 'login') {
      const credential = new UserPasswordCredential(
        authData.email,
        authData.password
      );
      console.log('PASSED');
      request = this.client.auth.loginWithCredential(credential); ////bem encaixado...
    } else {
      request = emailPassClient.registerWithEmail(
        authData.email,
        authData.password
      ); ////vai ENVIAR EMAIL AO EMAIL QUE O USER INPUTTOU, EMAIL DE CONFIRMAÇÕA..
    }

    request
      .then((result) => {
        if (result) {
          this.setState({ isAuth: true });
        }
      })
      .catch((err) => {
        // this.errorHandler(err.response.data.message); ///usado com o axios.
        this.errorHandler('An error has occurred.');
        console.log(err);
        this.setState({ isAuth: false });
      });

    // let request;  ////código do AXIOS...
    // if (this.state.authMode === 'login') {
    //   request = axios.post('http://localhost:3100/login', authData);
    // } else {
    //   request = axios.post('http://localhost:3100/signup', authData);
    // }
    // request
    //   .then((authResponse) => {
    //     if (authResponse.status === 201 || authResponse.status === 200) {
    //       const token = authResponse.data.token;
    //       console.log(token);
    //       // Theoretically, you would now store the token in localstorage + app state
    //       // and use it for subsequent requests to protected backend resources
    //       this.setState({ isAuth: true });
    //     }

    //     if (authResponse.status === 501) {
    //       alert('Email already taken, please choose another one.');
    //       console.log('NOTAUTH');
    //     }
    //   })
    //   .catch((err) => {
    //     this.errorHandler(err.response.data.message);
    //     this.setState({ isAuth: false });
    //   });
  };

  authModeChangedHandler = () => {
    this.setState((prevState) => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login',
      };
    });
  };

  errorHandler = (message) => {
    this.setState({
      error: message,
    });
  };

  render() {
    let routes = (
      <Switch>
        <Redirect from="/" to="/products" exact />
        <Redirect from="/auth" to="/products" exact />
        <Redirect from="/signup" to="/products" exact />
        <Route
          path="/product/:mode"
          render={(props) => (
            <EditProductPage {...props} onError={this.errorHandler} />
          )}
        />
        <Route
          path="/products/:id/:mode"
          render={(props) => (
            <EditProductPage {...props} onError={this.errorHandler} />
          )}
        />
        <Route
          path="/products/:id"
          render={(props) => (
            <ProductPage {...props} onError={this.errorHandler} />
          )}
        />
        <Route
          path="/products"
          render={(props) => (
            <ProductsPage {...props} onError={this.errorHandler} />
          )}
        />
      </Switch>
    );

    if (!this.state.isAuth) {
      routes = (
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Redirect from="/products" to="/auth" />
          <Redirect from="/product" to="/auth" />
          <Route path="/confirm-account" component={ConfirmAccountPage} />
          <Route
            path="/auth"
            render={() => (
              <AuthPage
                mode={this.state.authMode}
                onAuth={this.authHandler}
                onAuthModeChange={this.authModeChangedHandler}
              />
            )}
          />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Modal
          open={!!this.state.error}
          title="An Error Occurred"
          onClose={() => this.errorHandler(null)}
        >
          <p>{this.state.error}</p>
        </Modal>
        <Backdrop show={!!this.state.error} />
        <Header
          authenticated={this.state.isAuth}
          onLogout={this.logoutHandler}
        />
        {routes}
      </div>
    );
  }
}

export default AppFront;
