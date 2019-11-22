import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let ChatRoomNamePipe = class ChatRoomNamePipe {
    constructor(values) {
        this.values = values;
    }
    transform(chatRoom) {
        return this.values.resolveChatRoomName(chatRoom);
    }
};
ChatRoomNamePipe = tslib_1.__decorate([
    Pipe({
        name: 'chatRoomName',
        pure: false
    })
], ChatRoomNamePipe);
export { ChatRoomNamePipe };
//# sourceMappingURL=chat-room-name.pipe.js.map