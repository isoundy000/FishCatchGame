//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FishPosInfoMessage = (function (_super) {
    __extends(FishPosInfoMessage, _super);
    function FishPosInfoMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("FishPosInfo");
        return _this;
    }
    FishPosInfoMessage.prototype.setGroupId = function (groupId) {
        this._data.set("groupId", groupId);
    };
    FishPosInfoMessage.prototype.getGroupId = function () {
        return this._data.get("groupId");
    };
    FishPosInfoMessage.prototype.setFishId = function (fishId) {
        this._data.set("fishId", fishId);
    };
    FishPosInfoMessage.prototype.getFishId = function () {
        return this._data.get("fishId");
    };
    FishPosInfoMessage.prototype.setPos = function (pos) {
        this._data.set("pos", pos);
    };
    FishPosInfoMessage.prototype.getPos = function () {
        return this._data.get("pos");
    };
    FishPosInfoMessage.prototype.getPID = function () {
        return 3040;
    };
    FishPosInfoMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    FishPosInfoMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    FishPosInfoMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return FishPosInfoMessage;
}(MessageBase));
__reflect(FishPosInfoMessage.prototype, "FishPosInfoMessage");
//# sourceMappingURL=FishPosInfoMessage.js.map