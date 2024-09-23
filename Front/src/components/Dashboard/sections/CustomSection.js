import React from 'react';

const CustomSection = ({ userId }) => {
  // Aquí deberías obtener las customizaciones desde tu estado global o API
  const customizations = [
    { id: 1, userId: 1, detail: "Personalización A" },
    { id: 2, userId: 2, detail: "Personalización B" },
    { id: 3, userId: 1, detail: "Personalización C" },
    // ... otras customizaciones
  ];

  // Filtrar customizaciones si es un cliente
  const filteredCustomizations = userId ? customizations.filter(customization => customization.userId === userId) : customizations;

  return (
    <div>
      <h2>Mis Customizaciones</h2>
      <ul>
        {filteredCustomizations.map(customization => (
          <li key={customization.id}>{customization.detail}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSection;
