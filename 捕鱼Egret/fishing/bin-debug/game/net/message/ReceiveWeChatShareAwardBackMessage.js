//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ReceiveWeChatShareAwardBackMessage = (function (_super) {
    __extends(ReceiveWeChatShareAwardBackMessage, _super);
    function ReceiveWeChatShareAwardBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("ReceiveWeChatShareAwardBack");
        return _this;
    }
    ReceiveWeChatShareAwardBackMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    ReceiveWeChatShareAwardBackMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    ReceiveWeChatShareAwardBackMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    ReceiveWeChatShareAwardBackMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    ReceiveWeChatShareAwardBackMessage.prototype.getPID = function () {
        return 2067;
    };
    ReceiveWeChatShareAwardBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ReceiveWeChatShareAwardBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ReceiveWeChatShareAwardBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ReceiveWeChatShareAwardBackMessage;
}(MessageBase));
__reflect(ReceiveWeChatShareAwardBackMessage.prototype, "ReceiveWeChatShareAwardBackMessage");
//# sourceMappingURL=ReceiveWeChatShareAwardBackMessage.js.map