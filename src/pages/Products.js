import UserContext from '../UserContext.js';
import { useEffect, useState, useContext } from 'react';
import AdminView from '../components/products/AdminView.js';
import UserView from '../components/products/UserView.js';

export default function Products() {

	const { user } = useContext(UserContext);
	const [productsData, setProductsData] = useState([]);

	const fetchData = () =>{

		const apiUrl = user.isAdmin
		? 
			`${process.env.REACT_APP_API_BASE_URL}/products/all`
		:
			`${process.env.REACT_APP_API_BASE_URL}/products/active`;

		const headers = user.isAdmin
		? {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		}
		: {};

		fetch(apiUrl, {
			method: "GET",
			headers: headers,
		})
		.then((result) => result.json())
		.then((data) => {
			setProductsData(data);
		});
	}

	useEffect(() => {
		fetchData()
	}, [user.isAdmin]);


	return (
		<>
			{user.isAdmin ? (
				<>
					<h1 className="m-3 ps-3">All Products</h1>
					<AdminView data={productsData}  fetchData = {fetchData}/>
				</>
			) : (
				<>
					<UserView data={productsData} fetchData = {fetchData} />
				</>
			)}
		</>
	);
}