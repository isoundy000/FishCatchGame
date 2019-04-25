//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RequestRoomMessage = (function (_super) {
    __extends(RequestRoomMessage, _super);
    function RequestRoomMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("RequestRoom");
        return _this;
    }
    RequestRoomMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    RequestRoomMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    RequestRoomMessage.prototype.setId = function (id) {
        this._data.set("id", id);
    };
    RequestRoomMessage.prototype.getId = function () {
        return this._data.get("id");
    };
    RequestRoomMessage.prototype.setRoomId = function (roomId) {
        this._data.set("roomId", roomId);
    };
    RequestRoomMessage.prototype.getRoomId = function () {
        return this._data.get("roomId");
    };
    RequestRoomMessage.prototype.getPID = function () {
        return 2004;
    };
    RequestRoomMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    RequestRoomMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    RequestRoomMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return RequestRoomMessage;
}(MessageBase));
__reflect(RequestRoomMessage.prototype, "RequestRoomMessage");
//# sourceMappingURL=RequestRoomMessage.js.map