import HomePage from '../Pages/HomePage'
import SignInPage from '../Pages/SignInPage'
import LoginPage from '../Pages/loginPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthContext from '../Context/AuthContext';
import { useState } from 'react';
import NavBar from '../Components/NavBar';


function App() {

  const [isAuthentified, setIsAuthentified] = useState(false);
  const [user, setUser] = useState({});

  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{isAuthentified, setIsAuthentified, user, setUser}}>
          <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signin" element={<SignInPage/>} />
        </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  )


}

export default App
