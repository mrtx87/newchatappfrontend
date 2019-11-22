import * as tslib_1 from "tslib";
import { Component, HostListener } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(chatService, store, constants, values) {
        this.chatService = chatService;
        this.store = store;
        this.constants = constants;
        this.values = values;
        chatService.registerAppComponent(this);
        this.currentDisplayedLeftPanel = constants.DEFAULT_PANEL;
    }
    mouseEvent(event) {
        //@TODO Menüs schließen bei klick
    }
    get localUser() {
        return this.store.localUser;
    }
    set localUser(val) {
        this.store.localUser = val;
    }
    beforeunloadHandler($event) {
        this.chatService.sendDisconnectMessage(this.localUser);
        this.chatService.closeLocalWebsocketConnection();
    }
};
tslib_1.__decorate([
    HostListener("window:click", ["$event"])
], AppComponent.prototype, "mouseEvent", null);
tslib_1.__decorate([
    HostListener("window:beforeunload", ["$event"])
], AppComponent.prototype, "beforeunloadHandler", null);
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map