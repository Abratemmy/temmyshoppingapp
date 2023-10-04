import React, { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from '@stripe/react-stripe-js'
import './CartPage.css'
import { useSelector } from 'react-redux';
import { Alert, Col, Container, Row, Table } from 'react-bootstrap';
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from '../../services/appApi';
import CheckoutForm from '../../components/Checkout/CheckoutForm';

// login to stripe and copy the publishable key from the developers
const stripePromise = loadStripe("pk_test_51NwxzbLEyzXufpvOShWR397wkZOPoPDinUuOw8qIn2Ufhk0M4Op6KPZUAWw0nChtePZJm19riYK45rQHWFuTKjUE00hV5SibT7")

function CartPage() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);
    const [increaseCartProduct] = useIncreaseCartProductMutation()
    const [decreaseCartProduct] = useDecreaseCartProductMutation()
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
    // payment


    function handleDecrease(product) {
        const quantity = user.cart.count;

        if (quantity <= 1) return alert("Can't proceed");
        decreaseCartProduct(product);
    }
    console.log('Cart', cart)
    return (
        <div>
            <Container style={{ minHeight: '95vh' }} className="cart-container">
                <Row>
                    <Col md={7}>
                        <h1 className='pt-2 h3'>shopping Cart</h1>
                        {cart.length === 0 ? (
                            <Alert variant="info">Shopping cart is empty. Add products to your cart</Alert>
                        ) : <div>
                            {/* payment here */}
                            <Elements stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                        </div>
                        }
                    </Col>
                    <Col md={5}>
                        {cart.length > 0 && (
                            <>
                                <Table responsive="sm" className='cart-table'>
                                    <thead>
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* loop through the card product */}
                                        {cart.map((item) => (
                                            <tr>
                                                <td>&nbsp;</td>
                                                <td>
                                                    <i className='fa fa-times' style={{ marginRight: 10, cursor: 'pointer' }} onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}></i>
                                                    <img src={item.pictures[0].url} style={{ width: 100, height: 100, objectFit: 'cover' }} alt="" />
                                                </td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <span className='quantity-indicator'>
                                                        {!isLoading && <i className='fa fa-minus-circle' onClick={() => handleDecrease({ productId: item._id, price: item.price, userId: user._id })}></i>}
                                                        <span>{user.cart[item._id]}</span>
                                                        <i className='fa fa-plus-circle' onClick={() => increaseCartProduct({ productId: item._id, price: item.price, userId: user._id })}></i>
                                                    </span>
                                                </td>
                                                <td>${item.price * user.cart[item._id]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div>
                                    <h3 className='h4 pt-4'>Total: ${user.cart.total}</h3>
                                </div>
                            </>
                        )}
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default CartPage