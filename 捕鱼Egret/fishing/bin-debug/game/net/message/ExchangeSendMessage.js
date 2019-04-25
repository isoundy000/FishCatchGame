//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeSendMessage = (function (_super) {
    __extends(ExchangeSendMessage, _super);
    function ExchangeSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("ExchangeSend");
        return _this;
    }
    ExchangeSendMessage.prototype.setGoodsId = function (goodsId) {
        this._data.set("goodsId", goodsId);
    };
    ExchangeSendMessage.prototype.getGoodsId = function () {
        return this._data.get("goodsId");
    };
    ExchangeSendMessage.prototype.setReceiverName = function (receiverName) {
        this._data.set("receiverName", receiverName);
    };
    ExchangeSendMessage.prototype.getReceiverName = function () {
        return this._data.get("receiverName");
    };
    ExchangeSendMessage.prototype.setReceiverPhone = function (receiverPhone) {
        this._data.set("receiverPhone", receiverPhone);
    };
    ExchangeSendMessage.prototype.getReceiverPhone = function () {
        return this._data.get("receiverPhone");
    };
    ExchangeSendMessage.prototype.setReceiverQQ = function (receiverQQ) {
        this._data.set("receiverQQ", receiverQQ);
    };
    ExchangeSendMessage.prototype.getReceiverQQ = function () {
        return this._data.get("receiverQQ");
    };
    ExchangeSendMessage.prototype.setReceiverAddress = function (receiverAddress) {
        this._data.set("receiverAddress", receiverAddress);
    };
    ExchangeSendMessage.prototype.getReceiverAddress = function () {
        return this._data.get("receiverAddress");
    };
    ExchangeSendMessage.prototype.setReceiverWX = function (receiverWX) {
        this._data.set("receiverWX", receiverWX);
    };
    ExchangeSendMessage.prototype.getReceiverWX = function () {
        return this._data.get("receiverWX");
    };
    ExchangeSendMessage.prototype.setReceiverZFB = function (receiverZFB) {
        this._data.set("receiverZFB", receiverZFB);
    };
    ExchangeSendMessage.prototype.getReceiverZFB = function () {
        return this._data.get("receiverZFB");
    };
    ExchangeSendMessage.prototype.getPID = function () {
        return 2027;
    };
    ExchangeSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ExchangeSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ExchangeSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ExchangeSendMessage;
}(MessageBase));
__reflect(ExchangeSendMessage.prototype, "ExchangeSendMessage");
//# sourceMappingURL=ExchangeSendMessage.js.map