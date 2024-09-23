// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3002'; // Cambia esto si es necesario

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const fetchBanners = async () => {
  const response = await axios.get(`${API_URL}/banners`);
  return response.data;
};

export const fetchSales = async () => {
  const response = await axios.get(`${API_URL}/sales`);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};
