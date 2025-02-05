import React, { useEffect, useState } from "react";
import LocationService from "../Services/LocationService";
import NavBar from "../Components/NavBar";
import FooterPizz from "../Components/FooterPizz";
import Cart from "../Components/Cart";
import { Button, ButtonGroup } from "react-bootstrap";


const AdminLocations = () => {
    const [locations, setLocations] = useState([]);
    const [form, setForm] = useState({ name: "", address: "", schedule: "" });
    const [editingId, setEditingId] = useState(null);

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
        setForm(location);
        setEditingId(location.id_location);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet emplacement ?")) {
            try {
                await LocationService.DeleteLocation(id);
                fetchLocations();
            } catch (error) {
                console.error("Erreur lors de la suppression", error);
            }
        }
    };

    return (
        <div>
            <div className="leftPart">
                <NavBar/>
            
            <div className="adminFormContainer">
            <h2>Gestion des Emplacements</h2>
            <form onSubmit={handleSubmit} className="adminForm">
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nom" required />
                <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Adresse" required />
                <input type="text" name="schedule" value={form.schedule} onChange={handleChange} placeholder="Horaires" required />
                <button type="submit">{editingId ? "Mettre à jour" : "Ajouter"}</button>
            </form>
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
                                <Button onClick={() => handleEdit(location)} variant="danger">Supprimer</Button>
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
