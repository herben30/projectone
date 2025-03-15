import React, { useContext, useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Logo from "../images/logo.png";
import "./AppNavbar.css";
import UserContext from '../UserContext';
import OffCanvasNav from './home/OffCanvasNav.js';
import ProfileCard from "./profile/ProfileCard.js";

export default function AppNavbar() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [showProfileCard, setShowProfileCard] = useState(false);

    const handleProfileButtonClick = () => {
        setShowProfileCard(prevState => !prevState);
    };

    const closeProfileCard = () => {
        setShowProfileCard(false);
    };

    const renderAuthenticatedLinks = () => (
        <>
            <Nav.Link as={NavLink} to="/order" className="text-dark d-none d-md-block">ORDERS</Nav.Link>
            {user.isAdmin && (
                <Nav.Link as={NavLink} to="/addProduct" className="text-dark d-none d-md-block">ADD NEW PRODUCT</Nav.Link>
            )}
        </>
    );

    return (
        <div expand="lg" className="navbar">
            <Container>
                <OffCanvasNav />
                <Navbar.Brand as={Link} to="/" className="">
                    <img
                        src={Logo}
                        alt="Logo"
                        height="70"
                        className="d-none d-md-block"
                    />
                </Navbar.Brand>

                <Nav className="d-flex justify-content-center">
                    <Nav.Link as={NavLink} to="/" className="text-dark d-none d-md-block">HOME</Nav.Link>
                    <Nav.Link as={NavLink} to="/products" className="text-dark d-none d-md-block">PRODUCTS</Nav.Link>

                    {user.id !== null && renderAuthenticatedLinks()}

                    {user.id === null ? (
                        <Link to="/login">
                            <Button variant="outline-dark me-sm-1 me-md-3 border-0 bg-transparent">
                                <FontAwesomeIcon icon={faShoppingCart} className="text-center" aria-label="Cart" />
                            </Button>
                        </Link>
                    ) : (
                        <Link to="/cart">
                            <Button variant="outline-dark me-sm-1 me-md-3 border-0 bg-transparent">
                                <FontAwesomeIcon icon={faShoppingCart} className="text-center" aria-label="Cart" />
                            </Button>
                        </Link>
                    )}

                    <div style={{ position: 'relative' }} className="profile-card-container">
                        <Button
                            variant="outline-dark rounded-circle"
                            className="d-none d-md-block"
                            onClick={handleProfileButtonClick}
                            aria-label="User Profile"
                        >
                            <FontAwesomeIcon icon={faUser} className="text-center" />
                        </Button>

                        <Button
                            variant="outline-dark rounded-circle"
                            className="d-block d-md-none"
                            onClick={() => navigate("/profile")}
                            aria-label="User Profile Mobile"
                        >
                            <FontAwesomeIcon icon={faUser} className="text-center" />
                        </Button>

                        {showProfileCard && (
                            <div className="d-none d-md-block" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 100 }}>
                                <ProfileCard closeProfileCard={closeProfileCard} />
                            </div>
                        )}
                    </div>
                </Nav>
            </Container>
        </div>
    );
}
