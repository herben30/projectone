import { Col, Row, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPesoSign, faCheckCircle, faTruck, faClock } from '@fortawesome/free-solid-svg-icons';
export default function OrderList({ orderItems, orderTotal, orderStatus }) {

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

    return (
        <>
            <Container className="text-center">
                {orderItems.map((item, index) => (
                    <Row key={index} className="mb-4 d-flex align-items-center justify-content-center">
                        <Col xs={3} className="text-center">
                            <img
                            variant="top"
                            src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${item.productImage}`}
                            alt={item.productName}
                            className="img-fluid"
                            style={{ height: '50px', width: '50px', objectFit: 'cover' }}
                            />
                        </Col>
                        <Col xs={4}>
                            {item.productName}
                        </Col>
                        <Col xs={2} className="text-center">
                            {item.quantity}x
                        </Col>
                        <Col xs={3} className="text-center">
                            P {item.subTotal}
                        </Col>
                    </Row>

                ))}
                    <Row className="d-md-none">
                        <Col>
                            <FontAwesomeIcon icon={getStatusIcon(orderStatus)} className="me-2"/><strong className="fw-bold">{orderStatus}</strong>
                        </Col>
                        <Col>
                            <FontAwesomeIcon icon={faPesoSign} className="me-2"/><strong className="fw-bold">{orderTotal}</strong>
                        </Col>
                    </Row>
            </Container>
        </>
    );
}

