import React from "react";
import { connect } from 'react-redux'

import { changeImageWindowXY } from "../../redux/actions/ImageWindowAction";

import ImageTopResizer from "../Resizers/ImageTopResizer";
import ImageBottomResizer from "../Resizers/ImageBottomResizer";

import ImageTopLeftResizer from "../Resizers/ImageTopLeftResizer";
import ImageTopRightResizer from "../Resizers/ImageTopRightResizer";

import ImageLeftResizer from "../Resizers/ImageLeftResizer";
import ImageRightResizer from "../Resizers/ImageRightResizer";

import ImageBottomLeftResizer from "../Resizers/ImageBottomLeftResizer";
import ImageBottomRightResizer from "../Resizers/ImageBottomRightResizer";

import "./windowStyle.css";

class ImageWindowComponent extends React.Component {

    state = {
        mouseCursor: "default",
        imageScale: 1
    }

    posX = 0;
    posY = 0;
    isTopResizerClicked = false;

    handleFocus = (e) => {

        if (!this.isTopResizerClicked) {
            this.posX = e.clientX;
            this.posY = e.clientY;

            this.setState({
                mouseCursor: "move"
            })
            document.body.className = 'dragging';

            document.addEventListener("mousemove", this.handleMoveWindow)
            document.addEventListener("mouseup", this.handleReleaseFocus)
        }

    }

    handleMoveWindow = (e) => {

        const { xPosition, yPosition } = this.props.styleState;

        let changeInPosX = this.posX - e.clientX;
        let changeInPosY = this.posY - e.clientY;
        this.posX = e.clientX;
        this.posY = e.clientY;

        let updatedPosY = (yPosition - changeInPosY);
        let updatedPosX = (xPosition - changeInPosX);

        this.props.changeImageWindowXY(updatedPosX, updatedPosY)

        e.preventDefault();
    }

    handleReleaseFocus = (e) => {

        this.setState({
            mouseCursor: "default"
        })
        document.removeEventListener("mousemove", this.handleMoveWindow)
        document.removeEventListener("mouseup", this.handleReleaseFocus)
        document.body.className = '';
    }

    closedImageWindow = () => {
        this.props.closedImageWindow()
    }

    handlePlusValue = () => {
        if (this.state.imageScale < 8) {
            this.setState({imageScale: this.state.imageScale + 1})
        }
    }

    handleMinusValue = () => {
        if (this.state.imageScale > 1) {
            this.setState({imageScale: this.state.imageScale - 1})
        }
    }

    render() {
        const { WindowWidth, windowHeight, xPosition, yPosition, limitFromTopBottom, limitFromLeftRight } = this.props.styleState;
        const resizerProps = {
            WindowWidth,
            windowHeight,
            xPosition,
            yPosition,
            limitFromTopBottom,
            limitFromLeftRight
        }

        let widthImageValue;

        const widthRatio = windowHeight / WindowWidth;
        const widthRatioWithFixed = widthRatio.toFixed(1)

        const dimensionValue = this.props.showImageInWindow[2].Dimensions
        const splitDimension = dimensionValue.split("*");
        const imageRatio = splitDimension[1] / splitDimension[0];
        const imageRatioWithFixed = imageRatio.toFixed(1)

        if (imageRatioWithFixed > widthRatioWithFixed) {
            widthImageValue = Math.round((windowHeight - 25) / imageRatioWithFixed);
        } else {
            widthImageValue = WindowWidth;
        }

        return (
            <div className="imageWindow"
                style={{
                    width: `${WindowWidth}px`,
                    height: `${windowHeight}px`,
                    position: "absolute",
                    left: `${xPosition}px`,
                    top: `${yPosition}px`
                }}
            >
                <ImageTopResizer {...resizerProps} />
                <ImageBottomResizer {...resizerProps} />

                <ImageTopLeftResizer {...resizerProps} />
                <ImageTopRightResizer {...resizerProps} />

                <ImageLeftResizer {...resizerProps} />
                <ImageRightResizer {...resizerProps} />

                <ImageBottomLeftResizer {...resizerProps} />
                <ImageBottomRightResizer {...resizerProps} />

                <div className="control_bar"
                    style={{ cursor: this.state.mouseCursor }}
                    onMouseUp={this.handleReleaseFocus}
                    onMouseDown={this.handleFocus}
                >

                    <img
                        src="https://img.icons8.com/48/000000/minus.png"
                        alt="Minus_Icon"
                        className="plus_minus"
                        onClick={this.handleMinusValue}
                    />
                    <img
                        src="https://img.icons8.com/48/000000/plus.png"
                        alt="Plus_Icon"
                        className="plus_minus"
                        onClick={this.handlePlusValue}
                    />


                    <img
                        src="https://img.icons8.com/color/48/000000/close-window.png"
                        alt="Close_Icon"
                        className="cross"
                        onClick={this.closedImageWindow}
                    />

                </div>

                <div className="image_show"
                    style={{
                        width: "100%",
                        height: `${windowHeight - 25}px`
                    }}
                >
                    <img 
                        src={this.props.showImageInWindowBase ? this.props.showImageInWindowBase : this.props.showImageInWindow[2].showImageBase}
                        // src={this.props.showImageInWindow[2].showImageBase} 
                        alt="Original_Copy_Image" 
                        style={{
                            width: `${widthImageValue}px`,
                            height: "100%",
                            transform: `scale(${this.state.imageScale})`
                        }}
                    />
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeImageWindowXY: (x, y) => dispatch(changeImageWindowXY(x, y))
})

export default connect(null, mapDispatchToProps)(ImageWindowComponent);