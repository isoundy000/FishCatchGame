//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GunFishPosInfoMessageMessage = (function (_super) {
    __extends(GunFishPosInfoMessageMessage, _super);
    function GunFishPosInfoMessageMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("GunFishPosInfoMessage");
        return _this;
    }
    GunFishPosInfoMessageMessage.prototype.setFishPostList = function (fishPostList) {
        this._data.set("fishPostList", fishPostList);
    };
    GunFishPosInfoMessageMessage.prototype.getFishPostList = function () {
        return this._data.get("fishPostList");
    };
    GunFishPosInfoMessageMessage.prototype.getPID = function () {
        return 3011;
    };
    GunFishPosInfoMessageMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    GunFishPosInfoMessageMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    GunFishPosInfoMessageMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return GunFishPosInfoMessageMessage;
}(MessageBase));
__reflect(GunFishPosInfoMessageMessage.prototype, "GunFishPosInfoMessageMessage");
//# sourceMappingURL=GunFishPosInfoMessageMessage.js.map