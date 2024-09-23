import React from 'react';

const ProductSection = ({ products }) => {
  return (
    <div>
      <h2>Productos</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <img src={product.img} alt={product.productName} />
            <h3>{product.productName}</h3>
            <p>{product.price}</p>
            <p>{product.des}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSection;
