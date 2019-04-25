//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginSendMessage = (function (_super) {
    __extends(LoginSendMessage, _super);
    function LoginSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("LoginSend");
        return _this;
    }
    LoginSendMessage.prototype.setId = function (id) {
        this._data.set("id", id);
    };
    LoginSendMessage.prototype.getId = function () {
        return this._data.get("id");
    };
    LoginSendMessage.prototype.setAccount = function (account) {
        this._data.set("account", account);
    };
    LoginSendMessage.prototype.getAccount = function () {
        return this._data.get("account");
    };
    LoginSendMessage.prototype.setPlatform = function (platform) {
        this._data.set("platform", platform);
    };
    LoginSendMessage.prototype.getPlatform = function () {
        return this._data.get("platform");
    };
    LoginSendMessage.prototype.setSecret = function (secret) {
        this._data.set("secret", secret);
    };
    LoginSendMessage.prototype.getSecret = function () {
        return this._data.get("secret");
    };
    LoginSendMessage.prototype.getPID = function () {
        return 2001;
    };
    LoginSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    LoginSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    LoginSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return LoginSendMessage;
}(MessageBase));
__reflect(LoginSendMessage.prototype, "LoginSendMessage");
//# sourceMappingURL=LoginSendMessage.js.map