import React, { useEffect, useState } from 'react';
import ridersData from '../../data/data.json';
import Riders from '../riders/Riders';
import './Home.css';

const Home = () => {
    const [riders, setRidersData] = useState([])
    useEffect(() => {
        setRidersData(ridersData);
        console.log(ridersData);
    }, [])
    return (
        <div className="home">
            {
                riders.map(rider => <Riders rider={rider}></Riders>)
            }
        </div>
    );
};

export default Home;