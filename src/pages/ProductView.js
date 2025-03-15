// ProductView.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function ProductView() {

    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        image: '',
    });

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
            setProduct({
                name: data.productName,
                description: data.description,
                price: data.price,
                image: data.productImage,
            });
        })
        .catch((error) => console.error('Error fetching product:', error));
    }, [productId]);

    const addToCart = () => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/order`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: productId,
            quantity: quantity,
        }),
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.message === 'Item added to cart successfully') {
                Swal.fire({
                    title: 'Successful Order',
                    icon: 'success',
                    text: 'Item added to cart successfully',
                });
            } else {
                Swal.fire({
                    title: 'Sign-up to Enroll',
                    icon: 'info',
                    text: 'To access enrollment features, kindly sign up for an account.',
                });
                navigate('/register');
            }
        })
        .catch((error) => console.error('Error adding to cart:', error));
    };

    const goBack = () => {
        navigate(-1);
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Card className="mx-auto border-sm-5" style={{ maxWidth: '600px', width: '100%' }}>
                    <Card.Body> 

                        <Button variant="outline-dark" onClick={goBack} className="mb-3">
                            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                            Go Back
                        </Button>

                        <Row className="align-items-center">
                            <Col md={6} className="order-2 order-md-1 text-left">
                                <Card.Title className="mb-4">{product.name}</Card.Title>
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
                                </div>
                            </Col>

                            <Col md={6} className="order-1 order-md-2 text-right">
                            <img
                            className="overlay-image img-fluid"
                            src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${product.image}`}
                            alt={product.name}
                            style={{ maxHeight: '300px', objectFit: 'contain' }}
                            />
                            </Col>
                        </Row>

                    {/* For small devices, stack image on top of text and button */}
                        <Row className="d-none">

                            <Col className="text-center">
                                <img
                                className="overlay-image img-fluid"
                                src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${product.image}`}
                                alt={product.name}
                                style={{ maxHeight: '300px', objectFit: 'contain' }}
                                />
                            </Col>

                            <Col className="text-left">
                                <Card.Title className="mb-4">{product.name}</Card.Title>
                                <Card.Text className="mt-4">{product.description}</Card.Text>
                                <Card.Text className="font-weight-bold">PhP {product.price}</Card.Text> 

                                <div className="d-flex justify-content-between mb-3">

                                    <button onClick={decrementQuantity} className="btn btn-outline-secondary">
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>

                                    <span className="quantity-label mx-2">{quantity}</span>

                                    <button onClick={incrementQuantity} className="btn btn-outline-secondary">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>

                                <Button variant="outline-secondary" className="mt-3" onClick={addToCart}>
                                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                    Add to Cart
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}
