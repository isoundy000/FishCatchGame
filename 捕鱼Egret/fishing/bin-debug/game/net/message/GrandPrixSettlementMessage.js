//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GrandPrixSettlementMessage = (function (_super) {
    __extends(GrandPrixSettlementMessage, _super);
    function GrandPrixSettlementMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("GrandPrixSettlement");
        return _this;
    }
    GrandPrixSettlementMessage.prototype.setBeforeIntegral = function (beforeIntegral) {
        this._data.set("beforeIntegral", beforeIntegral);
    };
    GrandPrixSettlementMessage.prototype.getBeforeIntegral = function () {
        return this._data.get("beforeIntegral");
    };
    GrandPrixSettlementMessage.prototype.setGunPlus = function (gunPlus) {
        this._data.set("gunPlus", gunPlus);
    };
    GrandPrixSettlementMessage.prototype.getGunPlus = function () {
        return this._data.get("gunPlus");
    };
    GrandPrixSettlementMessage.prototype.setVipPlus = function (vipPlus) {
        this._data.set("vipPlus", vipPlus);
    };
    GrandPrixSettlementMessage.prototype.getVipPlus = function () {
        return this._data.get("vipPlus");
    };
    GrandPrixSettlementMessage.prototype.setTimesPlus = function (timesPlus) {
        this._data.set("timesPlus", timesPlus);
    };
    GrandPrixSettlementMessage.prototype.getTimesPlus = function () {
        return this._data.get("timesPlus");
    };
    GrandPrixSettlementMessage.prototype.setAfterIntegral = function (afterIntegral) {
        this._data.set("afterIntegral", afterIntegral);
    };
    GrandPrixSettlementMessage.prototype.getAfterIntegral = function () {
        return this._data.get("afterIntegral");
    };
    GrandPrixSettlementMessage.prototype.setItem = function (item) {
        this._data.set("item", item);
    };
    GrandPrixSettlementMessage.prototype.getItem = function () {
        return this._data.get("item");
    };
    GrandPrixSettlementMessage.prototype.setRoomtType = function (roomtType) {
        this._data.set("roomtType", roomtType);
    };
    GrandPrixSettlementMessage.prototype.getRoomtType = function () {
        return this._data.get("roomtType");
    };
    GrandPrixSettlementMessage.prototype.setCurRank = function (curRank) {
        this._data.set("curRank", curRank);
    };
    GrandPrixSettlementMessage.prototype.getCurRank = function () {
        return this._data.get("curRank");
    };
    GrandPrixSettlementMessage.prototype.getPID = function () {
        return 2056;
    };
    GrandPrixSettlementMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    GrandPrixSettlementMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    GrandPrixSettlementMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return GrandPrixSettlementMessage;
}(MessageBase));
__reflect(GrandPrixSettlementMessage.prototype, "GrandPrixSettlementMessage");
//# sourceMappingURL=GrandPrixSettlementMessage.js.map