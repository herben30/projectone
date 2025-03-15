import { Container, Row, Col } from 'react-bootstrap';
import AboutImg from "../../images/About.jpg";
import Contact from "./Contact.js";



export default function About() {
	

	return (

		<Container >
			<Row>
				<Col className="col-12 col-md-5 ">		
			            <Row className="my-5 p-md-4 p-3 rounded" style={{ background:"#353a3d", color: "white" }}>
			                <Col md={12} className="text-start">
			                    <img
			                        src={AboutImg}
			                        className="img-fluid rounded col-12"
			                        alt="Tsuptsup's Oven"
			                        style={{
			                        				width:"150px",
			                        				height:"200px",
			                        				float:"left",
			                        				padding: '0px 20px 15px 0px', 
			                                    }}
			                    />
			                    <h1 className="">Our Story</h1>
			                    <p>
			                            At Tsuptsup's Oven, our passion lies in the art of crafting homemade delicacies that not only tantalize the taste buds but also evoke the comforting essence of home. 
			                        	<br/><br className="d-none d-md-block"/>
			                        	Established in 2021, amidst the turmoil of the global COVID-19 pandemic, we recognized the profound need for moments of solace and joy amid uncertainty. Thus, our vision was born—to provide delectable treats that serve as a source of warmth and delight during challenging times. 
			                        </p>
			                </Col>
			                
			            </Row>
	            </Col>
				<Col className="d-md-flex justify-content-center align-items-center p-0 d-none">
					<hr className="col-md-1" style={{ height: '50%', border:"0", borderRight: '1px solid #000' }} />
				</Col>
	            <Col className="col-12 col-md-6">
	            	<div   className="" >
	            		<Contact/>
	            	</div>
	            </Col>
            </Row>
        </Container>
	);

}


/*<Row>
				<p className="pb-5 px-5 col-12 d-inline-block">
				
				</p> 	
			</Row>



    

        <Col className="col-7">
          
        
        </Col>      
        
			                        	<br/> <br/>
			                        	From the beginning, our renowned top-selling treat, the Chewy Fudgy Brownies, swiftly became a beloved favorite, bringing joy to taste buds and forging treasured memories with every decadent bite.
			                        	<br/> <br/>
			                            Our mission extends far beyond the mere creation of confections; it is a commitment to ensuring that every customer who walks through our doors experiences not just exceptional flavors, but a heartfelt connection to the comforts of home. With careful attention to detail and steadfast dedication, we endeavor to create an unforgettable experience that lingers in memory long after the last bite is savored.



			*/