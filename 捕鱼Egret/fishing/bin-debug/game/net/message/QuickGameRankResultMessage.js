//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var QuickGameRankResultMessage = (function (_super) {
    __extends(QuickGameRankResultMessage, _super);
    function QuickGameRankResultMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("QuickGameRankResult");
        return _this;
    }
    QuickGameRankResultMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    QuickGameRankResultMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    QuickGameRankResultMessage.prototype.setRank = function (rank) {
        this._data.set("rank", rank);
    };
    QuickGameRankResultMessage.prototype.getRank = function () {
        return this._data.get("rank");
    };
    QuickGameRankResultMessage.prototype.getPID = function () {
        return 3033;
    };
    QuickGameRankResultMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    QuickGameRankResultMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    QuickGameRankResultMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return QuickGameRankResultMessage;
}(MessageBase));
__reflect(QuickGameRankResultMessage.prototype, "QuickGameRankResultMessage");
//# sourceMappingURL=QuickGameRankResultMessage.js.map