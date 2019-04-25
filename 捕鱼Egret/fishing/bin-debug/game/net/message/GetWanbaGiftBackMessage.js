//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GetWanbaGiftBackMessage = (function (_super) {
    __extends(GetWanbaGiftBackMessage, _super);
    function GetWanbaGiftBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("GetWanbaGiftBack");
        return _this;
    }
    GetWanbaGiftBackMessage.prototype.setResult = function (result) {
        this._data.set("result", result);
    };
    GetWanbaGiftBackMessage.prototype.getResult = function () {
        return this._data.get("result");
    };
    GetWanbaGiftBackMessage.prototype.setRewardList = function (rewardList) {
        this._data.set("rewardList", rewardList);
    };
    GetWanbaGiftBackMessage.prototype.getRewardList = function () {
        return this._data.get("rewardList");
    };
    GetWanbaGiftBackMessage.prototype.getPID = function () {
        return 2046;
    };
    GetWanbaGiftBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    GetWanbaGiftBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    GetWanbaGiftBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return GetWanbaGiftBackMessage;
}(MessageBase));
__reflect(GetWanbaGiftBackMessage.prototype, "GetWanbaGiftBackMessage");
//# sourceMappingURL=GetWanbaGiftBackMessage.js.map