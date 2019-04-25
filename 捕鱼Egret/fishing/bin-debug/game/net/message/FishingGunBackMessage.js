//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FishingGunBackMessage = (function (_super) {
    __extends(FishingGunBackMessage, _super);
    function FishingGunBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("FishingGunBack");
        return _this;
    }
    FishingGunBackMessage.prototype.setUid = function (uid) {
        this._data.set("uid", uid);
    };
    FishingGunBackMessage.prototype.getUid = function () {
        return this._data.get("uid");
    };
    FishingGunBackMessage.prototype.setGun = function (gun) {
        this._data.set("gun", gun);
    };
    FishingGunBackMessage.prototype.getGun = function () {
        return this._data.get("gun");
    };
    FishingGunBackMessage.prototype.getPID = function () {
        return 3002;
    };
    FishingGunBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    FishingGunBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    FishingGunBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return FishingGunBackMessage;
}(MessageBase));
__reflect(FishingGunBackMessage.prototype, "FishingGunBackMessage");
//# sourceMappingURL=FishingGunBackMessage.js.map