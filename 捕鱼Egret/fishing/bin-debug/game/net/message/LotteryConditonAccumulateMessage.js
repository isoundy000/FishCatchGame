//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LotteryConditonAccumulateMessage = (function (_super) {
    __extends(LotteryConditonAccumulateMessage, _super);
    function LotteryConditonAccumulateMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("LotteryConditonAccumulate");
        return _this;
    }
    LotteryConditonAccumulateMessage.prototype.setIntegral = function (integral) {
        this._data.set("integral", integral);
    };
    LotteryConditonAccumulateMessage.prototype.getIntegral = function () {
        return this._data.get("integral");
    };
    LotteryConditonAccumulateMessage.prototype.setKillNum = function (killNum) {
        this._data.set("killNum", killNum);
    };
    LotteryConditonAccumulateMessage.prototype.getKillNum = function () {
        return this._data.get("killNum");
    };
    LotteryConditonAccumulateMessage.prototype.setTodayDrawTimes = function (todayDrawTimes) {
        this._data.set("todayDrawTimes", todayDrawTimes);
    };
    LotteryConditonAccumulateMessage.prototype.getTodayDrawTimes = function () {
        return this._data.get("todayDrawTimes");
    };
    LotteryConditonAccumulateMessage.prototype.getPID = function () {
        return 3017;
    };
    LotteryConditonAccumulateMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    LotteryConditonAccumulateMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    LotteryConditonAccumulateMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return LotteryConditonAccumulateMessage;
}(MessageBase));
__reflect(LotteryConditonAccumulateMessage.prototype, "LotteryConditonAccumulateMessage");
//# sourceMappingURL=LotteryConditonAccumulateMessage.js.map