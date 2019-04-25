//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LockItemEndMessage = (function (_super) {
    __extends(LockItemEndMessage, _super);
    function LockItemEndMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("LockItemEnd");
        return _this;
    }
    LockItemEndMessage.prototype.setItemId = function (itemId) {
        this._data.set("itemId", itemId);
    };
    LockItemEndMessage.prototype.getItemId = function () {
        return this._data.get("itemId");
    };
    LockItemEndMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    LockItemEndMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    LockItemEndMessage.prototype.getPID = function () {
        return 3021;
    };
    LockItemEndMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    LockItemEndMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    LockItemEndMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return LockItemEndMessage;
}(MessageBase));
__reflect(LockItemEndMessage.prototype, "LockItemEndMessage");
//# sourceMappingURL=LockItemEndMessage.js.map