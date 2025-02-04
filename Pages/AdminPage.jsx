import Cart from "../Components/Cart";
import FooterPizz from "../Components/FooterPizz";
import NavBar from "../Components/NavBar";

const AdminPage = () => {
    return <>
    <div className="locationPage">
      <div className="leftPart">
        <NavBar />
        <div><h2>Panneau Admin</h2></div>
        <div>
            <div className="adminPanelCard">
                <h3>Pizzas</h3>
                <img src="src/assets/ptifoodtruck.jpg" alt="" />
            </div>
            <div className="adminPanelCard">
                <h3>Emplacements</h3>
                <img src="src/assets/pizzmap.png" alt="" />
            </div>
            <div className="adminPanelCard">
                <h3>Utilisateurs</h3>
                <img src="src/assets/userimg.jpg" alt="" />
            </div>
            <div className="adminPanelCard">
                <h3>Commandes en cours</h3>
                <img src="src/assets/10219.jpg" alt="" />
            </div>

            
        </div>
     
          

        </div>
        <FooterPizz/> 
      </div>
      <div className="rightPart">
        <h2>Votre panisser</h2>
        <Cart/>
      </div>
    
  </>
}
 
export default AdminPage;