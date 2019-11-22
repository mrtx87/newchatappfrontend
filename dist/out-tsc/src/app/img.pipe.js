import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let ImgPipe = class ImgPipe {
    transform(chatRoom) {
        return chatRoom && chatRoom.iconUrl ? chatRoom.iconUrl : 'assets/picture.svg';
    }
};
ImgPipe = tslib_1.__decorate([
    Pipe({
        name: 'img',
        pure: false
    })
], ImgPipe);
export { ImgPipe };
//# sourceMappingURL=img.pipe.js.map