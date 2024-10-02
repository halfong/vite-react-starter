import { observer } from 'mobx-react-lite'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './app.scss'
import Home from './pages/Home'
import Profile from './pages/Profile'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/home' element={ <Home /> } />
          <Route path='/profile' element={ <Profile /> } />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default observer(App)
