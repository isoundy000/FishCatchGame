//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UpgradeOrForgeBackMessage = (function (_super) {
    __extends(UpgradeOrForgeBackMessage, _super);
    function UpgradeOrForgeBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("UpgradeOrForgeBack");
        return _this;
    }
    UpgradeOrForgeBackMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    UpgradeOrForgeBackMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    UpgradeOrForgeBackMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    UpgradeOrForgeBackMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    UpgradeOrForgeBackMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    UpgradeOrForgeBackMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    UpgradeOrForgeBackMessage.prototype.setAfterGunId = function (afterGunId) {
        this._data.set("afterGunId", afterGunId);
    };
    UpgradeOrForgeBackMessage.prototype.getAfterGunId = function () {
        return this._data.get("afterGunId");
    };
    UpgradeOrForgeBackMessage.prototype.setItemProto = function (itemProto) {
        this._data.set("itemProto", itemProto);
    };
    UpgradeOrForgeBackMessage.prototype.getItemProto = function () {
        return this._data.get("itemProto");
    };
    UpgradeOrForgeBackMessage.prototype.getPID = function () {
        return 3023;
    };
    UpgradeOrForgeBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    UpgradeOrForgeBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    UpgradeOrForgeBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return UpgradeOrForgeBackMessage;
}(MessageBase));
__reflect(UpgradeOrForgeBackMessage.prototype, "UpgradeOrForgeBackMessage");
//# sourceMappingURL=UpgradeOrForgeBackMessage.js.map