import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ChatMessage } from '../Entities/chat.message';
let ChatPanelComponent = class ChatPanelComponent {
    constructor(chatService, values, store, constants) {
        this.chatService = chatService;
        this.values = values;
        this.store = store;
        this.constants = constants;
        this.displayRoomMenu = false;
    }
    get chatInputText() {
        return this.chatService.chatInputText;
    }
    set chatInputText(val) {
        this.chatService.chatInputText = val;
    }
    get localUser() {
        return this.chatService.localUser;
    }
    set localUser(val) {
        this.chatService.localUser = val;
    }
    get displayedChatRoom() {
        return this.chatService.displayedChatRoom;
    }
    set displayedChatRoom(val) {
        this.chatService.displayedChatRoom = val;
    }
    ngOnInit() {
    }
    triggerSendChatMessage() {
        if (this.chatInputText && this.chatInputText.length >= 1) {
            const chatMessage = new ChatMessage();
            chatMessage.body = this.chatInputText;
            chatMessage.fromId = this.localUser.id;
            chatMessage.roomId = this.displayedChatRoom.id;
            this.chatService.sendOutgoingChatMessage(this.displayedChatRoom, chatMessage);
            this.chatInputText = "";
        }
    }
    menuSelect() {
        console.log(this);
        this.displayRoomMenu = !this.displayRoomMenu;
    }
};
ChatPanelComponent = tslib_1.__decorate([
    Component({
        selector: 'app-chat-panel',
        templateUrl: './chat.panel.component.html',
        styleUrls: ['./chat.panel.component.css']
    })
], ChatPanelComponent);
export { ChatPanelComponent };
//# sourceMappingURL=chat.panel.component.js.map