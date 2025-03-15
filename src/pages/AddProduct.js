import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    const [isActive, setIsActive] = useState(true); 
    
    useEffect(() => {
        if (name !== "" && description !== "" && price !== "" && image !== null) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }, [name, description, price, image]);

    function addProduct(event) {

        event.preventDefault();

        const formData = new FormData();
        formData.append("productName", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("productImage", image);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {

            if(data.status === "success"){
                Swal.fire({
                    title: "Product Successfully Added!",
                    icon: "success",
                    text: 'Add more product!'
                })

                setName('');
                setDescription('');
                setPrice('');

                navigate('/products')

            } else {

                Swal.fire({
                    title: "Unsuccessful Product Creation!",
                    icon: "error",
                    text: 'Please try again!'
                })

            }
        })
        .catch(error => {
            console.error("Error adding product:", error);
        });
    }


    return (
        <Container>
            <Row>
                <h1 className="text-center">Add Product</h1>

                <Col className="col-xl-4 mx-auto mb-3 bg-white ">
                <Form onSubmit={event => addProduct(event)} className="p-2">
                    {/* Form Group for Name */}
                    <Form.Group className="mb-3" controlId="name">

                        <Form.Label>Name</Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            required
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                    </Form.Group>

                    {/* FormGroup for Description */}
                    <Form.Group className="mb-3" controlId="description">

                        <Form.Label>Description</Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Enter Description"
                            required
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />
                    </Form.Group>

                    {/* Form Group for Price */}
                    <Form.Group className="mb-3" controlId="price">

                        <Form.Label>Price</Form.Label>

                        <Form.Control
                            type="number"
                            placeholder="Enter Price"
                            required
                            value={price}
                            onChange={event => setPrice(event.target.value)}
                        />
                    </Form.Group>

                        {/* Form Group for Image */}
                    <Form.Group className="mb-3" controlId="image">

                        <Form.Label>Product Image</Form.Label>
                        
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={event => setImage(event.target.files[0])}
                            required
                        />
                    </Form.Group>

                    <Button disabled={isActive} variant="outline-dark" type="submit">Submit</Button>
                </Form>
                </Col>
            </Row>
        </Container>
    );
}
