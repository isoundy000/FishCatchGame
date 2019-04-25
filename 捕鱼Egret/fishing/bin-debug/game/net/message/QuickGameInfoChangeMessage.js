//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var QuickGameInfoChangeMessage = (function (_super) {
    __extends(QuickGameInfoChangeMessage, _super);
    function QuickGameInfoChangeMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("QuickGameInfoChange");
        return _this;
    }
    QuickGameInfoChangeMessage.prototype.setIntegral = function (integral) {
        this._data.set("integral", integral);
    };
    QuickGameInfoChangeMessage.prototype.getIntegral = function () {
        return this._data.get("integral");
    };
    QuickGameInfoChangeMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    QuickGameInfoChangeMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    QuickGameInfoChangeMessage.prototype.setFishId = function (fishId) {
        this._data.set("fishId", fishId);
    };
    QuickGameInfoChangeMessage.prototype.getFishId = function () {
        return this._data.get("fishId");
    };
    QuickGameInfoChangeMessage.prototype.getPID = function () {
        return 3031;
    };
    QuickGameInfoChangeMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    QuickGameInfoChangeMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    QuickGameInfoChangeMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return QuickGameInfoChangeMessage;
}(MessageBase));
__reflect(QuickGameInfoChangeMessage.prototype, "QuickGameInfoChangeMessage");
//# sourceMappingURL=QuickGameInfoChangeMessage.js.map