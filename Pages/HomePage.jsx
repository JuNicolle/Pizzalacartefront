import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import ProductService from "../Services/ProductService";
import ProductCard from "../Components/ProductCard";
import LocationService from "../Services/LocationService";
import { useParams } from "react-router-dom";
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
    setSelectedProduct(product); // Définit le produit sélectionné
    setShowModal(true);         // Affiche la modal
  };

  // FONCTION POUR AFFICHER L'EMPLACEMENT DU CAMION EN FONCTION DU JOUR

  // const [locations, setLocations] = useState([]);

  // const {id} = useParams();
  // const fetchLocations = async () => {

  //     try{
  //         const response = await LocationService.GetLocationById(id);
  //         console.log(response);

  //     } catch (error) {
  //         console.error(error);
  //     }
  // };

  //     useEffect(() => {
  //         fetchLocations();
  //     },[]);

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

          <div className="listItems">
            {products.map((product) => (
              <div key={product.id_product} onClick={() => handleCardClick(product)}>
              <ProductCard key={product.id_product} ProductCard={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="rightPart">
          <h2>Votre panier</h2>
        </div>
      </div>

      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={selectedProduct}
      />
    </>
  );
};

export default HomePage;
