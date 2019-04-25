//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CommonRequestMessage = (function (_super) {
    __extends(CommonRequestMessage, _super);
    function CommonRequestMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);
        _this._clazz = builder.build("CommonRequest");
        return _this;
    }
    CommonRequestMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    CommonRequestMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    CommonRequestMessage.prototype.getPID = function () {
        return 1004;
    };
    CommonRequestMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    CommonRequestMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    CommonRequestMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return CommonRequestMessage;
}(MessageBase));
__reflect(CommonRequestMessage.prototype, "CommonRequestMessage");
//# sourceMappingURL=CommonRequestMessage.js.map