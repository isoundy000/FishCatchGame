//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LimitedTimeActiveBackMessage = (function (_super) {
    __extends(LimitedTimeActiveBackMessage, _super);
    function LimitedTimeActiveBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("LimitedTimeActiveBack");
        return _this;
    }
    LimitedTimeActiveBackMessage.prototype.setResult = function (result) {
        this._data.set("result", result);
    };
    LimitedTimeActiveBackMessage.prototype.getResult = function () {
        return this._data.get("result");
    };
    LimitedTimeActiveBackMessage.prototype.setInfo = function (info) {
        this._data.set("info", info);
    };
    LimitedTimeActiveBackMessage.prototype.getInfo = function () {
        return this._data.get("info");
    };
    LimitedTimeActiveBackMessage.prototype.getPID = function () {
        return 2064;
    };
    LimitedTimeActiveBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    LimitedTimeActiveBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    LimitedTimeActiveBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return LimitedTimeActiveBackMessage;
}(MessageBase));
__reflect(LimitedTimeActiveBackMessage.prototype, "LimitedTimeActiveBackMessage");
//# sourceMappingURL=LimitedTimeActiveBackMessage.js.map