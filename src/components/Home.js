// // By Juma Samwel

// import React from 'react';
// import { Container, Button, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBullhorn, faFlag, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
// import './Home.css';


// const Home = () => {
//     const navigate = useNavigate();  // React Router hook for navigation

//     const goToFeedback = () => {
//         navigate('/feedback');  // Redirect to feedback form page
//     };

//     return (
//         <div className="home-bg">
//             <Container className="mt-5 text-center text-light" >
//             {/* <div className="moving-text">
//                     <strong>KENYA NI YETU SOTE</strong>
//                 </div> */}
//                 <Row className="align-items-center">
//                     <Col md={6}>
//                         {/* <Image src="/home/juma-samwel-onyango/voice-of-the-people/src/components/images/flag.png" fluid className="flag-img" /> */}
//                     </Col>
//                     <Col md={6}>
//                         <h1 className="mb-4">
//                             <FontAwesomeIcon icon={faFlag} size="2x" className="me-2" /> {/* faFlag added here */}
//                             Karibu to Voice of the People <br />
//                             <span className="subheading">Your Feedback, Our Future</span>
//                         </h1>

//                         <p className="lead">
//                             Kenya’s future is in your hands! Lend your voice and help shape the future of our great nation. 
//                             Through this platform, you can give feedback that will directly impact government services and policies.
//                         </p>

//                         <p>
//                             <FontAwesomeIcon icon={faHandsHelping} size="2x" className="mb-2" /> <br />
//                             Be part of the change. Your voice counts! Let's build a more transparent and accountable government together.
//                         </p>

//                         <Button variant="warning" size="lg" className="cta-button" onClick={goToFeedback}>
//                             <FontAwesomeIcon icon={faBullhorn} /> Toa Maoni Yako (Give Your Feedback)
//                         </Button>
//                     </Col>
//                 </Row>
                
//             </Container>
//         </div>
//     );
// };

// export default Home;

// src/components/Home.js
import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faFlag, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();  // React Router hook for navigation

    const goToFeedback = () => {
        navigate('/feedback');  // Redirect to feedback form page
    };

    return (
        <div className="home-bg">
            {/* <Container className="text-center  bg-white h-75 w-50"> */}
            <Container className="container">
                <Row className="align-items-center justify-content-center">
                    <Col md={8}>
                        <h1 className="mb-4">
                            <FontAwesomeIcon icon={faFlag} size="2x" className="me-2" /> {/* faFlag added here */}
                            Karibu to Voice of the People <br />
                            <span className="subheading">Your Feedback, Our Future</span>
                        </h1>

                        <p className="lead">
                            Kenya’s future is in your hands! Lend your voice and help shape the future of our great nation. 
                            Through this platform, you can give feedback that will directly impact government services and policies.
                        </p>

                        <p>
                            <FontAwesomeIcon icon={faHandsHelping} size="2x" className="mb-2" /> <br />
                            Be part of the change. Your voice counts! Let's build a more transparent and accountable government together.
                        </p>

                        <Button variant="warning" size="lg" className="cta-button" onClick={goToFeedback}>
                            <FontAwesomeIcon icon={faBullhorn} /> Toa Maoni Yako (Give Your Feedback)
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
