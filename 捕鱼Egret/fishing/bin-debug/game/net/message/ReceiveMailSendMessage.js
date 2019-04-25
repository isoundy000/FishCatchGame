//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ReceiveMailSendMessage = (function (_super) {
    __extends(ReceiveMailSendMessage, _super);
    function ReceiveMailSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("ReceiveMailSend");
        return _this;
    }
    ReceiveMailSendMessage.prototype.setMailId = function (mailId) {
        this._data.set("mailId", mailId);
    };
    ReceiveMailSendMessage.prototype.getMailId = function () {
        return this._data.get("mailId");
    };
    ReceiveMailSendMessage.prototype.getPID = function () {
        return 2025;
    };
    ReceiveMailSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ReceiveMailSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ReceiveMailSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ReceiveMailSendMessage;
}(MessageBase));
__reflect(ReceiveMailSendMessage.prototype, "ReceiveMailSendMessage");
//# sourceMappingURL=ReceiveMailSendMessage.js.map