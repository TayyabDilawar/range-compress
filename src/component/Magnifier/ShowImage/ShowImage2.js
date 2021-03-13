import React from "react";

import './Style.css'

class ShowImage2 extends React.Component {

    handleImageOnNewPage(imgBase) {
        // console.log("Click",imgBase)
        // let w = window.open('about:blank');
        // let image = new Image();
        // image.src = imgBase;
        // w.document.write(image.outerHTML)
    }

    state = {
        imageBase: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEagAKbNUpSaX-v49HhoPMHV9fdlG-6OHx7A&usqp=CAU"
    }

    componentDidMount() {
        this.readFileAsDataURL()
    }

    readFileAsDataURL = async () => {
        const imageURLReturn = await this.readFileAsync(this.props.dataVal[0].fileBlob);
        this.setState({ imageBase: imageURLReturn })
    }

    readFileAsync = (file) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.addEventListener('load', () => {
                resolve(reader.result);
            })

            reader.onerror = reject;

            reader.readAsDataURL(file)

        })
    }

    render() {
        return (
            <div className="add_Image_Padding">
                <img
                    src={this.state.imageBase}
                    className="image_cursor"
                    alt="Small Image"
                    onMouseOver={() => this.props.showHideImage(this.props.indexVal)}
                />
            </div>
        );
    }
}

export default ShowImage2;