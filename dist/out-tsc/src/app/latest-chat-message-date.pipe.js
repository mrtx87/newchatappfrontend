import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import * as moment from 'moment';
let LatestChatMessageDatePipe = class LatestChatMessageDatePipe {
    constructor(store, chatService, values) {
        this.store = store;
        this.chatService = chatService;
        this.values = values;
    }
    transform(chatRoom) {
        let dateString = this.values.resolveLatestChatMessageDate(chatRoom);
        let date = moment(dateString);
        let d = moment();
        if (d.dayOfYear() == date.dayOfYear()) {
            return date.format("hh:mm");
        }
        if (d.dayOfYear() - date.dayOfYear() == 1)
            return "Gestern";
        if (d.dayOfYear() - date.dayOfYear() < 7) {
            if (date.weekday() == 1)
                return "Montag";
            if (date.weekday() == 2)
                return "Dienstag";
            if (date.weekday() == 3)
                return "Mittowch";
            if (date.weekday() == 4)
                return "Donnerstag";
            if (date.weekday() == 5)
                return "Freitag";
            if (date.weekday() == 6)
                return "Samstag";
            if (date.weekday() == 7)
                return "Sonntag";
        }
        if (d.dayOfYear() - date.dayOfYear() > 7)
            return date.date() + "." + (date.month() + 1) + "." + date.year();
        return dateString;
    }
};
LatestChatMessageDatePipe = tslib_1.__decorate([
    Pipe({
        name: 'latestChatMessageDate',
        pure: false
    })
], LatestChatMessageDatePipe);
export { LatestChatMessageDatePipe };
//# sourceMappingURL=latest-chat-message-date.pipe.js.map