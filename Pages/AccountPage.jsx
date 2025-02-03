import { useContext, useEffect, useState } from "react";
import UserService from "../Services/UserService";
import NavBar from "../Components/NavBar";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const AccountPage = () => {
  const { isAuthentified } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [tempUser, setTempUser] = useState({});

  const [nameUpdate, setNameUpdate] = useState(false);
  const [firstNameUpdate, setFirstNameUpdate] = useState(false);
  const [emailUpdate, setEmailUpdate] = useState(false);
  const [addressUpdate, setAddressUpdate] = useState(false);
  const [cityUpdate, setCityUpdate] = useState(false);
  const [zipcodeUpdate, setZipcodeUpdate] = useState(false);
  const [phoneUpdate, setPhoneUpdate] = useState(false);

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
                  <p>Nom: {user.name}</p>
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
                  <p>Nom: {user.first_name}</p>
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
                  <p>Nom: {user.email}</p>
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
              <Link to={"/ResetPasswordPage"}>
                Reinitialiser mon mot de passe{" "}
              </Link>
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
                <img
                  src="src/assets/stylo.png"
                  alt="modify"
                  onClick={() => {
                    setAddressUpdate(true);
                    setTempUser(user);
                  }}
                />
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
                  <p>Nom: {user.phone}</p>
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

          <div className="adminButtons">
            <div>
              {user.role == "admin" ? (
                <>
                  <Button size="lg" variant="success">
                    GESTION PIZZAS
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>

            <div>
              {user.role == "admin" ? (
                <>
                  <Button size="lg">GESTION UTILISATEURS</Button>
                </>
              ) : (
                <></>
              )}
            </div>

            <div>
              {user.role == "admin" ? (
                <>
                  <Button size="lg" variant="danger">
                    GESTION EMPLACEMENTS
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>

            {user.role == "client" ? (
              <>
                <h1>Mes commandes</h1>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="rightPart">
          <h2>Votre panier</h2>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
