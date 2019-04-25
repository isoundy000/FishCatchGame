//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ItemProtoMessage = (function (_super) {
    __extends(ItemProtoMessage, _super);
    function ItemProtoMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("ItemProto");
        return _this;
    }
    ItemProtoMessage.prototype.setItemId = function (itemId) {
        this._data.set("itemId", itemId);
    };
    ItemProtoMessage.prototype.getItemId = function () {
        return this._data.get("itemId");
    };
    ItemProtoMessage.prototype.setCount = function (count) {
        this._data.set("count", count);
    };
    ItemProtoMessage.prototype.getCount = function () {
        return this._data.get("count");
    };
    ItemProtoMessage.prototype.setExpried = function (expried) {
        this._data.set("expried", expried);
    };
    ItemProtoMessage.prototype.getExpried = function () {
        return this._data.get("expried");
    };
    ItemProtoMessage.prototype.getPID = function () {
        return 3006;
    };
    ItemProtoMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ItemProtoMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ItemProtoMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ItemProtoMessage;
}(MessageBase));
__reflect(ItemProtoMessage.prototype, "ItemProtoMessage");
//# sourceMappingURL=ItemProtoMessage.js.map