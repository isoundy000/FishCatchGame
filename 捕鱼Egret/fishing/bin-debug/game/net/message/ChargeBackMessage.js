//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChargeBackMessage = (function (_super) {
    __extends(ChargeBackMessage, _super);
    function ChargeBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("ChargeBack");
        return _this;
    }
    ChargeBackMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    ChargeBackMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    ChargeBackMessage.prototype.setIsFirst = function (isFirst) {
        this._data.set("isFirst", isFirst);
    };
    ChargeBackMessage.prototype.getIsFirst = function () {
        return this._data.get("isFirst");
    };
    ChargeBackMessage.prototype.setChargeId = function (chargeId) {
        this._data.set("chargeId", chargeId);
    };
    ChargeBackMessage.prototype.getChargeId = function () {
        return this._data.get("chargeId");
    };
    ChargeBackMessage.prototype.setCurCoupon = function (curCoupon) {
        this._data.set("curCoupon", curCoupon);
    };
    ChargeBackMessage.prototype.getCurCoupon = function () {
        return this._data.get("curCoupon");
    };
    ChargeBackMessage.prototype.setMonthEndTime = function (monthEndTime) {
        this._data.set("monthEndTime", monthEndTime);
    };
    ChargeBackMessage.prototype.getMonthEndTime = function () {
        return this._data.get("monthEndTime");
    };
    ChargeBackMessage.prototype.setVipExp = function (vipExp) {
        this._data.set("vipExp", vipExp);
    };
    ChargeBackMessage.prototype.getVipExp = function () {
        return this._data.get("vipExp");
    };
    ChargeBackMessage.prototype.setVipLevel = function (vipLevel) {
        this._data.set("vipLevel", vipLevel);
    };
    ChargeBackMessage.prototype.getVipLevel = function () {
        return this._data.get("vipLevel");
    };
    ChargeBackMessage.prototype.getPID = function () {
        return 2038;
    };
    ChargeBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ChargeBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ChargeBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ChargeBackMessage;
}(MessageBase));
__reflect(ChargeBackMessage.prototype, "ChargeBackMessage");
//# sourceMappingURL=ChargeBackMessage.js.map