import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import ProductService from "../Services/ProductService";
import ProductCard from "../Components/ProductCard";
import Cart from "../Components/Cart";
import FooterPizz from "../Components/FooterPizz";
import FormCategory from "../Components/FormCategory";

const HomePage = () => {
  const [products, setProducts] = useState([]);
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

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  useEffect(() => {
    fetchProducts(0);
  }, []);

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
          <div >
            <span>Nouvel ingrédient du moment : Pepperonni !</span>
          </div>

          <div>
          <FormCategory onCategoryChange={handleCategoryChange} />
          </div>
        </div>

        <div className="listItems">
          {products.map((product) => (
            <ProductCard key={product.id_product} ProductCard={product} />
          ))}
        </div>
        <FooterPizz />
      </div>

      <div className="rightPart">
        <h2>Votre Panier</h2>
        <Cart />
      </div>
    </div>
  );
};

export default HomePage;
