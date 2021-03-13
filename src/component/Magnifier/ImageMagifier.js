import React from "react";

import { connect } from 'react-redux';
import { openDB, deleteDB } from 'idb';

import { createImageWindow } from '../../redux/actions/ImageWindowAction'

import ShowImages from './ShowImage/ShowImage';
import ImageWindowComponent from "../createImageWindow/CreateImageWinodw";
import ImageLoading from "./imageLoading/ImageLoading"

import { convertImgToBlob } from "../helpers/blobHelper";

import "./MagnifierStyle.css";

class ImageMagnifier extends React.Component {

    state = {
        lenCreate: false,
        imageWidth: 300,
        imageHeight: 240,
        showAndHideImageBox: false,

        directoryOrNot: "multiImages",
        leftWidth: 100,
        rightWidth: window.innerWidth - 120,
        completedImages: 0,
        totalImages: 0,

        images50Array: [],
        changeImageBaseData: [],
        checkBlobIndex: 0,
        showImageLoader: false,
        nonImages: 0
    }

    componentDidMount() {
        this.getImageDataFromIndexedDB()
        this.props.createImageWindow()
        this.convertBlobImagesCompress()
    }

    handleValue = (inputElement) => {

        let files = inputElement.target.files;

        this.setState({ showImageLoader: true, totalImages: files.length })

        if (files) {
            Array.from(files).forEach(async (file) => {

                const fileName = file.name;
                const splitName = fileName.split(".");
                const fileType = splitName[splitName.length - 1].toLowerCase();

                if (fileType === 'jpeg' || fileType === 'jpg' || fileType === 'png') {

                    let time1 = performance.now();

                    await this.OriganalImage(file, fileType, fileName)

                    let time2 = performance.now()
                    console.log(`Time Taken on 1 image put as a blob: ${(time2 - time1) / 1000} seconds`);

                    this.setState({ completedImages: this.state.completedImages + 1 })

                } else {
                    this.setState({ nonImages: ++this.state.nonImages })
                }
            })
        }
    }

    OriganalImage = (file, fileType, fileOName) => {

        let blob = new Blob([file], { type: `image/${fileType}` })

        this.pubImageDataInDB(blob, fileOName)
    }

    convertBlobImagesCompress = async () => {

        const db1 = await openDB('ImageBlobData', 1)

        if (db1.objectStoreNames.length === 0) {
            console.log("Indexed db Store Not found");
            deleteDB("ImageBlobData")
            db1.close()
            return
        }

        let newData = []
        let newData2 = []

        let dataObject1 = await db1.getAll('store2')
        const checkBlobIndex_UpdatedValue = dataObject1[0].number

        const correctIndexValue = checkBlobIndex_UpdatedValue + this.state.checkBlobIndex

        let dataObject = await db1.get('store2', correctIndexValue)
        let blobData = await db1.get('store1', correctIndexValue)

        if (!dataObject.value) {

            await this.OriganalImageCopy(dataObject, blobData, newData, newData2)

            this.getImageDataFromIndexedDB()

            this.setState({ checkBlobIndex: this.state.checkBlobIndex + 1 })

            if (this.state.checkBlobIndex < dataObject1.length) {

                this.convertBlobImagesCompress()
            } else {
                return
            }

        } else {

            this.setState({ checkBlobIndex: this.state.checkBlobIndex + 1 })

            if (this.state.checkBlobIndex < dataObject1.length) {
                this.convertBlobImagesCompress()
            } else {
                return
            }
        }

        db1.close()
    }

