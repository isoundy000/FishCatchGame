//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IntoRoomBackMessage = (function (_super) {
    __extends(IntoRoomBackMessage, _super);
    function IntoRoomBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("IntoRoomBack");
        return _this;
    }
    IntoRoomBackMessage.prototype.setFlag = function (flag) {
        this._data.set("flag", flag);
    };
    IntoRoomBackMessage.prototype.getFlag = function () {
        return this._data.get("flag");
    };
    IntoRoomBackMessage.prototype.setPlayerInfo = function (playerInfo) {
        this._data.set("playerInfo", playerInfo);
    };
    IntoRoomBackMessage.prototype.getPlayerInfo = function () {
        return this._data.get("playerInfo");
    };
    IntoRoomBackMessage.prototype.getPID = function () {
        return 2007;
    };
    IntoRoomBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    IntoRoomBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    IntoRoomBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return IntoRoomBackMessage;
}(MessageBase));
__reflect(IntoRoomBackMessage.prototype, "IntoRoomBackMessage");
//# sourceMappingURL=IntoRoomBackMessage.js.map