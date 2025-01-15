import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    
        // try {
        //     const response = await UserService.addUser(user);    
        // }
        // catch (error) {
        //     console.error(error);
        // }
    };
    
    return <Container className='d-flex flex-column align-items-center justify-content-center'>
    
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={user.email} onChange={handleChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name='name' value={user.name} onChange={handleChange}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={user.password} onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Verifiez password" name='verifyPassword' value={user.verifyPassword} onChange={handleChange}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>;

}
 
export default SignInPage;