    OriganalImageCopy = async (dataObject, blobData, newData, newData2) => {
        return new Promise(async (resolve) => {

            let imageDataURLReturn = await this.readFileAsync(blobData);

            let object = {
                file: "Orignal",
                Dimensions: "OriginalDimensions",
                size: blobData.size,
                showImageBase: imageDataURLReturn,
                fileName: dataObject.fileName
            }

            let updateData = newData
            updateData[3] = object

            newData = updateData

            let time1 = performance.now();

            this.CompressImages(blobData, 0.6, "Copy1500", 1500, 2, dataObject, newData, newData2)
                .then(({ newData, newData2 }) => {
                    this.CompressImages(blobData, 0.9, "Copy600", 600, 1, dataObject, newData, newData2)
                        .then(({ newData, newData2 }) => {
                            this.CompressImages(blobData, 0.9, "Copy50", 50, 0, dataObject, newData, newData2)
                                .then(({ newData, newData2 }) => {

                                    let time2 = performance.now()
                                    console.log(`Process take time on compress 3 images: ${(time2 - time1) / 1000} seconds`);

                                    this.imagesCompressBlobData_putInDB(newData, newData2, dataObject)

                                    resolve({ newData, newData2 })

                                })
                        })

                })

        })

    }

    CompressImages = async (file, Quality, fileName, defineWidth, idVal, dataObject, newData, newData2) => {
        return new Promise(resolve => {

            const that = this;
            const blobURL = URL.createObjectURL(file);
            const img = new Image();
            img.src = blobURL;

            img.onerror = function () {
                URL.revokeObjectURL(this.src);
                console.log("Cannot load image");
            };

            convertImgToBlob(this.src, defineWidth, img, file.type, Quality)
                .then(async (res) => {

                    let blob1 = res.blob1;
                    let newWidth = defineWidth;
                    let newHeight = res.height
                    const imageURLReturn = await that.readFileAsync(blob1)

                    let object1 = {
                        file: fileName,
                        Dimensions: `${newWidth}*${newHeight}`,
                        size: blob1.size,
                        showImageBase: imageURLReturn,
                        fileName: dataObject.fileName
                    }

                    if (defineWidth === 50) {
                        let updatedData2 = newData2
                        updatedData2[idVal] = object1

                        newData2 = updatedData2
                    }

                    let updatedData = newData
                    updatedData[idVal] = object1

                    newData = updatedData

                    resolve({ newData, newData2 })
                })
        })
    }

    handleShowImage = async (indexValue) => {

        const db2 = await openDB('CompressImagesBlobData', 1);

        let dataObject = await db2.get('store1', indexValue);
        this.setState({ changeImageBaseData: dataObject })

        db2.close()
    }

    handleMouseOverEvent = () => {
        let img, lens, result, cx, cy;
        img = document.getElementById("myimage");
        result = document.getElementById("myresult");
        // /*create lens:*/

        if (!this.state.lenCreate) {
            lens = document.createElement("DIV");
            lens.setAttribute("class", "img-zoom-lens");
            lens.setAttribute("id", "lensId");
            this.setState({ lenCreate: true })
        } else {
            lens = document.getElementById("lensId");
            lens.setAttribute("class", "img-zoom-lens");
        }

        // /*insert lens:*/
        img.parentElement.insertBefore(lens, img);
        // /*calculate the ratio between result DIV and lens:*/
        cx = result.offsetWidth / lens.offsetWidth;
        cy = result.offsetHeight / lens.offsetHeight;
        // /*set background properties for the result DIV:*/

        // result.style.backgroundImage = "url('" + img.src + "')";
        // result.style.backgroundImage = "url('" + this.state.changeImageData[3].showImageBase + "')";
        result.style.backgroundImage = "url('" + this.state.changeImageBaseData[2].showImageBase + "')";

        result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
        // /*execute a function when someone moves the cursor over the image, or the lens:*/
        lens.addEventListener("mousemove", (e) => this.moveLens(e, lens, img, result, cx, cy));
        img.addEventListener("mousemove", (e) => this.moveLens(e, lens, img, result, cx, cy));

        lens.addEventListener("mouseout", () => {
            lens.setAttribute("class", "");
            result.style.backgroundImage = "url()";
        })
    }

