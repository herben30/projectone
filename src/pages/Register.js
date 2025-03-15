import { Button, Form, Container } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate, Link  } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext.js';
import '../App.css';

export default function Register() {

    const { user } = useContext(UserContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    const [isActive, setIsActive] = useState(true);
    const [successLogin, setSuccessLogin] = useState(false);

    useEffect(() => {
        if (password === confirmPassword) {
            setPasswordMatch(true);
            setIsActive(false);
        } else {
            setPasswordMatch(false);
            setIsActive(true);
        }
    }, [confirmPassword, password]);

    function registerUser(event) {

        event.preventDefault();

        if (!passwordMatch) {
            Swal.fire({
                title: "Password Mismatch",
                icon: 'error',
                text: 'Passwords do not match!',
            });

            return; // Do not proceed with registration
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                mobileNo: mobileNo,
            }),
        })
        .then((result) => result.json())
        .then((data) => {

            if (data.message === 'The email is already registered!') {

                Swal.fire({
                    title: "User's Registration",
                    icon: 'info',
                    text: 'The email is already registered!',
                });

                setSuccessLogin(true);
            } else if (data) {
                Swal.fire({
                    title: "User's Registration",
                    icon: 'success',
                    text: 'Successfully Registered!',
                });
                setSuccessLogin(true);
                setFirstName('');
                setLastName('');
                setEmail('');
                setMobileNo('');
                setPassword('');
                setConfirmPassword('');
            }
        });
    }

    return successLogin ? (
        <Navigate to="/login" />
    ) : user.id !== null ? (
        <Navigate to="/products" />
    ) : (
        <Container className="d-flex justify-content-center">
            <Form className="form" onSubmit={registerUser}>

                <p className="title ">Register</p>

                <div className="flex">
                    <label>

                        <input
                        className="input"
                        type="text"
                        placeholder=""
                        required
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        />

                        <span>Firstname</span>
                    </label>

                    <label>

                        <input
                        className="input"
                        type="text"
                        placeholder=""
                        required
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        />

                        <span>Lastname</span>
                    </label>
                </div>

                <label>

                    <input
                    className="input"
                    type="email"
                    placeholder=""
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="username"
                    />

                    <span>Email</span>
                </label>

                <div className="flex">
                    <label>

                        <input
                        className="input style-none"
                        type="number"
                        placeholder=""
                        required
                        value={mobileNo}
                        onChange={(event) => setMobileNo(event.target.value)}
                        />

                        <span>Mobile Number</span>
                    </label>
                </div>

                <label>

                    <input
                    className="input"
                    type="password"
                    placeholder=""
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="new-password"
                    />

                    <span>Password</span>
                </label>

                <label>

                    <input
                    className="input"
                    type="password"
                    placeholder=""
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    autoComplete="new-password"
                    />

                    <span>Confirm password</span>
                </label>

                {!passwordMatch && (
                    <div className="alert alert-info">Password does not match.</div>
                )}

                <Button variant="outline-dark" type="submit" disabled={isActive}> Submit </Button>

                <p className="signin">
                    Already have an account? <Link className="a" to="/login">Sign In</Link>
                </p>
            </Form>
        </Container>
    );
}
