// FeaturedProducts.js
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PreviewProducts from './PreviewProducts';

const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

export default function FeaturedProducts() {
	const [previews, setPreviews] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
		.then((result) => result.json())
		.then((data) => {

			const indices = Array.from({ length: data.length }, (_, index) => index);
			const shuffledIndices = shuffleArray(indices).slice(0, 3);

			const featured = shuffledIndices.map((index) => (
				<PreviewProducts key={data[index]._id} data={data[index]} />
			));

			setPreviews(featured);
		});
	}, []);

	return (
	<Container className="text-center py-md-5 p-2"  >
		<Row className="align-items-center text-center mb-3">
		<Col xs="4" className="d-none d-md-block">
			<hr />
		</Col>
		<Col xs="4"  className=" col-12 col-md-4 ">
			<h4 className="m-2 ">FEATURED PRODUCTS</h4>
		</Col>
		<Col xs="4" className="d-none d-md-block">
			<hr />
		</Col>
		</Row>


		<Container className="px-md-5">
			<Row className="justify-content-center">
			{previews}
			</Row>
		</Container>
	</Container>
	);
}
