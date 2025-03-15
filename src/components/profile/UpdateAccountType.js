
import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { useState, useEffect } from 'react';

export default function UpdateAccountType({ userId, userType, fetchAllUsers }) {
  const [id, setId] = useState(userId);
  const [isUserAdmin, setIsUserAdmin] = useState(userType);
  const [btnDisable, setBtnDisable] = useState(false);
  const [loading, setLoading] = useState(false);

 

  const setAdmin = (event) => {
    event.preventDefault();
    setLoading(true);


    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/admin/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(result => result.text())
      .then(data => {
      	setLoading(false);
        if (data === "You have successfully make user as Admin.") {        	
        	setIsUserAdmin(true);
        	fetchAllUsers();
          Swal.fire({
            title: "User Type",
            icon: "success",
            text: `You have successfully make this user as Admin.`
          });
        } else {
          Swal.fire({
            title: "Unsuccessful Update!",
            icon: "error",
            text: "Error updating user type. Please try again!"
          });
        }
      })
      .catch(error => {
        setLoading(false);
        console.error("Error updating user type:", error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "An error occurred. Please try again later."
        });
      });
  };


  useEffect(() => {
    if (isUserAdmin) {
      setBtnDisable(true);
    } else{;
      setBtnDisable(false);
    }
  }, [isUserAdmin]);


  return (
    <>
      <Button disabled={btnDisable || loading} variant="success" onClick={event => setAdmin(event)}>
        {loading ? <Spinner animation="border" size="sm" /> : "Promote"}
      </Button>
    </>
  );
}
