//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeGoodsBackMessage = (function (_super) {
    __extends(ExchangeGoodsBackMessage, _super);
    function ExchangeGoodsBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);
        _this._clazz = builder.build("ExchangeGoodsBack");
        return _this;
    }
    ExchangeGoodsBackMessage.prototype.setItemList = function (itemList) {
        this._data.set("itemList", itemList);
    };
    ExchangeGoodsBackMessage.prototype.getItemList = function () {
        return this._data.get("itemList");
    };
    ExchangeGoodsBackMessage.prototype.getPID = function () {
        return 1012;
    };
    ExchangeGoodsBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ExchangeGoodsBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ExchangeGoodsBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ExchangeGoodsBackMessage;
}(MessageBase));
__reflect(ExchangeGoodsBackMessage.prototype, "ExchangeGoodsBackMessage");
//# sourceMappingURL=ExchangeGoodsBackMessage.js.map