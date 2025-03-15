import UserContext from '../UserContext.js';
import { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import UserOrder from '../components/orders/UserOrder.js'
import AdminOrder from '../components/orders/AdminOrder.js'


export default function Order() {
	
	const { user } = useContext(UserContext);
	const [ordersData, setOrdersData] = useState([]);

	const fetchData = () =>{
		const apiUrl = (user.isAdmin) ?
		`${process.env.REACT_APP_API_BASE_URL}/users/allorder`
		:
		`${process.env.REACT_APP_API_BASE_URL}/users/order`


		fetch(apiUrl, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
		.then((result) => result.json())
		.then((data) => {
			setOrdersData(data);
		});
	}
	const getAllOrders = () => {
	    fetchData();
	}


	useEffect(() => {
		fetchData()
	}, [user.isAdmin]);

	return (
		<>
			{user.isAdmin ? (
				<Container>
					<h1 className="text-start m-4">Orders</h1>
					<AdminOrder /*data={productsData}*/ data = {ordersData} fetchOrders={getAllOrders}/>
				</Container>
			) : (
				<Container>
					<h1 className="text-start m-4">Orders</h1>
					<UserOrder data={ordersData}/>
				</Container>
			)}
		</>		
	)
}






