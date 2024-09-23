import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchProducts, fetchOrders } from './api'; // Asegúrate de importar las funciones
import UserSection from './sections/UserSection';
import ProductSection from './sections/ProductSection';
import CustomSection from './sections/CustomSection';
import OrdersSection from './sections/OrdersSection';
import SellSection from './sections/SellSection';
import MenssagesSection from './sections/MenssagesSection';
import BannersSection from './sections/BannersSection';
import OffersSection from './sections/OffersSection';

const Dashboard = ({ activeSection }) => {
  const userInfo = useSelector((state) => state.orebiReducer.userInfo[0]);
  const userRole = userInfo?.role;

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Cargar productos y pedidos al montar el componente
    const loadData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);

        const ordersData = await fetchOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'Usuarios':
        return <UserSection />;
      case 'Productos':
        return <ProductSection products={products} />; // Pasa los productos como prop
      case 'Customizaciones':
        return userRole === 'Cliente' ? <CustomSection userId={userInfo.id} /> : <CustomSection />;
      case 'Pedidos':
        return userRole === 'Cliente' ? (
          <OrdersSection orders={orders.filter(order => order.userId === userInfo.id)} />
        ) : (
          <OrdersSection orders={orders} />
        );
      case 'Ventas':
        return <SellSection />;
      case 'Mensajes':
        return <MenssagesSection />;
      case 'Banners':
        return <BannersSection />;
      case 'Ofertas':
        return <OffersSection />;
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
