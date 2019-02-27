import React, { Component } from 'react';
import './App.css';
import { Admin, Resource } from 'react-admin';
import dataProvider from '../configuration/dataProvider';
import authProvider from '../configuration/authProvider';
import i18nProvider from '../i18n/i18nProvider';
import Layout from "../common/Layout";
import Menu from "../common/Menu";
import reducers from './reducers';
import routes from './routes';
import Dashboard from './Dashboard';

import Login from '../login/Login';

import ProdutoList from "../produto/ProdutoList";
import ProdutoShow from "../produto/ProdutoShow";
import ProdutoCreate from "../produto/ProdutoCreate";
import ProdutoEdit from "../produto/ProdutoEdit";

import { API_URL } from "../configuration/constants";

class App extends Component {
  render() {
    return (
      <Admin
      title="Pallas"
      customReducers={reducers}
      customRoutes={routes}
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      loginPage={Login}
      menu={Menu}
      appLayout={Layout}
      dashboard={Dashboard}
      locale="pt-BR"
    >
      <Resource
          name={`produtos`}
          list={ProdutoList}
          show={ProdutoShow}
          create={ProdutoCreate}
          edit={ProdutoEdit}
        />
    </Admin>
    );
  }
}

export default App;
