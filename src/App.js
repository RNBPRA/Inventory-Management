import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; 
import Home from './Crud/Components/Home';
import Products from './Crud/Components/Products';
import AddProduct from './Crud/Components/AddProduct';
import UpdateProduct from './Crud/Components/UpdateProduct';
import DeleteProduct from './Crud/Components/DeleteProduct';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/*"
            element={
              <div className="d-flex">
                {/* Sidebar */}
                <Navbar bg="dark" variant="dark" className="flex-column vh-100 p-0" style={{ width: '250px' }}>
                  <Navbar.Brand className="mx-auto my-3">
                    <i className="bi bi-kanban-fill"></i> Dashboard
                  </Navbar.Brand>
                  <Nav className="flex-column w-100">
                    <Nav.Item className="w-100">
                      <Nav.Link as={Link} to="/home" className="text-light px-4 py-3">
                        <i className="bi bi-house-door-fill me-2"></i> Home
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="w-100">
                      <Nav.Link as={Link} to="/products" className="text-light px-4 py-3">
                        <i className="bi bi-speedometer2 me-2"></i> Products
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="w-100">
                      <Nav.Link as={Link} to="/add-products" className="text-light px-4 py-3">
                        <i className="bi bi-plus-circle me-2"></i> Add Products
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="w-100">
                      <Nav.Link as={Link} to="/update-products" className="text-light px-4 py-3">
                        <i className="bi bi-pencil me-2"></i> Update Products
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="w-100">
                      <Nav.Link as={Link} to="/delete-products" className="text-light px-4 py-3">
                        <i className="bi bi-trash me-2"></i> Delete Products
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Navbar>

               
                <div className="flex-grow-1 p-4">
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/add-products" element={<AddProduct />} />
                    <Route path="/update-products" element={<UpdateProduct />} />
                    <Route path="/delete-products" element={<DeleteProduct />} />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
