import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DisplaychatComponent = class DisplaychatComponent {
    constructor(chatService, constants, store) {
        this.chatService = chatService;
        this.constants = constants;
        this.store = store;
    }
    get displayedChatRoom() {
        return this.chatService.displayedChatRoom;
    }
    set displayedChatRoom(val) {
        this.chatService.displayedChatRoom = val;
    }
    get localUser() {
        return this.chatService.localUser;
    }
    set localUser(val) {
        this.chatService.localUser = val;
    }
    get currentDisplayMessages() {
        if (this.chatService.chatMessagesByRoom && this.displayedChatRoom) {
            return this.chatService.chatMessagesByRoom.get(this.displayedChatRoom.id);
        }
        return [];
    }
    ngOnInit() {
    }
};
DisplaychatComponent = tslib_1.__decorate([
    Component({
        selector: 'app-displaychat',
        templateUrl: './displaychat.component.html',
        styleUrls: ['./displaychat.component.css']
    })
], DisplaychatComponent);
export { DisplaychatComponent };
//# sourceMappingURL=displaychat.component.js.map