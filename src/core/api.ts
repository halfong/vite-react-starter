import Felt from "../lib/Felt"
import $store from "./store"

const endpoint = {
  development: 'http://127.0.0.1:3721',
  // development: 'https://api.holli.cc',
  production: 'https://api.holli.cc',
}[process.env.NODE_ENV as string]

const jwtToken = {
  __last : localStorage.getItem( 'jwt_token' ) ,
  get(){ return this.__last },
  set(v){ localStorage.setItem( 'jwt_token', JSON.stringify(v)  ); this.__last = v }
}

const synStore = {
  'GET::/auth/me': _d => $store.me = _d
}

const $api = new Felt( endpoint, jwtToken, ( method, path, resData, req )=>{
  if( synStore[`${method}::${path}`] ) synStore[`${method}::${path}`] ( resData, req )
})
export default $api