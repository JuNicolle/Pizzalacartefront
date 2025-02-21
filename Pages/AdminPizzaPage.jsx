import { useEffect, useState } from "react";
import Cart from "../Components/Cart";
import FooterPizz from "../Components/FooterPizz";
import NavBar from "../Components/NavBar";
import ProductService from "../Services/ProductService";
import { Button, Container, Dropdown } from "react-bootstrap";
import CategoryDropdown from "../Components/CategoryDropdown";
import AvailabilityDropdown from "../Components/AvailabilityDropDown";
import FormCategory from "../Components/FormCategory";
import { Link } from "react-router-dom";

const AdminPizzaPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image_url: "",
    allergens: "",
    availability: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const fetchProducts = async (categoryId) => {
    try {
      let response;
      if (categoryId === 0) {
        response = await ProductService.getAllProducts();
      } else {
        response = await ProductService.getProductsByCategory(categoryId);
      }
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts(0);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        console.log("ID à mettre à jour:", editingId);
        console.log("Données envoyées pour la mise à jour:", form);
        await ProductService.updateProduct(editingId, form);
        setShowForm(false);
      } else {
        await ProductService.createProduct(form);
      }

      setForm({
        name: "",
        description: "",
        price: "",
        category_id: "",
        image_url: "",
        allergens: "",
        availability: "",
      });
      setEditingId(null);
      fetchProducts(selectedCategory); // Utilise la catégorie actuellement sélectionnée
    } catch (error) {
      console.error("Erreur lors de la sauvegarde", error.response);
    }
  };

  const handleEdit = (product) => {
    // On peut d'abord console.log pour voir la structure exacte
    console.log("Produit à éditer:", product);

    setEditingId(product.id_product);
    setShowForm(true);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.categorie, // Changé ici pour correspondre à votre structure
      image_url: product.image_url,
      allergens: product.allergens,
      availability: product.availability,
    });
  };
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  const handleDelete = async (product) => {
    try {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
        await ProductService.deleteProduct(product.id_product);
        fetchProducts(selectedCategory);
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

            <div className="commandPanelPizza">
              <Button variant="danger" className="mb-3">
              <Link to={"/"}>Retour</Link>
              </Button>

              <Button
                variant="primary"
                onClick={() => setShowForm(!showForm)}
                className="mb-3"
              >
                {showForm ? "Fermer le formulaire" : "Ajouter un produit"}
              </Button>

              <FormCategory onCategoryChange={handleCategoryChange} />
            </div>

            {showForm && (
              <div className="pizzaFormDiv">
                <form onSubmit={handleSubmit} className="adminFormPizza">
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
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                  />
                  <input
                    type="text"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Prix"
                    required
                  />
                  <CategoryDropdown
                    onCategorySelect={(categoryId) => {
                      setForm({ ...form, category_id: categoryId });
                    }}
                    selectedCategory={form.category_id}
                  />

                  <input
                    type="text"
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                    placeholder="Image"
                    required
                  />
                  <input
                    type="text"
                    name="allergens"
                    value={form.allergens}
                    onChange={handleChange}
                    placeholder="Allergènes"
                    required
                  />
                  <AvailabilityDropdown
                    onAvailabilitySelect={(availabilityId) => {
                      setForm({ ...form, availability: availabilityId });
                    }}
                    selectedAvailability={form.availability}
                  />

                  <button type="submit">
                    {editingId ? "Mettre à jour" : "Ajouter"}
                  </button>
                </form>
              </div>
            )}
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Description</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Image</th>
                  <th>Allergenes</th>
                  <th>Dispo</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id_product}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.category_name}</td>
                    <td>{product.price}</td>
                    <td>{product.image_url}</td>
                    <td>{product.allergens}</td>
                    <td>{product.availability}</td>
                    <td className="tdButtons">
                      <button
                        onClick={() => handleEdit(product)}
                        className="inputAccount"
                      >
                        <img src="src/assets/stylo.png" alt="modify" />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="inputAccount"
                      >
                        <img src="src/assets/poubelle.png" alt="delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
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
