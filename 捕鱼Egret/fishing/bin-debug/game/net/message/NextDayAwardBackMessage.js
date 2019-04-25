//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NextDayAwardBackMessage = (function (_super) {
    __extends(NextDayAwardBackMessage, _super);
    function NextDayAwardBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("NextDayAwardBack");
        return _this;
    }
    NextDayAwardBackMessage.prototype.setResultState = function (resultState) {
        this._data.set("resultState", resultState);
    };
    NextDayAwardBackMessage.prototype.getResultState = function () {
        return this._data.get("resultState");
    };
    NextDayAwardBackMessage.prototype.getPID = function () {
        return 2043;
    };
    NextDayAwardBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    NextDayAwardBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    NextDayAwardBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return NextDayAwardBackMessage;
}(MessageBase));
__reflect(NextDayAwardBackMessage.prototype, "NextDayAwardBackMessage");
//# sourceMappingURL=NextDayAwardBackMessage.js.map