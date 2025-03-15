import {Dropdown, Button, Modal, Form} from 'react-bootstrap'
import {useState} from 'react'
import Swal from "sweetalert2"

export default function EditProduct({productId, fetchData}){

	const [id] = useState(productId);
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')

	const [isOpen, setIsOpen] = useState(false)

	const openEdit = (productId) => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
		.then(result => result.json())
		.then(data => {
			setName(data.productName);
			setDescription(data.description);
			setPrice(data.price);
		})
		setIsOpen(true);
	}

	const closeEdit = () => {
		setIsOpen(false);
	}

	const editProduct = (event) => {

	        event.preventDefault();
	        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`,{
	            method: "PUT",
	            headers: {
	                "Content-Type" : "application/json",
	                Authorization: `Bearer ${localStorage.getItem('token')}`
	            },
	            body: JSON.stringify({
	                name: name,
	                description: description,
	                price: price
	            })
	        })
	        .then(result => result.json())
	        .then(data => {
	            //console.log(data)
	            
	            if(data){
	            	Swal.fire({
	            		title: "Product Updated",
	            		icon : "success",
	            		text : "Product Successfully Updated!"
	            	})
	            	fetchData();
	            }else{
	            	Swal.fire({
	            	title : "Product not Updated!",
	            	icon : "error",
	            	text : "Please try again!"
	            	})
	            }
	            setIsOpen(false);
	        })
	    }

	return(
		<>
			<Dropdown.Item onClick={() => openEdit(id)}>Edit</Dropdown.Item>

			<Modal show = {isOpen}>
                <Form onSubmit ={event => editProduct(event)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            required
                            value ={name}
                            onChange={event => setName(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                            type="text" 
                            required
                            value ={description}
                            onChange={event => setDescription(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                            type="number" 
                            required
                            value ={price}
                            onChange={event => setPrice(event.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick = {closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Update</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
		</>
	)
}