import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faReceipt, faPesoSign, faCheckCircle, faTruck, faClock } from '@fortawesome/free-solid-svg-icons';
import OrderList from './OrderList.js';


export default function UserOrder({ data }) {
    const [order, setOrder] = useState([]);
    const [activeKey, setActiveKey] = useState(null);

    useEffect(() => {
        if (Array.isArray(data)) {
            setOrder(data);
        }
    }, [data]);

    const formatDate = (timestamp) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };

        return new Date(timestamp).toLocaleDateString(undefined, options);
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':                
            return faClock;

            case 'shipped':
            return faTruck;
            
            case 'delivered':
            return faCheckCircle;
            
            default:
            return null;
        }
    };

    const handleAccordionToggle = (index) => {
        setActiveKey(activeKey === index.toString() ? null : index.toString());
    };

    return (
        <Container>  
            <Row>
                <Col>
                    {order.length === 0 ? (
                        <div className="text-center">
                            <p>No orders yet. Add an order!</p>

                            <Button variant="outline-dark">
                            <Link  to="/products">
                                Shop now <FontAwesomeIcon icon={faTruck} />
                            </Link>
                            </Button>
                        </div>
                    ) : (
                    <>
                        {order.map((order, index) => (

                                <Accordion
                                key={order._id}
                                activeKey={activeKey}
                                onSelect={() => handleAccordionToggle(index)}
                                flush
                                style={{ backgroundColor: 'transparent' }}
                                >
                                    <Accordion.Item eventKey={index.toString()}>
                                        <Accordion.Header>

                                            <div className="d-md-none">
                                               <Row>
                                                   {/* Icon and purchasedOn at the top */}
                                                   <Col>
                                                       <FontAwesomeIcon icon={faCalendarAlt} /> {formatDate(order.purchasedOn)}
                                                   </Col>
                                               </Row>
                                               <Row>
                                                   {/* Icon and orderId at the bottom */}
                                                   <Col>
                                                       <FontAwesomeIcon icon={faReceipt} /> {order._id}
                                                   </Col>
                                               </Row>
                                            </div>

                                            <div className="d-none d-md-block col-3 text-center">
                                                <FontAwesomeIcon icon={faCalendarAlt} /> {formatDate(order.purchasedOn)}
                                            </div>
                                            <div className="d-none d-md-block col-5">
                                                <FontAwesomeIcon icon={faReceipt} /> {order._id}
                                            </div>
                                            <div className="d-none d-md-block col-2 text-center">
                                                <FontAwesomeIcon icon={faPesoSign} /> {order.totalAmount}
                                            </div>
                                            <div className="d-none d-md-block col-2 text-center">
                                                <FontAwesomeIcon icon={getStatusIcon(order.status)} /> {order.status}
                                            </div>
                                        </Accordion.Header>

                                    <Accordion.Body>

                                        <OrderList
                                        orderItems={order.items}
                                        orderStatus={order.status}
                                        orderTotal={order.totalAmount}
                                        />
                                    </Accordion.Body>
                                    
                                    </Accordion.Item>
                                </Accordion>                            
                        ))}
                    </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
