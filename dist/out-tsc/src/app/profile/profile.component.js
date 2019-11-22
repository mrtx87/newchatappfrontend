import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ProfileComponent = class ProfileComponent {
    constructor(chatService, store, constants, values, imageService) {
        this.chatService = chatService;
        this.store = store;
        this.constants = constants;
        this.values = values;
        this.imageService = imageService;
        this.name = "";
        this.info = "";
    }
    get localUser() {
        return this.store.localUser;
    }
    set localUser(val) {
        this.store.localUser = val;
    }
    ngOnInit() {
        this.name = this.localUser.name;
        this.info = this.localUser.info;
    }
    valid() {
        if (this.name != this.localUser.name || this.info != this.localUser.info) {
            return true;
        }
    }
    onFileChanged(event) {
        this.imageService.onFileChanged(event, this.constants.NEW_LOCAL_USER_IMAGE);
        this.startImageListener();
    }
    startImageListener() {
        let that = this;
        if (this.imageListener) {
            clearInterval(this.imageListener);
            this.imageListener = null;
        }
        that.imageListener = setInterval(function () {
            if (that.store.lookUpInTEMPDATA(that.constants.NEW_LOCAL_USER_IMAGE) && that.localUser) {
                that.localUser.iconUrl = that.store.lookUpInTEMPDATA(that.constants.NEW_LOCAL_USER_IMAGE);
                that.store.deleteFromTEMPDATA(that.constants.NEW_LOCAL_USER_IMAGE);
                clearInterval(that.imageListener);
                that.imageListener = null;
            }
        }, 200);
    }
    updateUserProfile() {
        this.localUser.name = this.name;
        this.localUser.info = this.info;
        this.chatService.sendUpdateUserProfile();
    }
};
ProfileComponent = tslib_1.__decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
    })
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map