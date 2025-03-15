import { useEffect, useState } from 'react';
import { Dropdown, Table, Container, Row, Col } from 'react-bootstrap';
import EditProduct from './EditProduct.js'
import ArchiveProduct from './ArchiveProduct.js'

export default function AdminView({ data, fetchData }) {
	const [product, setProduct] = useState([]);
	useEffect(() => {
		setProduct(data);
	}, [data]);




	return (
		<>
			{Array.isArray(product) && product.map((product) => {

				const availabilityText = product.isActive ? 'Available' : 'Unavailable';
				const textColor = product.isActive ? 'text-success' : 'text-danger';

				return (
					<Container style={{border: '2px solid #000'}} className="my-3 " key={product.productId}>
						<Row className="m-md-2 m-1">
							<Col className="d-flex text-center col-5 p-0 pe-2">
								<img
									src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${product.productImage}`}
									alt={product.productName}
									className="d-block align-middle text-center m-auto img-fluid d-md-none"
								/>
								<img
									src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${product.productImage}`}
									alt={product.productName}
									style={{ height: "200px" }}
									className="text-center m-auto img-fluid d-none d-md-block"
								/>
							</Col>
						<Col className="d-flex flex-column p-0">
							<Row className="justify-content-between align-items-center">

								<h5 className="m-0 col-10">{product.productName}</h5>

								<Dropdown className="text-end col-2">
									<Dropdown.Toggle variant="success" id="dropdown-basic" size="sm"></Dropdown.Toggle>
									<Dropdown.Menu>
										<EditProduct productId = {product._id}  fetchData = {fetchData}/>
										<ArchiveProduct productId = {product._id} productStatus = {product.isActive}  fetchData = {fetchData}/>
									</Dropdown.Menu>
								</Dropdown>
							</Row>

							<h6 className="my-2">P {product.price}</h6>
							<p className="m-0">{product.description}</p>
						</Col>
							<h6 className={`mt-3 p-0 text-end mb-0 ${textColor}`}>{availabilityText}</h6>
						</Row>
					</Container>
				);
			})}
		</>
	);
}
