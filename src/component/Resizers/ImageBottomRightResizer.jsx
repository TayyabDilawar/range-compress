import React from 'react';

import { connect } from 'react-redux';

import { changeImageWindowWidthHeight } from "../../redux/actions/ImageWindowAction"

const ImageBottomRightResizer = (props) => {
    const resizerMouseDown = (e) => {
        document.addEventListener("mousemove", resizerMouseMove);
        document.addEventListener("mouseup", resizerMouseUp);
    }

    const resizerMouseMove = (e) => {
        const newXPosition = e.pageX;
        const newYPosition = e.pageY;

        const change_in_position_y = newYPosition - (props.yPosition + props.windowHeight);
        const newImageHeight = props.windowHeight + change_in_position_y;

        const change_in_position_x = newXPosition - (props.xPosition + props.WindowWidth);
        const newImageWidth = props.WindowWidth + change_in_position_x;

        // props.changeRightMenuWidthHeight(props.id, props.menuId, newGridWidth, newGridHeight, newXPosition, newYPosition );

        props.changeImageWindowWidthHeight(newImageWidth, newImageHeight, props.xPosition, props.yPosition, props.limitFromTopBottom, props.limitFromLeftRight)
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
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "transparent",
                border: "3px solid transparent",
                position: "absolute",
                right: "-5px",
                bottom: "-5px",
                cursor: "nwse-resize",
                zIndex: 101
            }}
            onMouseDown={resizerMouseDown}
        >
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    changeImageWindowWidthHeight: (menuWidth, menuHeight, xPosition, yPosition, limitFromTopBottom, limitFromLeftRight) => dispatch(changeImageWindowWidthHeight(menuWidth, menuHeight, xPosition, yPosition, limitFromTopBottom, limitFromLeftRight))
})

export default connect(null, mapDispatchToProps)(ImageBottomRightResizer);