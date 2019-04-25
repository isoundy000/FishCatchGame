//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChangeGunSendMessage = (function (_super) {
    __extends(ChangeGunSendMessage, _super);
    function ChangeGunSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("ChangeGunSend");
        return _this;
    }
    ChangeGunSendMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    ChangeGunSendMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    ChangeGunSendMessage.prototype.setSkinId = function (skinId) {
        this._data.set("skinId", skinId);
    };
    ChangeGunSendMessage.prototype.getSkinId = function () {
        return this._data.get("skinId");
    };
    ChangeGunSendMessage.prototype.getPID = function () {
        return 3013;
    };
    ChangeGunSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ChangeGunSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ChangeGunSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ChangeGunSendMessage;
}(MessageBase));
__reflect(ChangeGunSendMessage.prototype, "ChangeGunSendMessage");
//# sourceMappingURL=ChangeGunSendMessage.js.map