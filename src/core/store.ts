import { observable, observe } from "mobx"

const $store = {
  
  me: observable({
    id: null,
  }),

}

observe( $store.me, (_change)=>{
  console.log('store.me', _change )
})

export default $store