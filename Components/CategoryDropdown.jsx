// CategoryDropdown.jsx
import React from 'react';
import { Dropdown } from 'react-bootstrap';

const CategoryDropdown = ({ onCategorySelect, selectedCategory }) => {
  const categories = [
    { id: 1, name: "Pizzas base tomate" },
    { id: 2, name: "Pizzas base creme" },
    { id: 3, name: "Boissons Soft" },
  ];

  // Trouve le nom de la catégorie sélectionnée
  const selectedCategoryName = selectedCategory 
    ? categories.find(cat => cat.id === parseInt(selectedCategory))?.name 
    : "Sélectionnez une catégorie";

  return (
    <Dropdown onSelect={onCategorySelect}>
      <Dropdown.Toggle variant="success" id="dropdown-categories">
        {selectedCategoryName}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {categories.map(category => (
          <Dropdown.Item 
            key={category.id} 
            eventKey={category.id}
          >
            {category.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoryDropdown;