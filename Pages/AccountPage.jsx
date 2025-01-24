import { useEffect, useState } from "react";
import UserService from "../Services/UserService";
import NavBar from "../Components/NavBar";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    try {
      const response = await UserService.getUser();
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <div className="bodyAccount">
        <div className="coordonnees">
          <h1>Mon compte</h1>

          <div className="inputAccount">
            <div>
              <p>Nom: {user.name}</p>
            </div>
            <div>
              <img src="src/assets/stylo.png" alt="" />
            </div>
          </div>

          <div className="inputAccount">
            <div>
              <p>Prénom: {user.first_name}</p>
            </div>
            <div>
              <img src="src/assets/stylo.png" alt="" />
            </div>
          </div>

          <div className="inputAccount">
            <div>
              <p>Email: {user.email}</p>
            </div>
            <div>
              <img src="src/assets/stylo.png" alt="" />
            </div>
          </div>

          <p>
            Mot de passe :{" "}
            <Button variant="secondary" className="buttonMdp">
              <Link to={"/ResetPasswordPage"}>
                Reinitialiser mon mot de passe{" "}
              </Link>
            </Button>
          </p>

          <div className="inputAccount">
            <div>
              <p>
                Adresse : {user.address}, {user.zipcode}, {user.city}
              </p>
            </div>
            <div>
              <img src="src/assets/stylo.png" alt="" />
            </div>
          </div>

          <div className="inputAccount">
            <div>
              <p>Tel : {user.phone} </p>
            </div>
            <div>
              <img src="src/assets/stylo.png" alt="" />
            </div>
          </div>

        </div>

        <h1>Mes commandes</h1>
      </div>

      <div className="rightPart">
        <h2>Votre panier</h2>
      </div>
    </>
  );
};

export default AccountPage;
