//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MajorParameterChangeMessage = (function (_super) {
    __extends(MajorParameterChangeMessage, _super);
    function MajorParameterChangeMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("MajorParameterChange");
        return _this;
    }
    MajorParameterChangeMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    MajorParameterChangeMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    MajorParameterChangeMessage.prototype.setCoins = function (coins) {
        this._data.set("coins", coins);
    };
    MajorParameterChangeMessage.prototype.getCoins = function () {
        return this._data.get("coins");
    };
    MajorParameterChangeMessage.prototype.setGems = function (gems) {
        this._data.set("gems", gems);
    };
    MajorParameterChangeMessage.prototype.getGems = function () {
        return this._data.get("gems");
    };
    MajorParameterChangeMessage.prototype.setLevel = function (level) {
        this._data.set("level", level);
    };
    MajorParameterChangeMessage.prototype.getLevel = function () {
        return this._data.get("level");
    };
    MajorParameterChangeMessage.prototype.setItem = function (item) {
        this._data.set("item", item);
    };
    MajorParameterChangeMessage.prototype.getItem = function () {
        return this._data.get("item");
    };
    MajorParameterChangeMessage.prototype.setCoupon = function (coupon) {
        this._data.set("coupon", coupon);
    };
    MajorParameterChangeMessage.prototype.getCoupon = function () {
        return this._data.get("coupon");
    };
    MajorParameterChangeMessage.prototype.getPID = function () {
        return 2010;
    };
    MajorParameterChangeMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    MajorParameterChangeMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    MajorParameterChangeMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return MajorParameterChangeMessage;
}(MessageBase));
__reflect(MajorParameterChangeMessage.prototype, "MajorParameterChangeMessage");
//# sourceMappingURL=MajorParameterChangeMessage.js.map