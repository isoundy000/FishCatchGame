//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ArenaSignUpSendMessage = (function (_super) {
    __extends(ArenaSignUpSendMessage, _super);
    function ArenaSignUpSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("ArenaSignUpSend");
        return _this;
    }
    ArenaSignUpSendMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    ArenaSignUpSendMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    ArenaSignUpSendMessage.prototype.getPID = function () {
        return 3027;
    };
    ArenaSignUpSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ArenaSignUpSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ArenaSignUpSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ArenaSignUpSendMessage;
}(MessageBase));
__reflect(ArenaSignUpSendMessage.prototype, "ArenaSignUpSendMessage");
//# sourceMappingURL=ArenaSignUpSendMessage.js.map