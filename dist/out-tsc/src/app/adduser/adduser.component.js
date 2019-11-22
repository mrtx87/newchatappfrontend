import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AdduserComponent = class AdduserComponent {
    constructor(chatService, constants, store) {
        this.chatService = chatService;
        this.constants = constants;
        this.store = store;
    }
    get searchNewContactInputText() {
        return this.chatService.searchNewContactInputText;
    }
    set searchNewContactInputText(val) {
        this.chatService.searchNewContactInputText = val;
    }
    get newContactsList() {
        return this.store.newContactsList;
    }
    set newContactsList(val) {
        this.store.newContactsList = val;
    }
    get localUser() {
        return this.store.localUser;
    }
    set localUser(val) {
        this.store.localUser = val;
    }
    triggerNewContactSearch() {
        this.chatService.sendNewContactSearch();
    }
    ngOnInit() {
    }
    change(event) {
        console.log(event.target.files);
    }
    createRoom(contact) {
        this.chatService.sendCreateRoomAndContact(contact);
    }
};
AdduserComponent = tslib_1.__decorate([
    Component({
        selector: 'app-adduser',
        templateUrl: './adduser.component.html',
        styleUrls: ['./adduser.component.css']
    })
], AdduserComponent);
export { AdduserComponent };
//# sourceMappingURL=adduser.component.js.map