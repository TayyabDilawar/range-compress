import React, { Component } from 'react';

import './verticalSlider.css'

class VerticalSlider extends Component {

    state = {
        value: 0
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div className="container">
                <div className="containerInner">
                    <input type="range" min="0" max="100" value={this.state.value} onChange={this.handleChange} id="slider" />
                </div>
            </div>
        );
    }
}

export default VerticalSlider;