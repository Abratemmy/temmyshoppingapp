import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../../services/appApi';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
    const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [paying, setPaying] = useState(false);

    async function handlePay(e) {
        e.preventDefault();
        if (!stripe || !elements || user.cart.count <= 0) return;
        setPaying(true);
        const { client_secret } = await fetch("http://localhost:8000/create-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ",
            },
            body: JSON.stringify({ amount: user.cart.total }),
        }).then((res) => res.json());
        const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });
        setPaying(false);

        if (paymentIntent) {
            createOrder({ userId: user._id, cart: user.cart, address, country }).then((res) => {
                if (!isLoading && !isError) {
                    setAlertMessage(`Payment ${paymentIntent.status}`);
                    setTimeout(() => {
                        navigate("/orders");
                    }, 3000);
                }
            });
        }
    }


    return (
        <div>
            <Col md={7} className='cart-payment-container'>
                <Form onSubmit={handlePay}>
                    <Row>
                        {alertMessage && <Alert>{alertMessage}</Alert>}
                        <Col md={6}>
                            <Form.Group className='mb-3'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" value={user.firstName} disabled />
                            </Form.Group>
                        </Col>
                        <Col md={6} >
                            <Form.Group className='mb-3'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" value={user.lastName} disabled />
                            </Form.Group>
                        </Col>
                        <Col md={12} >
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={user.email} disabled />
                            </Form.Group>
                        </Col>
                        <Col md={12} >
                            <Form.Group className='mb-3'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={12} >
                            <Form.Group className='mb-3'>
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <label htmlFor='card-element'>Card</label>
                    <CardElement id="card-element" />
                    <Button className="mt-3" type="submit" disabled={user.cart.count <= 0 || paying || isSuccess}>{paying ? "Processing" : "Pay Now"}</Button>

                </Form>
            </Col>
        </div>
    )
}

export default CheckoutForm