import React, { useState } from 'react';
import Usuarios from './Sections/Usuarios';
import Productos from './Sections/Productos';
import Customizaciones from './Sections/Customizaciones';
import Pedidos from './Sections/Pedidos';
import Ventas from './Sections/Ventas';
import Mensajes from './Sections/Mensajes';
import Banners from './Sections/Banners';
import Ofertas from './Sections/Ofertas';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('usuarios'); // Sección activa por defecto

  const renderSection = () => {
    switch (activeSection) {
      case 'usuarios':
        return <Usuarios />;
      case 'productos':
        return <Productos />;
      case 'customizaciones':
        return <Customizaciones />;
      case 'pedidos':
        return <Pedidos />;
      case 'ventas':
        return <Ventas />;
      case 'mensajes':
        return <Mensajes />;
      case 'banners':
        return <Banners />;
      case 'ofertas':
        return <Ofertas />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      {renderSection()}
    </div>
  );
};

export default Dashboard;