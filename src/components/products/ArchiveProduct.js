import { Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import { useState } from 'react';

export default function ArchiveProduct({ productId, productStatus, fetchData }) {
	const [ id ] = useState(productId);
	const [ isActive, setIsActive ] = useState(productStatus);

	const archiveToggle = (event) => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/archive/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isActive: false 
			})
		})
		.then(result => result.json())
		.then(data => {
			if (data) {
				setIsActive(false);
				fetchData();
				Swal.fire({
					title: "Product Updated",
					icon: "success",
					text: "Successfully Archived!"
				});			
			} else {
				Swal.fire({
					title: "Archive/Activate Unsuccessful!",
					icon: "error",
					text: "This product is already in the desired state."
				});
			}
		})
	}


	const activateToggle = (event) => {

		event.preventDefault();
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/activate/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isActive: true
			})
		})
		.then(result => result.json())
		.then(data => {
			setIsActive(true);
			fetchData();
			if (data) {
				Swal.fire({
					title: "Product Updated",
					icon: "success",
					text: "Successfully Activated!"
				});			
			} else {
				Swal.fire({
					title: "Unsuccessful Activation!",
					icon: "error",
					text: "Error activating this product. Please try again!"
				});
			}
		})
	}


	return (
		<>
			{isActive ? (
				<Dropdown.Item onClick={event => archiveToggle(event)}>Archive</Dropdown.Item>
			) : (
				<Dropdown.Item onClick={event => activateToggle(event)}>Activate</Dropdown.Item>
			)}
		</>
	);
}
