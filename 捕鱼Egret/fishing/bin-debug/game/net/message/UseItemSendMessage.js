//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UseItemSendMessage = (function (_super) {
    __extends(UseItemSendMessage, _super);
    function UseItemSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("UseItemSend");
        return _this;
    }
    UseItemSendMessage.prototype.setItemId = function (itemId) {
        this._data.set("itemId", itemId);
    };
    UseItemSendMessage.prototype.getItemId = function () {
        return this._data.get("itemId");
    };
    UseItemSendMessage.prototype.getPID = function () {
        return 3038;
    };
    UseItemSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    UseItemSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    UseItemSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return UseItemSendMessage;
}(MessageBase));
__reflect(UseItemSendMessage.prototype, "UseItemSendMessage");
//# sourceMappingURL=UseItemSendMessage.js.map