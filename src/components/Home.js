// // By Juma Samwel

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
            <Container fluid className="container1"
            // Add a hover effect to the container
                style={{ 
                    transition: 'transform 0.3s ease', // Add a smooth transition
                    ':hover': {
                        transform: 'scale(1.05)' // Make it slightly larger on hover
                    }
                }}
            >
                <Row className="align-items-center justify-content-center">
                    <Col md={20}>
                        

                        <p>
                        In logic and semantics, the term statement is variously understood to mean either:

a meaningful declarative sentence that is true or false, or
a proposition. Which is the assertion that is made by (i.e., the meaning of) a true or false declarative sentence.
In the latter case, a statement is distinct from a sentence in that a sentence is only one formulation of a statement, whereas there may be many other formulations expressing the same statement.

By a statement, it is meant "that which one states", not one's stating of it. There are many interpretations of what the term statement means, but generally, it indicates either: a meaningful declarative sentence that is either true or false (bivalence), or: a proposition. A proposition is an assertion that is made by (i.e., the meaning of) a true or false declarative sentence. A proposition is what a statement means, it is the notion or idea that a statement expresses, i.e., what it represents. It could be said that "2 + 2 = 4" and "two plus two equals four" are two different statements that are expressing the same proposition in two different ways.[1]

Overview
Philosopher of language Peter Strawson (1919–2006) advocated the use of the term "statement" in sense (b) in preference to proposition. Strawson used the term "statement" to make the point that two declarative sentences can make the same statement if they say the same thing in different ways. Thus, in the usage advocated by Strawson, "All men are mortal." and "Every man is mortal." are two different sentences that make the same statement.


                            
                        </p>

                        
                    </Col>
                </Row>
            </Container>

            {/* <Container className="text-center  bg-white h-75 w-50"> */}
            <Container className="container"
            // Add a hover effect to the container
                style={{ 
                    transition: 'transform 0.3s ease', // Add a smooth transition
                    ':hover': {
                        transform: 'scale(1.05)' // Make it slightly larger on hover
                    }
                }}
            >
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

            {/* <Container className="text-center  bg-white h-75 w-50"> */}
            <Container className="container1"
            // Add a hover effect to the container
                style={{ 
                    transition: 'transform 0.3s ease', // Add a smooth transition
                    ':hover': {
                        transform: 'scale(1.05)' // Make it slightly larger on hover
                    }
                }}
            >
                <Row className="align-items-center justify-content-center">
                    <Col md={20}>
                   
    
                            <p>
                            In logic and semantics, the term statement is variously understood to mean either:
    
    a meaningful declarative sentence that is true or false, or
    a proposition. Which is the assertion that is made by (i.e., the meaning of) a true or false declarative sentence.
    In the latter case, a statement is distinct from a sentence in that a sentence is only one formulation of a statement, whereas there may be many other formulations expressing the same statement.
    
    By a statement, it is meant "that which one states", not one's stating of it. There are many interpretations of what the term statement means, but generally, it indicates either: a meaningful declarative sentence that is either true or false (bivalence), or: a proposition. A proposition is an assertion that is made by (i.e., the meaning of) a true or false declarative sentence. A proposition is what a statement means, it is the notion or idea that a statement expresses, i.e., what it represents. It could be said that "2 + 2 = 4" and "two plus two equals four" are two different statements that are expressing the same proposition in two different ways.[1]
    
    Overview
    Philosopher of language Peter Strawson (1919–2006) advocated the use of the term "statement" in sense (b) in preference to proposition. Strawson used the term "statement" to make the point that two declarative sentences can make the same statement if they say the same thing in different ways. Thus, in the usage advocated by Strawson, "All men are mortal." and "Every man is mortal." are two different sentences that make the same statement.
    
    
                                
                            </p>
    
                    </Col>
                </Row>
            </Container>
        </div>
        
    );
};

export default Home;
