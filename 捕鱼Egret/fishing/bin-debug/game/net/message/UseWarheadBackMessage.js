//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UseWarheadBackMessage = (function (_super) {
    __extends(UseWarheadBackMessage, _super);
    function UseWarheadBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("UseWarheadBack");
        return _this;
    }
    UseWarheadBackMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    UseWarheadBackMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    UseWarheadBackMessage.prototype.setUniId = function (uniId) {
        this._data.set("uniId", uniId);
    };
    UseWarheadBackMessage.prototype.getUniId = function () {
        return this._data.get("uniId");
    };
    UseWarheadBackMessage.prototype.setAddCoins = function (addCoins) {
        this._data.set("addCoins", addCoins);
    };
    UseWarheadBackMessage.prototype.getAddCoins = function () {
        return this._data.get("addCoins");
    };
    UseWarheadBackMessage.prototype.getPID = function () {
        return 3016;
    };
    UseWarheadBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    UseWarheadBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    UseWarheadBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return UseWarheadBackMessage;
}(MessageBase));
__reflect(UseWarheadBackMessage.prototype, "UseWarheadBackMessage");
//# sourceMappingURL=UseWarheadBackMessage.js.map