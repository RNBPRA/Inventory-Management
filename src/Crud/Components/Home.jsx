import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaChartLine, FaClock, FaGlobe } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/products');
  };

  return (
    <Container fluid className="p-0">
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="display-3 fw-bold">Inventory Management System</h1>
              <p className="lead fs-4">Empower your business with our cutting-edge inventory solution</p>
              <Button variant="light" size="lg" className="mt-3 text-primary fw-bold" onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="mb-5 g-4">
          <Col md={4}>
            <Card className="h-100 shadow border-0">
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <FaChartLine className="text-primary mb-3" size={48} />
                <Card.Title className="fs-4 fw-bold">Real-time Analytics</Card.Title>
                <Card.Text>
                  Gain valuable insights with our powerful analytics dashboard, enabling data-driven decision making.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow border-0">
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <FaClock className="text-primary mb-3" size={48} />
                <Card.Title className="fs-4 fw-bold">Automated Tracking</Card.Title>
                <Card.Text>
                  Streamline your inventory processes with automated tracking and real-time stock level updates.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow border-0">
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <FaGlobe className="text-primary mb-3" size={48} />
                <Card.Title className="fs-4 fw-bold">Multi-location Support</Card.Title>
                <Card.Text>
                  Manage inventory across multiple locations or warehouses effortlessly from a single platform.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
