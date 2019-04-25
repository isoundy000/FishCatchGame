//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GetWanbaGiftMessage = (function (_super) {
    __extends(GetWanbaGiftMessage, _super);
    function GetWanbaGiftMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("GetWanbaGift");
        return _this;
    }
    GetWanbaGiftMessage.prototype.setGiftId = function (giftId) {
        this._data.set("giftId", giftId);
    };
    GetWanbaGiftMessage.prototype.getGiftId = function () {
        return this._data.get("giftId");
    };
    GetWanbaGiftMessage.prototype.getPID = function () {
        return 2045;
    };
    GetWanbaGiftMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    GetWanbaGiftMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    GetWanbaGiftMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return GetWanbaGiftMessage;
}(MessageBase));
__reflect(GetWanbaGiftMessage.prototype, "GetWanbaGiftMessage");
//# sourceMappingURL=GetWanbaGiftMessage.js.map