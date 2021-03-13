export const changeImageWindowWidthHeight = (windowWidth, windowHeight, xPosition, yPosition, limitFromTopBottom, limitFromLeftRight) => {

    // Set Minimum Height
    if (windowHeight < 100) {
        // console.log("IN 7 windowHeight < 100")
        windowHeight = 100
    }

    // Set Maximum Height
    const windowMaxHeight = window.innerHeight - 5;
    if (windowHeight > windowMaxHeight) {
        // console.log("IN 13 windowHeight > windowMaxHeight")
        windowHeight = windowMaxHeight
    }

    let widthWindow = windowWidth
    // Set Min Width
    if (windowWidth < 100) {
        // console.log("IN 19 windowWidth < 100")
        widthWindow = 100
    }

    // Set Max Width
    if (windowWidth > window.innerWidth) {
        // console.log("IN 25 windowWidth > window.innerWidth")
        widthWindow = window.innerWidth
    }

    // console.log("minWindowHeight",bottomLimitNew)
    // console.log("yPosition",yPosition)

    // Y Upper Position Check
    if (yPosition < 0) {
        // console.log("IN 34 yPosition < 0")
        yPosition = 0
    }

    const minWindowHeight = 100;
    const bottomLimitNew = window.innerHeight - minWindowHeight;

    // Bottom corner Check - When resizing from Top to Bottom
    if (yPosition >= (bottomLimitNew - limitFromTopBottom)) {
    // if (yPosition >= bottomLimitNew) {
        // console.log("IN 43 yPosition >= bottomLimitNew - limitFromTopBottom", bottomLimitNew)
        yPosition = bottomLimitNew - limitFromTopBottom;
        // yPosition = bottomLimitNew;
    }

    const minWindowWidth = 122;

    // const minWindowWidth = window.screen.width * 3 / 100;


    // if (xPosition >= (window.innerWidth - minWindowWidth - limitFromLeftRight)) {
    if (xPosition >= (window.innerWidth - minWindowWidth)) {
        console.log("Right Corner Position exceeded");
        xPosition = window.innerWidth - minWindowWidth
    }

    if ((xPosition + windowWidth) < 0) {
        console.log("left limit crossed")
        xPosition = 0 - windowWidth
        // xPosition = windowWidth - 100
        // xPosition = xPosition  - 30
    }

    return {
        WindowWidth: widthWindow,
        windowHeight: windowHeight,
        xPosition: xPosition,
        yPosition: yPosition,
        limitFromTopBottom,
        limitFromLeftRight
    }

}