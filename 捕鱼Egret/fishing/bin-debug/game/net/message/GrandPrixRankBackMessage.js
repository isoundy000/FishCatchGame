//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GrandPrixRankBackMessage = (function (_super) {
    __extends(GrandPrixRankBackMessage, _super);
    function GrandPrixRankBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("GrandPrixRankBack");
        return _this;
    }
    GrandPrixRankBackMessage.prototype.setMyData = function (myData) {
        this._data.set("myData", myData);
    };
    GrandPrixRankBackMessage.prototype.getMyData = function () {
        return this._data.get("myData");
    };
    GrandPrixRankBackMessage.prototype.setWeekData = function (weekData) {
        this._data.set("weekData", weekData);
    };
    GrandPrixRankBackMessage.prototype.getWeekData = function () {
        return this._data.get("weekData");
    };
    GrandPrixRankBackMessage.prototype.setDayData = function (dayData) {
        this._data.set("dayData", dayData);
    };
    GrandPrixRankBackMessage.prototype.getDayData = function () {
        return this._data.get("dayData");
    };
    GrandPrixRankBackMessage.prototype.setWeekIntegral = function (weekIntegral) {
        this._data.set("weekIntegral", weekIntegral);
    };
    GrandPrixRankBackMessage.prototype.getWeekIntegral = function () {
        return this._data.get("weekIntegral");
    };
    GrandPrixRankBackMessage.prototype.setRoomtType = function (roomtType) {
        this._data.set("roomtType", roomtType);
    };
    GrandPrixRankBackMessage.prototype.getRoomtType = function () {
        return this._data.get("roomtType");
    };
    GrandPrixRankBackMessage.prototype.getPID = function () {
        return 2054;
    };
    GrandPrixRankBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    GrandPrixRankBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    GrandPrixRankBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return GrandPrixRankBackMessage;
}(MessageBase));
__reflect(GrandPrixRankBackMessage.prototype, "GrandPrixRankBackMessage");
//# sourceMappingURL=GrandPrixRankBackMessage.js.map