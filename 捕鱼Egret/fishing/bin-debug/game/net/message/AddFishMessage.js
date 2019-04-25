//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AddFishMessage = (function (_super) {
    __extends(AddFishMessage, _super);
    function AddFishMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);
        _this._clazz = builder.build("AddFish");
        return _this;
    }
    AddFishMessage.prototype.setType = function (type) {
        this._data.set("type", type);
    };
    AddFishMessage.prototype.getType = function () {
        return this._data.get("type");
    };
    AddFishMessage.prototype.setFishId = function (fishId) {
        this._data.set("fishId", fishId);
    };
    AddFishMessage.prototype.getFishId = function () {
        return this._data.get("fishId");
    };
    AddFishMessage.prototype.setPathId = function (pathId) {
        this._data.set("pathId", pathId);
    };
    AddFishMessage.prototype.getPathId = function () {
        return this._data.get("pathId");
    };
    AddFishMessage.prototype.setUniId = function (uniId) {
        this._data.set("uniId", uniId);
    };
    AddFishMessage.prototype.getUniId = function () {
        return this._data.get("uniId");
    };
    AddFishMessage.prototype.setCoordinate = function (coordinate) {
        this._data.set("coordinate", coordinate);
    };
    AddFishMessage.prototype.getCoordinate = function () {
        return this._data.get("coordinate");
    };
    AddFishMessage.prototype.setAliveTime = function (aliveTime) {
        this._data.set("aliveTime", aliveTime);
    };
    AddFishMessage.prototype.getAliveTime = function () {
        return this._data.get("aliveTime");
    };
    AddFishMessage.prototype.getPID = function () {
        return 3008;
    };
    AddFishMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    AddFishMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    AddFishMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return AddFishMessage;
}(MessageBase));
__reflect(AddFishMessage.prototype, "AddFishMessage");
//# sourceMappingURL=AddFishMessage.js.map