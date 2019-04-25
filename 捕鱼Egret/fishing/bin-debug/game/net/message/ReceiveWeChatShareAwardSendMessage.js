//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ReceiveWeChatShareAwardSendMessage = (function (_super) {
    __extends(ReceiveWeChatShareAwardSendMessage, _super);
    function ReceiveWeChatShareAwardSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("ReceiveWeChatShareAwardSend");
        return _this;
    }
    ReceiveWeChatShareAwardSendMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    ReceiveWeChatShareAwardSendMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    ReceiveWeChatShareAwardSendMessage.prototype.setFunctionType = function (functionType) {
        this._data.set("functionType", functionType);
    };
    ReceiveWeChatShareAwardSendMessage.prototype.getFunctionType = function () {
        return this._data.get("functionType");
    };
    ReceiveWeChatShareAwardSendMessage.prototype.setFunctionParam = function (functionParam) {
        this._data.set("functionParam", functionParam);
    };
    ReceiveWeChatShareAwardSendMessage.prototype.getFunctionParam = function () {
        return this._data.get("functionParam");
    };
    ReceiveWeChatShareAwardSendMessage.prototype.getPID = function () {
        return 2066;
    };
    ReceiveWeChatShareAwardSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ReceiveWeChatShareAwardSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ReceiveWeChatShareAwardSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ReceiveWeChatShareAwardSendMessage;
}(MessageBase));
__reflect(ReceiveWeChatShareAwardSendMessage.prototype, "ReceiveWeChatShareAwardSendMessage");
//# sourceMappingURL=ReceiveWeChatShareAwardSendMessage.js.map