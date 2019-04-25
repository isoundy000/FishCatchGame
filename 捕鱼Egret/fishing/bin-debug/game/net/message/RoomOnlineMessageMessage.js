//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoomOnlineMessageMessage = (function (_super) {
    __extends(RoomOnlineMessageMessage, _super);
    function RoomOnlineMessageMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("RoomOnlineMessage");
        return _this;
    }
    RoomOnlineMessageMessage.prototype.setOnlineList = function (onlineList) {
        this._data.set("onlineList", onlineList);
    };
    RoomOnlineMessageMessage.prototype.getOnlineList = function () {
        return this._data.get("onlineList");
    };
    RoomOnlineMessageMessage.prototype.getPID = function () {
        return 2059;
    };
    RoomOnlineMessageMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    RoomOnlineMessageMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    RoomOnlineMessageMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return RoomOnlineMessageMessage;
}(MessageBase));
__reflect(RoomOnlineMessageMessage.prototype, "RoomOnlineMessageMessage");
//# sourceMappingURL=RoomOnlineMessageMessage.js.map