import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin";
import axios from "axios";

import { API_URL } from "../configuration/constants";

const url = API_URL;

const storageKey = "token";

export const data = {};

function setData(prop, value) {
  data[prop] = value;
}

async function loadConfig(token) {
  const response = await axios.request({
      method: "post",
      url: `${url}/Usuarios/configuracao?access_token=${token}`
    })
  console.log('response from auth', response.data)
  const user = response.data;
  localStorage.setItem("user", user);
  setData('user', user);
  setData('loja', user.lojas[0])
  return user;
}

export function changeStore(id) {
  setData("loja", data.user.lojas.find(l => l.id === id));
}

export default async function auth(type, params) {
  console.log('type', type)
  if (type === AUTH_LOGIN) {
    try {
    const response = await axios
      .request({
        method: "post",
        url: `${url}/Usuarios/login`,
        data: {
          email: params.username,
          password: params.password
        }
      });
        console.log(response);
        const token = response.data.id;
        localStorage.setItem(storageKey, token);
        setData("token", token);
        await loadConfig(token);
        return Promise.resolve();
    }catch(err){
        console.log(err);
        if (err.response.data.error.statusCode === 401) {
          return Promise.reject("Usuário ou senha incorretos!");
        }
    }
  }

  if (type === AUTH_LOGOUT) {
    localStorage.removeItem(storageKey);
    if (data.token) {
      await axios.request({
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
    console.log('token', token, data)
    if (token) {
      const user = await loadConfig(token);
      console.log('user', user);
      await changeStore(data.loja.id);
      return;
    }
    return Promise.reject('no token provided')
  }

  if (type === AUTH_ERROR) {
    if (params.code === 401 || params.code === 403) {
      localStorage.removeItem(storageKey);
      delete data.user;
      delete data.token;
      return Promise.reject();
    }
    return Promise.resolve();
  }

  return Promise.reject(`Metodo desconhecido ${type}`);
}
