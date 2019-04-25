//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoomOnlineInfoMessage = (function (_super) {
    __extends(RoomOnlineInfoMessage, _super);
    function RoomOnlineInfoMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("RoomOnlineInfo");
        return _this;
    }
    RoomOnlineInfoMessage.prototype.setRoomType = function (roomType) {
        this._data.set("roomType", roomType);
    };
    RoomOnlineInfoMessage.prototype.getRoomType = function () {
        return this._data.get("roomType");
    };
    RoomOnlineInfoMessage.prototype.setNum = function (num) {
        this._data.set("num", num);
    };
    RoomOnlineInfoMessage.prototype.getNum = function () {
        return this._data.get("num");
    };
    RoomOnlineInfoMessage.prototype.getPID = function () {
        return 2058;
    };
    RoomOnlineInfoMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    RoomOnlineInfoMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    RoomOnlineInfoMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return RoomOnlineInfoMessage;
}(MessageBase));
__reflect(RoomOnlineInfoMessage.prototype, "RoomOnlineInfoMessage");
//# sourceMappingURL=RoomOnlineInfoMessage.js.map