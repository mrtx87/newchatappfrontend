import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let ImageService = class ImageService {
    constructor(store, chatService, values, constants) {
        this.store = store;
        this.chatService = chatService;
        this.values = values;
        this.constants = constants;
    }
    onFileChanged(event, key) {
        const file = event.target.files[0];
        // Create a file reader
        let reader = new FileReader();
        let that = this;
        // Set the image once loaded into file reader
        reader.onload = function (e) {
            let res = e.target;
            that.downscaleImage(res.result, 100, "image/jpeg", 0.7, key);
        };
        // Load files into file reader
        reader.readAsDataURL(file);
    }
    downscaleImage(dataUrl, size, imageType, imageArguments, key) {
        let image, canvas, ctx, newDataUrl;
        // Provide default values
        imageType = imageType || "image/jpeg";
        imageArguments = imageArguments || 0.7;
        // Create a temporary image so that we can compute the height of the downscaled image.
        image = new Image();
        image.src = dataUrl;
        let that = this;
        image.onload = function () {
            // Create a temporary canvas to draw the downscaled image on.
            canvas = document.createElement("canvas");
            canvas.width = 100;
            canvas.height = 100;
            // Draw the downscaled image on the canvas and return the new data URL.
            ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, size, size);
            newDataUrl = canvas.toDataURL(imageType, imageArguments);
            that.store.addEntryWithouthIdToTEMPDATA(key, newDataUrl);
        };
    }
};
ImageService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ImageService);
export { ImageService };
//# sourceMappingURL=image.service.js.map