import React from 'react';

const OrdersSection = ({ orders }) => {
  return (
    <div>
      <h2>Mis Pedidos</h2>
      <ul>
        {orders.map(order => (
          <li key={order.orderId}>
            {/* Renderiza detalles del pedido */}
            <h3>Pedido ID: {order.orderId}</h3>
            {order.products.map(product => (
              <div key={product.productId}>
                <p>{product.productName} - Cantidad: {product.quantity}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersSection;
