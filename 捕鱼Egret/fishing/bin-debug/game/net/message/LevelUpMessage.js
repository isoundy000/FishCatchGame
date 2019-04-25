//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LevelUpMessage = (function (_super) {
    __extends(LevelUpMessage, _super);
    function LevelUpMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("LevelUp");
        return _this;
    }
    LevelUpMessage.prototype.setOldLevel = function (oldLevel) {
        this._data.set("oldLevel", oldLevel);
    };
    LevelUpMessage.prototype.getOldLevel = function () {
        return this._data.get("oldLevel");
    };
    LevelUpMessage.prototype.setNewLevel = function (newLevel) {
        this._data.set("newLevel", newLevel);
    };
    LevelUpMessage.prototype.getNewLevel = function () {
        return this._data.get("newLevel");
    };
    LevelUpMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    LevelUpMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    LevelUpMessage.prototype.getPID = function () {
        return 3024;
    };
    LevelUpMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    LevelUpMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    LevelUpMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return LevelUpMessage;
}(MessageBase));
__reflect(LevelUpMessage.prototype, "LevelUpMessage");
//# sourceMappingURL=LevelUpMessage.js.map