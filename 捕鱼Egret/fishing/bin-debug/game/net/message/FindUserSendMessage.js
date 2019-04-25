//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FindUserSendMessage = (function (_super) {
    __extends(FindUserSendMessage, _super);
    function FindUserSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("FindUserSend");
        return _this;
    }
    FindUserSendMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    FindUserSendMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    FindUserSendMessage.prototype.getPID = function () {
        return 2021;
    };
    FindUserSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    FindUserSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    FindUserSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return FindUserSendMessage;
}(MessageBase));
__reflect(FindUserSendMessage.prototype, "FindUserSendMessage");
//# sourceMappingURL=FindUserSendMessage.js.map