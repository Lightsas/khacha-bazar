import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <div>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">NILPHAMARI RIDERS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link className="navbar" to="/home">Home</Link>
                <Link className="navbar" to="/destination/:riderId">Destination</Link>
                <Link className="btn btn-warning" to="/login" variant="warning">Login</Link>{' '}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
            
        </div>
    );
};

export default Header;