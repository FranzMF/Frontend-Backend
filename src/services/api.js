import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transactionAPI = {
  // Enviar nueva transacción
  createTransaction: (transactionData) => 
    api.post('/products', transactionData),
  
  // Obtener todas las transacciones
  getProducts: () => 
    api.get('/products'),
  
  getCategories: () => 
    api.get('/categories'),
  

 putProducts: (id, data) => 
    api.put(id, data),   // <— id llega como "/products/12"


  getUser: () => 
    api.get('/user'),
  
  // Obtener estadísticas
//   getStats: () => 
//     api.get('/transaction/stats')
};

export default api;