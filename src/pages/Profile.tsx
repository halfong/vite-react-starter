import { observer } from "mobx-react-lite"
import $store from "../core/store"

function Profile() {
  const me = $store.me
  return (
    <main className='container py-20 bg-primary'>
      <h1 className='black bold black'>Profile { JSON.stringify( me ) }</h1>
      <div className="tapable px-20 bg-white black th-44 inline round" onClick={ ()=> $store.me.id = new Date().getTime() }>Change ID</div>
    </main>
  )
}

export default observer( Profile )
