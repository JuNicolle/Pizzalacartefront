import { useEffect, useState } from "react";
import Cart from "../Components/Cart";
import FooterPizz from "../Components/FooterPizz";
import NavBar from "../Components/NavBar";
import ProductService from "../Services/ProductService";
import { Button, Container, Dropdown, Alert } from "react-bootstrap";
import CategoryDropdown from "../Components/CategoryDropdown";
import AvailabilityDropdown from "../Components/AvailabilityDropDown";
import FormCategory from "../Components/FormCategory";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminPizzaPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "", // Changé de null à chaîne vide
    image: null,
    allergens: "",
    availability: "", // Changé de null à chaîne vide
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setError("Erreur lors du chargement des produits");
    }
  };

  useEffect(() => {
    fetchProducts(0);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image') {
      const file = files[0];
      setForm({ ...form, [name]: file });
      
      // Créer une preview de l'image
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      category_id: "", // Assurer que c'est une chaîne vide
      image: null,
      allergens: "",
      availability: "", // Assurer que c'est une chaîne vide
    });
    setImagePreview(null);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation côté client
    console.log("=== DEBUG FRONTEND ===");
    console.log("Form data:", form);
    
    if (!form.name || !form.description || !form.price || !form.category_id || !form.allergens || !form.availability) {
      const missingFields = [];
      if (!form.name) missingFields.push('nom');
      if (!form.description) missingFields.push('description');
      if (!form.price) missingFields.push('prix');
      if (!form.category_id) missingFields.push('catégorie');
      if (!form.allergens) missingFields.push('allergènes');
      if (!form.availability) missingFields.push('disponibilité');
      
      setError(`Champs manquants: ${missingFields.join(', ')}`);
      setLoading(false);
      return;
    }

    try {
      if (editingId) {
        console.log("ID à mettre à jour:", editingId);
        console.log("Données envoyées pour la mise à jour:", form);
        await ProductService.updateProduct(editingId, form);
        toast.success("Produit mis à jour avec succès");
      } else {
        // Vérifier qu'une image est sélectionnée pour la création
        if (!form.image) {
          setError("Une image est requise pour créer un produit");
          setLoading(false);
          return;
        }
        
        console.log("Création du produit avec les données:", form);
        await ProductService.createProduct(form);
        toast.success("Produit créé avec succès");
      }

      resetForm();
      fetchProducts(selectedCategory);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde", error);
      console.error("Détails de l'erreur:", error.response?.data);
      const errorMessage = error.response?.data?.error || error.response?.data || "Erreur lors de la sauvegarde";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    console.log("Produit à éditer:", product);

    setEditingId(product.id_product);
    setShowForm(true);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.categorie || product.category_id,
      image: null, // Ne pas pré-remplir l'image
      allergens: product.allergens,
      availability: product.availability,
    });
    
    // Afficher l'image actuelle comme preview
    if (product.image_url) {
      setImagePreview(`http://localhost:3000/images/${product.image_url}`);
    }
  };
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  const handleDelete = async (product) => {
    try {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
        await ProductService.deleteProduct(product.id_product);
        toast.success("Produit supprimé avec succès");
        fetchProducts(selectedCategory);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
      const errorMessage = error.response?.data?.error || "Erreur lors de la suppression du produit";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div>
        <div className="leftPart">
          <NavBar />
          <div className="mainContent">
            <h2>Gestions des pizzas</h2>

            {error && (
              <Alert variant="danger" className="mx-3">
                {error}
              </Alert>
            )}

            <div className="commandPanelPizza">
              <Button variant="danger" className="mb-3">
                <Link to={"/AdminPage"}>Retour</Link>
              </Button>

              <Button
                variant="primary"
                onClick={() => {
                  if (showForm) {
                    resetForm();
                  } else {
                    setShowForm(true);
                  }
                }}
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
                    type="number"
                    step="0.01"
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

                  <div>
                    <label htmlFor="image">Image du produit :</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      required={!editingId} // Requis seulement pour la création
                    />
                    {imagePreview && (
                      <div style={{ marginTop: '10px' }}>
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </div>

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

                  <button type="submit" disabled={loading}>
                    {loading ? "En cours..." : (editingId ? "Mettre à jour" : "Ajouter")}
                  </button>
                </form>
              </div>
            )}
          </div>
          
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Produit</th>
                  <th>Description</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Allergenes</th>
                  <th>Dispo</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id_product}>
                    <td>
                      <img 
                        src={`http://localhost:3000/images/${product.image_url}`}
                        alt={product.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.category_name}</td>
                    <td>{product.price}€</td>
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