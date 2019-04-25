//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShopBuyMessage = (function (_super) {
    __extends(ShopBuyMessage, _super);
    function ShopBuyMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("ShopBuy");
        return _this;
    }
    ShopBuyMessage.prototype.setShopId = function (shopId) {
        this._data.set("shopId", shopId);
    };
    ShopBuyMessage.prototype.getShopId = function () {
        return this._data.get("shopId");
    };
    ShopBuyMessage.prototype.getPID = function () {
        return 2035;
    };
    ShopBuyMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ShopBuyMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ShopBuyMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ShopBuyMessage;
}(MessageBase));
__reflect(ShopBuyMessage.prototype, "ShopBuyMessage");
//# sourceMappingURL=ShopBuyMessage.js.map