import React, { Component } from 'react';

import './draggable.css';

class Draggable extends Component {

    state = {
        rect: { x: 0, y: 0 },
        dragOffset: { x: 0, y: 0 }
    }

    startDrag(event) {
        // event.preventDefault();
        let point = this.svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        point = point.matrixTransform(this.svg.getScreenCTM().inverse());
        this.setState({
            dragOffset: {
                x: point.x - this.state.rect.x,
                y: point.y - this.state.rect.y
            }
        });
        console.log("point.x", point.x + this.state.rect.x + this.state.dragOffset.x)
        // console.log("this.state.rect.x", this.state.rect.x)

        const mousemove = event => {
            event.preventDefault();
            point.x = event.clientX;
            point.y = event.clientY;
            let clientXpoint = event.clientX;
            let clientYpoint = event.clientY;
            let windowInnerWidth = window.innerWidth;
            let windowInnerHeight = window.innerHeight;
            let cursor = point.matrixTransform(this.svg.getScreenCTM().inverse());
            this.setState({
                rect: {
                    x: cursor.x - this.state.dragOffset.x,
                    y: cursor.y - this.state.dragOffset.y
                }
            });
            if (this.state.rect.x < 0) {
                if (this.state.rect.y > 0) {
                    this.setState({
                        rect: {
                            x: 0,
                            y: cursor.y - this.state.dragOffset.y
                        }
                    })
                }
                if (this.state.rect.y < 0) {
                    this.setState({
                        rect: {
                            x: 0,
                            y: 0
                        }
                    })
                }
            }
            if (this.state.rect.y < 0) {
                this.setState({
                    rect: {
                        x: cursor.x - this.state.dragOffset.x,
                        y: 0
                    }
                })
            }
        };

        const mouseup = event => {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
        };

        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
    }

    componentDidMount() {
        // console.log("Window width", screen.width)
        // console.log("Avail width", window.)
        console.log("Window height", window.innerHeight)
        console.log("Window width", window.innerWidth)
    }

    render() {
        return (
            <div>
                Position: <br />
                X: {this.state.rect.x}
                <br />
                Y: {this.state.rect.y}
                <div>
                    <svg viewBox="0 0 200 200" ref={svg => (this.svg = svg)}>
                        <rect
                            x={this.state.rect.x}
                            y={this.state.rect.y}
                            width="10"
                            height="5"
                            // ref={e => (this.svgRectElem = e)}
                            onMouseDown={e => this.startDrag(e)}
                            fill={"blue"}
                        />
                    </svg>
                </div>
            </div>
        );
    }
}

export default Draggable;