// AvailabilityDropdown.jsx
import React from 'react';
import { Dropdown } from 'react-bootstrap';

const AvailabilityDropdown = ({ onAvailabilitySelect, selectedAvailability }) => {
  const availabilityOptions = [
    { id: 1, status: "Disponible" },
    { id: 2, status: "Non disponible" },
    { id: 3, status: "Temporairement disponible" }
  ];

  // Trouve le statut sélectionné
  const selectedStatus = selectedAvailability 
    ? availabilityOptions.find(opt => opt.id === parseInt(selectedAvailability))?.status 
    : "Sélectionnez la disponibilité";

  return (
    <Dropdown onSelect={onAvailabilitySelect}>
      <Dropdown.Toggle variant="primary" id="dropdown-availability">
        {selectedStatus}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {availabilityOptions.map(option => (
          <Dropdown.Item 
            key={option.id} 
            eventKey={option.id}
          >
            {option.status}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AvailabilityDropdown;