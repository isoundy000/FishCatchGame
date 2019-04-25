//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeGoodsItemMessage = (function (_super) {
    __extends(ExchangeGoodsItemMessage, _super);
    function ExchangeGoodsItemMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);
        _this._clazz = builder.build("ExchangeGoodsItem");
        return _this;
    }
    ExchangeGoodsItemMessage.prototype.setId = function (id) {
        this._data.set("id", id);
    };
    ExchangeGoodsItemMessage.prototype.getId = function () {
        return this._data.get("id");
    };
    ExchangeGoodsItemMessage.prototype.setName = function (name) {
        this._data.set("name", name);
    };
    ExchangeGoodsItemMessage.prototype.getName = function () {
        return this._data.get("name");
    };
    ExchangeGoodsItemMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    ExchangeGoodsItemMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    ExchangeGoodsItemMessage.prototype.setExchangePriceId = function (exchangePriceId) {
        this._data.set("exchangePriceId", exchangePriceId);
    };
    ExchangeGoodsItemMessage.prototype.getExchangePriceId = function () {
        return this._data.get("exchangePriceId");
    };
    ExchangeGoodsItemMessage.prototype.setExchangePrice = function (exchangePrice) {
        this._data.set("exchangePrice", exchangePrice);
    };
    ExchangeGoodsItemMessage.prototype.getExchangePrice = function () {
        return this._data.get("exchangePrice");
    };
    ExchangeGoodsItemMessage.prototype.setInstruction = function (instruction) {
        this._data.set("instruction", instruction);
    };
    ExchangeGoodsItemMessage.prototype.getInstruction = function () {
        return this._data.get("instruction");
    };
    ExchangeGoodsItemMessage.prototype.setMarketPrice = function (marketPrice) {
        this._data.set("marketPrice", marketPrice);
    };
    ExchangeGoodsItemMessage.prototype.getMarketPrice = function () {
        return this._data.get("marketPrice");
    };
    ExchangeGoodsItemMessage.prototype.setUrl = function (url) {
        this._data.set("url", url);
    };
    ExchangeGoodsItemMessage.prototype.getUrl = function () {
        return this._data.get("url");
    };
    ExchangeGoodsItemMessage.prototype.setMinVip = function (minVip) {
        this._data.set("minVip", minVip);
    };
    ExchangeGoodsItemMessage.prototype.getMinVip = function () {
        return this._data.get("minVip");
    };
    ExchangeGoodsItemMessage.prototype.setGoodsId = function (goodsId) {
        this._data.set("goodsId", goodsId);
    };
    ExchangeGoodsItemMessage.prototype.getGoodsId = function () {
        return this._data.get("goodsId");
    };
    ExchangeGoodsItemMessage.prototype.setGoodsNum = function (goodsNum) {
        this._data.set("goodsNum", goodsNum);
    };
    ExchangeGoodsItemMessage.prototype.getGoodsNum = function () {
        return this._data.get("goodsNum");
    };
    ExchangeGoodsItemMessage.prototype.setServerNum = function (serverNum) {
        this._data.set("serverNum", serverNum);
    };
    ExchangeGoodsItemMessage.prototype.getServerNum = function () {
        return this._data.get("serverNum");
    };
    ExchangeGoodsItemMessage.prototype.setLoopRecordColor = function (loopRecordColor) {
        this._data.set("loopRecordColor", loopRecordColor);
    };
    ExchangeGoodsItemMessage.prototype.getLoopRecordColor = function () {
        return this._data.get("loopRecordColor");
    };
    ExchangeGoodsItemMessage.prototype.setOrders = function (orders) {
        this._data.set("orders", orders);
    };
    ExchangeGoodsItemMessage.prototype.getOrders = function () {
        return this._data.get("orders");
    };
    ExchangeGoodsItemMessage.prototype.setMinGunId = function (minGunId) {
        this._data.set("minGunId", minGunId);
    };
    ExchangeGoodsItemMessage.prototype.getMinGunId = function () {
        return this._data.get("minGunId");
    };
    ExchangeGoodsItemMessage.prototype.getPID = function () {
        return 1010;
    };
    ExchangeGoodsItemMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ExchangeGoodsItemMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ExchangeGoodsItemMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ExchangeGoodsItemMessage;
}(MessageBase));
__reflect(ExchangeGoodsItemMessage.prototype, "ExchangeGoodsItemMessage");
//# sourceMappingURL=ExchangeGoodsItemMessage.js.map