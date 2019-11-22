import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let DataStore = class DataStore {
    constructor() {
        this.DATA_ = new Map();
        this.TEMPDATA_ = new Map();
        this.loginUsername_ = "default";
        this.loginPassword_ = "123";
        this.isLoggedIn_ = false;
        this.chatMessagesByRoom_ = new Map();
        this.availableRooms_ = new Map();
        this.contacts_ = [];
    }
    get DATA() {
        return this.DATA_;
    }
    set DATA(val) {
        this.DATA_ = val;
    }
    get TEMPDATA() {
        return this.TEMPDATA_;
    }
    set TEMPDATA(val) {
        this.TEMPDATA_ = val;
    }
    get registerUsername() {
        return this.registerUsername_;
    }
    set registerUsername(val) {
        this.registerUsername_ = val;
    }
    get registerPassword() {
        return this.registerPassword_;
    }
    set registerPassword(val) {
        this.registerPassword_ = val;
    }
    get registerPasswordRepeat() {
        return this.registerPasswordRepeat_;
    }
    set registerPasswordRepeat(val) {
        this.registerPasswordRepeat_ = val;
    }
    get loginUsername() {
        return this.loginUsername_;
    }
    set loginUsername(val) {
        this.loginUsername_ = val;
    }
    get loginPassword() {
        return this.loginPassword_;
    }
    set loginPassword(val) {
        this.loginPassword_ = val;
    }
    get newContactsList() {
        return this.newContactsList_;
    }
    set newContactsList(val) {
        this.newContactsList_ = val;
    }
    get searchNewContactInputText() {
        return this.searchNewContactInputText_;
    }
    set searchNewContactInputText(val) {
        this.searchNewContactInputText_ = val;
    }
    get localUser() {
        return this.localUser_;
    }
    set localUser(val) {
        this.localUser_ = val;
    }
    get isLoggedIn() {
        return this.isLoggedIn_;
    }
    set isLoggedIn(val) {
        this.isLoggedIn_ = val;
    }
    get chatMessagesByRoom() {
        return this.chatMessagesByRoom_;
    }
    set chatMessagesByRoom(val) {
        this.chatMessagesByRoom_ = val;
    }
    get availableRooms() {
        return this.availableRooms_;
    }
    set availableRooms(val) {
        this.availableRooms_ = val;
    }
    get contacts() {
        return this.contacts_;
    }
    set contacts(val) {
        this.contacts_ = val;
    }
    addMapToDATA(dataMap) {
        dataMap.forEach((value, key) => this.DATA.set(key, value));
    }
    addEntryToDATA(entry) {
        this.DATA.set(entry.id, entry);
    }
    addListOfEntriesToDATA(entries) {
        entries.forEach(entry => this.addEntryToDATA(entry));
    }
    lookUpInDATA(id) {
        return this.DATA.get(id);
    }
    addMapToTEMPDATA(dataMap) {
        dataMap.forEach((value, key) => this.TEMPDATA.set(key, value));
    }
    addEntryToTEMPDATA(entry) {
        this.TEMPDATA.set(entry.id, entry);
    }
    addEntryWithouthIdToTEMPDATA(key, entry) {
        this.TEMPDATA.set(key, entry);
    }
    addListOfEntriesToTEMPDATA(entries) {
        entries.forEach(entry => this.addEntryToTEMPDATA(entry));
    }
    lookUpInTEMPDATA(id) {
        return this.TEMPDATA.get(id);
    }
    deleteFromTEMPDATA(id) {
        return this.TEMPDATA.get(id);
    }
};
DataStore = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], DataStore);
export { DataStore };
//# sourceMappingURL=data.store.js.map