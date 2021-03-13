import React, { Component } from 'react';

import './menu.css';

class Menu extends Component {
    render() {
        return (
                <div className="nav">
                    <label htmlFor="toggle">&#9776;</label>
                    <input type="checkbox" id="toggle" />
                    <div className="menu">
                        <a href="business">Business</a>
                        <a href="services">Services</a>
                        <a href="more">Learn More</a>
                        <a href="free"><span>Free Trial</span></a>
                    </div>
                </div>
        )
    }
}

export default Menu;