//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PondFishesMessage = (function (_super) {
    __extends(PondFishesMessage, _super);
    function PondFishesMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("PondFishes");
        return _this;
    }
    PondFishesMessage.prototype.setFishes = function (fishes) {
        this._data.set("fishes", fishes);
    };
    PondFishesMessage.prototype.getFishes = function () {
        return this._data.get("fishes");
    };
    PondFishesMessage.prototype.getPID = function () {
        return 3007;
    };
    PondFishesMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    PondFishesMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    PondFishesMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return PondFishesMessage;
}(MessageBase));
__reflect(PondFishesMessage.prototype, "PondFishesMessage");
//# sourceMappingURL=PondFishesMessage.js.map