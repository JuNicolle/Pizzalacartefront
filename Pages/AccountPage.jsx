import { useEffect, useState } from "react";
import UserService from "../Services/UserService";
import NavBar from "../Components/NavBar";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderHistory from "../Components/OrderHistory";

const AccountPage = () => {
  const [user, setUser] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState("");

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

  const handleEdit = (field, value) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue("");
    setError("");
  };

  const handleSave = async () => {
    try {
      setError("");
      
      if (!editValue.trim()) {
        setError("Le champ ne peut pas être vide");
        return;
      }

      const updateData = {
        ...user,
        [editingField]: editValue
      };

      await UserService.updateUser(updateData);
      
      setUser(prev => ({
        ...prev,
        [editingField]: editValue
      }));
      
      setEditingField(null);
      setEditValue("");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      setError("Erreur lors de la mise à jour");
    }
  };

  const renderField = (label, field, value) => {
    if (editingField === field) {
      return (
        <div className="inputAccount">
          <div>
            <p>
              {label}: {" "}
              <input 
                type="text" 
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="p-1 border rounded"
                autoFocus
              />
              <button 
                onClick={handleSave} 
                className="btn btn-sm btn-success mx-1"
              >
                ✓
              </button>
              <button 
                onClick={handleCancel} 
                className="btn btn-sm btn-danger"
              >
                ×
              </button>
            </p>
            {error && <span className="text-danger">{error}</span>}
          </div>
        </div>
      );
    }

    return (
      <div className="inputAccount">
        <div>
          <p>{label}: {value}</p>
        </div>
        <div>
          <img 
            src="src/assets/stylo.png" 
            alt="Éditer" 
            onClick={() => handleEdit(field, value || "")}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <div className="bodyAccount">
        <div className="coordonnees">
          <h1>Mon compte</h1>

          {renderField("Nom", "name", user.name)}
          {renderField("Prénom", "first_name", user.first_name)}
          {renderField("Email", "email", user.email)}

          <p>
            Mot de passe :{" "}
            <Button variant="secondary" className="buttonMdp">
              <Link to={"/ResetPasswordPage"}>
                Reinitialiser mon mot de passe
              </Link>
            </Button>
          </p>

          {renderField("Adresse", "address", user.address)}
          {renderField("Code postal", "zipcode", user.zipcode)}
          {renderField("Ville", "city", user.city)}
          {renderField("Téléphone", "phone", user.phone)}
        </div>

        <h1>Mes commandes</h1>

        <div>
          <OrderHistory/>
        </div>
      </div>

      <div className="rightPart">
        <h2>Votre Panier</h2>
      </div>
    </>
  );
};

export default AccountPage;