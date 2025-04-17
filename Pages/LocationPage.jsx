import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import LocationService from "../Services/LocationService";
import Cart from "../Components/Cart";

import FooterPizz from "../Components/FooterPizz";


const LocationPage = () => {
    const [locations, setLocations] = useState([]);
    const fetchLocations = async () => {
        try{
            const response = await LocationService.GetAllLocations();
            console.log(response.data);
            setLocations(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    
        useEffect(() => {
            fetchLocations();
        },[]);

        
  return (
    <>
      <div className="locationPage">
        <div className="leftPart">
          <NavBar />
          
          <div className="listLocations">
            <h2>Emplacements du camion</h2>
                    {locations.map((location) => (
               <li key={location.id_location}> {location.schedule} : {location.name} <br /> {location.address} </li> 
            ))}
            <img id="mario"src="src/assets/mario.webp" alt="" />
          </div>
          
          

          <FooterPizz/> 
        </div>
        <div className="rightPart">
          <h2>Votre panier</h2>
          <Cart/>
        </div>
      </div>
      
    </>
  );
};
export default LocationPage;