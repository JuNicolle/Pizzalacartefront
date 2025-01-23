import HomePage from "../Pages/HomePage";
import SignInPage from "../Pages/SignInPage";
import LoginPage from "../Pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { useState } from "react";
import AuthService from "../Services/AuthService";
import AccountPage from "../Pages/AccountPage";
import RouteSecu from "../Components/RouteSecu";
import LocationPage from "../Pages/LocationPage";
import ResetPasswordPage from "../Pages/ResetPasswordPage";

function App() {
  const [isAuthentified, setIsAuthentified] = useState(AuthService.isValid());
  const [user, setUser] = useState(AuthService.getUser());

  return (
    <>
      <div>
        <BrowserRouter>
          <AuthContext.Provider
            value={{ isAuthentified, setIsAuthentified, user, setUser }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/LoginPage" element={<LoginPage />} />
              <Route path="/SignInPage" element={<SignInPage />} />
              <Route path="/LocationPage" element={<LocationPage />} />
              <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} />

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
