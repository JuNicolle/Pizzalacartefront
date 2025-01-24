import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import ProductService from "../Services/ProductService";
import ProductCard from "../Components/ProductCard";
import ProductModal from "../Components/ProductModal";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddToCart = async (product, quantity, specialInstructions) => {
    try {
      await CartService.addToCart(
        currentOrderId,
        product.id_product,
        quantity,
        specialInstructions
      );
      // Rafraîchir le panier ici si nécessaire
      setShowModal(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
    }
  };

  return (
    <>
      <div className="locationPage">
        <div className={`leftPart ${showModal ? "blurred" : ""}`}>
          <NavBar />

          <div className="homePageInfos">
            <div id="pizzaOfTheMonth">
              <h2>Découvrez notre pizza du moment</h2>
            </div>
            <div id="dayLocation">
              <h3>Aujourd'hui nous sommes à </h3>
            </div>
          </div>
  
          <div className="newIngredient">
            <span>Nouvel ingrédient du moment : Pepperonni !</span>
          </div>

          <div className="listItems">
            {products.map((product) => (
              <div key={product.id_product} onClick={() => handleCardClick(product)}>
                <ProductCard key={product.id_product} ProductCard={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="rightPart">
         <h2>Votre Panier</h2>
        </div>
      </div>

      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default HomePage;