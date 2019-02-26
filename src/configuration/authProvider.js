import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin";
import axios from 'axios'
import { API_URL } from "../configuration/constants";
const url = API_URL

const storageKey = 'token'
export var token, user, loja




function loadConfig(token) {
    return axios.request({
        method:'post',
        url:`${url}/Usuarios/configuracao?access_token=${token}`
    }).then(response => {
        user = response.data;
        loja = user.lojas[0];
        return Promise.resolve();
    })
    .catch((err) => {
        throw new Error(err.response.data.error.message)
    })
}

export function changeStore(id) {
    loja = user.lojas.filter((value) => {return value.id === id})[0]
}

export default function auth(type, params) {
    if (type === AUTH_LOGIN) {
        return axios.request({
            method:'post',
            url:`${url}/Usuarios/login`,
            data: {
                email: params.username,
                password: params.password
            }
          })
          .catch((err) => {
            console.log(err)
            if (err.response.data.error.statusCode === 401) {
                throw new Error("Usuário ou senha incorretos!")
            }
          })
          .then(response => {
            console.log(response)
            token = response.data.id
            localStorage.setItem(storageKey, token)
            return loadConfig(token)
          })
    }
    
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem(storageKey)
        if (token) {   
            axios.request({
                method:'post',
                url:`${url}/Usuarios/logout?access_token=${token}`
            })
        }

        token = null
        user = null
        return Promise.resolve()
    }

    if (type === AUTH_CHECK) {
        token = localStorage.getItem(storageKey)
        if (token && !user) {
            return loadConfig(token).then(() => changeStore(loja.id))
        }
        return token ? Promise.resolve() : Promise.reject()
    }

    if (type === AUTH_ERROR) {
        if (params.code === 401 || params.code === 403) {
            localStorage.removeItem(storageKey)
            return Promise.reject()
        }
        return Promise.resolve()
    }   
    
    return Promise.reject(`Metodo desconhecido ${type}`)
}