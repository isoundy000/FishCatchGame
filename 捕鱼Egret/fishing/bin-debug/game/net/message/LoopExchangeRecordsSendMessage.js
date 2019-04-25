//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoopExchangeRecordsSendMessage = (function (_super) {
    __extends(LoopExchangeRecordsSendMessage, _super);
    function LoopExchangeRecordsSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);
        _this._clazz = builder.build("LoopExchangeRecordsSend");
        return _this;
    }
    LoopExchangeRecordsSendMessage.prototype.getPID = function () {
        return 1015;
    };
    LoopExchangeRecordsSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    LoopExchangeRecordsSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    LoopExchangeRecordsSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return LoopExchangeRecordsSendMessage;
}(MessageBase));
__reflect(LoopExchangeRecordsSendMessage.prototype, "LoopExchangeRecordsSendMessage");
//# sourceMappingURL=LoopExchangeRecordsSendMessage.js.map