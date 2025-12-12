import { useEffect, useState } from "react";
import { Eye, RefreshCw } from "lucide-react";
import "./pedidos.css";
import { orderAPI } from "../../services/orderAPI";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [allOrderDetails, setAllOrderDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
    const [updatingStatus, setUpdatingStatus] = useState(null);

    // ============================
    // 🔐 GET ORDERS (CON TOKEN)
    // ============================
    const loadOrders = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:8000/order", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (res.status === 401) {
                console.error("❌ No autorizado, token inválido");
                setOrders([]);
                return;
            }

            const data = await res.json();

            // si NO es un array, evita que reviente el .map
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error cargando pedidos:", error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    // ============================
    // 🔐 GET ORDER DETAILS (CON TOKEN)
    // ============================
    const loadAllOrderDetails = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:8000/orderdetails", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (res.status === 401) {
                console.error("❌ No autorizado al cargar detalles");
                setAllOrderDetails([]);
                return;
            }

            const data = await res.json();
            setAllOrderDetails(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error cargando todos los detalles:", error);
            setAllOrderDetails([]);
        }
    };

    useEffect(() => {
        loadOrders();
        loadAllOrderDetails();
    }, []);

    // ============================
    // FILTRA DETALLES DE UN PEDIDO
    // ============================
    const getOrderDetails = (orderId) => {
        return allOrderDetails.filter(detail =>
            detail.order_id === orderId ||
            detail.order_data?.order_id === orderId
        );
    };

    // ============================
    // ACTUALIZAR ESTADO DE PEDIDO
    // ============================
    const updateOrderStatus = async (orderId, newStatus) => {
        setUpdatingStatus(orderId);

        try {
            const response = await orderAPI.updateOrderStatus(orderId, newStatus);

            setOrders(prev =>
                prev.map(order =>
                    order.order_id === orderId
                        ? { ...order, status: newStatus }
                        : order
                )
            );

            alert(`Estado actualizado a: ${newStatus}`);
        } catch (error) {
            console.error("Error actualizando:", error);
            alert("Error al actualizar el estado");
            loadOrders();
        } finally {
            setUpdatingStatus(null);
        }
    };

    const openOrderDetails = async (order) => {
        setSelectedOrder(order);
        setDetailModalOpen(true);
        setDetailsLoading(true);

        const details = getOrderDetails(order.order_id);
        setSelectedOrderDetails(details);

        setDetailsLoading(false);
    };

    const closeOrderDetails = () => {
        setDetailModalOpen(false);
        setSelectedOrder(null);
        setSelectedOrderDetails([]);
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "completed": return "status-completed";
            case "pending": return "status-pending";
            case "cancelled": return "status-cancelled";
            default: return "status-default";
        }
    };

    const getStatusText = (status) => {
        const map = {
            pending: "Pendiente",
            completed: "Completado",
            cancelled: "Cancelado",
        };
        return map[status] || status;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "No disponible";
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatCurrency = (amount) => parseFloat(amount || 0).toFixed(2);

    const getUserFullName = (user) =>
        user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "Usuario no disponible";

    const calculateSubtotalFromDetails = (details) =>
        details.reduce((total, d) => total + (parseFloat(d.subtotal) || 0), 0);

    // ============================================================
    // 🔥 RENDER PRINCIPAL
    // ============================================================
    return (
        <div className="orders-container">
            <div className="orders-header">
                <h1>Gestión de Pedidos</h1>
                <button
                    className="btn-refresh"
                    onClick={() => { loadOrders(); loadAllOrderDetails(); }}
                    disabled={loading}
                >
                    <RefreshCw size={18} />
                    {loading ? "Cargando..." : "Actualizar"}
                </button>
            </div>

            {loading ? (
                <div className="loading-state">Cargando pedidos...</div>
            ) : (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Cliente</th>
                            <th>Email</th>
                            <th>Total</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!Array.isArray(orders) || orders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="no-orders">No hay pedidos registrados</td>
                            </tr>
                        ) : (
                            orders.map(order => (
                                <tr key={order.order_id}>
                                    <td>#{order.order_id}</td>
                                    <td>{getUserFullName(order.user_data)}</td>
                                    <td>{order.user_data?.email}</td>
                                    <td>{formatCurrency(order.total)} Bs</td>
                                    <td>{formatDate(order.createdAt)}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-details"
                                            onClick={() => openOrderDetails(order)}
                                        >
                                            <Eye size={16} /> Detalles
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}

            {detailModalOpen && selectedOrder && (
                <div className="modal-overlay" onClick={closeOrderDetails}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Detalles del Pedido #{selectedOrder.order_id}</h2>
                        <button onClick={closeOrderDetails}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
