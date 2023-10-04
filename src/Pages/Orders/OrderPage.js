import React, { useState, useEffect } from 'react';
import './OrderPage.css';
import { useSelector } from 'react-redux';
import axios from '../../axios'
import { Badge, Container, Table } from 'react-bootstrap';
import Loading from '../../components/Loading';

function OrderPage() {
    const user = useSelector(state => state.user);
    const products = useSelector(state => state.products);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderToshow, setOrderToshow] = useState([]);
    const [show, setShow] = useState(false)

    useEffect(() => {
        setLoading(true);
        axios.get(`/users/${user._id}/orders`).then(({ data }) => {
            setLoading(false);
            setOrders(data)
        }).catch((e) => {
            setLoading(false);
            console.log(e)
        })
    }, [])

    if (loading) {
        return <Loading />
    }

    if (orders.length === 0) {
        return <h1 className='text-center' pt-5>No orders yet</h1>
    }

    return (
        <div>
            <Container>
                <h1 className='text-center'>Your Orders</h1>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order._id}</td>
                                <td><Badge bg={`${order.status === "processing" ? "warning" : "success"}`} text="white">
                                    {order.status}
                                </Badge>
                                </td>
                                <td>{order.date}</td>
                                <td>${order.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default OrderPage