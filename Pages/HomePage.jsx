import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import ProductService from "../Services/ProductService";
import ProductCard from "../Components/ProductCard";
import Cart from "../Components/Cart";
import FooterPizz from "../Components/FooterPizz";

const HomePage = () => {
  const [products, setProducts] = useState([]);

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
  }, []); // Chargement unique des produits au montage du composant

  return (
    <div className="locationPage">
      <div className="leftPart">
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
            <ProductCard key={product.id_product} ProductCard={product} />
          ))}
        </div>
        <FooterPizz/> 
      </div>

      <div className="rightPart">
        <h2>Votre Panier</h2>
        <Cart />
      </div>
    </div>

    
  );
};

export default HomePage;