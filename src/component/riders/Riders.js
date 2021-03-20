import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Riders.css'

const Riders = (props) => {
    const {image, name, id} = props.rider;
    return (
        <div className="riede">
            <div className="card">
                <img src={image} className="riede-logo" alt="logo"/>
                <div className="grid-container">
                    <Link to = {"/destination/"+id}><Button>{name}</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default Riders;