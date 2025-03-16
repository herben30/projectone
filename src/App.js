import AppNavbar from './components/AppNavbar.js';
import Home from './pages/Home.js';
import Error from './pages/Error.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import Products from './pages/Products.js';
import Expenses from './pages/Expenses.js';
import ProductView from './pages/ProductView.js';
import AddProduct from './pages/AddProduct.js';
import Profile from './pages/Profile.js';
import Cart from './pages/Cart.js';
import Order from './pages/Order.js';

import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { UserProvider } from "./UserContext.js"

import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

    const [user, setUser] = useState({
        id: null,
        isAdmin: null
    });

    const unSetUser = () => {
        setUser({
            id: null,
            isAdmin: null
        });
        localStorage.clear()
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const result = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });

                const data = await result.json();

                if (typeof data._id !== "undefined") {
                    setUser({
                        id: data._id,
                        isAdmin: data.isAdmin
                    });
                } else {
                    setUser({
                        id: null,
                        isAdmin: null
                    });
                }
            } catch (error) {
            console.error(error);
            }
        };

        fetchUserDetails();

    }, []);

    const isSmallDevice = useMediaQuery({ query: '(max-width: 767px)' });

    return (
    <UserProvider value={{ user, setUser, unSetUser }}>
        <Router>
            <AppNavbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {isSmallDevice ? (
                <Route path="/profile" element={<Profile />} />
                ) : null}

                <Route path="/products/:productId" element={<ProductView />} />
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    </UserProvider>
    );
}

export default App;
