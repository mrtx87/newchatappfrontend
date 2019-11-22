import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let LoginregisterComponent = class LoginregisterComponent {
    constructor(chatService, store) {
        this.chatService = chatService;
        this.store = store;
        this.registrationValid = true;
        this.isRegistering = false;
        this.displayRegistration = false;
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
    ngOnInit() {
    }
    requestRegistration() {
        if (this.registerPassword != "" && this.registerPassword === this.registerPasswordRepeat) {
            this.isRegistering = true;
            this.chatService.sendRequestRegistration();
            this.registerPassword = "";
            this.registerPasswordRepeat = this.registerPassword;
            this.registerUsername = this.registerPassword;
            this.registrationValid = true;
        }
        else {
            this.registrationValid = false;
            this.isRegistering = false;
        }
    }
    requestLogin() {
        if (this.loginPassword != "" && this.loginUsername != "") {
            this.chatService.sendRequestLogin();
            this.loginPassword = "";
            this.loginUsername = this.registerPassword;
        }
    }
};
LoginregisterComponent = tslib_1.__decorate([
    Component({
        selector: 'app-loginregister',
        templateUrl: './loginregister.component.html',
        styleUrls: ['./loginregister.component.css']
    })
], LoginregisterComponent);
export { LoginregisterComponent };
//# sourceMappingURL=loginregister.component.js.map