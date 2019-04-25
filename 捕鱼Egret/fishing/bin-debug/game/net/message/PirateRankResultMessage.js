//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PirateRankResultMessage = (function (_super) {
    __extends(PirateRankResultMessage, _super);
    function PirateRankResultMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("PirateRankResult");
        return _this;
    }
    PirateRankResultMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    PirateRankResultMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    PirateRankResultMessage.prototype.setRank = function (rank) {
        this._data.set("rank", rank);
    };
    PirateRankResultMessage.prototype.getRank = function () {
        return this._data.get("rank");
    };
    PirateRankResultMessage.prototype.setAward = function (award) {
        this._data.set("award", award);
    };
    PirateRankResultMessage.prototype.getAward = function () {
        return this._data.get("award");
    };
    PirateRankResultMessage.prototype.getPID = function () {
        return 3037;
    };
    PirateRankResultMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    PirateRankResultMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    PirateRankResultMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return PirateRankResultMessage;
}(MessageBase));
__reflect(PirateRankResultMessage.prototype, "PirateRankResultMessage");
//# sourceMappingURL=PirateRankResultMessage.js.map