//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MonthSignBackMessage = (function (_super) {
    __extends(MonthSignBackMessage, _super);
    function MonthSignBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("MonthSignBack");
        return _this;
    }
    MonthSignBackMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    MonthSignBackMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    MonthSignBackMessage.prototype.setMonthSignActiveInfo = function (monthSignActiveInfo) {
        this._data.set("monthSignActiveInfo", monthSignActiveInfo);
    };
    MonthSignBackMessage.prototype.getMonthSignActiveInfo = function () {
        return this._data.get("monthSignActiveInfo");
    };
    MonthSignBackMessage.prototype.getPID = function () {
        return 2041;
    };
    MonthSignBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    MonthSignBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    MonthSignBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return MonthSignBackMessage;
}(MessageBase));
__reflect(MonthSignBackMessage.prototype, "MonthSignBackMessage");
//# sourceMappingURL=MonthSignBackMessage.js.map