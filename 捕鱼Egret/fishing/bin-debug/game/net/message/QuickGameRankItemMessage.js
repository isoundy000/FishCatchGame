//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var QuickGameRankItemMessage = (function (_super) {
    __extends(QuickGameRankItemMessage, _super);
    function QuickGameRankItemMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("QuickGameRankItem");
        return _this;
    }
    QuickGameRankItemMessage.prototype.setUserId = function (userId) {
        this._data.set("userId", userId);
    };
    QuickGameRankItemMessage.prototype.getUserId = function () {
        return this._data.get("userId");
    };
    QuickGameRankItemMessage.prototype.setName = function (name) {
        this._data.set("name", name);
    };
    QuickGameRankItemMessage.prototype.getName = function () {
        return this._data.get("name");
    };
    QuickGameRankItemMessage.prototype.setRank = function (rank) {
        this._data.set("rank", rank);
    };
    QuickGameRankItemMessage.prototype.getRank = function () {
        return this._data.get("rank");
    };
    QuickGameRankItemMessage.prototype.setIntegral = function (integral) {
        this._data.set("integral", integral);
    };
    QuickGameRankItemMessage.prototype.getIntegral = function () {
        return this._data.get("integral");
    };
    QuickGameRankItemMessage.prototype.setBulletNum = function (bulletNum) {
        this._data.set("bulletNum", bulletNum);
    };
    QuickGameRankItemMessage.prototype.getBulletNum = function () {
        return this._data.get("bulletNum");
    };
    QuickGameRankItemMessage.prototype.getPID = function () {
        return 3032;
    };
    QuickGameRankItemMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    QuickGameRankItemMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    QuickGameRankItemMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return QuickGameRankItemMessage;
}(MessageBase));
__reflect(QuickGameRankItemMessage.prototype, "QuickGameRankItemMessage");
//# sourceMappingURL=QuickGameRankItemMessage.js.map