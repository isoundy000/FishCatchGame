//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DrawLotterySendMessage = (function (_super) {
    __extends(DrawLotterySendMessage, _super);
    function DrawLotterySendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("DrawLotterySend");
        return _this;
    }
    DrawLotterySendMessage.prototype.setGear = function (gear) {
        this._data.set("gear", gear);
    };
    DrawLotterySendMessage.prototype.getGear = function () {
        return this._data.get("gear");
    };
    DrawLotterySendMessage.prototype.getPID = function () {
        return 3018;
    };
    DrawLotterySendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    DrawLotterySendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    DrawLotterySendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return DrawLotterySendMessage;
}(MessageBase));
__reflect(DrawLotterySendMessage.prototype, "DrawLotterySendMessage");
//# sourceMappingURL=DrawLotterySendMessage.js.map