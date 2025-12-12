import { useEffect, useState } from "react";
import ProductModal from "./ProductModal";
import "./productos.css";
import { transactionAPI } from '../../services/api';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);


    const load = async () => {
        const res = await transactionAPI.getProducts();
        setProducts(res.data);
    };

    useEffect(() => {
        load();
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:4000/api/products/${id}`, { method: "DELETE" });
        load();
    };

    const openCreate = () => {
        setEditProduct(null);
        setModalOpen(true);
    };

    const openEdit = (product) => {
        setEditProduct(product);
        setModalOpen(true);
    };

    return (
        <div className="product-container">
            <div className="product-header">
                <h1>Productos</h1>
                <button className="btn-primary" onClick={openCreate}>+ Agregar</button>
            </div>

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Precio</th>
                        <th>Descripcion</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>
                                <img src={`http://localhost:8000/public/${p.images[0]?.image_path}`}
                                    alt="" className="product-img" />
                            </td>
                            <td>{p.name}</td>
                            <td>{p.category_data.name}</td>
                            <td>{p.price} Bs</td>
                            <td>{p.description}</td>
                            <td>{p.stock}</td>
                            <td>{p.status}</td>
                            <td className="actions">
                                <button className="btn-edit" onClick={() => openEdit(p)}>Editar</button>
                                <button className="btn-delete" onClick={() => handleDelete(p.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalOpen && (
                <ProductModal
                    close={() => setModalOpen(false)}
                    reload={load}
                    product={editProduct}
                />
            )}
        </div>
    );
}
