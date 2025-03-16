
import UserContext from '../UserContext.js';
import { useEffect, useState } from 'react';


import { Container, Card, Button, Row, Col } from 'react-bootstrap';

export default function Expenses() {
	return (
		<Container>
			<Row>
				<Card className="mx-auto border-sm-5" style={{ maxWidth: '600px', width: '100%' }}>
				    <Card.Body> 

				        <Button variant="outline-dark"  className="mb-3">
				            Add Expenses
				        </Button>

				        <Row className="align-items-center">
				            <Col md={6} className="order-2 order-md-1 text-left">
				               {/* <Card.Title className="mb-4">{product.name}</Card.Title>
				                <Card.Text className="mt-4">{product.description}</Card.Text>
				                <Card.Text className="font-weight-bold">PhP {product.price}</Card.Text>

				                <div className="d-flex align-items-center mb-3">
				                
				                    <button onClick={decrementQuantity} className="btn btn-outline-secondary  mx-auto">
				                        <FontAwesomeIcon icon={faMinus} />
				                    </button>

				                        <span className="quantity-label  mx-auto">{quantity}</span>

				                    <button onClick={incrementQuantity} className="btn btn-outline-secondary  mx-auto">
				                        <FontAwesomeIcon icon={faPlus} />
				                    </button>
				                     
				                    <Button variant="outline-secondary" className="ml-3  mx-auto" onClick={addToCart}>
				                        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
				                        Add to Cart
				                    </Button>
				                </div>*/}
				            </Col>

				            <Col md={6} className="order-1 order-md-2 text-right">
				            {/*<img
				            className="overlay-image img-fluid"
				            src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${product.image}`}
				            alt={product.name}
				            style={{ maxHeight: '300px', objectFit: 'contain' }}
				            />*/}
				            </Col>
				        </Row>

				    </Card.Body>
				</Card>




			</Row>
		</Container>
	)

}