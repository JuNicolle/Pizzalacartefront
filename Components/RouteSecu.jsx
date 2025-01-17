import { Outlet } from "react-router-dom";
import LoginPage from "../Pages/loginPage";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";


const RouteSecu = () => {
    const {isAuthentified} = useContext(AuthContext);

    return isAuthentified ? <Outlet /> : <LoginPage />
    ;
}

export default RouteSecu;