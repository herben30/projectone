import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'


export default function Checkout({disabled}) {

    function checkout(event) {
        
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/checkout`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((result) => result.json())
        .then((data) => {

            if (data.message === 'Order placed successfully') {
                Swal.fire({
                    title: 'Successfully checkout!',
                    icon: 'success',
                    text: 'Add more product!',
                });
            } 
        })
        .catch((error) => {

            console.error('Error during checkout:', error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'An error occurred. Please try again later.',
            });
        });
    }

    return (
        <Button variant="outline-dark" disabled={disabled} onClick={checkout}><FontAwesomeIcon icon={faShoppingBasket} className="me-2"/>Check Out</Button>
    );
}