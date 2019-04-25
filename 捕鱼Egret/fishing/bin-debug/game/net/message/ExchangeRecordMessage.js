//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeRecordMessage = (function (_super) {
    __extends(ExchangeRecordMessage, _super);
    function ExchangeRecordMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("ExchangeRecord");
        return _this;
    }
    ExchangeRecordMessage.prototype.setRecordId = function (recordId) {
        this._data.set("recordId", recordId);
    };
    ExchangeRecordMessage.prototype.getRecordId = function () {
        return this._data.get("recordId");
    };
    ExchangeRecordMessage.prototype.setGoodsId = function (goodsId) {
        this._data.set("goodsId", goodsId);
    };
    ExchangeRecordMessage.prototype.getGoodsId = function () {
        return this._data.get("goodsId");
    };
    ExchangeRecordMessage.prototype.setTime = function (time) {
        this._data.set("time", time);
    };
    ExchangeRecordMessage.prototype.getTime = function () {
        return this._data.get("time");
    };
    ExchangeRecordMessage.prototype.setDeliveryState = function (deliveryState) {
        this._data.set("deliveryState", deliveryState);
    };
    ExchangeRecordMessage.prototype.getDeliveryState = function () {
        return this._data.get("deliveryState");
    };
    ExchangeRecordMessage.prototype.setReceiverName = function (receiverName) {
        this._data.set("receiverName", receiverName);
    };
    ExchangeRecordMessage.prototype.getReceiverName = function () {
        return this._data.get("receiverName");
    };
    ExchangeRecordMessage.prototype.setReceiverPhone = function (receiverPhone) {
        this._data.set("receiverPhone", receiverPhone);
    };
    ExchangeRecordMessage.prototype.getReceiverPhone = function () {
        return this._data.get("receiverPhone");
    };
    ExchangeRecordMessage.prototype.setReceiverQQ = function (receiverQQ) {
        this._data.set("receiverQQ", receiverQQ);
    };
    ExchangeRecordMessage.prototype.getReceiverQQ = function () {
        return this._data.get("receiverQQ");
    };
    ExchangeRecordMessage.prototype.setReceiverAddress = function (receiverAddress) {
        this._data.set("receiverAddress", receiverAddress);
    };
    ExchangeRecordMessage.prototype.getReceiverAddress = function () {
        return this._data.get("receiverAddress");
    };
    ExchangeRecordMessage.prototype.getPID = function () {
        return 2029;
    };
    ExchangeRecordMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ExchangeRecordMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ExchangeRecordMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ExchangeRecordMessage;
}(MessageBase));
__reflect(ExchangeRecordMessage.prototype, "ExchangeRecordMessage");
//# sourceMappingURL=ExchangeRecordMessage.js.map