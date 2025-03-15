// PreviewProducts.js
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './PreviewProducts.css'; // Import your custom CSS file

export default function PreviewProducts({ data }) {
    const { _id, productName, productImage } = data;

    return (
    <Col className="p-0"  >
        <Link to={`/products/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className="hover-shrink m-md-3 mx-1 border-0" style={{ height: '250px', background:"#ddc8b5"}}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center m-0 p-0">
                    <Card.Img
                        variant="top"
                        src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${productImage}`}
                        alt={productName}
                        className="img-fluid"
                        style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Title className="mt-md-4 text-center"><h6>{productName}</h6></Card.Title>
                </Card.Body>
            </Card>
        </Link>
    </Col>
    );
}
