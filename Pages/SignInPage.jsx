import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UserService from "../Services/UserService";
import NavBar from "../Components/NavBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Validation from "../Services/Validation";

const SignInPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (value.trim() !== "") {
      const validation = Validation.checkField(
        name === "first_name" ? "name" : name,
        value
      );
      setErrors((prev) => ({
        ...prev,
        [name]: validation.valid ? "" : validation.message,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier que les mots de passe correspondent
    if (user.password !== user.verifyPassword) {
      setErrors((prev) => ({
        ...prev,
        verifyPassword: "Les mots de passe ne correspondent pas",
      }));
      return;
    }

    // Validation complète
    const validation = Validation.checkRegistration(user);

    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    try {
      const response = await UserService.addUser(user);
      console.log(response);
      navigate("/LoginPage");
      toast.success("Compte créé avec succès", {
        autoClose: 900,
      });
    } catch (error) {
      console.error(error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Erreur lors de la création du compte");
      }
    }
  };

  return (
    <>
      <div className="locationPage">
        <div className="leftPart">
          <NavBar />
          <div className="bodyLogin">
            <Form onSubmit={handleSubmit}>
              <h3>Inscription</h3>

              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez votre nom"
                  name="name"
                  value={user.name || ""}
                  onChange={handleChange}
                  required
                  className={errors.name ? "is-invalid" : ""}
                />
                {errors.name && (
                  <div className="text-danger small">{errors.name}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez votre prénom"
                  name="first_name"
                  value={user.first_name || ""}
                  onChange={handleChange}
                  required
                  className={errors.first_name ? "is-invalid" : ""}
                />
                {errors.first_name && (
                  <div className="text-danger small">{errors.first_name}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Entrez votre email"
                  name="email"
                  value={user.email || ""}
                  onChange={handleChange}
                  required
                  className={errors.email ? "is-invalid" : ""}
                />
                {errors.email && (
                  <div className="text-danger small">{errors.email}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Choisissez un mot de passe (min 6 caractères)"
                  name="password"
                  value={user.password || ""}
                  onChange={handleChange}
                  required
                  className={errors.password ? "is-invalid" : ""}
                />
                {errors.password && (
                  <div className="text-danger small">{errors.password}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Vérifiez votre mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                  name="verifyPassword"
                  value={user.verifyPassword || ""}
                  onChange={handleChange}
                  required
                  className={errors.verifyPassword ? "is-invalid" : ""}
                />
                {errors.verifyPassword && (
                  <div className="text-danger small">
                    {errors.verifyPassword}
                  </div>
                )}
              </Form.Group>

              {/* <Form.Group className="mb-3" >
        <Form.Label>Adresse</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre adresse" name='address' value={user.address} onChange={handleChange} required={true}/>
      </Form.Group> */}

              {/* <Form.Group className="mb-3" >
        <Form.Label>Ville</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre ville" name='city' value={user.city} onChange={handleChange} required={true}/>
      </Form.Group> */}

              <Form.Group className="mb-3">
                <Form.Label>Code postal</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="12345"
                  name="zipcode"
                  value={user.zipcode || ""}
                  onChange={handleChange}
                  required
                  className={errors.zipcode ? "is-invalid" : ""}
                />
                {errors.zipcode && (
                  <div className="text-danger small">{errors.zipcode}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="0123456789"
                  name="phone"
                  value={user.phone || ""}
                  onChange={handleChange}
                  required
                  className={errors.phone ? "is-invalid" : ""}
                />
                {errors.phone && (
                  <div className="text-danger small">{errors.phone}</div>
                )}
              </Form.Group>

              <Button variant="success" type="submit">
                S'inscrire
              </Button>
            </Form>
          </div>
        </div>
        <div className="rightPart">
          <h2>Votre panier</h2>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
