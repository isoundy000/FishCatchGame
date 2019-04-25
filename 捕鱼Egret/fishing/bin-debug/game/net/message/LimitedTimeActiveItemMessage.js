//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LimitedTimeActiveItemMessage = (function (_super) {
    __extends(LimitedTimeActiveItemMessage, _super);
    function LimitedTimeActiveItemMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("LimitedTimeActiveItem");
        return _this;
    }
    LimitedTimeActiveItemMessage.prototype.setId = function (id) {
        this._data.set("id", id);
    };
    LimitedTimeActiveItemMessage.prototype.getId = function () {
        return this._data.get("id");
    };
    LimitedTimeActiveItemMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    LimitedTimeActiveItemMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    LimitedTimeActiveItemMessage.prototype.setValue = function (value) {
        this._data.set("value", value);
    };
    LimitedTimeActiveItemMessage.prototype.getValue = function () {
        return this._data.get("value");
    };
    LimitedTimeActiveItemMessage.prototype.getPID = function () {
        return 2062;
    };
    LimitedTimeActiveItemMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    LimitedTimeActiveItemMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    LimitedTimeActiveItemMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return LimitedTimeActiveItemMessage;
}(MessageBase));
__reflect(LimitedTimeActiveItemMessage.prototype, "LimitedTimeActiveItemMessage");
//# sourceMappingURL=LimitedTimeActiveItemMessage.js.map