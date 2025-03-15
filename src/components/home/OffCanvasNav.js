import { useState, useContext } from 'react';
import { Button, Offcanvas, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../UserContext';

export default function OffCanvasNav() {

    const { user } = useContext(UserContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderAuthenticatedLinks = () => (
        <>

            <Nav.Link as={NavLink} to="/order" className="text-dark" onClick={handleClose}> ORDER </Nav.Link>
            <hr className="mx-auto border-0 bg-secondary"style={{ height: '1px', width:'200px'}}/>

            {user.isAdmin === false ? (

                <Nav.Link as={NavLink} to="/cart" className="text-dark" onClick={handleClose}> CART </Nav.Link>

            ) : (
                <>
                    <Nav.Link as={NavLink} to="/addProduct" className="text-dark" onClick={handleClose}> ADD NEW PRODUCT </Nav.Link>
                    <hr className="mx-auto border-0 bg-secondary"style={{ height: '1px', width:'200px'}}/>

                    <Nav.Link as={NavLink} to="/profile" className="text-dark" onClick={handleClose}> PROFILE </Nav.Link>
                </>
            )}
        </>
    );

    
    const renderGuestLinks = () => (
        <>
            <Nav.Link as={NavLink} to="/register" className="text-dark" onClick={handleClose}> REGISTER </Nav.Link>
            <hr className="mx-auto border-0 bg-secondary"style={{ height: '1px', width:'200px'}}/>

            <Nav.Link as={NavLink} to="/login" className="text-dark" onClick={handleClose}> LOGIN </Nav.Link>
        </>
    );

    return (
        <div className="d-md-none">
            <Button variant="outline-dark" onClick={handleShow} className="menu-button custom-menu-button">
                <FontAwesomeIcon icon={faBars} className=" text-center" aria-label="Menu" />
                <span className="ms-2">MENU</span>
            </Button>

            <Offcanvas show={show} onHide={handleClose} className="custom-offcanvas ">

                <Offcanvas.Header closeButton className="d-flex justify-content-end"></Offcanvas.Header>

                <Offcanvas.Body className="custom-offcanvas-body">
                    <div className="text-center">

                        <Nav className="ms-auto flex-column ">
                            <Nav.Link as={NavLink} to="/" className="text-dark" onClick={handleClose}> HOME </Nav.Link>
                            <hr className="mx-auto border-0 bg-secondary" style={{ height: '1px', width:'200px'}}/>

                            <Nav.Link as={NavLink} to="/products" className="text-dark" onClick={handleClose}> PRODUCTS </Nav.Link>
                            <hr className="mx-auto border-0 bg-secondary"style={{ height: '1px', width:'200px'}}/>

                            {user.id !== null ? renderAuthenticatedLinks() : renderGuestLinks()}
                        </Nav>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

