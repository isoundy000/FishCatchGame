//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SmallHornBackMessage = (function (_super) {
    __extends(SmallHornBackMessage, _super);
    function SmallHornBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("SmallHornBack");
        return _this;
    }
    SmallHornBackMessage.prototype.setResult = function (result) {
        this._data.set("result", result);
    };
    SmallHornBackMessage.prototype.getResult = function () {
        return this._data.get("result");
    };
    SmallHornBackMessage.prototype.getPID = function () {
        return 3042;
    };
    SmallHornBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    SmallHornBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    SmallHornBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return SmallHornBackMessage;
}(MessageBase));
__reflect(SmallHornBackMessage.prototype, "SmallHornBackMessage");
//# sourceMappingURL=SmallHornBackMessage.js.map