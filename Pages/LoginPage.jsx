import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserService from "../Services/UserService";
import axios from 'axios';
import AuthContext from "../Context/AuthContext";


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

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Entrez votre email" name='email' value={user.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control type="password" placeholder="Entrez votre mot de passe" name='password' value={user.password} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Se connecter
            </Button>
        </Form>



    </>;
}

export default LoginPage;