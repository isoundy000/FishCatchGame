//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PirateRankItemMessage = (function (_super) {
    __extends(PirateRankItemMessage, _super);
    function PirateRankItemMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("PirateRankItem");
        return _this;
    }
    PirateRankItemMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    PirateRankItemMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    PirateRankItemMessage.prototype.setRank = function (rank) {
        this._data.set("rank", rank);
    };
    PirateRankItemMessage.prototype.getRank = function () {
        return this._data.get("rank");
    };
    PirateRankItemMessage.prototype.getPID = function () {
        return 3036;
    };
    PirateRankItemMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    PirateRankItemMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    PirateRankItemMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return PirateRankItemMessage;
}(MessageBase));
__reflect(PirateRankItemMessage.prototype, "PirateRankItemMessage");
//# sourceMappingURL=PirateRankItemMessage.js.map