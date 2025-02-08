import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import FooterPizz from "../Components/FooterPizz";
import Cart from "../Components/Cart";
import { Button, ButtonGroup } from "react-bootstrap";
import UserService from "../Services/UserService";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
      fetchUsers();
  }, []);

  const fetchUsers = async () => {
      try {
          const response = await UserService.getAllUsers();
          setUsers(response.data);
      } catch (error) {
          console.error("Erreur lors de la récupération des utilisateurs", error);
          setError("Erreur lors de la récupération des utilisateurs");
      }
  };

  const handleEdit = (userId) => {
      setEditingId(userId);
  };

  const handleChange = (e, userId) => {
      const { name, value } = e.target;
      setUsers(users.map(user => 
          user.id_user === userId ? { ...user, [name]: value } : user
      ));
  };

  const handleSave = async (user) => {
      try {
          await UserService.updateUser(user.id_user, user);
          setEditingId(null);
          fetchUsers(); // Rafraîchir la liste après la mise à jour
      } catch (error) {
          console.error("Erreur lors de la mise à jour", error);
          setError("Erreur lors de la mise à jour de l'utilisateur");
      }
  };

  const handleCancel = () => {
      setEditingId(null);
      fetchUsers(); // Recharger les données originales
  };

  const handleDelete = async (user) => {
      console.log("Structure complète de l'utilisateur:", JSON.stringify(user, null, 2));
      if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.first_name} ${user.name} ?`)) {
          try {
              // Vérifions toutes les propriétés possibles pour l'ID
              const userId = user.id_user || user.id || user.userId;
              console.log("ID trouvé:", userId);
              if (!userId) {
                  throw new Error("ID de l'utilisateur non trouvé");
              }
              const response = await UserService.deleteUser(userId);
              console.log("Réponse de la suppression:", response);
              setUsers(users.filter(u => (u.id_user || u.id || u.userId) !== userId));
              setError(null);
          } catch (error) {
              console.error("Erreur détaillée:", error);
              setError("Erreur lors de la suppression de l'utilisateur");
              fetchUsers();
          }
      }
  };

  return (
      <div>
          <div className="leftPart">
              <NavBar/>
              {error && <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>{error}</div>}
              <div className="adminForm">
                  <table>
                      <thead>
                          <tr>
                              <th>Nom</th>
                              <th>Prénom</th>
                              <th>Email</th>
                              <th>Adresse</th>
                              <th>Ville</th>
                              <th>Code postal</th>
                              <th>Téléphone</th>
                              <th>Rôle</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {users.map((user) => (
                              <tr key={user.id_user}>
                                  <td>
                                      {editingId === user.id_user ? (
                                          <input
                                              type="text"
                                              name="name"
                                              value={user.name}
                                              onChange={(e) => handleChange(e, user.id_user)}
                                          />
                                      ) : (
                                          user.name
                                      )}
                                  </td>
                                  <td>
                                      {editingId === user.id_user ? (
                                          <input
                                              type="text"
                                              name="first_name"
                                              value={user.first_name}
                                              onChange={(e) => handleChange(e, user.id_user)}
                                          />
                                      ) : (
                                          user.first_name
                                      )}
                                  </td>
                                  <td>
                                      {editingId === user.id_user ? (
                                          <input
                                              type="email"
                                              name="email"
                                              value={user.email}
                                              onChange={(e) => handleChange(e, user.id_user)}
                                          />
                                      ) : (
                                          user.email
                                      )}
                                  </td>
                                  <td>
                                      {editingId === user.id_user ? (
                                          <input
                                              type="text"
                                              name="address"
                                              value={user.address}
                                              onChange={(e) => handleChange(e, user.id_user)}
                                          />
                                      ) : (
                                          user.address
                                      )}
                                  </td>
                                  <td>
                                      {editingId === user.id_user ? (
                                          <input
                                              type="text"
                                              name="city"
                                              value={user.city}
                                              onChange={(e) => handleChange(e, user.id_user)}
                                          />
                                      ) : (
                                          user.city
                                      )}
                                  </td>
                                  <td>
                                      {editingId === user.id_user ? (
                                          <input
                                              type="text"
                                              name="zipcode"
                                              value={user.zipcode}
                                              onChange={(e) => handleChange(e, user.id_user)}
                                          />
                                      ) : (
                                          user.zipcode
                                      )}
                                  </td>
                                  <td>
                                      {editingId === user.id_user ? (
                                          <input
                                              type="tel"
                                              name="phone"
                                              value={user.phone}
                                              onChange={(e) => handleChange(e, user.id_user)}
                                          />
                                      ) : (
                                          user.phone
                                      )}
                                  </td>
                                  <td>
                                      {editingId === user.id_user ? (
                                          <select
                                              name="role"
                                              value={user.role}
                                              onChange={(e) => handleChange(e, user.id_user)}
                                          >
                                              <option value="client">Client</option>
                                              <option value="employee">Employé</option>
                                              <option value="admin">Admin</option>
                                          </select>
                                      ) : (
                                          user.role
                                      )}
                                  </td>
                                  <td className="tdButtons">
                                      {editingId === user.id_user ? (
                                          <>
                                              <Button onClick={() => handleSave(user)} variant="success">Enregistrer</Button>
                                              <Button onClick={handleCancel} variant="secondary">Annuler</Button>
                                          </>
                                      ) : (
                                          <>
                                              <Button onClick={() => handleEdit(user.id_user)} variant="warning">Modifier</Button>
                                              <Button onClick={() => handleDelete(user)} variant="danger">Supprimer</Button>
                                          </>
                                      )}
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
          <div className="adminFooter">
              <FooterPizz />
          </div>
          <div className="rightPart">
              <h2>Votre Panier</h2>
              <Cart />
          </div>
      </div>
  );
};

export default AdminUsers;