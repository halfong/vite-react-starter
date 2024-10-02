import axios from "axios"

/**
 * Request
 * - handle `jwt token` in header
 * @return {Promise<*>} data
 */
export default class Felt {

  endpoint = 'http://localhost'
  onData: ( method, path, resData:any, req:object) => void
  
  jwtToken = {
    __last : localStorage.getItem( 'jwt_token' ) ,
    get(){ return this.__last },
    set(v){ localStorage.setItem( 'jwt_token', JSON.stringify(v)  ); this.__last = v }
  }

  constructor({ endpoint, onData }:{ endpoint:string, onData }){
    this.endpoint = endpoint
    this.onData = onData
  }

  async request( path, data = {}, options:{ method:'GET'|'POST', data?:any } ){
    // console.log('[call api]', `${options.method}::${path}`)
    const req = Object.assign({
      url: this.endpoint+path, data,
      headers: { Accept : 'application/json', Authorization : this.jwtToken.get() ? `Bearer ${ this.jwtToken.get() }` : null }
    }, options )
    return await axios( req ).then(res => {
      res.headers.token && this.jwtToken.set(res.headers.token)
      this.onData( options.method, path, res.data, req )
      return res.data
    })
  }
  
  async get( path, options= {} ){ return this.request( path, null, { ...options, method: 'GET' } ) }
  
  async post( path, data={ }, options = {} ){ return this.request( path, null, { ...options, method: 'POST', data }) }


}