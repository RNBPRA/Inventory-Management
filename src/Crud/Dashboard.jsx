import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Dashboard = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Navbar bg="dark" variant="dark" className="flex-column vh-100 p-0" style={{ width: '250px' }}>
        <Navbar.Brand className="mx-auto my-3">
          <i className="bi bi-kanban-fill"></i> Dashboard
        </Navbar.Brand>
        <Nav className="flex-column w-100">
          <Nav.Item className="w-100">
            <Nav.Link href="/home" className="text-light px-4 py-3">
              <i className="bi bi-house-door-fill me-2"></i> Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="w-100">
            <Nav.Link href="/products" className="text-light px-4 py-3">
              <i className="bi bi-speedometer2 me-2"></i> Products
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="w-100">
            <Nav.Link href="/add-products" className="text-light px-4 py-3">
              <i className="bi bi-plus-circle me-2"></i> Add Products
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="w-100">
            <Nav.Link href="/update-products" className="text-light px-4 py-3">
              <i className="bi bi-pencil me-2"></i> Update Products
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="w-100">
            <Nav.Link href="/delete-products" className="text-light px-4 py-3">
              <i className="bi bi-trash me-2"></i> Delete Products
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>

      {/* Main Content */}
      <Container fluid className="p-4">
        <h1>Welcome to the Dashboard</h1>
        <p>Here is where your main content will be displayed.</p>
      </Container>
    </div>
  );
};

export default Dashboard;