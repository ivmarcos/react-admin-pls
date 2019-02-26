import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin";
import axios from "axios";

import { API_URL } from "../configuration/constants";

const url = API_URL;

const storageKey = "token";

export const data = {};

function setData(prop, value) {
  data[prop] = value;
}

function loadConfig(token) {
  return axios
    .request({
      method: "post",
      url: `${url}/Usuarios/configuracao?access_token=${token}`
    })
    .then(response => {
      const user = response.data;
      localStorage.setItem("user", user);
      return user;
    })
    .catch(err => {
      throw new Error(err.response.data.error.message);
    });
}

export function changeStore(id) {
  setData("loja", data.user.lojas.find(l => l.id === id));
}

export default function auth(type, params) {
  if (type === AUTH_LOGIN) {
    return axios
      .request({
        method: "post",
        url: `${url}/Usuarios/login`,
        data: {
          email: params.username,
          password: params.password
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response.data.error.statusCode === 401) {
          throw new Error("Usuário ou senha incorretos!");
        }
      })
      .then(response => {
        console.log(response);
        const token = response.data.id;
        setData("token", token);
        localStorage.setItem(storageKey, token);
        return loadConfig(token);
      })
      .then(user => setData("user", user));
  }

  if (type === AUTH_LOGOUT) {
    localStorage.removeItem(storageKey);
    if (data.token) {
      axios.request({
        method: "post",
        url: `${url}/Usuarios/logout?access_token=${data.token}`
      });
    }
    delete data.user;
    delete data.token;
    return Promise.resolve();
  }

  if (type === AUTH_CHECK) {
    const token = localStorage.getItem(storageKey);
    if (token && !data.user) {
      return loadConfig(token).then(() =>
        changeStore(changeStore(data.loja.id))
      );
    }
    return token ? Promise.resolve() : Promise.reject();
  }

  if (type === AUTH_ERROR) {
    if (params.code === 401 || params.code === 403) {
      localStorage.removeItem(storageKey);
      return Promise.reject();
    }
    return Promise.resolve();
  }

  return Promise.reject(`Metodo desconhecido ${type}`);
}
