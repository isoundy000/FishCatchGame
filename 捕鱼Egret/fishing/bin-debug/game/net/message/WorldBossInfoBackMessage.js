//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WorldBossInfoBackMessage = (function (_super) {
    __extends(WorldBossInfoBackMessage, _super);
    function WorldBossInfoBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("WorldBossInfoBack");
        return _this;
    }
    WorldBossInfoBackMessage.prototype.setBossId = function (bossId) {
        this._data.set("bossId", bossId);
    };
    WorldBossInfoBackMessage.prototype.getBossId = function () {
        return this._data.get("bossId");
    };
    WorldBossInfoBackMessage.prototype.setFishId = function (fishId) {
        this._data.set("fishId", fishId);
    };
    WorldBossInfoBackMessage.prototype.getFishId = function () {
        return this._data.get("fishId");
    };
    WorldBossInfoBackMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    WorldBossInfoBackMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    WorldBossInfoBackMessage.prototype.setTime = function (time) {
        this._data.set("time", time);
    };
    WorldBossInfoBackMessage.prototype.getTime = function () {
        return this._data.get("time");
    };
    WorldBossInfoBackMessage.prototype.setShieldMax = function (shieldMax) {
        this._data.set("shieldMax", shieldMax);
    };
    WorldBossInfoBackMessage.prototype.getShieldMax = function () {
        return this._data.get("shieldMax");
    };
    WorldBossInfoBackMessage.prototype.setCurShieldValue = function (curShieldValue) {
        this._data.set("curShieldValue", curShieldValue);
    };
    WorldBossInfoBackMessage.prototype.getCurShieldValue = function () {
        return this._data.get("curShieldValue");
    };
    WorldBossInfoBackMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    WorldBossInfoBackMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    WorldBossInfoBackMessage.prototype.setItems = function (items) {
        this._data.set("items", items);
    };
    WorldBossInfoBackMessage.prototype.getItems = function () {
        return this._data.get("items");
    };
    WorldBossInfoBackMessage.prototype.getPID = function () {
        return 3035;
    };
    WorldBossInfoBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    WorldBossInfoBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    WorldBossInfoBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return WorldBossInfoBackMessage;
}(MessageBase));
__reflect(WorldBossInfoBackMessage.prototype, "WorldBossInfoBackMessage");
//# sourceMappingURL=WorldBossInfoBackMessage.js.map