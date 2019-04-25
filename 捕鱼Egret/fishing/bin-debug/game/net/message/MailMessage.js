//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MailMessage = (function (_super) {
    __extends(MailMessage, _super);
    function MailMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("Mail");
        return _this;
    }
    MailMessage.prototype.setMailId = function (mailId) {
        this._data.set("mailId", mailId);
    };
    MailMessage.prototype.getMailId = function () {
        return this._data.get("mailId");
    };
    MailMessage.prototype.setMailType = function (mailType) {
        this._data.set("mailType", mailType);
    };
    MailMessage.prototype.getMailType = function () {
        return this._data.get("mailType");
    };
    MailMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    MailMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    MailMessage.prototype.setReceiveUserName = function (receiveUserName) {
        this._data.set("receiveUserName", receiveUserName);
    };
    MailMessage.prototype.getReceiveUserName = function () {
        return this._data.get("receiveUserName");
    };
    MailMessage.prototype.setSendUserId = function (sendUserId) {
        this._data.set("sendUserId", sendUserId);
    };
    MailMessage.prototype.getSendUserId = function () {
        return this._data.get("sendUserId");
    };
    MailMessage.prototype.setSendUserName = function (sendUserName) {
        this._data.set("sendUserName", sendUserName);
    };
    MailMessage.prototype.getSendUserName = function () {
        return this._data.get("sendUserName");
    };
    MailMessage.prototype.setItems = function (items) {
        this._data.set("items", items);
    };
    MailMessage.prototype.getItems = function () {
        return this._data.get("items");
    };
    MailMessage.prototype.setTime = function (time) {
        this._data.set("time", time);
    };
    MailMessage.prototype.getTime = function () {
        return this._data.get("time");
    };
    MailMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    MailMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    MailMessage.prototype.setMailContent = function (mailContent) {
        this._data.set("mailContent", mailContent);
    };
    MailMessage.prototype.getMailContent = function () {
        return this._data.get("mailContent");
    };
    MailMessage.prototype.setMailTitle = function (mailTitle) {
        this._data.set("mailTitle", mailTitle);
    };
    MailMessage.prototype.getMailTitle = function () {
        return this._data.get("mailTitle");
    };
    MailMessage.prototype.getPID = function () {
        return 2018;
    };
    MailMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    MailMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    MailMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return MailMessage;
}(MessageBase));
__reflect(MailMessage.prototype, "MailMessage");
//# sourceMappingURL=MailMessage.js.map