//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RequestRoomBackMessage = (function (_super) {
    __extends(RequestRoomBackMessage, _super);
    function RequestRoomBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("RequestRoomBack");
        return _this;
    }
    RequestRoomBackMessage.prototype.setFlag = function (flag) {
        this._data.set("flag", flag);
    };
    RequestRoomBackMessage.prototype.getFlag = function () {
        return this._data.get("flag");
    };
    RequestRoomBackMessage.prototype.setPort = function (port) {
        this._data.set("port", port);
    };
    RequestRoomBackMessage.prototype.getPort = function () {
        return this._data.get("port");
    };
    RequestRoomBackMessage.prototype.setIp = function (ip) {
        this._data.set("ip", ip);
    };
    RequestRoomBackMessage.prototype.getIp = function () {
        return this._data.get("ip");
    };
    RequestRoomBackMessage.prototype.setRoomId = function (roomId) {
        this._data.set("roomId", roomId);
    };
    RequestRoomBackMessage.prototype.getRoomId = function () {
        return this._data.get("roomId");
    };
    RequestRoomBackMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    RequestRoomBackMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    RequestRoomBackMessage.prototype.getPID = function () {
        return 2005;
    };
    RequestRoomBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    RequestRoomBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    RequestRoomBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return RequestRoomBackMessage;
}(MessageBase));
__reflect(RequestRoomBackMessage.prototype, "RequestRoomBackMessage");
//# sourceMappingURL=RequestRoomBackMessage.js.map