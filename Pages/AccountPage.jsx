import { useContext, useEffect, useState } from "react";
import UserService from "../Services/UserService";
import NavBar from "../Components/NavBar";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const AccountPage = () => {
  const { isAuthentified, setIsAuthentified } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [tempUser, setTempUser] = useState({});
  const [nameUpdate, setNameUpdate] = useState(false);
  const [firstNameUpdate, setFirstNameUpdate] = useState(false);
  const [emailUpdate, setEmailUpdate] = useState(false);
  const [addressUpdate, setAddressUpdate] = useState(false);
  const [cityUpdate, setCityUpdate] = useState(false);
  const [zipcodeUpdate, setZipcodeUpdate] = useState(false);
  const [phoneUpdate, setPhoneUpdate] = useState(false);
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await UserService.getUser();
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setTempUser({ ...tempUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // On crée un nouvel objet qui ne contient que les champs modifiés
      const updatedFields = {};

      // On compare tempUser avec user pour trouver les champs modifiés
      Object.keys(tempUser).forEach((key) => {
        if (tempUser[key] !== user[key]) {
          updatedFields[key] = tempUser[key];
        }
      });

      // On n'envoie que les champs qui ont changé
      await UserService.updateUser(user.id_user, updatedFields);

      // Mise à jour de user avec les nouvelles valeurs
      setUser({ ...user, ...updatedFields });

      // Réinitialisation des états
      setNameUpdate(false);
      setFirstNameUpdate(false);
      setEmailUpdate(false);
      setAddressUpdate(false);
      setCityUpdate(false);
      setZipcodeUpdate(false);
      setPhoneUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (toggleSetter) => {
    setTempUser(user); // restaure la valeur initiale de user
    toggleSetter(false); // Ferme l'input
  };

  const handleDeleteAccount = async () => {
    try {
      await UserService.deleteMyAccount();
      // Déconnexion après suppression du compte
      UserService.logoutUser();
      setIsAuthentified(false);
      // Redirection vers la page d'accueil
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la suppression du compte:", error);
      // Ajouter ici une gestion des erreurs (affichage d'un message, etc.)
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isAuthentified]);

  return (
    <>
      <NavBar />
      <div className="bodyAccount">
        <div className="coordonnees">
          <h1>Mon compte</h1>
          {nameUpdate ? (
            <>
              {/* tempUser stock la valeur dans l'input sans toucher user */}
              <input
                type="text"
                name="name"
                value={tempUser.name || ""}
                onChange={handleChange}
              />
              <Button
                variant="danger"
                onClick={() => handleCancel(setNameUpdate)}
              >
                Annuler
              </Button>
              <Button variant="light" onClick={handleSubmit}>
                Valider
              </Button>
            </>
          ) : (
            <>
              {/* remplie tempUser avec les valeurs actuelles avant d'ouvrir l'input */}
              <div className="inputAccount">
                <div>
                  <p>Nom : {user.name}</p>
                </div>
                <div>
                  <Button
                    variant="light"
                    onClick={() => {
                      setNameUpdate(true);
                      setTempUser(user);
                    }}
                  >
                    <img src="src/assets/stylo.png" alt="modify" />
                  </Button>
                </div>
              </div>
            </>
          )}

          {firstNameUpdate ? (
            <>
              {/* tempUser stock la valeur dans l'input sans toucher user */}
              <input
                type="text"
                name="first_name"
                value={tempUser.first_name || ""}
                onChange={handleChange}
              />
              <Button
                variant="danger"
                onClick={() => handleCancel(setFirstNameUpdate)}
              >
                Annuler
              </Button>
              <Button variant="light" onClick={handleSubmit}>
                Valider
              </Button>
            </>
          ) : (
            <>
              {/* remplie tempUser avec les valeurs actuelles avant d'ouvrir l'input */}
              <div className="inputAccount">
                <div>
                  <p>Prénom : {user.first_name}</p>
                </div>
                <div>
                  <Button
                    variant="light"
                    onClick={() => {
                      setFirstNameUpdate(true);
                      setTempUser(user);
                    }}
                  >
                    <img src="src/assets/stylo.png" alt="modify" />
                  </Button>
                </div>
              </div>
            </>
          )}

          {emailUpdate ? (
            <>
              {/* tempUser stock la valeur dans l'input sans toucher user */}
              <input
                type="text"
                name="email"
                value={tempUser.email || ""}
                onChange={handleChange}
              />
              <Button
                variant="danger"
                onClick={() => handleCancel(setEmailUpdate)}
              >
                Annuler
              </Button>
              <Button variant="light" onClick={handleSubmit}>
                Valider
              </Button>
            </>
          ) : (
            <>
              {/* remplie tempUser avec les valeurs actuelles avant d'ouvrir l'input */}
              <div className="inputAccount">
                <div>
                  <p>Email : {user.email}</p>
                </div>
                <div>
                  <Button
                    variant="light"
                    onClick={() => {
                      setEmailUpdate(true);
                      setTempUser(user);
                    }}
                  >
                    <img src="src/assets/stylo.png" alt="modify" />
                  </Button>
                </div>
              </div>
            </>
          )}

          <p>
            Mot de passe :{" "}
            <Button variant="secondary" className="buttonMdp">
              <Link to={"/SendCodePage"}>Reinitialiser mon mot de passe </Link>
            </Button>
          </p>

          {addressUpdate ? (
            <>
              <div className="inputAccount">
                <input
                  type="text"
                  name="address"
                  value={tempUser.address || ""}
                  onChange={handleChange}
                  placeholder="Adresse"
                />
              </div>
              <div className="inputAccount">
                <input
                  type="text"
                  name="zipcode"
                  value={tempUser.zipcode || ""}
                  onChange={handleChange}
                  placeholder="Code postal"
                />
              </div>
              <div className="inputAccount">
                <input
                  type="text"
                  name="city"
                  value={tempUser.city || ""}
                  onChange={handleChange}
                  placeholder="Ville"
                />
              </div>
              <Button
                variant="danger"
                onClick={() => handleCancel(setAddressUpdate)}
              >
                Annuler
              </Button>
              <Button variant="light" onClick={handleSubmit}>
                Valider
              </Button>
            </>
          ) : (
            <div className="inputAccount">
              <div>
                <p>
                  Adresse : {user.address}, {user.zipcode}, {user.city}
                </p>
              </div>
              <div>
                <Button
                  variant="light"
                  onClick={() => {
                    setAddressUpdate(true);
                    setTempUser(user);
                  }}
                >
                  <img src="src/assets/stylo.png" alt="modify" />
                </Button>
              </div>
            </div>
          )}

          {phoneUpdate ? (
            <>
              {/* tempUser stock la valeur dans l'input sans toucher user */}
              <input
                type="text"
                name="phone"
                value={tempUser.phone || ""}
                onChange={handleChange}
              />
              <Button
                variant="danger"
                onClick={() => handleCancel(setPhoneUpdate)}
              >
                Annuler
              </Button>
              <Button variant="light" onClick={handleSubmit}>
                Valider
              </Button>
            </>
          ) : (
            <>
              {/* remplie tempUser avec les valeurs actuelles avant d'ouvrir l'input */}
              <div className="inputAccount">
                <div>
                  <p>Tel : 0{user.phone}</p>
                </div>
                <div>
                  <Button
                    variant="light"
                    onClick={() => {
                      setPhoneUpdate(true);
                      setTempUser(user);
                    }}
                  >
                    <img src="src/assets/stylo.png" alt="modify" />
                  </Button>
                </div>
              </div>
            </>
          )}

          <div>
            <div className="adminButtonsCat">
              {user.role == "admin" ? (
                <>
                  <Button size="lg" className="adminButtons">
                    <Link to={"/AdminPizzaPage"}>GESTION PIZZAS</Link>
                  </Button>
                  <Button size="lg" className="adminButtons">
                    <Link to={"/AdminUserPage"}>GESTION USERS</Link>
                  </Button>
                  <Button size="lg" className="adminButtons">
                    <Link to={"/AdminLocationPage"}>GESTION EMPLACEMENTS</Link>
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="viewOrderButton">
              {user.role == "admin" ? (
                <>
                  <Button variant="danger" className="adminButtons">
                    <Link to={"/AdminOrderPage"}>GESTION COMMANDES</Link>
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>

            {user.role == "client" ? (
              <>
                <div
                  className="delete-account-section"
                  style={{ marginTop: "30px" }}
                >
                  <Button
                    variant="danger"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    Supprimer mon compte
                  </Button>
                </div>

                <Modal
                  show={showConfirmModal}
                  onHide={() => setShowConfirmModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmation de suppression</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer définitivement votre
                    compte ? Cette action est irréversible.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowConfirmModal(false)}
                    >
                      Annuler
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAccount}>
                      Supprimer définitivement
                    </Button>
                  </Modal.Footer>
                </Modal>

                <h1>Mes commandes</h1>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="rightPart">
          <h2>Votre Panier</h2>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
