import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserService from "../Services/UserService";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";




const SendCodePage = () => {

    const [mail, setMail] = useState({ email: "" });
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMail({ ...mail, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Réinitialise les erreurs
        try {
            await UserService.SendCode(mail);  // Envoie l'email à l'API
            setMail({ email: "" });  // Vide le champ après envoi
            navigate("/resetPasswordPage"); // Redirection après succès
        } catch (error) {
            console.log(error);
            setError("Une erreur est survenue. Vérifiez l'adresse email.");
        }
    };


    return <>

<div className="locationPage">
    <div className="leftPart">
        <NavBar />
        <div className="bodyLogin">
        <div className="loginForm">
        <Form onSubmit={handleSubmit} className="form">
            <Form.Group className="mb-3 col-9" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Entrez votre email" name='email' value={mail.email} onChange={handleChange} required />
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

export default SendCodePage;