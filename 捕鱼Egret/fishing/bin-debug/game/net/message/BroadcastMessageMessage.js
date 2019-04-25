//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BroadcastMessageMessage = (function (_super) {
    __extends(BroadcastMessageMessage, _super);
    function BroadcastMessageMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);
        _this._clazz = builder.build("BroadcastMessage");
        return _this;
    }
    BroadcastMessageMessage.prototype.setBroadType = function (broadType) {
        this._data.set("broadType", broadType);
    };
    BroadcastMessageMessage.prototype.getBroadType = function () {
        return this._data.get("broadType");
    };
    BroadcastMessageMessage.prototype.setMsg = function (msg) {
        this._data.set("msg", msg);
    };
    BroadcastMessageMessage.prototype.getMsg = function () {
        return this._data.get("msg");
    };
    BroadcastMessageMessage.prototype.setLangId = function (langId) {
        this._data.set("langId", langId);
    };
    BroadcastMessageMessage.prototype.getLangId = function () {
        return this._data.get("langId");
    };
    BroadcastMessageMessage.prototype.setParams = function (params) {
        this._data.set("params", params);
    };
    BroadcastMessageMessage.prototype.getParams = function () {
        return this._data.get("params");
    };
    BroadcastMessageMessage.prototype.getPID = function () {
        return 1007;
    };
    BroadcastMessageMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    BroadcastMessageMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    BroadcastMessageMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return BroadcastMessageMessage;
}(MessageBase));
__reflect(BroadcastMessageMessage.prototype, "BroadcastMessageMessage");
//# sourceMappingURL=BroadcastMessageMessage.js.map