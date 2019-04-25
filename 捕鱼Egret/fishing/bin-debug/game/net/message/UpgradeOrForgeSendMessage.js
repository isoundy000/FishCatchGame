//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UpgradeOrForgeSendMessage = (function (_super) {
    __extends(UpgradeOrForgeSendMessage, _super);
    function UpgradeOrForgeSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("UpgradeOrForgeSend");
        return _this;
    }
    UpgradeOrForgeSendMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    UpgradeOrForgeSendMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    UpgradeOrForgeSendMessage.prototype.getPID = function () {
        return 3022;
    };
    UpgradeOrForgeSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    UpgradeOrForgeSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    UpgradeOrForgeSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return UpgradeOrForgeSendMessage;
}(MessageBase));
__reflect(UpgradeOrForgeSendMessage.prototype, "UpgradeOrForgeSendMessage");
//# sourceMappingURL=UpgradeOrForgeSendMessage.js.map