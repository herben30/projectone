import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from "sweetalert2";

export default function ResetPassword({ closeProfileCard }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setIsDisabled(newPassword.length === 0 || confirmPassword.length === 0);
  }, [confirmPassword, newPassword]);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        setMessage('You have successfully reset your password.');
        handleClose();
        setNewPassword("");
        setConfirmPassword("");
        Swal.fire({
          title: 'Password Reset Successful',
          icon: 'success',
          text: 'You have successfully reset your password.',
        });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        Password Reset
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {message && <div className="alert alert-info">{message}</div>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  variant="outline-dark"disabled={isDisabled} onClick={handleResetPassword}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
