import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap';
import UserContext from '../UserContext.js';
import RemoveItem from '../components/cart/RemoveItem';
import Checkout from '../components/cart/Checkout.js';
import UpdateQuantity from '../components/cart/UpdateQuantity.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPesoSign } from '@fortawesome/free-solid-svg-icons';


export default function Cart() {
    const { user } = useContext(UserContext);
    const [usersCart, setUsersCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState("");

    function getCart() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/cart`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((result) => result.json())
        .then((data) => {
            setUsersCart(data.items);
            setTotalAmount(data.totalAmount);

        })
        .catch((error) => console.error('Error fetching cart:', error));
    }

    useEffect(() => {
        getCart();
    }, [usersCart]); 

    const fetchCart = () => {
        getCart();
    }

    return (
        <>
            {user.isAdmin ? (
                <Navigate to="/order" />
            ) : (
                <Container>                
                    <Row>
                        <Col>
                            <Table  responsive>                               
                                <tbody>
                                    {Array.isArray(usersCart) && usersCart.length > 0 ? (
                                    usersCart.map((item) => (
                                        <tr key={item._id} >
                                            <td className="text-center align-middle">
                                                <img 
                                                src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${item.productImage}`} 
                                                alt={item.productName} 
                                                style={{ maxWidth: '100px', maxHeight: '100px' }} 
                                                />
                                            </td>
                                            <td className="text-center align-middle">
                                                <div>
                                                    {item.productName}
                                                </div>
                                                <div>
                                                    <span className ="d-none d-md-block">
                                                        <RemoveItem productId={item.productId} />
                                                    </span>
                                                    <span  className ="d-md-none">
                                                        <UpdateQuantity
                                                        fetchCart={fetchCart} 
                                                        itemQuantity={item.quantity} 
                                                        productId={item.productId}
                                                        />
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="d-none d-md-table-cell text-center align-middle">
                                                <UpdateQuantity 
                                                fetchCart={fetchCart} 
                                                itemQuantity={item.quantity}
                                                productId={item.productId}
                                                />
                                            </td>

                                            <td className="text-center align-middle">{item.subTotal}</td>                                            
                                        </tr>
                                    ))
                                ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">No items in the cart</td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="4" 
                                        className="text-end align-middle"  
                                        style={{ fontWeight: 'bold' }}>Total Amount: <FontAwesomeIcon 
                                        icon={faPesoSign} className="ms-3 me-1" 
                                        />
                                            {totalAmount}
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Checkout disabled={!usersCart || usersCart.length === 0} />
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}
