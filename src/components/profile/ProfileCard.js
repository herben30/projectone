import React, { useContext, useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';

import UserContext from '../../UserContext';
import { Row, Col, Card, CloseButton  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import ResetPassword from './ResetPassword';
import UpdateProfile from './UpdateProfile';
import AllUser from './AllUser';

import Logout from "../../pages/Logout.js"

export default function ProfileCard({ closeProfileCard }) {

    const { user } = useContext(UserContext);
    const [details, setDetails] = useState({});
    const cardRef = useRef(null);

    useEffect(() => {

        //fetch profile details when the component mounts
        getProfile();

        //add click event listener to the document when the profile card is open
        document.addEventListener('click', handleClickOutside);

        //clean up the event listener when the component unmounts or when the profile card is closed
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []); 

    const handleClickOutside = (e) => {

        // Check if the clicked element is outside the ProfileCard
        if (cardRef.current && !cardRef.current.contains(e.target)) {
            // Check if the clicked element is inside the modal
            const isInsideModal = e.target.closest('.modal');

            //if not inside the modal, close the ProfileCard
            if (!isInsideModal) {
                closeProfileCard();
            }
        }
    };

    const capitalizeFirstLetter = (string) => {
        if (string && typeof string === 'string' && string.length > 0) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return '';
    };

    function getProfile() {
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
        });
    }

    const ProfileDetails = ({ details }) => {
        if (!details || Object.keys(details).length === 0) {
            return null;
        }

        return (
            <Card className="Profile-details text-dark "  style={{ width: '350px' }} ref={cardRef}>
                <Card.Header className="d-flex justify-content-end">
                    <CloseButton
                        aria-label="Hide"
                        variant="white"
                        onClick={() => closeProfileCard()}
                        className=""
                    />
                </Card.Header>



                <Card.Body>
                    <h2 className="m-2 text-center">
                        {capitalizeFirstLetter(details.firstName) || ''} {capitalizeFirstLetter(details.lastName) || ''}
                    </h2>

                    <ul className="list-unstyled m-2 mt-4">
                        <li className="m-2">
                            <FontAwesomeIcon icon={faEnvelope} className="me-2" /> {details.email || ''}
                        </li>
                        <li className="m-2">
                            <FontAwesomeIcon icon={faPhone} className="me-2" /> {details.mobileNo || ''}
                        </li>
                    </ul>

                    <hr />

                    <Row className="text-center">
                        <Col className="col-6">
                            <ResetPassword closeProfileCard={closeProfileCard} />
                        </Col>
                        <Col className="col-6">
                            <UpdateProfile fetchProfile={getProfile} closeProfileCard={closeProfileCard} />
                        </Col>
                    </Row>

                    <hr />

                    <Row className="text-center mb-3">
                        {user.isAdmin ? (
                            <Col>
                                <AllUser />
                            </Col>
                        ) : null}
                    </Row>

                    <Row className="text-center">
                        <Col className="text-center">
                            <Logout closeProfileCard={closeProfileCard} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    };



    return (
        <>
            {user.id === null ? (
                <Navigate to="/register" />
            ) : (
                <ProfileDetails details={details}  />
            )}
        </>
    );
}