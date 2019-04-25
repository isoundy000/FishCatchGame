//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LimitedTimeActiveInfoMessage = (function (_super) {
    __extends(LimitedTimeActiveInfoMessage, _super);
    function LimitedTimeActiveInfoMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("LimitedTimeActiveInfo");
        return _this;
    }
    LimitedTimeActiveInfoMessage.prototype.setSendAwardActiveInfo = function (sendAwardActiveInfo) {
        this._data.set("sendAwardActiveInfo", sendAwardActiveInfo);
    };
    LimitedTimeActiveInfoMessage.prototype.getSendAwardActiveInfo = function () {
        return this._data.get("sendAwardActiveInfo");
    };
    LimitedTimeActiveInfoMessage.prototype.setSecretShopActiveInfo = function (secretShopActiveInfo) {
        this._data.set("secretShopActiveInfo", secretShopActiveInfo);
    };
    LimitedTimeActiveInfoMessage.prototype.getSecretShopActiveInfo = function () {
        return this._data.get("secretShopActiveInfo");
    };
    LimitedTimeActiveInfoMessage.prototype.setActiveCoin = function (activeCoin) {
        this._data.set("activeCoin", activeCoin);
    };
    LimitedTimeActiveInfoMessage.prototype.getActiveCoin = function () {
        return this._data.get("activeCoin");
    };
    LimitedTimeActiveInfoMessage.prototype.getPID = function () {
        return 2061;
    };
    LimitedTimeActiveInfoMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    LimitedTimeActiveInfoMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    LimitedTimeActiveInfoMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return LimitedTimeActiveInfoMessage;
}(MessageBase));
__reflect(LimitedTimeActiveInfoMessage.prototype, "LimitedTimeActiveInfoMessage");
//# sourceMappingURL=LimitedTimeActiveInfoMessage.js.map