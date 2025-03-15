import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function UpdateQuantity({ itemQuantity, productId, fetchCart }) {
    const [quantity, setQuantity] = useState(itemQuantity);

    function updateQuantity(newQuantity) {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/change-quantities`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: productId,
                newQuantity: newQuantity,
            }),
        })
        .then((result) => {
            if (!result.ok) {
                throw new Error('Failed to update quantity');
            }
            return result.json();
        })
        .then((data) => {
        fetchCart();

        // Check if the new quantity is 0 or less, then delete the item
        if (newQuantity <= 0) {

            return fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(result => result.json())
            .then(data => {

                if (data) {
                    Swal.fire({
                        title: "Cart Update",
                        icon: "success",
                        text: "Successfully Item Removed!"
                    });
                } else {
                    Swal.fire({
                        title: "Archive/Activate Unsuccessful!",
                        icon: "error",
                        text: "This product is already in the desired state."
                    });
                }
            });
        }
        })
        .catch(error => {
            console.error('Error updating quantity:', error);
        });
    }


    const onIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(newQuantity);
    };

    const onDecrease = () => {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        updateQuantity(newQuantity);
    };

    useEffect(() => {    
        setQuantity(itemQuantity);
    }, [itemQuantity]);

    return (
    <div className="">
        <Button className="me-md-3 m-2 " size="sm" variant="outline-dark" onClick={onDecrease}> - </Button>
            {quantity}
        <Button className="ms-md-3 m-2 " size="sm" variant="outline-dark" onClick={onIncrease}> + </Button>
    </div>
    );
}