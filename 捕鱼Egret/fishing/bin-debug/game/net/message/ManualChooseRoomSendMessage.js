//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ManualChooseRoomSendMessage = (function (_super) {
    __extends(ManualChooseRoomSendMessage, _super);
    function ManualChooseRoomSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("ManualChooseRoomSend");
        return _this;
    }
    ManualChooseRoomSendMessage.prototype.setServerId = function (serverId) {
        this._data.set("serverId", serverId);
    };
    ManualChooseRoomSendMessage.prototype.getServerId = function () {
        return this._data.get("serverId");
    };
    ManualChooseRoomSendMessage.prototype.getPID = function () {
        return 2014;
    };
    ManualChooseRoomSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ManualChooseRoomSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ManualChooseRoomSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ManualChooseRoomSendMessage;
}(MessageBase));
__reflect(ManualChooseRoomSendMessage.prototype, "ManualChooseRoomSendMessage");
//# sourceMappingURL=ManualChooseRoomSendMessage.js.map