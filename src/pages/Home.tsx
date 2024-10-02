import { observer } from "mobx-react-lite"
import $store from "../core/store"
import { useNavigate } from "react-router"

function Home() {
  const me = $store.me
  const navigate = useNavigate()
  return (
    <main className='container py-20 bg-primary'>
      <h1 className='black bold black'>{ JSON.stringify( me ) }</h1>
      <div className="tapable px-20 bg-white black th-44 inline round" onClick={ ()=> $store.me.id = new Date().getTime() }>Change ID</div>
      <div className="ml-10 tapable px-20 bg-white black th-44 inline round" onClick={ ()=> navigate('/profile') }>to Profile</div>
    </main>
  )
}

export default observer(Home)
