import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Navigation.css'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/userSlice';

function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
    }


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand href="#home">Temmyshop</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link >Login</Nav.Link>
                            </LinkContainer>
                        )}

                        {user && !user.isAdmin && (
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>
                                    {user?.cart.count > 0 && (
                                        <span className="badge badge-warning" id="cartcount">
                                            {user.cart.count}
                                        </span>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                        )}

                        {user && (
                            <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                                {user.isAdmin && (
                                    <>
                                        <LinkContainer to="/admin">
                                            <NavDropdown.Item >Dashboard</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/login">
                                            <NavDropdown.Item >Create Product</NavDropdown.Item>
                                        </LinkContainer>
                                    </>
                                )}
                                {!user.isAdmin && (
                                    <>
                                        <LinkContainer to="/cart">
                                            <NavDropdown.Item >Cart</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/orders">
                                            <NavDropdown.Item >My orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </>
                                )}

                                <NavDropdown.Divider />
                                <Button variant="danger" onClick={handleLogout} className='logout-btn'>Logout</Button>

                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation