export const NewImageWindow = () => {
    return {
        ImageWindowStyle: {
            WindowWidth: window.innerWidth - 100,
            windowHeight: window.innerHeight - 10,
            xPosition: 50,
            yPosition: 0,
            limitFromTopBottom: 5,
            limitFromLeftRight: 50
        }
    }
}