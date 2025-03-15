import { useState } from 'react';
import { Container, Row } from "react-bootstrap";
import ProductsCard from './ProductsCard.js';
import SearchProduct from "./SearchProduct.js";

export default function UserView({ data, fetchData }) {

    const [searchResults, setSearchResults] = useState([]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const handleClearSearch = () => {
        // Clear the search results
        setSearchResults([]);
    };

    return (
        <Container className="mt-3">
            <Row>

                <SearchProduct
                onSearchResults={handleSearchResults}
                onClearSearch={handleClearSearch}
                fetchData={fetchData}
                />

                {searchResults.length > 0 ? (
                    <div>
                        <h3 className="mt-3">Search Results:</h3>
                        {searchResults.map((product) => (
                            <ProductsCard productProp={product} key={product._id} fetchData={fetchData} />
                        ))}
                    </div>
                ) : (
                    <>
                        {data.map((product) => (
                            <ProductsCard productProp={product} key={product._id} />
                        ))}
                    </>
                )}
            </Row>
        </Container>
    );
}
