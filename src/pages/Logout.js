import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext.js';
import { useMediaQuery } from 'react-responsive';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';



export default function Logout({ closeProfileCard }) {

    const { unSetUser } = useContext(UserContext);

    const navigate = useNavigate();

    const isSmallDevice = useMediaQuery({ query: '(max-width: 767px)' });

    const clickLogout = () => {

        unSetUser();
        navigate("/login");

        if (!isSmallDevice) {
            closeProfileCard();
        }        

    };
    return (
        <Button variant="outline-secondary" onClick={clickLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-1" /> Logout
        </Button>
    );
}
