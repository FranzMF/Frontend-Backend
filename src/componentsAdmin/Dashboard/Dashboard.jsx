import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { transactionAPI } from '../../services/api';
import { PiggyBank, ShoppingCart, SquareChartGantt, Users } from 'lucide-react';
import axios from 'axios';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const [products, setProducts] = useState([]);
  const [cantProducts, setCantProducts] = useState();

  const [users, setUsers] = useState([]);
  const [cantUsers, setCantUsers] = useState();
  const [orders, setOrders] = useState([]);


  const loadProducts = async () => {
    try {
      const res = await transactionAPI.getProducts();
      const productData = res.data || [];

      setProducts(productData);

      setCantProducts(productData.length);

    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };
  const loadUsers = async () => {
    try {
      const resUser = await transactionAPI.getUser();
      const UsersData = resUser.data || []; // Asegurarse de que sea un array

      // 1. Actualizar la lista de productos
      setUsers(UsersData);

      // 2. Calcular y actualizar la cantidad inmediatamente
      setCantUsers(UsersData.length);

    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    }
  };

  const loadOrders = async () => {
    try {
      const res = await fetch('http://localhost:8000/order');
      const data = await res.json();
      setOrders(data || []);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
      alert("Error al cargar los pedidos");
    } finally {
      // setLoading(false);
    }
  };

  // useEffect(() => {
  //   loadProducts();
  //   loadUsers();
  //   loadOrders();

  // }, []);

  // Datos de ejemplo

  useEffect(() => {
    loadProducts();
    loadUsers();
    //   loadOrders();

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (error) {
        console.error("Error cargando órdenes:", error);
        setOrders([]); // evita que orders.map explote
      }
    };

    fetchOrders();
  }, []);

  const statsData = {
    products: 142,
    orders: 10,
    customers: 1200,
    revenue: 100
  };

  const recentProducts = [
    { id: 1, name: 'Zapatillas Deportivas Pro', category: 'Calzado', price: 89.99, stock: 45, status: 'Activo' },
    { id: 2, name: 'Auriculares Bluetooth', category: 'Electrónica', price: 59.99, stock: 23, status: 'Activo' },
    { id: 3, name: 'Smartwatch Series X', category: 'Wearables', price: 199.99, stock: 12, status: 'Bajo Stock' },
    { id: 4, name: 'Mochila Impermeable', category: 'Accesorios', price: 49.99, stock: 0, status: 'Agotado' },
    { id: 5, name: 'Tablet 10" HD', category: 'Electrónica', price: 299.99, stock: 8, status: 'Bajo Stock' }
  ];

  const recentOrders = [
    { id: '#ORD-7841', customer: 'María González', date: '12 Nov 2023', amount: 142.00, status: 'Completado' },
    { id: '#ORD-7840', customer: 'Carlos Ruiz', date: '12 Nov 2023', amount: 258.50, status: 'Procesando' },
    { id: '#ORD-7839', customer: 'Ana Martínez', date: '11 Nov 2023', amount: 74.25, status: 'Completado' },
    { id: '#ORD-7838', customer: 'David López', date: '11 Nov 2023', amount: 96.00, status: 'Enviado' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };



  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f5f5f5"
      }}>
        <h2 style={{ color: "#d60000" }}>🚫 Acceso Restringido</h2>
        <p style={{ fontSize: "18px" }}>Debes iniciar sesión para entrar al panel administrativo.</p>

        <a
          href="/"
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            backgroundColor: "#0066ff",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px"
          }}
        >
          Ir al Login
        </a>
      </div>
    );
  }

  return (
    <div className="dashboard-ecommerce">

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><SquareChartGantt size={40} color='#f17611ff' /></div>
          <div className="stat-info">
            {/* <h3>{statsData.products}</h3> */}
            <h3>{cantProducts}</h3>
            <p>Productos Registrados</p>
          </div>
          {/* <span className="stat-trend">+12 este mes</span> */}
        </div>

        <div className="stat-card">
          <div className="stat-icon"><ShoppingCart size={40} color='#1145f1ff' /> </div>
          <div className="stat-info">
            <h3>{statsData.orders}</h3>
            <p>Pedidos Totales</p>
          </div>
          {/* <span className="stat-trend">+28 completados</span> */}
        </div>

        <div className="stat-card">
          <div className="stat-icon"> <Users size={40} color='#5221e4ff' /></div>
          <div className="stat-info">
            <h3>{cantUsers}</h3>
            <p>Clientes Registrados</p>
          </div>
          {/* <span className="stat-trend">+120 nuevos</span> */}
        </div>

        <div className="stat-card">
          <div className="stat-icon"><PiggyBank size={40} color="#21e424" /></div>
          <div className="stat-info">
            <h3>{statsData.revenue} Bs</h3>
            <p>Ingresos Totales</p>
          </div>
          {/* <span className="stat-trend positive">+12%</span> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Recent Products */}
        <div className="content-section">
          <div className="section-header">
            <h2>Productos Recientes</h2>
            <button className="btn-text">Ver todos</button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.product_id}>
                    <td>
                      <div className="product-info">
                        <span className="product-name">{product.name}</span>
                        <span className="product-id">ID: {product.product_id}</span>
                      </div>
                    </td>
                    <td>{product.category_data.name}</td>
                    <td className="price">{product.price} Bs</td>
                    <td>
                      <span className={`stock ${product.stock === 0 ? 'out-of-stock' : product.stock < 20 ? 'low-stock' : ''}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <span className={`status status-${product.status.toLowerCase().replace(' ', '-')}`}>
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="content-section">
          <div className="section-header">
            <h2>Pedidos Recientes</h2>
            <button className="btn-text">Ver todos</button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Monto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.order_id}>
                    <td className="order-id">{order.order_id}</td>
                    <td>{order.user_data.first_name}</td>
                    <td>{order.createdAt.split('T')[0]}</td>
                    {/* <td>{order.createdAt}</td> */}
                    <td className="price">{formatCurrency(order.total)}</td>
                    <td>
                      <span className={`status status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Ventas Mensuales</h3>
              <select className="chart-filter">
                <option>Últimos 30 días</option>
                <option>Últimos 90 días</option>
                <option>Este año</option>
              </select>
            </div>
            <div className="chart-placeholder">
              <div className="chart-bars">
                {[65, 80, 75, 90, 85, 95, 70, 85, 90, 75, 80, 95].map((height, index) => (
                  <div
                    key={index}
                    className="chart-bar"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Categorías Más Vendidas</h3>
            </div>
            <div className="chart-placeholder">
              <div className="categories-list">
                <div className="category-item">
                  <span className="category-name">Electrónica</span>
                  <div className="category-bar">
                    <div className="category-fill" style={{ width: '75%' }}></div>
                  </div>
                  <span className="category-percent">35%</span>
                </div>
                <div className="category-item">
                  <span className="category-name">Ropa</span>
                  <div className="category-bar">
                    <div className="category-fill" style={{ width: '60%' }}></div>
                  </div>
                  <span className="category-percent">28%</span>
                </div>
                <div className="category-item">
                  <span className="category-name">Hogar</span>
                  <div className="category-bar">
                    <div className="category-fill" style={{ width: '45%' }}></div>
                  </div>
                  <span className="category-percent">21%</span>
                </div>
                <div className="category-item">
                  <span className="category-name">Deportes</span>
                  <div className="category-bar">
                    <div className="category-fill" style={{ width: '30%' }}></div>
                  </div>
                  <span className="category-percent">16%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;