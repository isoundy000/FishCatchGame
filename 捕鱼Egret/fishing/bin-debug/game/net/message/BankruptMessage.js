//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BankruptMessage = (function (_super) {
    __extends(BankruptMessage, _super);
    function BankruptMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("Bankrupt");
        return _this;
    }
    BankruptMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    BankruptMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    BankruptMessage.prototype.setCanReliefTime = function (canReliefTime) {
        this._data.set("canReliefTime", canReliefTime);
    };
    BankruptMessage.prototype.getCanReliefTime = function () {
        return this._data.get("canReliefTime");
    };
    BankruptMessage.prototype.setCoins = function (coins) {
        this._data.set("coins", coins);
    };
    BankruptMessage.prototype.getCoins = function () {
        return this._data.get("coins");
    };
    BankruptMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    BankruptMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    BankruptMessage.prototype.getPID = function () {
        return 2017;
    };
    BankruptMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    BankruptMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    BankruptMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return BankruptMessage;
}(MessageBase));
__reflect(BankruptMessage.prototype, "BankruptMessage");
//# sourceMappingURL=BankruptMessage.js.map