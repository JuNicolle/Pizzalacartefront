import React, { useEffect, useState } from "react";
import LocationService from "../Services/LocationService";
import NavBar from "../Components/NavBar";
import FooterPizz from "../Components/FooterPizz";
import Cart from "../Components/Cart";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";


const AdminLocations = () => {
    const {id} = useParams();
    const [locations, setLocations] = useState([]);
    const [form, setForm] = useState({ name: "", address: "", schedule: "" });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await LocationService.GetAllLocations();
            setLocations(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des emplacements", error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await LocationService.UpdateLocation(editingId, form);
            } else {
                await LocationService.CreateLocation(form);
            }
            setForm({ name: "", address: "", schedule: "" });
            setEditingId(null);
            fetchLocations();
        } catch (error) {
            console.error("Erreur lors de la sauvegarde", error);
        }
    };

    const handleEdit = (location) => {
        // On peut d'abord console.log pour voir la structure exacte
    
        setEditingId(location.id_location);
        setShowForm(true);
        setForm({
          name: location.name,
          address: location.address,
          schedule: location.schedule,
        });
      };

    const handleDelete = async (location) => {
        try {
            // Optionnel : Ajouter une confirmation avant la suppression
            if (window.confirm("Êtes-vous sûr de vouloir supprimer cet emplacement ?")) {
                await LocationService.DeleteLocation(location.id_location);
                // Rafraîchir la liste après la suppression
                fetchLocations();
            }
        } catch (error) {
            console.error("Erreur lors de la suppression", error);
            setError("Erreur lors de la suppression de l'emplacement");
        }
    };

    return (
        <div>
            <div className="leftPart">
                <NavBar/>
           
            <div className="adminFormContainer">
            
            <h2>Gestion des Emplacements</h2>
            <div className="commandPanelPizza">
              <Button variant="danger" className="mb-3">
              <Link to={"/AdminPage"}>Retour</Link>
              </Button>
             
              <Button
                variant="primary"
                onClick={() => setShowForm(!showForm)}
                className="mb-3"
              >
                {showForm ? "Fermer le formulaire" : "Ajouter un produit"}
              </Button> 
              </div>
            {showForm && (
            <form onSubmit={handleSubmit} className="adminForm">
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nom" required />
                <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Adresse" required />
                <input type="text" name="schedule" value={form.schedule} onChange={handleChange} placeholder="Horaires" required />
                <button type="submit">{editingId ? "Mettre à jour" : "Ajouter"}</button>
            </form>
            )}
            </div>
            <div className="adminForm">
            <table>
                <thead>
                    <tr>
                        <th>Jour</th>
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location) => (
                        <tr key={location.id_location}>
                            <td>{location.schedule}</td>
                            <td>{location.name}</td>
                            <td>{location.address}</td>
                            <td className="tdButtons">
                                <Button onClick={() => handleEdit(location)} variant="warning">Modifier</Button>
                                <Button onClick={() => handleDelete(location)} variant="danger">Supprimer</Button>
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

export default AdminLocations;
