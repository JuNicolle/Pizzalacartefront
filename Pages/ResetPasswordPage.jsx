import { useState, useContext, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import UserService from "../Services/UserService";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
    const {user} = useContext(AuthContext);
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: "",
        token: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Récupérer l'email depuis les paramètres d'état si disponible
    useEffect(() => {
        if (location.state?.email) {
            setFormData(prev => ({ ...prev, email: location.state.email }));
        } else if (user?.email) {
            setFormData(prev => ({ ...prev, email: user.email }));
        }
    }, [location.state, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            toast.error("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await UserService.ResetPassword(formData);
            console.log("Réponse API :", response.data);

            setSuccess(true);
            toast.success("Mot de passe modifié avec succès !");
            setTimeout(() => navigate("/loginPage"), 2000);
        } catch (error) {
            console.error("Erreur Axios :", error.response ? error.response.data : error.message);
            const errorMsg = error.response?.data || "Échec de la réinitialisation du mot de passe.";
            setError(errorMsg);
            toast.error(errorMsg);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Réinitialisation du mot de passe</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Mot de passe modifié avec succès ! Redirection...</Alert>}

            <div className="card p-4 shadow-sm">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Adresse mail</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Form.Text className="text-muted">
                            Utilisez l'adresse email qui a reçu le code de réinitialisation.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Code reçu par email</Form.Label>
                        <Form.Control
                            name="token"
                            type="text"
                            placeholder="Entrez le code à 6 chiffres"
                            required
                            value={formData.token}
                            onChange={handleChange}
                        />
                        <Form.Text className="text-muted">
                            Le code à 6 chiffres envoyé à votre adresse email.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nouveau mot de passe</Form.Label>
                        <Form.Control
                            name="newPassword"
                            type="password"
                            placeholder="Nouveau mot de passe"
                            required
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirmer le mot de passe</Form.Label>
                        <Form.Control
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirmez le mot de passe"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Réinitialiser le mot de passe
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;