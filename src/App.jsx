import HomePage from "../Pages/HomePage";
import SignInPage from "../Pages/SignInPage";
import LoginPage from "../Pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { CartProvider } from '../Context/CartContext';
import { useState, useEffect } from "react"; // Ajout de useEffect
import AuthService from "../Services/AuthService";
import AccountPage from "../Pages/AccountPage";
import RouteSecu from "../Components/RouteSecu";
import ResetPasswordPage from "../Pages/ResetPasswordPage";
import LocationPage from "../Pages/LocationPage";
import { ToastContainer } from "react-toastify";
import OrderRecapPage from "../Pages/OrderRecapPage";
import OrderConfirmationPage from "../Pages/OrderConfirmationPage";
import axios from 'axios'; // Ajout de l'import axios
import AdminOrderPage from "../Pages/AdminOrderPage";
import AdminUserPage from "../Pages/AdminUserPage";
import AdminLocationPage from "../Pages/AdminLocationPage";
import AdminPizzaPage from "../Pages/AdminPizzaPage";

function App() {
  const [isAuthentified, setIsAuthentified] = useState(AuthService.isValid());
  const [user, setUser] = useState(AuthService.getUser());

  // Ajout de la configuration d'axios
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <>
      <div>
        <BrowserRouter>
          <AuthContext.Provider
            value={{ isAuthentified, setIsAuthentified, user, setUser }}
          >
            <CartProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/LoginPage" element={<LoginPage />} />
                <Route path="/SignInPage" element={<SignInPage />} />
                <Route path="/LocationPage" element={<LocationPage />} />
                <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} />
                <Route element={<RouteSecu />}>
                  <Route path="/AccountPage" element={<AccountPage />} />
                  <Route path="/OrderRecapPage" element={<OrderRecapPage />} />
                  <Route path="/confirmation" element={<OrderConfirmationPage />} />
                </Route>
                <Route>
                  <Route path="AdminOrderPage" element={<AdminOrderPage/>}/>
                  <Route path="AdminUserPage" element={<AdminUserPage/>}/>
                  <Route path="AdminLocationPage" element={<AdminLocationPage/>}/>
                  <Route path="AdminPizzaPage" element={<AdminPizzaPage/>}/>
                </Route>
              </Routes>

              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </CartProvider>
          </AuthContext.Provider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;