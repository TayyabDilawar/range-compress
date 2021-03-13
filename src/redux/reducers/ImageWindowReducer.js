import { NewImageWindow } from "../../component/createImageWindow/NewImageWindow";

import { changeImageWindowWidthHeight } from "../../component/createImageWindow/changeWidthHeight"

const initialState = {
    ImageWindowData: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_IMAGE_WINDOW":
            const { ImageWindowStyle } = NewImageWindow();

            const all_image_window = ImageWindowStyle

            return {
                ...state,
                ImageWindowData: all_image_window
            }
        case "CHANGE_IMAGE_WINDOW_WIDTH_HEIGHT":
            const { newWidth, newHeight, xPosition, yPosition, limitFromTopBottom, limitFromLeftRight } = action
            const all_window_update = changeImageWindowWidthHeight(newWidth, newHeight, xPosition, yPosition, limitFromTopBottom, limitFromLeftRight)
            return {
                ...state,
                ImageWindowData: all_window_update
            }
        case "CHANGE_IMAGE_WINDOW_XY":

            // let positionY = action.y;
            let positionY = state.ImageWindowData.yPosition;
            // let positionX = action.x
            let positionX = state.ImageWindowData.xPosition
            // console.log("positionX", positionX, "positionY", positionY)
            // console.log("state.ImageWindowData", state.ImageWindowData)

            const bottomlimitY = window.innerHeight - state.ImageWindowData.windowHeight - 5;
            const rightCornerPosition = action.x + state.ImageWindowData.WindowWidth;

            if (action.y < 0) {
                // that if for limit y from top
                positionY = 0
            } else if (action.y >= bottomlimitY) {
                // that if for limit y from bottom
                positionY = bottomlimitY
            } else {
                positionY = action.y
            }

            // const rightCornerPosition = action.x + state.ImageWindowData.WindowWidth

            // Limits For X
            if (rightCornerPosition < state.ImageWindowData.WindowWidth) {
                // That if for left side (x-axis)
                positionX = 0
            } else if ((action.x + state.ImageWindowData.WindowWidth) > window.innerWidth - 5) {
                // That if for right side (x-axis)
                positionX = window.innerWidth - state.ImageWindowData.WindowWidth -5
            } else {
                positionX = action.x
            }

            const ImageWindowData = {
                ...state.ImageWindowData,
                xPosition: positionX,
                yPosition: positionY
            }

            return {
                ...state,
                ImageWindowData
            }
        default:
            return state
    }
}