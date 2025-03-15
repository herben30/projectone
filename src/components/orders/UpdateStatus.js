import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { useState, useEffect } from 'react';

export default function UpdateStatus({ orderId, orderStatus, fetchOrders }) {

    const [ id ] = useState(orderId);
    const [status, setStatus] = useState(orderStatus);
    const [btnDisable, setBtnDisable] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateStatus = (event) => {

        event.preventDefault();
        setLoading(true);

        let newStatus;

        if (status === "Pending") {
            newStatus = "Shipped";
        } else if (status === "Shipped") {
            newStatus = "Delivered";
        } else {
            setLoading(false);
            return;
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/orderstatus/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                orderId: id,
                status: newStatus
            })
        })
        .then(result => result.text())
        .then(data => {

            setLoading(false);
            setStatus(data);
            fetchOrders();

            if (data === "Delivered" || data === "Shipped") {
                Swal.fire({
                    title: "Order Updated",
                    icon: "success",
                    text: "Successfully Updating Status!"
                });
            } else {
                Swal.fire({
                    title: "Unsuccessful Update!",
                    icon: "error",
                    text: "Error updating status. Please try again!"
                });
            }
        })
        .catch(error => {
            setLoading(false);
            console.error("Error updating status:", error);
            
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "An error occurred. Please try again later."
            });
        });
    };

    useEffect(() => {
        if (orderStatus === "Pending") {
            setStatus("Pending");
        } else if (orderStatus === "Delivered") {
            setStatus("Delivered");
            setBtnDisable(true);
        }
    }, [orderStatus]);

    return (
        <>
            <Button disabled={btnDisable || loading} variant="success" onClick={event => updateStatus(event)}>
                {loading ? <Spinner animation="border" size="sm" /> : "Update Status"}
            </Button>
        </>
    );
}
