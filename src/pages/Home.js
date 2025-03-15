import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Button } from 'react-bootstrap';
import "../App.css";
import homepageimg from "../images/img_homepage.jpg";
import homepagetag from "../images/homepagetagl.png";

import FeaturedProducts from '../components/home/FeaturedProducts.js';
import About from '../components/home/About.js';
import Footer from '../components/home/Footer.js';

export default function Home() {
    const navigate = useNavigate();

    const btnClick = () => {
        navigate("/products");
    };

    return (
        <>
            <div className="image-container" style={{ position: 'relative' }}>

                <img
                    src={homepageimg}
                    className="img-fluid "
                    cover="true" // or cover={true}
                    alt="Brownies"
                    style={{
                        width: '100%',
                        height: '450px',
                        objectFit: 'cover',
                        objectPosition: 'center center'
                    }}
                />

                <div className="position-absolute text-center w-100 translate-middle-x" style={{ top: '10%', left: '50%' }}>

                    <img
                        src={homepagetag}
                        className="img-fluid"
                        cover="true" // or cover={true}
                        alt="Brownies"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center center'
                        }}
                    />

                    <br />

                    <Button variant="outline-light" onClick={btnClick} className="text-center mt-5 px-4 py-2">Order Now</Button>
                </div>
            </div>
            <div style={{background:"#ddc8b5"}}>
                <FeaturedProducts/>
            </div>
                
            
            <About/>
            <Footer/>
        </>
    );
}


