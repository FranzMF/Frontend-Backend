import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userAPI = {
  // Crear nuevo usuario
  createUser: (userData) => 
    api.post('/user', userData),
  
  // Obtener todos los usuarios
  getUsers: () => 
    api.get('/user'),
  
  // Actualizar usuario
  updateUser: (id, data) => 
    api.put(`/user/${id}`, data),
  
  // Obtener usuario específico
  getUser: (id) => 
    api.get(`/user/${id}`),
};

export default api;