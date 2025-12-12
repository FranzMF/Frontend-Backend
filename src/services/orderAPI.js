// orderAPI.js
import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const orderAPI = {
  // Crear nueva orden
  createOrder: (orderData) => api.post('/order', orderData),

  // Obtener todas las órdenes
  getOrders: () => api.get('/order'),

  // Obtener orden específica
  getOrder: (id) => api.get(`/order/${id}`),

  // Actualizar estado de orden
  updateOrderStatus: (id, status) =>
    api.put(`/order/${id}`, { status }),

  // Crear detalle de orden
  createOrderDetail: (orderDetailData) =>
    api.post('/orderdetails', orderDetailData),

  // Obtener detalles de orden
  getOrderDetails: () => api.get('/orderdetails'),
};

export default api;
