import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'

export default function ProductSearch({ onSearchResults, onClearSearch, fetchData }) {

    const [productName, setProductName] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (productName.trim() === '') {
            setMessage('Please enter a product name before searching.');

            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({ productName }),
            });

            if (response.ok) {
                const data = await response.json();
                onSearchResults(data.products);
                setMessage(data.products.length === 0 ? 'No results found.' : null);
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error searching product:', error);
            setMessage('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleViewAll = () => {
        onClearSearch();
        fetchData();
    };


    return (

    <div className="product-search-container">
        <div className="form-group">
            <div className="input-group">

                <input
                type="text"
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Search Product Name"
                />

                <div className="input-group-append">
                    <Button className="me-2"  variant="outline-secondary" onClick={handleSearch} disabled={loading}>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button   variant="outline-secondary"onClick={handleViewAll} disabled={loading}>
                        View All
                    </Button>
                </div>
            </div>
        </div>
        
        {loading && <div className="alert alert-info">Searching...</div>}
        {message && <div className="alert alert-info">{message}</div>}
    </div>
    );
}
