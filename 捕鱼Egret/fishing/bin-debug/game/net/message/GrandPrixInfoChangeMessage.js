//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GrandPrixInfoChangeMessage = (function (_super) {
    __extends(GrandPrixInfoChangeMessage, _super);
    function GrandPrixInfoChangeMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("GrandPrixInfoChange");
        return _this;
    }
    GrandPrixInfoChangeMessage.prototype.setGrandPrixIntegral = function (grandPrixIntegral) {
        this._data.set("grandPrixIntegral", grandPrixIntegral);
    };
    GrandPrixInfoChangeMessage.prototype.getGrandPrixIntegral = function () {
        return this._data.get("grandPrixIntegral");
    };
    GrandPrixInfoChangeMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    GrandPrixInfoChangeMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    GrandPrixInfoChangeMessage.prototype.getPID = function () {
        return 3029;
    };
    GrandPrixInfoChangeMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    GrandPrixInfoChangeMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    GrandPrixInfoChangeMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return GrandPrixInfoChangeMessage;
}(MessageBase));
__reflect(GrandPrixInfoChangeMessage.prototype, "GrandPrixInfoChangeMessage");
//# sourceMappingURL=GrandPrixInfoChangeMessage.js.map