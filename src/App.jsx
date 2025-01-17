import HomePage from "../Pages/HomePage";
import SignInPage from "../Pages/SignInPage";
import LoginPage from "../Pages/loginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { useState } from "react";
import NavBar from "../Components/NavBar";
import AuthService from "../Services/AuthService";
import AccountPage from "../Pages/AccountPage";
import RouteSecu from "../Components/RouteSecu";

function App() {
  const [isAuthentified, setIsAuthentified] = useState(AuthService.isValid());
  const [user, setUser] = useState(AuthService.getUser());

  return (
    <>
      <div className="bodyApp">
        <BrowserRouter>
          <AuthContext.Provider
            value={{ isAuthentified, setIsAuthentified, user, setUser }}
          >
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/LoginPage" element={<LoginPage />} />
              <Route path="/SignInPage" element={<SignInPage />} />

              <Route element={<RouteSecu />}>
              <Route path="/AccountPage" element={<AccountPage />} />
              </Route>
              
            </Routes>
          </AuthContext.Provider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
