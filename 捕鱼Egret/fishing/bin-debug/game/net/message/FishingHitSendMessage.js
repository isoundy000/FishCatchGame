//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FishingHitSendMessage = (function (_super) {
    __extends(FishingHitSendMessage, _super);
    function FishingHitSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("FishingHitSend");
        return _this;
    }
    FishingHitSendMessage.prototype.setFishId = function (fishId) {
        this._data.set("fishId", fishId);
    };
    FishingHitSendMessage.prototype.getFishId = function () {
        return this._data.get("fishId");
    };
    FishingHitSendMessage.prototype.setBulletId = function (bulletId) {
        this._data.set("bulletId", bulletId);
    };
    FishingHitSendMessage.prototype.getBulletId = function () {
        return this._data.get("bulletId");
    };
    FishingHitSendMessage.prototype.getPID = function () {
        return 3003;
    };
    FishingHitSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    FishingHitSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    FishingHitSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return FishingHitSendMessage;
}(MessageBase));
__reflect(FishingHitSendMessage.prototype, "FishingHitSendMessage");
//# sourceMappingURL=FishingHitSendMessage.js.map