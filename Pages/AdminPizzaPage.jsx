import { useEffect, useState } from "react";
import Cart from "../Components/Cart";
import FooterPizz from "../Components/FooterPizz";
import NavBar from "../Components/NavBar";
import ProductService from "../Services/ProductService";

const AdminPizzaPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categorie: "",
    image_url: "",
    allergens: "",
    availability: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  // TO DO
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (editingId) {
            await ProductService.UpdateLocation(editingId, form);
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

// A TESTER 
const handleDelete = async (product) => {
  try {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
          await ProductService.deleteProduct(product.id_product);
          fetchProducts();
      }
  } catch (error) {
      console.error("Erreur lors de la suppression", error);
      setError("Erreur lors de la suppression du produit");
  }
};




  return (
    <>
      <div>
        <div className="leftPart">
          <NavBar />
          <div className="mainContent">
            <h2>Gestions des pizzas</h2>
            <form onSubmit={handleSubmit} className="adminForm">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nom"
                required
              />
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Adresse"
                required
              />
              <input
                type="text"
                name="schedule"
                value={form.schedule}
                onChange={handleChange}
                placeholder="Horaires"
                required
              />
              <button type="submit">
                {editingId ? "Mettre à jour" : "Ajouter"}
              </button>
            </form>
          </div>
          <div>
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
                      <Button
                        onClick={() => handleEdit(location)}
                        variant="warning"
                      >
                        Modifier
                      </Button>
                      <Button
                        onClick={() => handleDelete(location)}
                        variant="danger"
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="adminFooter">
            <FooterPizz />
          </div>
        </div>

        <div className="rightPart">
          <h2>Votre Panier</h2>
          <Cart />
        </div>
      </div>
    </>
  );
};

export default AdminPizzaPage;
