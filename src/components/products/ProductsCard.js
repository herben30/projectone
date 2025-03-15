import { Card, Button, Col } from "react-bootstrap";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faMinus, faPlus, faShoppingCart, faPesoSign } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2"
import "../../App.css";


export default function ProductCard({ productProp }) {

    const { _id, productName, description, price, productImage } = productProp;
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };


    const addToCart = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/order`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: _id,
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
                    text: 'To access our app features, kindly sign up for an account.',
                });
                navigate('/register');
            }
        })
        .catch((error) => console.error('Error adding to cart:', error));
    };

    const buyNow = () => {
        addToCart(); 
        navigate('/cart');
    };

    return (
        <Col xs={12} sm={12} md={6} lg={4} xl={3} className="my-4">
            <Card className="h-100 custom-card">

                <Card.Img
                    variant="top"
                    src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${productImage}`}
                    alt={productName}
                    className="card-img-top"
                    style={{ height: '300px', objectFit: 'cover' }}
                />

                <Card.Body>
                    <Card.Title>{productName}</Card.Title>
                    <Card.Text className="card-text-wrapper">{description}</Card.Text>
                    <Card.Text className="bold-text">
                    <FontAwesomeIcon icon={faPesoSign} /> {price}
                    </Card.Text>

                    <div className="d-flex justify-content-between mb-3">
                        <Button as={Link} to={`/products/${_id}`} variant="outline-secondary">
                            View Full Details
                        </Button>
                        <button onClick={decrementQuantity} className="btn btn-outline-secondary">
                            <FontAwesomeIcon icon={faMinus} />
                        </button>

                        <span className="quantity-label mx-2">{quantity}</span>
                        
                        <button onClick={incrementQuantity} className="btn btn-outline-secondary">
                            <FontAwesomeIcon icon={faPlus} />
                        </button> 
                    </div>

                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" onClick={addToCart}>
                            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                            Add to Cart
                        </Button>

                        <Button variant="outline-secondary" onClick={buyNow}>
                            Buy Now
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}
