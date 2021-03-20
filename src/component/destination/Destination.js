import React, { useEffect, useState } from 'react';
import {  Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import data from '../../data/data.json';
import './Destination.css';
import GoogleMap from '../googlemap/GoogleMap';

const Destination = () => {
    const {riderId} = useParams();
    const rider = data.find(pd => pd.id == riderId);
    const [details, setDetails] = useState(false)
    return (
            <div>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Pick From</Form.Label>
                                <Form.Control type="text" placeholder="Place" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Pick TO</Form.Label>
                                <Form.Control type="text" placeholder="Place" /><br/>
                                <Form.Label>Time and Date</Form.Label>
                                <Form.Control type="datetime-local" name="bdaytime"/>
                            </Form.Group>
                            <Button onClick={() => setDetails(!details)} name="details" variant="info">Search</Button><br/>
                        </Form>
                        {details && <div className="sty">
                            <img className="details_imge" src={rider.image} alt=""/>
                            {rider.name} People : {rider.pepole} amout : ${rider.amount}
                        </div>}
                    </Col>
                    <Col className="google">
                        <GoogleMap></GoogleMap>
                    </Col>      
                </Row>
            </Container>
        </div>
    );
};
export default Destination;