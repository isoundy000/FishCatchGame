//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UseWarheadSendMessage = (function (_super) {
    __extends(UseWarheadSendMessage, _super);
    function UseWarheadSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("UseWarheadSend");
        return _this;
    }
    UseWarheadSendMessage.prototype.setItemId = function (itemId) {
        this._data.set("itemId", itemId);
    };
    UseWarheadSendMessage.prototype.getItemId = function () {
        return this._data.get("itemId");
    };
    UseWarheadSendMessage.prototype.setUniId = function (uniId) {
        this._data.set("uniId", uniId);
    };
    UseWarheadSendMessage.prototype.getUniId = function () {
        return this._data.get("uniId");
    };
    UseWarheadSendMessage.prototype.getPID = function () {
        return 3015;
    };
    UseWarheadSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    UseWarheadSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    UseWarheadSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return UseWarheadSendMessage;
}(MessageBase));
__reflect(UseWarheadSendMessage.prototype, "UseWarheadSendMessage");
//# sourceMappingURL=UseWarheadSendMessage.js.map