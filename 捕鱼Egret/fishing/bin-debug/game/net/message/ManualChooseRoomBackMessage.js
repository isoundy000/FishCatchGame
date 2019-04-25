//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ManualChooseRoomBackMessage = (function (_super) {
    __extends(ManualChooseRoomBackMessage, _super);
    function ManualChooseRoomBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("ManualChooseRoomBack");
        return _this;
    }
    ManualChooseRoomBackMessage.prototype.setServerInfo = function (serverInfo) {
        this._data.set("serverInfo", serverInfo);
    };
    ManualChooseRoomBackMessage.prototype.getServerInfo = function () {
        return this._data.get("serverInfo");
    };
    ManualChooseRoomBackMessage.prototype.setRoomInfo = function (roomInfo) {
        this._data.set("roomInfo", roomInfo);
    };
    ManualChooseRoomBackMessage.prototype.getRoomInfo = function () {
        return this._data.get("roomInfo");
    };
    ManualChooseRoomBackMessage.prototype.getPID = function () {
        return 2015;
    };
    ManualChooseRoomBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ManualChooseRoomBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ManualChooseRoomBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ManualChooseRoomBackMessage;
}(MessageBase));
__reflect(ManualChooseRoomBackMessage.prototype, "ManualChooseRoomBackMessage");
//# sourceMappingURL=ManualChooseRoomBackMessage.js.map