import React, { useState } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Navbar from '../../components/Dashboard/Navbar';
import Sidebar from '../../components/Dashboard/Sidebar';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('Usuarios'); // Sección activa por defecto

  return (
    <div className='flex'>
      <Sidebar setActiveSection={setActiveSection} />
      <div className='flex-grow ml-64'>
        <Navbar />
        <div className='p-4'>
          <Dashboard activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
