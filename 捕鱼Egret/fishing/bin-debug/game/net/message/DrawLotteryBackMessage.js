//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DrawLotteryBackMessage = (function (_super) {
    __extends(DrawLotteryBackMessage, _super);
    function DrawLotteryBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("DrawLotteryBack");
        return _this;
    }
    DrawLotteryBackMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    DrawLotteryBackMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    DrawLotteryBackMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    DrawLotteryBackMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    DrawLotteryBackMessage.prototype.setItemIndex = function (itemIndex) {
        this._data.set("itemIndex", itemIndex);
    };
    DrawLotteryBackMessage.prototype.getItemIndex = function () {
        return this._data.get("itemIndex");
    };
    DrawLotteryBackMessage.prototype.getPID = function () {
        return 3019;
    };
    DrawLotteryBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    DrawLotteryBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    DrawLotteryBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return DrawLotteryBackMessage;
}(MessageBase));
__reflect(DrawLotteryBackMessage.prototype, "DrawLotteryBackMessage");
//# sourceMappingURL=DrawLotteryBackMessage.js.map