//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeMessage = (function (_super) {
    __extends(ExchangeMessage, _super);
    function ExchangeMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("Exchange");
        return _this;
    }
    ExchangeMessage.prototype.setRecords = function (records) {
        this._data.set("records", records);
    };
    ExchangeMessage.prototype.getRecords = function () {
        return this._data.get("records");
    };
    ExchangeMessage.prototype.getPID = function () {
        return 2030;
    };
    ExchangeMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ExchangeMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ExchangeMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ExchangeMessage;
}(MessageBase));
__reflect(ExchangeMessage.prototype, "ExchangeMessage");
//# sourceMappingURL=ExchangeMessage.js.map