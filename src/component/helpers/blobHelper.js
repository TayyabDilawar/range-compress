export const convertImgToBlob = function (src, originalWidth, img, newFileType, Quality) {
    return new Promise(resolve => {

        img.onload = function () {
            URL.revokeObjectURL(src);

            const orignalImageWidth = img.width;
            const orignalImageHeight = img.height;

            const newHeight = Math.round(originalWidth / orignalImageWidth * orignalImageHeight);


            const canvas = document.createElement("canvas");
            canvas.width = originalWidth;
            canvas.height = newHeight;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, originalWidth, newHeight);
            canvas.toBlob((blob) => {
                resolve({
                    blob1: blob,
                    height: newHeight
                })
            }, `${newFileType}`, Quality)
        }
    })
}