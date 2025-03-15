import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaLock, FaEnvelope } from 'react-icons/fa'; // Import FontAwesome icons
import '../App.css';
import LoginImg from '../images/login.jpg';
import UserContext from '../UserContext.js';
import Logo from "../images/logo.png"

export default function Login() {

    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsActive(!(email !== '' && password !== ''));
    }, [email, password]);

    function loginUser(event) {

        event.preventDefault();
        setLoading(true);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then((result) => {

            if (!result.ok) {
                throw new Error('Network response was not ok');
            }
            return result.json();
        })
        .then((data) => {

            if (data.message === 'Email does not exist!') {
                Swal.fire({
                    title: 'Authentication Failed',
                    icon: 'error',
                    text: 'You provided the wrong email or password!',
                });
            } else if (data.accessToken) {

                localStorage.setItem('token', data.accessToken);
                retrieveUserDetails(data.accessToken);

                Swal.fire({
                    title: 'Login Successful',
                    icon: 'success',
                    text: 'Welcome to Pastry E-Commerce',
                });
            } else {
                Swal.fire({
                    title: 'Authentication Failed',
                    icon: 'error',
                    text: 'You provided the wrong email or password!',
                });
            }
        })
        .catch((error) => {
            console.error('Error during login:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((result) => {

            if (!result.ok) {
                throw new Error('Network response was not ok');
            }

            return result.json();
        })
        .then((data) => {

            setUser({
                id: data.isAdmin,
                isAdmin: data.isAdmin,
            });
        })
        .catch((error) => {
            console.error('Error retrieving user details:', error);
        });
    };

    return user.id !== null ? (
        <Navigate to="/" />
    ) : (
        <Container>
            <Row className="m-md-3">
                <Col className="col-lg-6 text-center">

                    <Image 
                    src={LoginImg} 
                    alt="Login Image" 
                    fluid 
                    className="p-0 d-none d-lg-block" 
                    />
                </Col>
                <Col className="col-lg-6 col-12">

                    <h1 className="text-center m-3">Welcome</h1>

                    <Col className=" mx-auto bg-white">
                        <Form onSubmit={(event) => loginUser(event)} className="p-2">
                            <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Form.Label><FaEnvelope/> Email address </Form.Label>

                                <Form.Control
                                className="input"
                                type="email"
                                placeholder="Enter email"
                                required
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                autoComplete="username"
                                />

                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">

                                <Form.Label><FaLock /> Password </Form.Label>

                                <Form.Control
                                className="input"
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                                autoComplete="current-password"
                                />
                            </Form.Group>

                            <Button disabled={isActive || loading} variant="outline-dark" type="submit">
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>

                            <p className="signin">
                                Don't have an account yet? <Link className="a" to="/register">Click here</Link> to register.
                            </p>
                        </Form>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
}
