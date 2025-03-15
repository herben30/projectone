import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';

const UpdateProfile = ({ fetchProfile, closeProfileCard }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [message, setMessage] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (firstName.length === 0 || lastName === 0 || mobileNo === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [firstName, lastName, mobileNo]);

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve your JWT token from storage
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/users/update-profile`; // Replace with your actual API endpoint

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, mobileNo }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Profile updated successfully!",
          icon: "success"
        });

        fetchProfile();
        closeProfileCard(); // Close the profile card
      } else {
        Swal.fire({
          title: 'Error in updating!',
          icon: "error"
        });
      }

      setFirstName('');
      setLastName('');
      setMobileNo('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('An error occurred while updating the profile.');
    }
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        Update Profile
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobileNo" className="form-label">
                Mobile Number
              </label>
              <input
                type="Number"
                className="form-control"
                id="mobileNo"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>

            {message && <div className="mt-3">{message}</div>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="outline-dark"
            disabled={isDisabled}
            onClick={updateProfile}
          >
            Update Profile
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProfile;
