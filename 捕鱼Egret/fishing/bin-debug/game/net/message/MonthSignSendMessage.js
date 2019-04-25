//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MonthSignSendMessage = (function (_super) {
    __extends(MonthSignSendMessage, _super);
    function MonthSignSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("MonthSignSend");
        return _this;
    }
    MonthSignSendMessage.prototype.setOperationType = function (operationType) {
        this._data.set("operationType", operationType);
    };
    MonthSignSendMessage.prototype.getOperationType = function () {
        return this._data.get("operationType");
    };
    MonthSignSendMessage.prototype.setCurMonth = function (curMonth) {
        this._data.set("curMonth", curMonth);
    };
    MonthSignSendMessage.prototype.getCurMonth = function () {
        return this._data.get("curMonth");
    };
    MonthSignSendMessage.prototype.getPID = function () {
        return 2040;
    };
    MonthSignSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    MonthSignSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    MonthSignSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return MonthSignSendMessage;
}(MessageBase));
__reflect(MonthSignSendMessage.prototype, "MonthSignSendMessage");
//# sourceMappingURL=MonthSignSendMessage.js.map