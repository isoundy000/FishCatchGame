//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CommonStatusMessage = (function (_super) {
    __extends(CommonStatusMessage, _super);
    function CommonStatusMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);
        _this._clazz = builder.build("CommonStatus");
        return _this;
    }
    CommonStatusMessage.prototype.setStatus = function (status) {
        this._data.set("status", status);
    };
    CommonStatusMessage.prototype.getStatus = function () {
        return this._data.get("status");
    };
    CommonStatusMessage.prototype.getPID = function () {
        return 1002;
    };
    CommonStatusMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    CommonStatusMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    CommonStatusMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return CommonStatusMessage;
}(MessageBase));
__reflect(CommonStatusMessage.prototype, "CommonStatusMessage");
//# sourceMappingURL=CommonStatusMessage.js.map