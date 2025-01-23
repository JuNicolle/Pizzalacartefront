import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UserService from '../Services/UserService';
import NavBar from '../Components/NavBar';

const SignInPage = () => {

    const [user, setUser] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        // ...user copie colle les données deja reneignées.
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log(user);
        if(user.password !== user.verifyPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
    
        try {
            const response = await UserService.addUser(user);    
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    };
    
    return <>
    <div className="locationPage">
    <div className="leftPart">
        <NavBar />
        <Form onSubmit={handleSubmit} >

      <Form.Group className="mb-3"  >
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre nom" name='name' value={user.name} onChange={handleChange} required={true}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Prénom</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre nom" name='first_name' value={user.first_name} onChange={handleChange} required={true}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Entrez votre email" name='email' value={user.email} onChange={handleChange} required={true}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control type="password" placeholder="Choisissez un mot de passe" name='password' value={user.password} onChange={handleChange} required={true}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Verifiez votre mot de passe</Form.Label>
        <Form.Control type="password" placeholder="Verifiez votre mot de passe" name='verifyPassword' value={user.verifyPassword} onChange={handleChange} required={true}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Adresse</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre adresse" name='address' value={user.address} onChange={handleChange} required={true}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Ville</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre ville" name='city' value={user.city} onChange={handleChange} required={true}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Code postal</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre code postal" name='zipcode' value={user.zipcode} onChange={handleChange} required={true}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Téléphone</Form.Label>
        <Form.Control type="tel" placeholder="Entrez votre numéro de telephone" name='phone' value={user.phone} onChange={handleChange} required={true}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    <div className="rightPart">
    <h2>Votre panier</h2>
    </div>

    </div>
   
    


    </>;

}
 
export default SignInPage;