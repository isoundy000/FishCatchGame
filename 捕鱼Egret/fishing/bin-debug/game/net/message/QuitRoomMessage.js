//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var QuitRoomMessage = (function (_super) {
    __extends(QuitRoomMessage, _super);
    function QuitRoomMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("QuitRoom");
        return _this;
    }
    QuitRoomMessage.prototype.setPosition = function (position) {
        this._data.set("position", position);
    };
    QuitRoomMessage.prototype.getPosition = function () {
        return this._data.get("position");
    };
    QuitRoomMessage.prototype.setPlayerId = function (playerId) {
        this._data.set("playerId", playerId);
    };
    QuitRoomMessage.prototype.getPlayerId = function () {
        return this._data.get("playerId");
    };
    QuitRoomMessage.prototype.getPID = function () {
        return 2009;
    };
    QuitRoomMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    QuitRoomMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    QuitRoomMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return QuitRoomMessage;
}(MessageBase));
__reflect(QuitRoomMessage.prototype, "QuitRoomMessage");
//# sourceMappingURL=QuitRoomMessage.js.map