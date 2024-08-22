import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

/**
 * Form component to add new products.
 */
const AddProductForm = () => {
  // State to store the product details
  const [product, setProduct] = useState({
    productId: '',
    name: '',
    discription: '',
    quantity: '',
    price: '',
  });

  // State to display success/error messages
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!product.productId || !product.name || !product.discription || !product.quantity || !product.price) {
      setShowError(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8090/api/inventory/add', product);
      console.log('Product added successfully:', response.data);
      setShowSuccess(true);

      // Clear form after successful submission
      setProduct({
        productId: '',
        name: '',
        discription: '',
        quantity: '',
        price: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      setShowError(true);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="mb-4 text-center">Add New Product</h2>

          {showSuccess && (
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
              Product added successfully!
            </Alert>
          )}

          {showError && (
            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
              Error adding product. Please try again.
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="productId">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="text"
                name="productId"
                value={product.productId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="discription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="discription"
                value={product.discription}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br></br>

            <Button variant="primary" type="submit" className="w-100">
              Add Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProductForm;
