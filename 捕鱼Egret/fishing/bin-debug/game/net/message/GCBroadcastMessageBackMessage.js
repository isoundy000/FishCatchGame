//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GCBroadcastMessageBackMessage = (function (_super) {
    __extends(GCBroadcastMessageBackMessage, _super);
    function GCBroadcastMessageBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);
        _this._clazz = builder.build("GCBroadcastMessageBack");
        return _this;
    }
    GCBroadcastMessageBackMessage.prototype.setMessageList = function (messageList) {
        this._data.set("messageList", messageList);
    };
    GCBroadcastMessageBackMessage.prototype.getMessageList = function () {
        return this._data.get("messageList");
    };
    GCBroadcastMessageBackMessage.prototype.getPID = function () {
        return 1009;
    };
    GCBroadcastMessageBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    GCBroadcastMessageBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    GCBroadcastMessageBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return GCBroadcastMessageBackMessage;
}(MessageBase));
__reflect(GCBroadcastMessageBackMessage.prototype, "GCBroadcastMessageBackMessage");
//# sourceMappingURL=GCBroadcastMessageBackMessage.js.map