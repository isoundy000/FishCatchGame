//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DailyLoginDrawBackMessage = (function (_super) {
    __extends(DailyLoginDrawBackMessage, _super);
    function DailyLoginDrawBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("DailyLoginDrawBack");
        return _this;
    }
    DailyLoginDrawBackMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    DailyLoginDrawBackMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    DailyLoginDrawBackMessage.prototype.setIndex = function (index) {
        this._data.set("index", index);
    };
    DailyLoginDrawBackMessage.prototype.getIndex = function () {
        return this._data.get("index");
    };
    DailyLoginDrawBackMessage.prototype.getPID = function () {
        return 2051;
    };
    DailyLoginDrawBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    DailyLoginDrawBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    DailyLoginDrawBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return DailyLoginDrawBackMessage;
}(MessageBase));
__reflect(DailyLoginDrawBackMessage.prototype, "DailyLoginDrawBackMessage");
//# sourceMappingURL=DailyLoginDrawBackMessage.js.map