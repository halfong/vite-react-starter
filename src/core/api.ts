import Felt from "../lib/Felt"
import $store from "./store"

const $api = new Felt({
  
  endpoint: {
    development: 'http://127.0.0.1:3721',
    // development: 'https://api.holli.cc',
    production: 'https://api.holli.cc',
  }[process.env.NODE_ENV as string],

  onData( method, path, resData, req ){
    synStore[`${method}::${path}`] && synStore[`${method}::${path}`] ( resData, req )
  }
  
})

const synStore = {
  'GET::/auth/me': _d => $store.me = _d
}


export default $api