    moveLens(e, lens, img, result, cx, cy) {
        let pos, x, y;
        // /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        // /*get the cursor's x and y positions:*/
        pos = this.getCursorPos(e, img);
        // /*calculate the position of the lens:*/
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        // /*prevent the lens from being positioned outside the image:*/
        if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }
        // /*set the position of the lens:*/
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        // /*display what the lens "sees":*/
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    getCursorPos(e, img) {
        let a, x = 0, y = 0;
        e = e || window.event;
        // /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        // /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        // /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }

    pubImageDataInDB = async (putInDB_Blob, fileName) => {
        const db1 = await openDB('ImageBlobData', 1, {
            upgrade(db) {
                db.createObjectStore('store1', {
                    autoIncrement: true
                })
                db.createObjectStore('store2', {
                    keyPath: 'number',
                    autoIncrement: true
                })
            }
        });

        db1.put('store1', putInDB_Blob)
            .then(result => {
                // console.log('successfully put Blob!', result);
            })
            .catch(err => {
                console.error('error: ', err);

            })
        db1.put('store2', { value: false, fileName })
            .then(result => {
                // console.log('success!', result);
            })
            .catch(err => {
                console.error('error: ', err);

            })

        db1.close()
    }

    imagesCompressBlobData_putInDB = async (putCompressDataInDB_Blob, putCompressDataInDB_Blob2, dataObject) => {

        let time1 = performance.now();

        const db1 = await openDB('CompressImagesBlobData', 1, {
            upgrade(db) {
                db.createObjectStore('store1', {
                    keyPath: 'number',
                    autoIncrement: true
                })
                db.createObjectStore('store2', {
                    keyPath: 'number',
                    autoIncrement: true
                })
            }
        });

        db1.put('store1', putCompressDataInDB_Blob)
            .then(result => {
                console.log('successfully put Compress Images 3 Blob!', result);
            })
            .catch(err => {
                console.error('error: ', err);
            })

        db1.put('store2', putCompressDataInDB_Blob2)
            .then(result => {
                console.log('successfully put Compress Image 1 Blob!', result);
            })
            .catch(err => {
                console.error('error: ', err);
            })

        db1.close()

        let time2 = performance.now()
        console.log(`Process take time put 3 compress images on db: ${(time2 - time1) / 1000} seconds`);

        const db2 = await openDB('ImageBlobData', 1)
        db2.put('store2', { ...dataObject, value: true })

        db2.close()
    }

    getImageDataFromIndexedDB = async () => {

        const db2 = await openDB('CompressImagesBlobData', 1);

        if (db2.objectStoreNames.length === 0) {
            console.log("Indexed db Store Not found");
            deleteDB("CompressImagesBlobData")
            db2.close()
            return
        }

        db2.getAll('store2').then((data) => {
            this.setState({
                images50Array: data
            })
        });
        db2.getAll('store1').then((data1) => {
            this.setState({
                changeImageBaseData: data1[0],
            })
        });

        db2.close()
    }

    handleClickOnImage = () => {
        this.setState({ showAndHideImageBox: true })
    }

    handleChangeDirectoryValue = (e) => {
        this.setState({ directoryOrNot: e.target.value })
    }

    handleFalseImageLoader = () => {
        this.setState({ showImageLoader: false, completedImages: 0, nonImages: 0 });
        this.convertBlobImagesCompress()
        // this.getImageDataFromIndexedDB()
    }

    closeImageWindow = () => {
        this.setState({ showAndHideImageBox: false })
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

    resizerMouseDown = (e) => {
        document.addEventListener("mousemove", this.resizerMouseMove);
        document.addEventListener("mouseup", this.resizerMouseUp);
    }

    resizerMouseMove = (e) => {
        const newXPosition = e.pageX;

        const change_in_position = newXPosition - this.state.leftWidth;
        const newImageWidth = this.state.leftWidth + change_in_position;

        this.changeLeftRightWidth(newImageWidth)
        e.preventDefault();
    }

    resizerMouseUp = (e) => {

        document.removeEventListener("mousemove", this.resizerMouseMove);
        document.removeEventListener("mouseup", this.resizerMouseUp);
    }

    changeLeftRightWidth = (newWidth) => {
        // Set Min Width
        if (newWidth < 100) {
            this.setState({
                leftWidth: 100,
                rightWidth: window.innerWidth - 120
            })
        } else if (newWidth > 250) {                                 // Set Max Width
            this.setState({
                leftWidth: 250,
                rightWidth: window.innerWidth - 270
            })
        } else {
            this.setState({
                leftWidth: newWidth,
                rightWidth: window.innerWidth - newWidth - 20
            })
        }
    }

    render() {
        const showData = (
            this.state.images50Array.length > 0 && this.state.images50Array.map(data => {
                return <ShowImages
                    dataVal={data}
                    key={data.number}
                    indexVal={data.number}
                    showHideImage={this.handleShowImage}
                />
            })
        )

        let widthImageValue = 300

        if (this.state.images50Array.length > 0) {
            if (this.state.changeImageBaseData.length > 0) {
                const dimensionValue = this.state.changeImageBaseData[1].Dimensions
                const splitDimension = dimensionValue.split("*");
                const imageRatio = splitDimension[1] / splitDimension[0];
                if (imageRatio > 0.8) {
                    widthImageValue = Math.round(240 / imageRatio);
                } else {
                    widthImageValue = 300;
                }
            }
        }

        return (
            <div className="main">
                {
                    this.state.showAndHideImageBox &&
                    <ImageWindowComponent
                        styleState={this.props.imageWindowState}
                        showImageInWindow={this.state.changeImageBaseData}
                        closedImageWindow={this.closeImageWindow}
                    />
                }
                {
                    this.state.showImageLoader &&
                    <ImageLoading
                        completedImages={this.state.completedImages}
                        totalImages={this.state.totalImages}
                        nonImagesValue={this.state.nonImages}
                        imageLoaderHandler={this.handleFalseImageLoader}

                    />
                }
                <div className="showImageMain">
                    <div className="main_left"
                        style={{ width: `${this.state.leftWidth}px` }}
                    >
                        {showData}

                        <div
                            style={{
                                backgroundColor: "transparent",
                                height: "100%",
                                width: "6px",
                                position: "absolute",
                                top: 0,
                                right: 0,
                                cursor: "col-resize",
                                zIndex: 100
                            }}
                            onMouseDown={this.resizerMouseDown}
                        >
                        </div>

                    </div>
                    <div className="main_right"
                        style={{ width: `${this.state.rightWidth}px` }}
                    >
                        <div className="Top">
                            <div className="Top_Left">
                                {this.state.changeImageBaseData?.length > 0 ?
                                    this.state.changeImageBaseData.map((data, index) => {
                                        return <div key={index}> ({index + 1}) {data.size / 1000} Kbs --- {data.Dimensions}</div>
                                    }) : <div></div>
                                }
                                {this.state.changeImageBaseData?.length > 0 && <div>File Name "{this.state.changeImageBaseData[2].fileName}"</div>}

                            </div>
                            <div className="Top_Right">
                                <div>
                                    Directory <input type="radio" value="directory" name="directoryOrNot" checked={this.state.directoryOrNot === "directory"} onChange={this.handleChangeDirectoryValue} />
                                    Multiple Images <input type="radio" value="multiImages" name="directoryOrNot" checked={this.state.directoryOrNot === "multiImages"} onChange={this.handleChangeDirectoryValue} />
                                </div>
                                <div>
                                    {
                                        this.state.directoryOrNot === "directory" ?
                                            <input type="file" accept="image/*" onChange={this.handleValue} multiple webkitdirectory="" directory="" /> :
                                            <input type="file" accept="image/*" onChange={this.handleValue} multiple />
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="Top_Empty_Middle"></div>

                        <div className="Middle">
                            <div className="Middle_Left1"></div>
                            <div className="Middle_Left">
                                <div style={{ width: `${widthImageValue}px`, height: "240px" }} onClick={this.handleClickOnImage}>
                                    {this.state.changeImageBaseData?.length > 0 ?
                                        <img
                                            id="myimage"
                                            src={this.state.changeImageBaseData[1].showImageBase}
                                            width={widthImageValue} height="240"
                                            onMouseOver={this.handleMouseOverEvent} alt="Medium_Image"
                                        /> :
                                        <div></div>
                                    }
                                </div>
                            </div>
                            <div className="Middle_Right">
                                <div id="myresult" className="img-zoom-result"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    imageWindowState: state.imageWindow.ImageWindowData
})

const mapDispatchToProps = (dispatch) => ({
    createImageWindow: () => dispatch(createImageWindow())
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageMagnifier);