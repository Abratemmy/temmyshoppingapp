import React from 'react'
import axios from '../../axios';
import './AdminDashboard.css';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import DashboardProducts from './DashboardProducts';
import AdminOrderPage from './AdminOrderPage';
import AdminClient from './AdminClient';

function AdminDashboard() {
    return (
        <div>
            <Container>
                <Tab.Container defaultActiveKey="products">
                    <Row>
                        <Col sm={3}>
                            <Nav variant='pills' className='flex-column'>
                                <Nav.Item>
                                    <Nav.Link eventKey="products">Products</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="orders">Orders</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="clients">Clients</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content >
                                <Tab.Pane eventKey="products">
                                    <DashboardProducts />
                                </Tab.Pane>

                            </Tab.Content>
                            <Tab.Content >
                                <Tab.Pane eventKey="orders">
                                    <AdminOrderPage />
                                </Tab.Pane>

                            </Tab.Content>
                            <Tab.Content >
                                <Tab.Pane eventKey="clients">
                                    <AdminClient />
                                </Tab.Pane>

                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </div>
    )
}

export default AdminDashboard