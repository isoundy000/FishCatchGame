//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RandomFishHitBackMessage = (function (_super) {
    __extends(RandomFishHitBackMessage, _super);
    function RandomFishHitBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("RandomFishHitBack");
        return _this;
    }
    RandomFishHitBackMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    RandomFishHitBackMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    RandomFishHitBackMessage.prototype.setFishFunctionType = function (fishFunctionType) {
        this._data.set("fishFunctionType", fishFunctionType);
    };
    RandomFishHitBackMessage.prototype.getFishFunctionType = function () {
        return this._data.get("fishFunctionType");
    };
    RandomFishHitBackMessage.prototype.setFishId = function (fishId) {
        this._data.set("fishId", fishId);
    };
    RandomFishHitBackMessage.prototype.getFishId = function () {
        return this._data.get("fishId");
    };
    RandomFishHitBackMessage.prototype.setFishingHitback = function (fishingHitback) {
        this._data.set("fishingHitback", fishingHitback);
    };
    RandomFishHitBackMessage.prototype.getFishingHitback = function () {
        return this._data.get("fishingHitback");
    };
    RandomFishHitBackMessage.prototype.getPID = function () {
        return 3005;
    };
    RandomFishHitBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    RandomFishHitBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    RandomFishHitBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return RandomFishHitBackMessage;
}(MessageBase));
__reflect(RandomFishHitBackMessage.prototype, "RandomFishHitBackMessage");
//# sourceMappingURL=RandomFishHitBackMessage.js.map