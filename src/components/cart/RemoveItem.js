import { useState } from 'react';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

export default function RemoveItem({ productId }) {

const [ id ] = useState(productId);


    const removeFromCart = (event) => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`, {
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
                console.log(data)
                Swal.fire({
                title: "Unsuccessful item removal!",
                icon: "error",
                text: "We are unable to remove this product."
                });
            }
        });
    };

    return (
        <Link onClick={event => removeFromCart(event)} className=" text-danger" style={{ fontSize: 'smaller' }}>Remove</Link>
    );
}