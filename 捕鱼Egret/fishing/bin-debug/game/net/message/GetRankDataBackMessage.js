//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GetRankDataBackMessage = (function (_super) {
    __extends(GetRankDataBackMessage, _super);
    function GetRankDataBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("GetRankDataBack");
        return _this;
    }
    GetRankDataBackMessage.prototype.setRanklist = function (ranklist) {
        this._data.set("ranklist", ranklist);
    };
    GetRankDataBackMessage.prototype.getRanklist = function () {
        return this._data.get("ranklist");
    };
    GetRankDataBackMessage.prototype.getPID = function () {
        return 2049;
    };
    GetRankDataBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    GetRankDataBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    GetRankDataBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return GetRankDataBackMessage;
}(MessageBase));
__reflect(GetRankDataBackMessage.prototype, "GetRankDataBackMessage");
//# sourceMappingURL=GetRankDataBackMessage.js.map