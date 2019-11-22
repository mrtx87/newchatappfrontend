import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let ContactNamePipe = class ContactNamePipe {
    constructor(store, chatService, values) {
        this.store = store;
        this.chatService = chatService;
        this.values = values;
    }
    transform(contactId) {
        let contact;
        contact = this.values.resolveContactId(contactId);
        if (contact) {
            return contact.name;
        }
        return contactId;
    }
};
ContactNamePipe = tslib_1.__decorate([
    Pipe({
        name: 'contactName',
        pure: false
    })
], ContactNamePipe);
export { ContactNamePipe };
//# sourceMappingURL=contact-name.pipe.js.map