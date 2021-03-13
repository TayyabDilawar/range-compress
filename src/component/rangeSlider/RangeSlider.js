import React, { Component } from 'react';

import Slider from './slider/Slider'
import Slider1 from './slider/Slider1'
import './rangeSlider.css'

import VerticalSlider from './verticalSlider/VerticalSlider'

class RangeSlider extends Component {
    render() {
        return (
            <div>
                <Slider myRange={1} />
                <Slider1 myRange={1} />
                <VerticalSlider />
            </div>
        );
    }
}

export default RangeSlider;