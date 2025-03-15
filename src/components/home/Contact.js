import { Container, Row, Col  } from 'react-bootstrap';
import {FloatingLabel, Form, Button} from 'react-bootstrap';
import './Contact.css'

export default function Contact() {
	

	return  (
        <Container className="mt-5" style={{ color: '#353a3d' }}>
            <h5 className="text-center">Send us a Message</h5>
            <div className="login-box" style={{ borderColor: '#353a3d' }}>
                <Form className="p-2">

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="mb-0">
                            Full Name <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            className="input"
                            type="text"
                            required
                            autoComplete="name"
                            style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '0', borderBottom: '1px solid #353a3d' }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="mb-0">
                            Email address <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            className="input"
                            type="email"
                            required
                            autoComplete="username"
                            style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '0', borderBottom: '1px solid #353a3d' }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicMessage">
                        <Form.Label className="mb-0">
                            Message <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            className="input"
                            as="textarea"
                            rows={3}
                            required
                            style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '0', borderBottom: '1px solid #353a3d' }}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ backgroundColor: '#353a3d', borderColor: '#353a3d' }}>
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>
    );
}
