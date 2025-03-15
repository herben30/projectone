import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import OrderList from './OrderList';
import UpdateStatus from './UpdateStatus';

export default function AdminOrder({ data, fetchOrders }) {

    const [order, setOrder] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (Array.isArray(data)) {
            setOrder(data);
        }
    }, [data]);

    const formatDate = (timestamp) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };

        return new Date(timestamp).toLocaleDateString(undefined, options);
    };

    const openModal = (selectedOrder) => {
        setSelectedOrder(selectedOrder);
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    return (
        <Container className="text-center">
            <Row>
                <Col>
                    {order.length === 0 ? (
                        <div className="text-center">
                            <p>No active orders yet.</p>
                        </div>
                    ) : (
                        <>
                            <Table striped bordered hover responsive>
                                <thead className="text-center">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Purchased Date</th>
                                        <th>Status</th>
                                        <th className="d-none d-lg-block"> Total Amount </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{formatDate(order.purchasedOn)}</td>
                                            <td>{order.status}</td>
                                            <td  className="d-none d-lg-block">{order.totalAmount}</td>
                                            <td><Button variant="outline-dark me-4" onClick={() => openModal(order)}>Full Details</Button> 
                                                <UpdateStatus
                                                orderId={order._id}
                                                orderStatus={order.status}
                                                fetchOrders={fetchOrders}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>


                            {/* Modal for displaying order lists */}
                            <Modal show={selectedOrder !== null} onHide={closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Order Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {selectedOrder && (
                                        <>
                                            <div className="d-flex justify-content-between">
                                                <p><strong>ID:</strong> {selectedOrder._id}</p>
                                                <p><strong>Status:</strong> {selectedOrder.status}</p>
                                            </div>

                                            <OrderList orderItems={selectedOrder.items} orderStatus={selectedOrder.status} />
                                            <p style={{ textAlign: 'right' }}><strong>Total Amount:</strong> P {selectedOrder.totalAmount}</p>
                                        </>
                                    )}
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="outline-dark" onClick={closeModal}> Close </Button>
                                </Modal.Footer>
                            </Modal>            
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
