import React from 'react';
import NavBar from '../Components/NavBar';
import FooterPizz from '../Components/FooterPizz';
import Cart from '../Components/Cart';

const PrivacyPolicyPage = () => {
  return (
    <div className="locationPage">
      <div className="leftPart">
        <NavBar />
        
        <div className="privacy-policy-container">
          <div className="privacy-content">
            <h1>Politique de confidentialité</h1>
            <p className="last-updated"><strong>Dernière mise à jour : Janvier 2025</strong></p>

            <section>
              <h2>1. Introduction</h2>
              <p>
                Bienvenue sur Pizz'à La Carte. Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. 
                Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations 
                lorsque vous utilisez notre site web et nos services.
              </p>
            </section>

            <section>
              <h2>2. Responsable du traitement</h2>
              <div className="contact-info">
                <p><strong>Pizz'à La Carte</strong></p>
                <p>Email : contact@pizzalacarte.fr</p>
                <p>Téléphone : 06 12 34 56 78</p>
              </div>
            </section>

            <section>
              <h2>3. Données que nous collectons</h2>
              
              <h3>3.1 Données que vous nous fournissez directement</h3>
              <ul>
                <li><strong>Informations de compte :</strong> nom, prénom, adresse email, mot de passe</li>
                <li><strong>Informations de livraison :</strong> adresse postale, ville, code postal, numéro de téléphone</li>
                <li><strong>Informations de commande :</strong> produits commandés, quantités, instructions spéciales</li>
                <li><strong>Informations de paiement :</strong> données nécessaires au traitement des paiements</li>
              </ul>

              <h3>3.2 Données collectées automatiquement</h3>
              <ul>
                <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées</li>
                <li><strong>Cookies :</strong> pour améliorer votre expérience utilisateur</li>
              </ul>
            </section>

            <section>
              <h2>4. Pourquoi nous collectons ces données</h2>
              <p>Nous utilisons vos données personnelles pour :</p>
              <ul>
                <li><strong>Traitement des commandes :</strong> préparer, livrer et facturer vos commandes</li>
                <li><strong>Gestion de compte :</strong> créer et gérer votre compte client</li>
                <li><strong>Communication :</strong> vous envoyer des confirmations de commande</li>
                <li><strong>Amélioration du service :</strong> analyser l'utilisation du site</li>
                <li><strong>Obligations légales :</strong> respecter nos obligations comptables et fiscales</li>
              </ul>
            </section>

            <section>
              <h2>5. Partage de vos données</h2>
              <p>
                <strong>Nous ne vendons jamais vos données personnelles.</strong> Nous partageons vos informations uniquement avec :
              </p>
              <ul>
                <li>Prestataires de paiement pour traiter les transactions</li>
                <li>Services de livraison pour livrer vos commandes</li>
                <li>Hébergement web pour maintenir notre site opérationnel</li>
              </ul>
            </section>

            <section>
              <h2>6. Sécurité de vos données</h2>
              <p>Nous mettons en place des mesures de sécurité appropriées :</p>
              <ul>
                <li><strong>Chiffrement :</strong> toutes les données sensibles sont chiffrées</li>
                <li><strong>Accès restreint :</strong> seules les personnes autorisées ont accès à vos données</li>
                <li><strong>Mots de passe sécurisés :</strong> hashage avec bcrypt</li>
                <li><strong>Surveillance :</strong> monitoring continu pour détecter les intrusions</li>
              </ul>
            </section>

            <section>
              <h2>7. Vos droits (RGPD)</h2>
              <div className="rights-grid">
                <div className="right-item">
                  <h4>Droit d'accès</h4>
                  <p>Demander une copie de vos données</p>
                </div>
                <div className="right-item">
                  <h4>Droit de rectification</h4>
                  <p>Corriger ou mettre à jour vos données</p>
                </div>
                <div className="right-item">
                  <h4>Droit d'effacement</h4>
                  <p>Demander la suppression de vos données</p>
                </div>
                <div className="right-item">
                  <h4>Droit de portabilité</h4>
                  <p>Récupérer vos données dans un format structuré</p>
                </div>
              </div>
              
              <div className="exercise-rights">
                <p><strong>Pour exercer ces droits :</strong></p>
                <p>Contactez-nous à : <a href="mailto:privacy@pizzalacarte.fr">privacy@pizzalacarte.fr</a></p>
              </div>
            </section>

            <section>
              <h2>8. Cookies</h2>
              <p>Notre site utilise des cookies pour :</p>
              <ul>
                <li><strong>Fonctionnement essentiel :</strong> maintenir votre session et votre panier</li>
                <li><strong>Préférences :</strong> mémoriser vos choix</li>
                <li><strong>Statistiques :</strong> analyser l'utilisation du site</li>
              </ul>
              <p>Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.</p>
            </section>

            <section>
              <h2>9. Conservation des données</h2>
              <ul>
                <li><strong>Données de compte :</strong> tant que votre compte est actif</li>
                <li><strong>Données de commande :</strong> 3 ans (obligations comptables)</li>
                <li><strong>Données de navigation :</strong> 13 mois maximum</li>
              </ul>
            </section>

            <section>
              <h2>10. Contact et réclamations</h2>
              <div className="contact-section">
                <div>
                  <h4>Nous contacter</h4>
                  <p>Email : <a href="mailto:privacy@pizzalacarte.fr">privacy@pizzalacarte.fr</a></p>
                </div>
                <div>
                  <h4>Réclamations</h4>
                  <p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la CNIL :</p>
                  <p><a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></p>
                </div>
              </div>
            </section>

            <section className="final-note">
              <p><em>En utilisant notre site web, vous acceptez les termes de cette politique de confidentialité.</em></p>
            </section>
          </div>
        </div>

        <FooterPizz />
      </div>
      
      <div className="rightPart">
        <h2>Votre panier</h2>
        <Cart />
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;