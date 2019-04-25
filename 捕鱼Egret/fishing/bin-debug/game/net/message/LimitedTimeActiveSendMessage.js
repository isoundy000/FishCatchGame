//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LimitedTimeActiveSendMessage = (function (_super) {
    __extends(LimitedTimeActiveSendMessage, _super);
    function LimitedTimeActiveSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("LimitedTimeActiveSend");
        return _this;
    }
    LimitedTimeActiveSendMessage.prototype.setId = function (id) {
        this._data.set("id", id);
    };
    LimitedTimeActiveSendMessage.prototype.getId = function () {
        return this._data.get("id");
    };
    LimitedTimeActiveSendMessage.prototype.setGoodsId = function (goodsId) {
        this._data.set("goodsId", goodsId);
    };
    LimitedTimeActiveSendMessage.prototype.getGoodsId = function () {
        return this._data.get("goodsId");
    };
    LimitedTimeActiveSendMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    LimitedTimeActiveSendMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    LimitedTimeActiveSendMessage.prototype.setPriceIndex = function (priceIndex) {
        this._data.set("priceIndex", priceIndex);
    };
    LimitedTimeActiveSendMessage.prototype.getPriceIndex = function () {
        return this._data.get("priceIndex");
    };
    LimitedTimeActiveSendMessage.prototype.getPID = function () {
        return 2063;
    };
    LimitedTimeActiveSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    LimitedTimeActiveSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    LimitedTimeActiveSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return LimitedTimeActiveSendMessage;
}(MessageBase));
__reflect(LimitedTimeActiveSendMessage.prototype, "LimitedTimeActiveSendMessage");
//# sourceMappingURL=LimitedTimeActiveSendMessage.js.map