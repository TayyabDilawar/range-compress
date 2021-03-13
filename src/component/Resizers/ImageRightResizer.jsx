import React from 'react';

import { connect } from 'react-redux';

import { changeImageWindowWidthHeight } from "../../redux/actions/ImageWindowAction"

const ImageRightResizer = (props) => {
    const resizerMouseDown = (e) => {
        document.addEventListener("mousemove", resizerMouseMove);
        document.addEventListener("mouseup", resizerMouseUp);
    }

    const resizerMouseMove = (e) => {
        const newXPosition = e.pageX;

        const change_in_position = newXPosition - (props.xPosition + props.WindowWidth);
        const newImageWidth = props.WindowWidth + change_in_position;

        // props.changeRightMenuWidthHeight(props.id, props.menuId, newGridWidth, newGridHeight, newXPosition, newYPosition );

        // console.log("newImageWidth",newImageWidth,"newImageHeight",newImageHeight,"newXPosition",newXPosition,"newYPosition",newYPosition)
        props.changeImageWindowWidthHeight(newImageWidth, props.windowHeight, props.xPosition, props.yPosition, props.limitFromTopBottom, props.limitFromLeftRight)
        e.preventDefault();
    }

    const resizerMouseUp = (e) => {
        // const newXPosition = e.pageX;

        // const change_in_position = newXPosition - props.xPosition;
        // const newGridWidth = props.menuWidth - change_in_position;

        document.removeEventListener("mousemove", resizerMouseMove);
        document.removeEventListener("mouseup", resizerMouseUp);
    }

    return (
        <div
            style={{
                backgroundColor: "transparent",
                height: props.windowHeight,
                width: "6px",
                position: "absolute",
                top: 0,
                right: "-3px",
                cursor: "col-resize",
                zIndex: 100
            }}
            onMouseDown={resizerMouseDown}
        >
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    changeImageWindowWidthHeight: (menuWidth, menuHeight, xPosition, yPosition, limitFromTopBottom, limitFromLeftRight) => dispatch(changeImageWindowWidthHeight(menuWidth, menuHeight, xPosition, yPosition, limitFromTopBottom, limitFromLeftRight))
})

export default connect(null, mapDispatchToProps)(ImageRightResizer);