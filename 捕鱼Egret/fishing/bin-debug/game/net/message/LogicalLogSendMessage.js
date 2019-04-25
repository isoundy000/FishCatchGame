//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LogicalLogSendMessage = (function (_super) {
    __extends(LogicalLogSendMessage, _super);
    function LogicalLogSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);
        _this._clazz = builder.build("LogicalLogSend");
        return _this;
    }
    LogicalLogSendMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    LogicalLogSendMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    LogicalLogSendMessage.prototype.setContent = function (content) {
        this._data.set("content", content);
    };
    LogicalLogSendMessage.prototype.getContent = function () {
        return this._data.get("content");
    };
    LogicalLogSendMessage.prototype.getPID = function () {
        return 1013;
    };
    LogicalLogSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    LogicalLogSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    LogicalLogSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return LogicalLogSendMessage;
}(MessageBase));
__reflect(LogicalLogSendMessage.prototype, "LogicalLogSendMessage");
//# sourceMappingURL=LogicalLogSendMessage.js.map