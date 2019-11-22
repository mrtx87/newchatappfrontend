import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let LastestChatMessageBodyPipe = class LastestChatMessageBodyPipe {
    constructor(store, chatService, values) {
        this.store = store;
        this.chatService = chatService;
        this.values = values;
    }
    transform(chatRoom) {
        return this.values.resolveLatestChatMessageBody(chatRoom);
    }
};
LastestChatMessageBodyPipe = tslib_1.__decorate([
    Pipe({
        name: 'lastestChatMessageBody',
        pure: false
    })
], LastestChatMessageBodyPipe);
export { LastestChatMessageBodyPipe };
//# sourceMappingURL=lastest-chat-message-body.pipe.js.map