//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ReplaceUserMessage = (function (_super) {
    __extends(ReplaceUserMessage, _super);
    function ReplaceUserMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);
        _this._clazz = builder.build("ReplaceUser");
        return _this;
    }
    ReplaceUserMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    ReplaceUserMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    ReplaceUserMessage.prototype.setGameServerId = function (gameServerId) {
        this._data.set("gameServerId", gameServerId);
    };
    ReplaceUserMessage.prototype.getGameServerId = function () {
        return this._data.get("gameServerId");
    };
    ReplaceUserMessage.prototype.setRoomServerId = function (roomServerId) {
        this._data.set("roomServerId", roomServerId);
    };
    ReplaceUserMessage.prototype.getRoomServerId = function () {
        return this._data.get("roomServerId");
    };
    ReplaceUserMessage.prototype.getPID = function () {
        return 1005;
    };
    ReplaceUserMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ReplaceUserMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ReplaceUserMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ReplaceUserMessage;
}(MessageBase));
__reflect(ReplaceUserMessage.prototype, "ReplaceUserMessage");
//# sourceMappingURL=ReplaceUserMessage.js.map