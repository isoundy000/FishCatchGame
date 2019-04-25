//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ArenaSignUpBackMessage = (function (_super) {
    __extends(ArenaSignUpBackMessage, _super);
    function ArenaSignUpBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("ArenaSignUpBack");
        return _this;
    }
    ArenaSignUpBackMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    ArenaSignUpBackMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    ArenaSignUpBackMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    ArenaSignUpBackMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    ArenaSignUpBackMessage.prototype.setGrandPrixIntegral = function (grandPrixIntegral) {
        this._data.set("grandPrixIntegral", grandPrixIntegral);
    };
    ArenaSignUpBackMessage.prototype.getGrandPrixIntegral = function () {
        return this._data.get("grandPrixIntegral");
    };
    ArenaSignUpBackMessage.prototype.setGrandPrixBulletNum = function (grandPrixBulletNum) {
        this._data.set("grandPrixBulletNum", grandPrixBulletNum);
    };
    ArenaSignUpBackMessage.prototype.getGrandPrixBulletNum = function () {
        return this._data.get("grandPrixBulletNum");
    };
    ArenaSignUpBackMessage.prototype.getPID = function () {
        return 3028;
    };
    ArenaSignUpBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ArenaSignUpBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ArenaSignUpBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ArenaSignUpBackMessage;
}(MessageBase));
__reflect(ArenaSignUpBackMessage.prototype, "ArenaSignUpBackMessage");
//# sourceMappingURL=ArenaSignUpBackMessage.js.map