import React, { Component } from 'react';

import './Slider.css'

class Slider extends Component {

    state = {
        value: 0
    }

    handleChange = (event) => {
        // this.setState({value: event.target.value});
    }

    handleClick = () => {
        if (this.state.value < 100) {
            this.setState({ value: this.state.value + 5 })
        } else {
            this.setState({ value: 100 })
        }
    }

    componentDidMount() {
        console.log("this.prosp", this.props.myRange)
        let slider = document.getElementById("myRange")

        slider.addEventListener("click", () => {
            let x = slider.value;
            x = parseInt(x) + 5
            console.log("X", x)
            let color = 'linear-gradient(90deg, rgb(117, 252, 117)' + x + '%, rgb(214, 214, 214)' + x + '%)';
            slider.style.background = color
        })
    }

    changeBackColor = (value) => {
        let slider = document.getElementById("myRange")

        let x = value
        console.log("X", x)
        let color = 'linear-gradient(90deg, rgb(117, 252, 117)' + x + '%, rgb(214, 214, 214)' + x + '%)';
        slider.style.background = color
        
    }

    handleValueZero = () => {
        this.setState({
            value: 0
        })
        this.changeBackColor(0)
    }

    handleValueMinusOne = () => {
        if (this.state.value > 0) {
            this.setState({
                value: this.state.value - 1
            })
            
        } else {
            this.setState({
                value: 0
            })
        }
        this.changeBackColor(this.state.value - 1)
    }

    handleValuePlusOne = () => {
        if (this.state.value < 100) {
            this.setState({
                value: this.state.value + 1
            })
        } else {
            this.setState({
                value: 100
            })
        }
        this.changeBackColor(this.state.value + 1)
    }

    handleValueHundred = () => {
        this.setState({
            value: 100
        })
        this.changeBackColor(100)
    }

    render() {
        return (
            <div className="slideContainerMain">
                <div className="slideContainer">
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={this.state.value}
                        onClick={this.handleClick}
                        onChange={this.handleChange}
                        id="myRange"
                        className="slider"
                    />
                    <div className="sliderPlusMinus">
                        <span className="zeroMinus">
                            <button onClick={this.handleValueZero}>0</button>
                            <button onClick={this.handleValueMinusOne}>-</button>
                        </span>
                        <span className="plusHundred">
                            <button onClick={this.handleValuePlusOne}>+</button>
                            <button onClick={this.handleValueHundred}>100</button>
                        </span>
                    </div>
                    <p>Value: {this.state.value}</p>
                </div>
            </div>
        );
    }
}

export default Slider;