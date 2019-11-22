import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ContactsComponent = class ContactsComponent {
    constructor(chatService, values, constants, store) {
        this.chatService = chatService;
        this.values = values;
        this.constants = constants;
        this.store = store;
        this.query = "";
    }
    get contacts() {
        return this.store.contacts.filter(contact => contact.name.toLowerCase().includes(this.query.toLowerCase()));
    }
    set contacts(val) {
        this.store.contacts = val;
    }
    ngOnInit() {
    }
};
ContactsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-contacts',
        templateUrl: './contacts.component.html',
        styleUrls: ['./contacts.component.css']
    })
], ContactsComponent);
export { ContactsComponent };
//# sourceMappingURL=contacts.component.js.map