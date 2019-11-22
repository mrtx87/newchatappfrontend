import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ChatRoom } from './Entities/chat.room';
import { TransferMessage } from './Entities/transfer.message';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { ChatMessage } from './Entities/chat.message';
import * as moment from 'moment';
let ChatService = class ChatService {
    constructor(http, constants, store) {
        this.http = http;
        this.constants = constants;
        this.store = store;
    }
    registerAppComponent(appComponent) {
        this.appComponent = appComponent;
    }
    registerGroupProfileComponent(groupProfileComponent) {
        this.groupProfileComponent = groupProfileComponent;
    }
    registerAddgroupchatComponent(addGroupChatComponent) {
        this.addGroupChatComponent = addGroupChatComponent;
    }
    registerAdduserComponent(adduserComponent) {
        this.adduserComponent = adduserComponent;
    }
    registerChatPanelComponent(chatPanelComponent) {
        this.chatPanelComponent = chatPanelComponent;
    }
    registerLeftPanelComponent(lefPanelComponent) {
        this.lefPanelComponent = lefPanelComponent;
    }
    registerLoginRegisterComponent(loginRegisterComponent) {
        this.loginRegisterComponent = loginRegisterComponent;
    }
    registerProfileComponent(profileComponent) {
        this.profileComponent = profileComponent;
    }
    registerContactsComponent(contactsComponent) {
        this.contactsComponent = contactsComponent;
    }
    registerDisplayChatComponent(displayChatComponent) {
        this.displayChatComponent = displayChatComponent;
    }
    registerSearchResultComponent(searchResultComponent) {
        this.searchResultComponent = searchResultComponent;
    }
    registerSettingsComponent(settingsComponent) {
        this.settingsComponent = settingsComponent;
    }
    get chatMessagesByRoom() {
        return this.store.chatMessagesByRoom;
    }
    set chatMessagesByRoom(val) {
        this.chatMessagesByRoom = val;
    }
    get displayedChatRoom() {
        return this.displayedChatRoom_;
    }
    set displayedChatRoom(val) {
        this.displayedChatRoom_ = val;
    }
    get chatInputText() {
        return this.chatInputText_;
    }
    set chatInputText(val) {
        this.chatInputText_ = val;
    }
    get contacts() {
        return this.store.contacts;
    }
    set contacts(val) {
        this.store.contacts = val;
    }
    get newContactsList() {
        return this.store.newContactsList;
    }
    set newContactsList(val) {
        this.store.newContactsList = val;
    }
    get searchNewContactInputText() {
        return this.store.searchNewContactInputText;
    }
    set searchNewContactInputText(val) {
        this.store.searchNewContactInputText = val;
    }
    get localUser() {
        return this.store.localUser;
    }
    set localUser(val) {
        this.store.localUser = val;
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
    get availableRooms() {
        return this.store.availableRooms;
    }
    set availableRooms(val) {
        this.store.availableRooms = val;
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
    connect() {
        this.ws = new SockJS("http://localhost:8080/socket");
        this.stompClient = Stomp.over(this.ws);
        let that = this;
        this.stompClient.connect({}, function () {
            that.sendOwnOnlineStatus();
            that.stompClient.subscribe("/client/" + that.localUser.id, messageFromServer => that.handleServerResponse(JSON.parse(messageFromServer.body)));
        });
    }
    handleServerResponse(transferMessage) {
        switch (transferMessage.function) {
            case this.constants.TM_TYPE_CHAT_MESSAGE:
                {
                    this.processRequestedChatMessages(transferMessage.chatMessage.roomId, [transferMessage.chatMessage]);
                }
                break;
        }
    }
    closeLocalWebsocketConnection() {
        this.stompClient.disconnect();
        this.ws.close();
    }
    sendOwnOnlineStatus() {
        this.stompClient.send("/app/send/online-status", {}, JSON.stringify({ from: this.localUser }));
    }
    sendDisconnectMessage(user) {
        this.stompClient.send("/app/send/disconnect-client", {}, JSON.stringify({ from: user }));
    }
    sendNewContactSearch() {
        this.http.get(this.constants.BASE_URL + "/userId/" + this.localUser.id + "/users/" + this.searchNewContactInputText).subscribe(response => {
            this.newContactsList = response;
        });
    }
    sendResolveContactId(contactId) {
        this.http.get(this.constants.BASE_URL + "/contactId/" + contactId).subscribe(response => {
            this.store.addEntryToDATA(response);
        });
    }
    sendRequestRegistration() {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        this.http
            .post(this.constants.BASE_URL + "/register", { username: this.registerUsername, password: this.registerPassword }, { headers })
            .subscribe(response => {
            this.localUser = response;
            this.isLoggedIn = true;
            console.log(this.localUser);
        });
    }
    sendRequestLogin() {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        this.http
            .post(this.constants.BASE_URL + "/login", { username: this.loginUsername, password: this.loginPassword }, { headers })
            .subscribe(response => {
            const receivedUser = response;
            if (receivedUser.id && receivedUser.name) {
                this.isLoggedIn = true;
                this.localUser = receivedUser;
                this.addEntryToDATA(this.localUser);
                this.init();
            }
        });
    }
    sendUpdateUserProfile() {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        this.http
            .post(this.constants.BASE_URL + "/update/userId/" + this.localUser.id, { from: this.localUser }, { headers })
            .subscribe(response => {
            let contact = response;
            this.localUser.iconUrl = contact.iconUrl ? contact.iconUrl : this.localUser.iconUrl;
            this.localUser.info = contact.info ? contact.info : this.localUser.info;
            this.localUser.name = contact.name ? contact.name : this.localUser.name;
        });
    }
    init() {
        this.connect();
        this.sendRequestContacts();
        this.sendRequestRoomList();
    }
    updateAvailableRooms(chatRooms) {
        if (!this.availableRooms) {
            this.availableRooms = new Map();
        }
        chatRooms.forEach(chatRoom => {
            this.availableRooms.set(chatRoom.id, chatRoom);
        });
        this.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
        //get all chat messages per room from backend
        this.addMapToDATA(this.availableRooms);
        this.sendRequestAllChatMessagesForRooms(chatRooms);
    }
    /**
   * gets all chat messages for all received rooms
   * @param roomId
   */
    sendRequestAllChatMessagesForRooms(chatRooms) {
        chatRooms.forEach(chatRoom => this.sendRequestChatMessages(chatRoom.id));
    }
    addEntryToDATA(entry) {
        this.store.addEntryToDATA(entry);
    }
    addListOfEntriesToDATA(entries) {
        this.store.addListOfEntriesToDATA(entries);
    }
    addMapToDATA(dataMap) {
        this.store.addMapToDATA(dataMap);
    }
    /**
     * gets all chat messages for a single room from backend
     * @param roomId
     */
    sendRequestChatMessages(roomId) {
        this.http.get(this.constants.BASE_URL + "/userId/" + this.localUser.id + "/roomId/" + roomId).subscribe(response => {
            this.processRequestedChatMessages(roomId, response);
        });
    }
    /**
    * gets all contacts for the logged in user from backend
    *
    */
    sendRequestContacts() {
        this.http.get(this.constants.BASE_URL + "/userId/" + this.localUser.id + "/contacts").subscribe(response => {
            this.updateContacts(response);
        });
    }
    /**
    * gets all chatrooms for the logged in user from backend
    *
    */
    sendRequestRoomList() {
        this.http.get(this.constants.BASE_URL + "/userId/" + this.localUser.id + "/rooms")
            .subscribe(response => {
            this.updateAvailableRooms(response);
        });
    }
    /**
     * processes the received chatmessages in a way that they can be displayed correclty
     * e.g. insert Date Messages for a correct displaying of Dates in the chatroom
     * @param roomId
     * @param responseChatMessages
     */
    processRequestedChatMessages(roomId, responseChatMessages) {
        //create ChatMessages Entry for a room in Map if it's not already existing
        if (!this.chatMessagesByRoom.has(roomId)) {
            this.chatMessagesByRoom.set(roomId, []);
        }
        //count and set list of unseen messages ids in room
        this.availableRooms.get(roomId).unseenChatMessageIds = this.getUnseenMessagesIds(responseChatMessages);
        //save responseChatMessages in DATA Store
        this.addListOfEntriesToDATA(responseChatMessages);
        //if chatmessages are associated with the currently displayed room then we updates the seen state instantly
        if (this.displayedChatRoom && roomId === this.displayedChatRoom.id) {
            this.sendUpdateUnseenMessages(this.availableRooms.get(roomId).unseenChatMessageIds);
            this.availableRooms.get(roomId).unseenChatMessageIds = [];
        }
        //if there are no chatMessages for given roomId we generate the inital date message
        let chatMessages = this.chatMessagesByRoom.get(roomId);
        if (chatMessages.length == 0) {
            let initialDateMessage = new ChatMessage();
            initialDateMessage.fromId = this.constants.CHAT_MESSAGE_DATE_TYPE;
            initialDateMessage.createdAt = responseChatMessages[0].createdAt;
            chatMessages.push(initialDateMessage);
        }
        //process received chatmessages and insert date message if needed 
        for (let message of responseChatMessages) {
            if (this.areDaysDifferent(message.createdAt, chatMessages[chatMessages.length - 1].createdAt)) {
                let dateMessage = new ChatMessage();
                dateMessage.seen = true;
                dateMessage.fromId = this.constants.CHAT_MESSAGE_DATE_TYPE;
                dateMessage.createdAt = message.createdAt;
                chatMessages.push(dateMessage);
            }
            chatMessages.push(message);
        }
    }
    /**
     * determines if two given dates as strings have different days
     * @param previous
     * @param next
     */
    areDaysDifferent(previous, next) {
        let previousDate = moment(previous);
        let nextDate = moment(next);
        if (nextDate.dayOfYear() != previousDate.dayOfYear() || nextDate.year() != previousDate.year()) {
            return true;
        }
        return false;
    }
    /**
     * determines which messages are unseen an returns them
     * @param chatMessages
     */
    getUnseenMessagesIds(chatMessages) {
        let unseenMessageIds = [];
        for (let chatMessage of chatMessages) {
            if (!chatMessage.seen) {
                unseenMessageIds.push(chatMessage.id);
            }
        }
        return unseenMessageIds;
    }
    /**
     * updates the local contacts and sorts them alphabetically
     * @param contacts
     */
    updateContacts(contacts) {
        this.contacts = [];
        contacts
            .sort((c1, c2) => (c1.name > c2.name) ? 1 : -1)
            .forEach(contact => {
            this.contacts.push(contact);
            this.addEntryToDATA(contact);
        });
    }
    /**
     * updates the state of the unseen message of a single room in the backend
     * @param unseenChatMessageIds
     */
    sendUpdateUnseenMessages(unseenChatMessageIds) {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        let transferMessage = new TransferMessage();
        transferMessage.unseenChatMessageIds = unseenChatMessageIds;
        transferMessage.from = this.localUser;
        this.http
            .post(this.constants.BASE_URL + "/update-unseen-messages", transferMessage, { headers })
            .subscribe(response => {
            console.log();
        });
    }
    /**
     * send a request to create a new room with an unkown contact
     * @param contact
     * @param title
     */
    sendCreateRoomAndContact(contact, title) {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        let transferMessage = new TransferMessage();
        let chatRoomStub = new ChatRoom();
        chatRoomStub.title = title ? title : contact.name;
        chatRoomStub.userIds = [this.localUser.id, contact.id];
        transferMessage.chatRoom = chatRoomStub;
        this.http
            .post(this.constants.BASE_URL + "/create-room", transferMessage, { headers })
            .subscribe(response => {
            this.updateAvailableRooms([response]);
            this.sendRequestContacts();
            this.displayedChatRoom = response;
        });
    }
    /**
     * send a request to create a new room with an unkown contact
     * @param contact
     * @param title
     */
    sendCreateGroupRoom(from, chatroom) {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        let transferMessage = new TransferMessage();
        transferMessage.from = from;
        transferMessage.chatRoom = chatroom;
        this.http
            .post(this.constants.BASE_URL + "/create-room", transferMessage, { headers })
            .subscribe(response => {
            this.updateAvailableRooms([response]);
            this.sendRequestContacts();
            this.displayedChatRoom = response;
        });
    }
    /**
     * sends the currently typed message
     * @param chatRoom
     * @param chatMessage
     */
    sendOutgoingChatMessage(chatRoom, chatMessage) {
        this.stompClient.send("/app/send/chat-message", {}, JSON.stringify({ from: this.localUser, chatRoom: chatRoom, chatMessage: chatMessage }));
    }
    initDisplayChatRoomProfileComponent() {
        if (this.groupProfileComponent) {
            this.groupProfileComponent.init();
        }
    }
};
ChatService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ChatService);
export { ChatService };
//# sourceMappingURL=chat.service.js.map