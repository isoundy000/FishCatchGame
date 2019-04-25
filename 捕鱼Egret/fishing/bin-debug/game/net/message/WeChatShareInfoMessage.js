//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WeChatShareInfoMessage = (function (_super) {
    __extends(WeChatShareInfoMessage, _super);
    function WeChatShareInfoMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("WeChatShareInfo");
        return _this;
    }
    WeChatShareInfoMessage.prototype.setNewbieAwardState = function (newbieAwardState) {
        this._data.set("newbieAwardState", newbieAwardState);
    };
    WeChatShareInfoMessage.prototype.getNewbieAwardState = function () {
        return this._data.get("newbieAwardState");
    };
    WeChatShareInfoMessage.prototype.setInvitedUserNum = function (invitedUserNum) {
        this._data.set("invitedUserNum", invitedUserNum);
    };
    WeChatShareInfoMessage.prototype.getInvitedUserNum = function () {
        return this._data.get("invitedUserNum");
    };
    WeChatShareInfoMessage.prototype.setTodayShareTimes = function (todayShareTimes) {
        this._data.set("todayShareTimes", todayShareTimes);
    };
    WeChatShareInfoMessage.prototype.getTodayShareTimes = function () {
        return this._data.get("todayShareTimes");
    };
    WeChatShareInfoMessage.prototype.getPID = function () {
        return 2065;
    };
    WeChatShareInfoMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    WeChatShareInfoMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    WeChatShareInfoMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return WeChatShareInfoMessage;
}(MessageBase));
__reflect(WeChatShareInfoMessage.prototype, "WeChatShareInfoMessage");
//# sourceMappingURL=WeChatShareInfoMessage.js.map