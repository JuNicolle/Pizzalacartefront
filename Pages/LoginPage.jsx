import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserService from "../Services/UserService";
import axios from 'axios';
import AuthContext from "../Context/AuthContext";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";



const LoginPage = () => {

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

            <Form.Group className="mb-3 col-9" >
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control type="password" placeholder="Entrez votre mot de passe" name='password' value={user.password} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Se connecter
            </Button>
        </Form>
        
        </div>

        <div className="noAccount">
            <img src="/src/assets/pizza.png" alt="" />
            <Link to={"/SignInPage"}><Button variant="success" href="/register">Pas encore de compte ? Inscrivez vous !</Button></Link>
            <Link to={"/ResetPasswordPage"}><Button variant="danger" href="/register">Mot de passe oublié ?</Button></Link>
        </div>
        </div>
    </div>
    <div className="rightPart">
    <h2>Votre panier</h2>
    </div>

    </div>
        



    </>;
}

export default LoginPage;