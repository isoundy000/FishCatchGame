//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SmallHornSendMessage = (function (_super) {
    __extends(SmallHornSendMessage, _super);
    function SmallHornSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("SmallHornSend");
        return _this;
    }
    SmallHornSendMessage.prototype.setWords = function (words) {
        this._data.set("words", words);
    };
    SmallHornSendMessage.prototype.getWords = function () {
        return this._data.get("words");
    };
    SmallHornSendMessage.prototype.getPID = function () {
        return 3041;
    };
    SmallHornSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    SmallHornSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    SmallHornSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return SmallHornSendMessage;
}(MessageBase));
__reflect(SmallHornSendMessage.prototype, "SmallHornSendMessage");
//# sourceMappingURL=SmallHornSendMessage.js.map