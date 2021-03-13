import React from 'react';

import { connect } from 'react-redux';

import { changeImageWindowWidthHeight } from "../../redux/actions/ImageWindowAction"

const ImageBottomResizer = (props) => {
    const resizerMouseDown = (e) => {
        document.addEventListener("mousemove", resizerMouseMove);
        document.addEventListener("mouseup", resizerMouseUp);
    }

    const resizerMouseMove = (e) => {
        const newYPosition = e.pageY;

        const change_in_position = newYPosition - (props.yPosition + props.windowHeight);
        const newImageHeight = props.windowHeight + change_in_position;

        // props.changeRightMenuWidthHeight(props.id, props.menuId, newGridWidth, newGridHeight, newXPosition, newYPosition );

        props.changeImageWindowWidthHeight(props.WindowWidth, newImageHeight, props.xPosition, props.yPosition, props.limitFromTopBottom, props.limitFromLeftRight)
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
                height: "8px",
                width: "100%",
                position: "absolute",
                bottom: "-4px",
                cursor: "ns-resize"
            }}
            onMouseDown={resizerMouseDown}
        >
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    changeImageWindowWidthHeight: (menuWidth, menuHeight, xPosition, yPosition, limitFromTopBottom, limitFromLeftRight) => dispatch(changeImageWindowWidthHeight(menuWidth, menuHeight, xPosition, yPosition, limitFromTopBottom, limitFromLeftRight))
})

export default connect(null, mapDispatchToProps)(ImageBottomResizer);