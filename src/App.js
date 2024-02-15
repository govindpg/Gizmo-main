import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Header from './Components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Error from './pages/Error';
import Mains from './pages/Mains';
import { useContext } from 'react';
import { log } from './context/ContextShare';

function App() {
  const [logout,setLogout]= useContext(log);

  return (
    <div className="App">
      <Routes>
        <Route path='/'  element={<Welcome/>}  />
        </Routes>
       
    
     


      <Routes>
       <Route path='/home' element={<Home/> } />
      <Route path='/main' element={<Main/>} />
      <Route path='/mains' element={<Mains/>} />
      <Route path='/adminlogin' element={<Login/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='*' element={<Error/>}/>
      </Routes>

     


    </div>
  );
}

export default App;
