//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UseLockItemMessage = (function (_super) {
    __extends(UseLockItemMessage, _super);
    function UseLockItemMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("UseLockItem");
        return _this;
    }
    UseLockItemMessage.prototype.setItemId = function (itemId) {
        this._data.set("itemId", itemId);
    };
    UseLockItemMessage.prototype.getItemId = function () {
        return this._data.get("itemId");
    };
    UseLockItemMessage.prototype.setFishId = function (fishId) {
        this._data.set("fishId", fishId);
    };
    UseLockItemMessage.prototype.getFishId = function () {
        return this._data.get("fishId");
    };
    UseLockItemMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    UseLockItemMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    UseLockItemMessage.prototype.setGunIndex = function (gunIndex) {
        this._data.set("gunIndex", gunIndex);
    };
    UseLockItemMessage.prototype.getGunIndex = function () {
        return this._data.get("gunIndex");
    };
    UseLockItemMessage.prototype.getPID = function () {
        return 3020;
    };
    UseLockItemMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    UseLockItemMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    UseLockItemMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return UseLockItemMessage;
}(MessageBase));
__reflect(UseLockItemMessage.prototype, "UseLockItemMessage");
//# sourceMappingURL=UseLockItemMessage.js.map