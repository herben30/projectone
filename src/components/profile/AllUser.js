import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Modal, Button } from 'react-bootstrap';
import UpdateAccountType from "./UpdateAccountType.js"

export default function AllUser() {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getAllUsers() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/all`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((result) => result.json())
            .then((data) => {
                setUsers(data);
            });
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    const fetchAllUsers = () => {
    	getAllUsers()
    }

    return (
        <Container>
            <Button variant="outline-dark"  onClick={handleShow}>
                View All Users
            </Button>

            <Modal  size="lg" show={show} onHide={handleClose} >

                <Modal.Header closeButton>
                    <Modal.Title>All Users</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Table striped bordered hover responsive>

                        <thead className="text-center">
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Mobile No.</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(users) && users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.mobileNo}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                                    <td><UpdateAccountType userId={user._id} userType={user.isAdmin} fetchAllUsers={fetchAllUsers}/></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
