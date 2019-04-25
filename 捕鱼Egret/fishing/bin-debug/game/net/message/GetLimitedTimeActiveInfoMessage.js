//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GetLimitedTimeActiveInfoMessage = (function (_super) {
    __extends(GetLimitedTimeActiveInfoMessage, _super);
    function GetLimitedTimeActiveInfoMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("GetLimitedTimeActiveInfo");
        return _this;
    }
    GetLimitedTimeActiveInfoMessage.prototype.getPID = function () {
        return 2060;
    };
    GetLimitedTimeActiveInfoMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    GetLimitedTimeActiveInfoMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    GetLimitedTimeActiveInfoMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return GetLimitedTimeActiveInfoMessage;
}(MessageBase));
__reflect(GetLimitedTimeActiveInfoMessage.prototype, "GetLimitedTimeActiveInfoMessage");
//# sourceMappingURL=GetLimitedTimeActiveInfoMessage.js.map