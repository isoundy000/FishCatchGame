//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ActiveConfigMessageMessage = (function (_super) {
    __extends(ActiveConfigMessageMessage, _super);
    function ActiveConfigMessageMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);
        _this._clazz = builder.build("ActiveConfigMessage");
        return _this;
    }
    ActiveConfigMessageMessage.prototype.setId = function (id) {
        this._data.set("id", id);
    };
    ActiveConfigMessageMessage.prototype.getId = function () {
        return this._data.get("id");
    };
    ActiveConfigMessageMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    ActiveConfigMessageMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    ActiveConfigMessageMessage.prototype.setStartTime = function (startTime) {
        this._data.set("startTime", startTime);
    };
    ActiveConfigMessageMessage.prototype.getStartTime = function () {
        return this._data.get("startTime");
    };
    ActiveConfigMessageMessage.prototype.setEndTime = function (endTime) {
        this._data.set("endTime", endTime);
    };
    ActiveConfigMessageMessage.prototype.getEndTime = function () {
        return this._data.get("endTime");
    };
    ActiveConfigMessageMessage.prototype.setActiveState = function (activeState) {
        this._data.set("activeState", activeState);
    };
    ActiveConfigMessageMessage.prototype.getActiveState = function () {
        return this._data.get("activeState");
    };
    ActiveConfigMessageMessage.prototype.setParameter1 = function (parameter1) {
        this._data.set("parameter1", parameter1);
    };
    ActiveConfigMessageMessage.prototype.getParameter1 = function () {
        return this._data.get("parameter1");
    };
    ActiveConfigMessageMessage.prototype.setParameter2 = function (parameter2) {
        this._data.set("parameter2", parameter2);
    };
    ActiveConfigMessageMessage.prototype.getParameter2 = function () {
        return this._data.get("parameter2");
    };
    ActiveConfigMessageMessage.prototype.setDescVip = function (descVip) {
        this._data.set("descVip", descVip);
    };
    ActiveConfigMessageMessage.prototype.getDescVip = function () {
        return this._data.get("descVip");
    };
    ActiveConfigMessageMessage.prototype.setNameUrl = function (nameUrl) {
        this._data.set("nameUrl", nameUrl);
    };
    ActiveConfigMessageMessage.prototype.getNameUrl = function () {
        return this._data.get("nameUrl");
    };
    ActiveConfigMessageMessage.prototype.setOrder = function (order) {
        this._data.set("order", order);
    };
    ActiveConfigMessageMessage.prototype.getOrder = function () {
        return this._data.get("order");
    };
    ActiveConfigMessageMessage.prototype.getPID = function () {
        return 1017;
    };
    ActiveConfigMessageMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ActiveConfigMessageMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ActiveConfigMessageMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ActiveConfigMessageMessage;
}(MessageBase));
__reflect(ActiveConfigMessageMessage.prototype, "ActiveConfigMessageMessage");
//# sourceMappingURL=ActiveConfigMessageMessage.js.map