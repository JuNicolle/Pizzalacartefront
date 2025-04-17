import { useContext, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import UserService from "../Services/UserService";
import axios from 'axios';
import AuthContext from "../Context/AuthContext";
import NavBar from "../Components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [showResetPrompt, setShowResetPrompt] = useState(false);
    const {isAuthentified, setIsAuthentified} = useContext(AuthContext);

    const navigate = useNavigate();

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
            toast.success('Connexion réussie')
            navigate("/");
        } catch (error) {
            console.error("Erreur détaillée:", error.response?.data);

            // Récupérer le message d'erreur du backend
            const errorData = error.response?.data;

            if (errorData?.error) {
                setErrorMessage(errorData.error);

                // Si le message d'erreur indique un envoi d'email de réinitialisation
                if (errorData.error.includes("email de réinitialisation")) {
                    setShowResetPrompt(true);
                    toast.warning("Un email de réinitialisation a été envoyé à votre adresse email");
                } else {
                    toast.error(errorData.error);
                }
            } else {
                setErrorMessage("Erreur de connexion");
                toast.error("Une erreur est survenue");
            }
        }
    }

    const handleGoToReset = () => {
        navigate("/ResetPasswordPage", { state: { email: user.email } });
    }

    return <>
        <div className="locationPage">
            <div className="leftPart">
                <NavBar />
                <div className="bodyLogin">
                    <div className="loginForm">
                        {errorMessage && (
                            <Alert variant="danger" className="col-9 mx-auto">
                                {errorMessage}
                            </Alert>
                        )}

                        {showResetPrompt && (
                            <Alert variant="warning" className="col-9 mx-auto">
                                Trop de tentatives échouées. Un email de réinitialisation a été envoyé à votre adresse.
                                <div className="mt-2">
                                    <Button variant="outline-primary" onClick={handleGoToReset}>
                                        Aller à la page de réinitialisation
                                    </Button>
                                </div>
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit} className="form">
                            <Form.Group className="mb-3 col-9" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Entrez votre email" name='email' value={user.email} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-9" >
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control type="password" placeholder="Entrez votre mot de passe" name='password' value={user.password} onChange={handleChange} required />
                            </Form.Group>

                            <Button variant="primary" type="submit" name="log">
                                Se connecter
                            </Button>
                        </Form>
                    </div>

                    <div className="noAccount">
                        <img src="/src/assets/pizza.png" alt="" />
                        <Link to={"/SignInPage"}><Button variant="success" href="/register">Pas encore de compte ? Inscrivez vous !</Button></Link>
                        <Button variant="secondary" className="buttonMdp">
                            <Link to={"/SendCodePage"}>
                                Reinitialiser mon mot de passe{" "}
                            </Link>
                        </Button>
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