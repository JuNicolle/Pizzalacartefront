import { Link } from "react-router-dom";

const FooterPizz = () => {

    return <>
        <div id="footer">
            <div>
                <p>2025 Pizz'à La Carte - Tous droits réservés.</p>
            </div>

            <Link to="/privacy-policy" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <p>Politique de confidentialité</p>
                </Link>
        </div>
    
    
    </>
}
 
export default FooterPizz;