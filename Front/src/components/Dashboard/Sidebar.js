import React from 'react';
import { useSelector } from 'react-redux';

const Sidebar = ({ setActiveSection }) => {
  const userInfo = useSelector((state) => state.orebiReducer.userInfo[0]); // Obtener la información del usuario
  const userRole = userInfo?.role; // Obtener el rol del usuario

  const handleNavigation = (section) => {
    setActiveSection(section); // Actualiza la sección activa
  };

  // Secciones disponibles según el rol
  const sections = {
    Admin: [
      'Usuarios',
      'Productos',
      'Customizaciones',
      'Pedidos',
      'Ventas',
      'Mensajes',
      'Banners',
      'Ofertas'
    ],
    Empleado: [
      'Usuarios',
      'Customizaciones',
      'Pedidos',
      'Ventas',
      'Mensajes',
      'Banners',
      'Ofertas'
    ],
    Cliente: [
      'Pedidos',       // Solo puede ver sus propios pedidos
      'Customizaciones' // Solo puede ver sus propias customizaciones
    ],
  };

  // Filtrar las secciones a mostrar según el rol
  const availableSections = sections[userRole] || [];

  return (
    <div className="w-64 h-screen bg-white text-gray-900 shadow-md fixed">
      <h2 className="text-lg font-bold mb-4 text-center">Panel de Control</h2>
      <ul className="space-y-2">
        {availableSections.map(section => (
          <li key={section}>
            <button 
              onClick={() => handleNavigation(section)} 
              className="w-full text-left hover:bg-gray-200 p-2 rounded transition duration-200 ease-in-out"
            >
              {section}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
