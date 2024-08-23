import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaBell } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:8080/api/inventory');
    const fetchedProducts = response.data;
    setProducts(fetchedProducts);

    const lowInventoryProducts = fetchedProducts.filter(p => p.quantity < 5);
    
    if (lowInventoryProducts.length > 0) {
      setShowAlert(true);
      setAlertMessage(`Warning: Low inventory! The following products have less than 5 units: ${lowInventoryProducts.map(p => p.name).join(', ')}`);

      const audio = new Audio('path_to_beep_sound.mp3'); 
      audio.play().catch(error => console.error('Error playing sound:', error));
    } else {
      setShowAlert(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async () => {
    await axios.put(`http://localhost:8080/api/inventory/update/${editingProduct.id}`, editingProduct);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/api/inventory/delete/${id}`);
    fetchProducts();
  };

  return (
    <div className="products-page">
      <div className="crud-container">
        <h2>Products Management</h2>

        {showAlert && (
          <div className="alert">
            <FaBell /> {alertMessage}
            <button onClick={() => setShowAlert(false)}>Close</button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Minimum Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.discription}
                      onChange={(e) => setEditingProduct({ ...editingProduct, discription: e.target.value })}
                    />
                  ) : (
                    product.discription
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.quantity}
                      onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })}
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.minimumQuantity}
                      onChange={(e) => setEditingProduct({ ...editingProduct, minimumQuantity: e.target.value })}
                    />
                  ) : (
                    product.minimumQuantity
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td className="action-buttons">
                  {editingProduct && editingProduct.id === product.id ? (
                    <>
                      <button onClick={handleSaveProduct}>Save</button>
                      <button onClick={() => setEditingProduct(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditProduct(product)} className="custom-button">
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="custom-button">
                        <FaTrashAlt /> Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
