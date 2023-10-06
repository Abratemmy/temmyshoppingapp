import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from '../../axios';
import Loading from '../../components/Loading';
import { Badge, Button, Modal, Table } from 'react-bootstrap';

function AdminOrderPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const products = useSelector(state => state.products);
    const [orderToShow, setOrderToShow] = useState([])
    const [show, setShow] = useState(false);

    const markShipped = (orderId, ownerId) => {
        axios
            .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
            .then(({ data }) => setOrders(data))
            .catch((e) => console.log(e))
    }
    const showOrder = (productsObj) => {
        let productsToShow = products?.filter((product) => productsObj[product._id])
        productsToShow = productsToShow.map((product) => {
            const productCopy = { ...product };
            productCopy.count = productsObj[product._id];
            delete productCopy.description
            return productCopy
        })
        setShow(true)
        setOrderToShow(productsToShow)
    }
    useEffect(() => {
        setLoading(true);
        axios.get('/orders')
            .then(({ data }) => {
                setLoading(false);
                setOrders(data)
            })
    }, [])

    if (loading) {
        return <Loading />
    }

    if (orders.length === 0) {
        return <h1 className='text-center pt-4'>No orders yet</h1>
    }
    return (
        <div>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Client Name</th>
                        <th>Client Email</th>
                        <th>Items</th>
                        <th>Order Total</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Date</th>


                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order._id}</td>
                            <td>{order.owner?.name}</td>
                            <td>{order.owner.email}</td>
                            <td>{order.count}</td>
                            <td>${order.total}</td>
                            <td>{order.address}</td>
                            <td>
                                {order.status === "processing" ? <Button size='sm' onClick={() => markShipped(order._id, order.owner?._id)}>Mark as shipped</Button> : <Badge bg="success">Shipped </Badge>}
                            </td>
                            <td>{order.date}</td>

                            <td>
                                <span style={{ cursor: 'pointer' }} onClick={() => showOrder(order.products)}>
                                    View Order <i className='fa fa-eye'></i>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Order details</Modal.Title>
                </Modal.Header>
                {orderToShow.map(order => (
                    <div className='order-details__container d-flex justify-content-around py-2' style={{ padding: '30px' }}>
                        <img src={order.pictures[0].url} style={{ maxWidth: 100, height: 100, objectFit: 'cover' }} alt="" />
                        <p>
                            <span>{order.count} x </span> {order.name}
                        </p>
                        <p>Price: ${Number(order.price) * order.count}</p>
                    </div>
                ))}
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AdminOrderPage