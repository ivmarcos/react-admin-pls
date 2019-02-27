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

import {ProdutoList, ProdutoShow, ProdutoCreate, ProdutoEdit} from "../produto";
import {ImpostoList, ImpostoShow, ImpostoCreate, ImpostoEdit} from "../imposto";


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
          name="produtos"
          list={ProdutoList}
          show={ProdutoShow}
          create={ProdutoCreate}
          edit={ProdutoEdit}
        />
      <Resource
          name="impostos"
          list={ImpostoList}
          show={ImpostoShow}
          create={ImpostoCreate}
          edit={ImpostoEdit}
        />
    </Admin>
    );
  }
}

export default App;
