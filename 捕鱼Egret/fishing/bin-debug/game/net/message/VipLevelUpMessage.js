//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VipLevelUpMessage = (function (_super) {
    __extends(VipLevelUpMessage, _super);
    function VipLevelUpMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("VipLevelUp");
        return _this;
    }
    VipLevelUpMessage.prototype.setOldLevel = function (oldLevel) {
        this._data.set("oldLevel", oldLevel);
    };
    VipLevelUpMessage.prototype.getOldLevel = function () {
        return this._data.get("oldLevel");
    };
    VipLevelUpMessage.prototype.setNewLevel = function (newLevel) {
        this._data.set("newLevel", newLevel);
    };
    VipLevelUpMessage.prototype.getNewLevel = function () {
        return this._data.get("newLevel");
    };
    VipLevelUpMessage.prototype.getPID = function () {
        return 3026;
    };
    VipLevelUpMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    VipLevelUpMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    VipLevelUpMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return VipLevelUpMessage;
}(MessageBase));
__reflect(VipLevelUpMessage.prototype, "VipLevelUpMessage");
//# sourceMappingURL=VipLevelUpMessage.js.map