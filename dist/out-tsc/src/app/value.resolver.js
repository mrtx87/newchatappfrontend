import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let ValueResolver = class ValueResolver {
    constructor(constants, store, chatService) {
        this.constants = constants;
        this.store = store;
        this.chatService = chatService;
    }
    get chatMessagesByRoom() {
        return this.store.chatMessagesByRoom;
    }
    set chatMessagesByRoom(val) {
        this.chatMessagesByRoom = val;
    }
    get contacts() {
        return this.store.contacts;
    }
    set contacts(val) {
        this.store.contacts = val;
    }
    get newContactsList() {
        return this.store.newContactsList;
    }
    set newContactsList(val) {
        this.store.newContactsList = val;
    }
    get searchNewContactInputText() {
        return this.store.searchNewContactInputText;
    }
    set searchNewContactInputText(val) {
        this.store.searchNewContactInputText = val;
    }
    get localUser() {
        return this.store.localUser;
    }
    set localUser(val) {
        this.store.localUser = val;
    }
    get loginUsername() {
        return this.store.loginUsername;
    }
    set loginUsername(val) {
        this.store.loginUsername = val;
    }
    get loginPassword() {
        return this.store.loginPassword;
    }
    set loginPassword(val) {
        this.store.loginPassword = val;
    }
    get isLoggedIn() {
        return this.store.isLoggedIn;
    }
    set isLoggedIn(val) {
        this.store.isLoggedIn = val;
    }
    get availableRooms() {
        return this.store.availableRooms;
    }
    set availableRooms(val) {
        this.store.availableRooms = val;
    }
    get registerUsername() {
        return this.store.registerUsername;
    }
    set registerUsername(val) {
        this.store.registerUsername = val;
    }
    get registerPassword() {
        return this.store.registerPassword;
    }
    set registerPassword(val) {
        this.store.registerPassword = val;
    }
    get registerPasswordRepeat() {
        return this.store.registerPasswordRepeat;
    }
    set registerPasswordRepeat(val) {
        this.store.registerPasswordRepeat = val;
    }
    resolveChatRoomName(chatRoom) {
        if (chatRoom) {
            if (chatRoom.userIds && chatRoom.userIds.length == 2) {
                //1on1 room
                let userId = this.getNotLocalUserId(chatRoom.userIds);
                let contact = this.resolveContactId(userId);
                return contact ? contact.name : 'unknown name';
            }
            return chatRoom.title;
        }
        return "";
    }
    resolveLatestChatMessageDate(chatRoom) {
        if (chatRoom) {
            let chatMessage = this.resolveLatestChatMessage(chatRoom);
            return chatMessage ? chatMessage.createdAt : "";
            ;
        }
        return "";
    }
    resolveLatestChatMessage(chatRoom) {
        const chatMessages = this.store.chatMessagesByRoom.get(chatRoom.id);
        if (chatMessages) {
            return chatMessages[chatMessages.length - 1];
        }
    }
    resolveLatestChatMessageBody(chatRoom) {
        if (chatRoom) {
            let chatMessage = this.resolveLatestChatMessage(chatRoom);
            return chatMessage ? chatMessage.body : "";
        }
        return "";
    }
    resolveContactId(userId) {
        let lookedUpcontact = this.store.lookUpInDATA(userId);
        if (lookedUpcontact) {
            return lookedUpcontact;
        }
        return null;
    }
    resolveOneToOneRoomByContact(contact) {
        this.availableRooms.forEach(room => {
            if (room.userIds.length == 2 && room.userIds.includes(contact.id) && room.userIds.includes(this.localUser.id)) {
                this.chatService.displayedChatRoom = room;
                this.chatService.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
            }
        });
    }
    getNotLocalUserId(userIds) {
        if (this.isNotLocalUser(userIds[0])) {
            return userIds[0];
        }
        return userIds[1];
    }
    isNotLocalUser(id) {
        return this.localUser.id != id;
    }
};
ValueResolver = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ValueResolver);
export { ValueResolver };
//# sourceMappingURL=value.resolver.js.map