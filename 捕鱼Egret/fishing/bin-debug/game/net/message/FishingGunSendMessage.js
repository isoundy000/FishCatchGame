//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FishingGunSendMessage = (function (_super) {
    __extends(FishingGunSendMessage, _super);
    function FishingGunSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("FishingGunSend");
        return _this;
    }
    FishingGunSendMessage.prototype.setAngle = function (angle) {
        this._data.set("angle", angle);
    };
    FishingGunSendMessage.prototype.getAngle = function () {
        return this._data.get("angle");
    };
    FishingGunSendMessage.prototype.setGunIndex = function (gunIndex) {
        this._data.set("gunIndex", gunIndex);
    };
    FishingGunSendMessage.prototype.getGunIndex = function () {
        return this._data.get("gunIndex");
    };
    FishingGunSendMessage.prototype.setBulletId = function (bulletId) {
        this._data.set("bulletId", bulletId);
    };
    FishingGunSendMessage.prototype.getBulletId = function () {
        return this._data.get("bulletId");
    };
    FishingGunSendMessage.prototype.getPID = function () {
        return 3001;
    };
    FishingGunSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    FishingGunSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    FishingGunSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return FishingGunSendMessage;
}(MessageBase));
__reflect(FishingGunSendMessage.prototype, "FishingGunSendMessage");
//# sourceMappingURL=FishingGunSendMessage.js.map