import React from "react";

import './Style.css'

class ShowImage extends React.Component {

    render() {
        return (
            <div className="add_Image_Padding">
                <img
                    src={this.props.dataVal[0].showImageBase}
                    className="image_cursor"
                    alt="Small_Image"
                    onMouseOver={() => this.props.showHideImage(this.props.indexVal)}
                />
            </div>
        );
    }
}

export default ShowImage;