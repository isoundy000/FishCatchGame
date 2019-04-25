//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UseItemBackMessage = (function (_super) {
    __extends(UseItemBackMessage, _super);
    function UseItemBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("UseItemBack");
        return _this;
    }
    UseItemBackMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    UseItemBackMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    UseItemBackMessage.prototype.setItemId = function (itemId) {
        this._data.set("itemId", itemId);
    };
    UseItemBackMessage.prototype.getItemId = function () {
        return this._data.get("itemId");
    };
    UseItemBackMessage.prototype.setAddFish = function (addFish) {
        this._data.set("addFish", addFish);
    };
    UseItemBackMessage.prototype.getAddFish = function () {
        return this._data.get("addFish");
    };
    UseItemBackMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    UseItemBackMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    UseItemBackMessage.prototype.setFrozenFishIds = function (frozenFishIds) {
        this._data.set("frozenFishIds", frozenFishIds);
    };
    UseItemBackMessage.prototype.getFrozenFishIds = function () {
        return this._data.get("frozenFishIds");
    };
    UseItemBackMessage.prototype.getPID = function () {
        return 3012;
    };
    UseItemBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    UseItemBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    UseItemBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return UseItemBackMessage;
}(MessageBase));
__reflect(UseItemBackMessage.prototype, "UseItemBackMessage");
//# sourceMappingURL=UseItemBackMessage.js.map