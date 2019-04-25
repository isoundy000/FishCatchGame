//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChangeGunBackMessage = (function (_super) {
    __extends(ChangeGunBackMessage, _super);
    function ChangeGunBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("ChangeGunBack");
        return _this;
    }
    ChangeGunBackMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    ChangeGunBackMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    ChangeGunBackMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    ChangeGunBackMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    ChangeGunBackMessage.prototype.setGunId = function (gunId) {
        this._data.set("gunId", gunId);
    };
    ChangeGunBackMessage.prototype.getGunId = function () {
        return this._data.get("gunId");
    };
    ChangeGunBackMessage.prototype.setSkinId = function (skinId) {
        this._data.set("skinId", skinId);
    };
    ChangeGunBackMessage.prototype.getSkinId = function () {
        return this._data.get("skinId");
    };
    ChangeGunBackMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    ChangeGunBackMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    ChangeGunBackMessage.prototype.getPID = function () {
        return 3014;
    };
    ChangeGunBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ChangeGunBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ChangeGunBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ChangeGunBackMessage;
}(MessageBase));
__reflect(ChangeGunBackMessage.prototype, "ChangeGunBackMessage");
//# sourceMappingURL=ChangeGunBackMessage.js.map