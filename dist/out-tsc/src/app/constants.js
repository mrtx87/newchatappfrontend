import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let Constants = class Constants {
    constructor() {
        this.BASE_URL = "http://localhost:8080/data";
        this.WS_BASE_URL = "/app/send";
        this.DISPLAY_CONTACTS_PANEL = "displaycontacts-panel";
        this.ADD_USER_PANEL = "adduser-panel";
        this.GROUP_CHAT = "group-chat";
        this.GROUP_CHAT_PROFILE = "group-chat-profile";
        this.USER_PROFILE = "user-profile";
        this.NEW_GROUP_IMAGE = "new-group-image";
        this.NEW_LOCAL_USER_IMAGE = "new-local-user-image";
        this.DEFAULT_PANEL = "default-panel";
        this.CHAT_MESSAGE_DATE_TYPE = "DATE";
        this.CHAT_MESSAGE_SYSTEM_TYPE = "System";
        this.TM_TYPE_CHAT_MESSAGE = 'chat-message';
        this.CREATING_ROOM_CONTACTS_ID = "creating-room-contacts";
        this.DISPLAYED_ROOM_ID = "displayed-room-id";
    }
};
Constants = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], Constants);
export { Constants };
//# sourceMappingURL=constants.js.map