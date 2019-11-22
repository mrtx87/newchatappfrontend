import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AddgroupchatComponent = class AddgroupchatComponent {
    constructor(chatService, constants, store) {
        this.chatService = chatService;
        this.constants = constants;
        this.store = store;
        this.creatingRoomContacts = [];
        this.query = "";
    }
    get contacts() {
        return this.chatService.contacts.filter(contact => contact.name.includes(this.query) && !this.creatingRoomContacts.includes(contact));
    }
    set contacts(val) {
        this.chatService.contacts = val;
    }
    ngOnInit() {
    }
    addToCreatingRoom(contact) {
        if (this.creatingRoomContacts) {
            if (!this.creatingRoomContacts.includes(contact)) {
                this.creatingRoomContacts.push(contact);
            }
        }
    }
    ToRoomProfileCreation() {
        this.store.addEntryWithouthIdToTEMPDATA(this.constants.CREATING_ROOM_CONTACTS_ID, this.creatingRoomContacts);
        this.chatService.initDisplayChatRoomProfileComponent();
        this.chatService.appComponent.currentDisplayedLeftPanel = this.constants.GROUP_CHAT_PROFILE;
    }
    removeFromCreatingRoomContacts(contact) {
        this.creatingRoomContacts = this.creatingRoomContacts.filter(c => c.id !== contact.id);
    }
    isValid() {
        return this.creatingRoomContacts && this.creatingRoomContacts.length > 0;
    }
};
AddgroupchatComponent = tslib_1.__decorate([
    Component({
        selector: 'app-addgroupchat',
        templateUrl: './addgroupchat.component.html',
        styleUrls: ['./addgroupchat.component.css']
    })
], AddgroupchatComponent);
export { AddgroupchatComponent };
//# sourceMappingURL=addgroupchat.component.js.map