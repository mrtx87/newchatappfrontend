import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ChatRoom } from '../Entities/chat.room';
let GroupProfileComponent = class GroupProfileComponent {
    constructor(chatService, values, store, constants, imageService) {
        this.chatService = chatService;
        this.values = values;
        this.store = store;
        this.constants = constants;
        this.imageService = imageService;
        chatService.registerGroupProfileComponent(this);
    }
    get localUser() {
        return this.chatService.localUser;
    }
    set localUser(val) {
        this.chatService.localUser = val;
    }
    ngOnInit() {
        this.init();
    }
    startImageListener() {
        let that = this;
        if (this.imageListener) {
            clearInterval(this.imageListener);
            this.imageListener = null;
        }
        that.imageListener = setInterval(function () {
            if (that.store.lookUpInTEMPDATA(that.constants.NEW_GROUP_IMAGE) && that.currentChatRoom) {
                that.currentChatRoom.iconUrl = that.store.lookUpInTEMPDATA(that.constants.NEW_GROUP_IMAGE);
                that.store.deleteFromTEMPDATA(that.constants.NEW_GROUP_IMAGE);
                clearInterval(that.imageListener);
                that.imageListener = null;
            }
        }, 200);
    }
    resolveCreatingChatRoom() {
        let creatingRoomContacts = this.store.lookUpInTEMPDATA(this.constants.CREATING_ROOM_CONTACTS_ID);
        if (creatingRoomContacts) {
            let chatRoom = new ChatRoom();
            chatRoom.userIds = creatingRoomContacts.map(contact => contact.id);
            //TODO ADD ICON URL IF AVAILABLE
            return chatRoom;
        }
        return null;
    }
    updateChatroomTitle() {
        if (this.currentChatRoom) {
            this.currentChatRoom.title = this.roomTitleText;
        }
    }
    resolveDisplayedChatRoom() {
        return this.store.lookUpInTEMPDATA(this.constants.DISPLAYED_ROOM_ID);
    }
    init() {
        let chatRoom = this.resolveCreatingChatRoom();
        if (chatRoom) {
            this.isInCreateMode = true;
            this.currentChatRoom = chatRoom;
        }
        else {
            this.isInCreateMode = false;
            this.currentChatRoom = this.resolveDisplayedChatRoom();
        }
    }
    onFileChanged(event) {
        this.imageService.onFileChanged(event, this.constants.NEW_GROUP_IMAGE);
        this.startImageListener();
    }
    isValid() {
        return this.currentChatRoom && this.roomTitleText && this.currentChatRoom.userIds && this.roomTitleText.length >= 3;
    }
    sendCreateNewGroupRoom() {
        if (this.currentChatRoom) {
            this.currentChatRoom.title = this.roomTitleText;
            this.currentChatRoom.userIds.push(this.localUser.id);
            this.chatService.sendCreateGroupRoom(this.localUser, this.currentChatRoom);
        }
    }
};
GroupProfileComponent = tslib_1.__decorate([
    Component({
        selector: 'app-group-profile',
        templateUrl: './group-profile.component.html',
        styleUrls: ['./group-profile.component.css']
    })
], GroupProfileComponent);
export { GroupProfileComponent };
//# sourceMappingURL=group-profile.component.js.map