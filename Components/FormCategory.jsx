import Form from 'react-bootstrap/Form';

function FormCategory({ onCategoryChange }) {
  const handleChange = (event) => {
    const categoryId = Number(event.target.value);
    onCategoryChange(categoryId);
  };

  return (
    <div className='formCategory'>
      <Form.Select onChange={handleChange}>
        <option value="0">Toutes les catégories</option>
        <option value="1">Pizzas base tomate</option>
        <option value="2">Pizzas base crême</option>
        <option value="3">Boissons</option>
        <option value="4">Desserts</option>
      </Form.Select>
    </div>
  );
}

export default FormCategory;