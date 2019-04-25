//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var QuickGameIntoRoomMessage = (function (_super) {
    __extends(QuickGameIntoRoomMessage, _super);
    function QuickGameIntoRoomMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("QuickGameIntoRoom");
        return _this;
    }
    QuickGameIntoRoomMessage.prototype.setCurNum = function (curNum) {
        this._data.set("curNum", curNum);
    };
    QuickGameIntoRoomMessage.prototype.getCurNum = function () {
        return this._data.get("curNum");
    };
    QuickGameIntoRoomMessage.prototype.setEndSec = function (endSec) {
        this._data.set("endSec", endSec);
    };
    QuickGameIntoRoomMessage.prototype.getEndSec = function () {
        return this._data.get("endSec");
    };
    QuickGameIntoRoomMessage.prototype.getPID = function () {
        return 3034;
    };
    QuickGameIntoRoomMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    QuickGameIntoRoomMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    QuickGameIntoRoomMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return QuickGameIntoRoomMessage;
}(MessageBase));
__reflect(QuickGameIntoRoomMessage.prototype, "QuickGameIntoRoomMessage");
//# sourceMappingURL=QuickGameIntoRoomMessage.js.map