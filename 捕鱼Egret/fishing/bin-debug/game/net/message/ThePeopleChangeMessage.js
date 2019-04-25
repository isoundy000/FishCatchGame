//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ThePeopleChangeMessage = (function (_super) {
    __extends(ThePeopleChangeMessage, _super);
    function ThePeopleChangeMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("ThePeopleChange");
        return _this;
    }
    ThePeopleChangeMessage.prototype.setGrandPrixIntegral = function (grandPrixIntegral) {
        this._data.set("grandPrixIntegral", grandPrixIntegral);
    };
    ThePeopleChangeMessage.prototype.getGrandPrixIntegral = function () {
        return this._data.get("grandPrixIntegral");
    };
    ThePeopleChangeMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    ThePeopleChangeMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    ThePeopleChangeMessage.prototype.setFishId = function (fishId) {
        this._data.set("fishId", fishId);
    };
    ThePeopleChangeMessage.prototype.getFishId = function () {
        return this._data.get("fishId");
    };
    ThePeopleChangeMessage.prototype.getPID = function () {
        return 3030;
    };
    ThePeopleChangeMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ThePeopleChangeMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ThePeopleChangeMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ThePeopleChangeMessage;
}(MessageBase));
__reflect(ThePeopleChangeMessage.prototype, "ThePeopleChangeMessage");
//# sourceMappingURL=ThePeopleChangeMessage.js.map