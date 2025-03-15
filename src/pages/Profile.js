import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import UserContext from '../UserContext';
import AllUser from '../components/profile/AllUser';


import ResetPassword from '../components/profile/ResetPassword';
import UpdateProfile from '../components/profile/UpdateProfile';


import Logout from "./Logout.js"

export default function Profile() {

    const { user } = useContext(UserContext);
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getProfile();
    }, []);

    function getProfile() {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(result => {
            if (!result.ok) {
                throw new Error('Failed to fetch profile');
            }
            return result.json();
        })
        .then(data => {
            setDetails(data);
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
            // Handle error, e.g., redirect to an error page
        })
        .finally(() => {
            setLoading(false);
        });
    }

    const ProfileDetails = ({ details }) => (
        <Col className="Profile-details p-5 pb-3 text-dark">
            <h2 className="text-start mt-3">{capitalizeFirstLetter(details.firstName)} {capitalizeFirstLetter(details.lastName)}</h2>
            <hr />
            <ul className="list-unstyled text-start">
                <li>
                    <FontAwesomeIcon icon={faEnvelope} /> {details.email}
                </li>
                <li>
                    <FontAwesomeIcon icon={faPhone} /> {details.mobileNo}
                </li>
            </ul>
        </Col>
    );

    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return (
        <div className="Profile-container">
            {loading ? (
                <Spinner animation="border" variant="dark" />
            ) : (
                <>
                    {user.id === null ? (
                        navigate('/products')
                    ) : (
                        <Container className="text-center">
                            <Row className="">
                                <Col >
                                    <ProfileDetails details={details} />
                                </Col>
                                
                            </Row>
                            <Row className="">
                                <Col className="col-6">
                                    <ResetPassword />
                                </Col>
                                <Col className="col-6">
                                    <UpdateProfile fetchProfile={getProfile} />
                                </Col>
                            </Row>

                            <hr />
                            <Row className="text-center">
                                {user.isAdmin ? (
                                    <Col>
                                        <AllUser />
                                    </Col>
                                ) : null}
                            </Row>

                            <Row className="text-center mt-4">
                              
                                <Col className="text-center">
                                <Logout />
                              </Col>
                            </Row>

                            
                        </Container>
                    )}
                </>
            )}
        </div>
    );
}