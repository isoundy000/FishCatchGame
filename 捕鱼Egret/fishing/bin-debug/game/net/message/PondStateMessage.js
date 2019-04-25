//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PondStateMessage = (function (_super) {
    __extends(PondStateMessage, _super);
    function PondStateMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("PondState");
        return _this;
    }
    PondStateMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    PondStateMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    PondStateMessage.prototype.setFishId = function (fishId) {
        this._data.set("fishId", fishId);
    };
    PondStateMessage.prototype.getFishId = function () {
        return this._data.get("fishId");
    };
    PondStateMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    PondStateMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    PondStateMessage.prototype.getPID = function () {
        return 3010;
    };
    PondStateMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    PondStateMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    PondStateMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return PondStateMessage;
}(MessageBase));
__reflect(PondStateMessage.prototype, "PondStateMessage");
//# sourceMappingURL=PondStateMessage.js.map