import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserService from "../Services/UserService";
import axios from 'axios';
import AuthContext from "../Context/AuthContext";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";



const ResetPasswordPage = () => {

    const [user, setUser] = useState({});
    const {isAuthentified, setIsAuthentified} = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await UserService.loginUser(user);
            axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
            localStorage.setItem('token', response.data.token);
            setIsAuthentified(true);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    return <>

<div className="locationPage">
    <div className="leftPart">
        <NavBar />
        <div className="bodyLogin">
        <div className="loginForm">
        <Form onSubmit={handleSubmit} className="form">
            <Form.Group className="mb-3 col-9" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Entrez votre email" name='email' value={user.email} onChange={handleChange} required />
            </Form.Group>

           
            <Button variant="primary" type="submit">
                Envoyez moi un nouveau mot de passe
            </Button>
        </Form>
        </div>

        
        </div>
    </div>
    <div className="rightPart">
    <h2>Votre panier</h2>
    </div>

    </div>
        



    </>;
}

export default ResetPasswordPage;