//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IntoRoomSendMessage = (function (_super) {
    __extends(IntoRoomSendMessage, _super);
    function IntoRoomSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("IntoRoomSend");
        return _this;
    }
    IntoRoomSendMessage.prototype.setId = function (id) {
        this._data.set("id", id);
    };
    IntoRoomSendMessage.prototype.getId = function () {
        return this._data.get("id");
    };
    IntoRoomSendMessage.prototype.setUid = function (uid) {
        this._data.set("uid", uid);
    };
    IntoRoomSendMessage.prototype.getUid = function () {
        return this._data.get("uid");
    };
    IntoRoomSendMessage.prototype.getPID = function () {
        return 2006;
    };
    IntoRoomSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    IntoRoomSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    IntoRoomSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return IntoRoomSendMessage;
}(MessageBase));
__reflect(IntoRoomSendMessage.prototype, "IntoRoomSendMessage");
//# sourceMappingURL=IntoRoomSendMessage.js.map