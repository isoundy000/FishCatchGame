//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SyncFishPosInfoMessage = (function (_super) {
    __extends(SyncFishPosInfoMessage, _super);
    function SyncFishPosInfoMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("SyncFishPosInfo");
        return _this;
    }
    SyncFishPosInfoMessage.prototype.setGroupIdList = function (groupIdList) {
        this._data.set("groupIdList", groupIdList);
    };
    SyncFishPosInfoMessage.prototype.getGroupIdList = function () {
        return this._data.get("groupIdList");
    };
    SyncFishPosInfoMessage.prototype.getPID = function () {
        return 3039;
    };
    SyncFishPosInfoMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    SyncFishPosInfoMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    SyncFishPosInfoMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return SyncFishPosInfoMessage;
}(MessageBase));
__reflect(SyncFishPosInfoMessage.prototype, "SyncFishPosInfoMessage");
//# sourceMappingURL=SyncFishPosInfoMessage.js.map