import React from "react";

import "./imageLoadingStyle.css";

class ImageLoading extends React.Component {

    handleChange = (event) => {
        // this.setState({value: event.target.value});
    }

    render() {
        const { totalImages, completedImages, nonImagesValue } = this.props;

        if (completedImages) {
            let sliderColor = 100 / totalImages * completedImages;

            let slider = document.getElementById("myRange")

            let x = slider.value;
            let color = 'linear-gradient(90deg, rgb(117, 252, 117)' + sliderColor + '%, rgb(214, 214, 214)' + sliderColor + '%)';
            slider.style.background = color
        }

        if (completedImages === (totalImages - nonImagesValue)) {
            setTimeout(() => {
                this.props.imageLoaderHandler()
            }, 800)
        }


        return (
            <div className="imageLoader"
                style={{
                    width: `${window.innerWidth}px`,
                    height: `${window.innerHeight}px`,
                    position: "absolute"
                }}
            >
                <div className="imageLoaderInner">
                    <h5>Total Files: {totalImages}</h5>
                    <h5>Completed Images: {completedImages}</h5>
                    <input
                        type="range"
                        min="0"
                        max={totalImages}
                        value={completedImages}
                        onChange={this.handleChange}
                        id="myRange"
                    />
                </div>
            </div>
        );
    }
}

export default ImageLoading;