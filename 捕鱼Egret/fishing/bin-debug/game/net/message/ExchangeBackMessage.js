//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeBackMessage = (function (_super) {
    __extends(ExchangeBackMessage, _super);
    function ExchangeBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("ExchangeBack");
        return _this;
    }
    ExchangeBackMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    ExchangeBackMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    ExchangeBackMessage.prototype.setRecord = function (record) {
        this._data.set("record", record);
    };
    ExchangeBackMessage.prototype.getRecord = function () {
        return this._data.get("record");
    };
    ExchangeBackMessage.prototype.getPID = function () {
        return 2028;
    };
    ExchangeBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ExchangeBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ExchangeBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ExchangeBackMessage;
}(MessageBase));
__reflect(ExchangeBackMessage.prototype, "ExchangeBackMessage");
//# sourceMappingURL=ExchangeBackMessage.js.map