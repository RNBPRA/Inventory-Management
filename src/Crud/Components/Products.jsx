import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import Alert from '../Alert';


const isAudioSupported = () => {
  return !!(window.AudioContext || window.webkitAudioContext);
};
const playAlertSound = () => {
  if (isAudioSupported()) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'triangle'; 
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); 
    oscillator.connect(audioCtx.destination);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.5); 
  }
};

const apiEndpoint = 'http://localhost:8090/api/inventory';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Fetching products from:', apiEndpoint);
      const response = await axios.get(apiEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log('Response received:', response);
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const lowStock = products.filter(product => product.quantity < 5);
    setLowStockProducts(lowStock);
    if (lowStock.length > 0) {
      setShowAlert(true);
      playAlertSound();
    } else {
      setShowAlert(false);
    }
  }, [products]);

  const handleInputChange = (e, field) => {
    setEditingProduct({
      ...editingProduct,
      [field]: e.target.value,
    });
  };

  const handleSaveProduct = async () => {
    try {
      if (editingProduct && editingProduct.id) {
        await axios.put(`${apiEndpoint}/update/${editingProduct.id}`, editingProduct);
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setError('Failed to save product. Please try again.');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${apiEndpoint}/delete/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product. Please try again.');
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Products</h2>

      {showAlert && (
        <Alert
          message={`Warning: The following products are running low in stock: ${lowStockProducts.map(p => p.name).join(', ')}`}
          onClose={handleCloseAlert}
        />
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editingProduct && editingProduct.id === product.id ? (
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => handleInputChange(e, 'name')}
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
                    onChange={(e) => handleInputChange(e, 'discription')}
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
                    onChange={(e) => handleInputChange(e, 'quantity')}
                  />
                ) : (
                  product.quantity
                )}
              </td>
              <td>
                {editingProduct && editingProduct.id === product.id ? (
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => handleInputChange(e, 'price')}
                  />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {editingProduct && editingProduct.id === product.id ? (
                  <>
                    <Button variant="success" onClick={handleSaveProduct}>
                      Save
                    </Button>{' '}
                    <Button variant="secondary" onClick={() => setEditingProduct(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
    <Button variant="primary" onClick={() => handleEditProduct(product)} className="custom-button">
      Edit
    </Button>
    <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
      Delete
    </Button>
 </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
