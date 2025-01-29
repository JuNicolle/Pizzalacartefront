import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {

    const navigate = useNavigate();


    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4">Commande confirmée !</h1>
        <p>Merci pour votre commande. Elle sera bientôt prête !</p>
        <Button 
          variant="primary" 
          onClick={() => navigate('/')}
          className="mt-4"
        >
          Retour à l'accueil
        </Button>
      </div>
    );
  };

  export default OrderConfirmation;