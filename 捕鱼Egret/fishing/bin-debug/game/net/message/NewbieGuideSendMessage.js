//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NewbieGuideSendMessage = (function (_super) {
    __extends(NewbieGuideSendMessage, _super);
    function NewbieGuideSendMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("NewbieGuideSend");
        return _this;
    }
    NewbieGuideSendMessage.prototype.setGuideId = function (guideId) {
        this._data.set("guideId", guideId);
    };
    NewbieGuideSendMessage.prototype.getGuideId = function () {
        return this._data.get("guideId");
    };
    NewbieGuideSendMessage.prototype.getPID = function () {
        return 2031;
    };
    NewbieGuideSendMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    NewbieGuideSendMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    NewbieGuideSendMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return NewbieGuideSendMessage;
}(MessageBase));
__reflect(NewbieGuideSendMessage.prototype, "NewbieGuideSendMessage");
//# sourceMappingURL=NewbieGuideSendMessage.js.map