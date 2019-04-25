//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GiveItemBackMessage = (function (_super) {
    __extends(GiveItemBackMessage, _super);
    function GiveItemBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("GiveItemBack");
        return _this;
    }
    GiveItemBackMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    GiveItemBackMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    GiveItemBackMessage.prototype.getPID = function () {
        return 2024;
    };
    GiveItemBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    GiveItemBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    GiveItemBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return GiveItemBackMessage;
}(MessageBase));
__reflect(GiveItemBackMessage.prototype, "GiveItemBackMessage");
//# sourceMappingURL=GiveItemBackMessage.js.map