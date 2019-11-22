import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let LeftPanelComponent = class LeftPanelComponent {
    constructor(chatService, values, constants, store) {
        this.chatService = chatService;
        this.values = values;
        this.constants = constants;
        this.store = store;
        this.searchChatInputText = "";
        this.displayUserMenu = false;
        this.displayProfile = false;
    }
    ngOnInit() {
    }
    get localUser() {
        return this.store.localUser;
    }
    set localUser(val) {
        this.store.localUser = val;
    }
    get availableRooms() {
        let rooms = this.store.availableRooms;
        let availableRooms = [];
        rooms.forEach(room => availableRooms.push(room));
        availableRooms.sort((a, b) => {
            if (a.unseenChatMessageIds && a.unseenChatMessageIds.length && (!b.unseenChatMessageIds || b.unseenChatMessageIds.length == 0)) {
                return -1;
            }
            else if (b.unseenChatMessageIds && b.unseenChatMessageIds.length && (!a.unseenChatMessageIds || a.unseenChatMessageIds.length == 0)) {
                return 1;
            }
            else {
                let dateA = new Date(this.values.resolveLatestChatMessageDate(a)).getTime();
                let dateB = new Date(this.values.resolveLatestChatMessageDate(b)).getTime();
                return dateB - dateA;
            }
        });
        return availableRooms.filter(room => this.values.resolveChatRoomName(room).toLowerCase().includes(this.searchChatInputText.toLowerCase()));
    }
    get displayedChatRoom() {
        return this.chatService.displayedChatRoom;
    }
    set displayedChatRoom(val) {
        this.chatService.displayedChatRoom = val;
    }
    /*
    encodeImageFileAsURL() {
      
      var reader = new FileReader();
      this.uploadImage
      let file : File = new File();
      reader.onloadend = function() {
        console.log('RESULT', reader.result)
      }
      reader.readAsDataURL(this.uploadImage);
    }*/
    toggleDisplayedRoom(chatRoom) {
        this.displayedChatRoom = chatRoom;
        if (chatRoom.userIds.length > 2) {
            chatRoom.userIds.forEach(contactId => {
                if (!this.store.lookUpInDATA(contactId)) {
                    this.chatService.sendResolveContactId(contactId);
                }
            });
        }
        if (chatRoom.unseenChatMessageIds && chatRoom.unseenChatMessageIds.length > 0) {
            this.chatService.sendUpdateUnseenMessages(chatRoom.unseenChatMessageIds);
            chatRoom.unseenChatMessageIds = null;
        }
    }
    removeContact(chatRoom) {
        let otherUser = this.getOtherUser(chatRoom.userIds);
        if (otherUser !== "" || otherUser != null) {
            console.log("Ya rly want to remove " + this.store.lookUpInDATA(otherUser).name + ", huh? Well, guess we'll have to work on that.");
        }
        else {
            console.log("Don't remove anything as there was no other user. (Which is strange. You should investigate this.");
        }
    }
    getOtherUser(userIds) {
        if (userIds.length == 2) {
            if (userIds[0] == this.localUser.id) {
                return userIds[1];
            }
            else {
                return userIds[0];
            }
        }
        return null;
    }
};
LeftPanelComponent = tslib_1.__decorate([
    Component({
        selector: 'app-left-panel',
        templateUrl: './left.panel.component.html',
        styleUrls: ['./left.panel.component.css']
    })
], LeftPanelComponent);
export { LeftPanelComponent };
//# sourceMappingURL=left.panel.component.js.map