export const createImageWindow = () => ({
    type: "CREATE_IMAGE_WINDOW"
})

export const changeImageWindowWidthHeight = (newWidth, newHeight, xPosition, yPosition,limitFromTopBottom,limitFromLeftRight) => ({
    type: "CHANGE_IMAGE_WINDOW_WIDTH_HEIGHT",
    newWidth,
    newHeight,
    xPosition,
    yPosition,
    limitFromTopBottom,
    limitFromLeftRight
})

export const changeImageWindowXY = (x, y) => ({
    type: "CHANGE_IMAGE_WINDOW_XY",
    x,
    y
})