//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChargeSendMessage = (function (_super) {
    __extends(ChargeSendMessage, _super);
    function ChargeSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("ChargeSend");
        return _this;
    }
    ChargeSendMessage.prototype.setChargeId = function (chargeId) {
        this._data.set("chargeId", chargeId);
    };
    ChargeSendMessage.prototype.getChargeId = function () {
        return this._data.get("chargeId");
    };
    ChargeSendMessage.prototype.getPID = function () {
        return 2037;
    };
    ChargeSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ChargeSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ChargeSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ChargeSendMessage;
}(MessageBase));
__reflect(ChargeSendMessage.prototype, "ChargeSendMessage");
//# sourceMappingURL=ChargeSendMessage.js.map