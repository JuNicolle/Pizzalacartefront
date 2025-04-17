import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import ProductService from "../Services/ProductService";
import ProductCard from "../Components/ProductCard";
import Cart from "../Components/Cart";
import FooterPizz from "../Components/FooterPizz";
import FormCategory from "../Components/FormCategory";
import LocationService from "../Services/LocationService";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [todayLocations, setTodayLocations] = useState([]); 
  const [currentDay, setCurrentDay] = useState(""); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  const fetchTodayLocations = async () => {
    try {
      const response = await LocationService.GetTodayLocations();
      setTodayLocations(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des emplacements du jour:", error);
    }
  };

  const getCurrentDay = () => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const month = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    
    const date = new Date();
    const daysWeek = days[date.getDay()];
    const day = date.getDate();
    const actualMonth = month[date.getMonth()];
    
    return `${daysWeek} ${day} ${actualMonth}`;
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };


  useEffect(() => {
    fetchProducts(0);
    fetchTodayLocations();
    setCurrentDay(getCurrentDay());
  }, []);

  return (
    <div>
      <div className="leftPart">
        <NavBar />

        <div className="homePageInfos">
          <div id="pizzaOfTheMonth">
            <h2>Découvrez notre pizza du moment</h2>
          </div>

          <div id="dayLocation">
            <h3>Aujourd'hui nous sommes à : </h3>
            {todayLocations.length > 0 ? (
              <div className="locationList">
                {todayLocations.map((location, index) => (
                  <div key={location.id_location} className="locationItem">
                    <p className="locationName">{location.name}</p>
                    {index < todayLocations.length - 1 && <hr />}
                  </div>
                ))}
              </div>
            ) : (
              <p>Aucun emplacement disponible aujourd'hui</p>
            )}
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
