//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FinishTaskBackMessage = (function (_super) {
    __extends(FinishTaskBackMessage, _super);
    function FinishTaskBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("FinishTaskBack");
        return _this;
    }
    FinishTaskBackMessage.prototype.setState = function (state) {
        this._data.set("state", state);
    };
    FinishTaskBackMessage.prototype.getState = function () {
        return this._data.get("state");
    };
    FinishTaskBackMessage.prototype.setTaskId = function (taskId) {
        this._data.set("taskId", taskId);
    };
    FinishTaskBackMessage.prototype.getTaskId = function () {
        return this._data.get("taskId");
    };
    FinishTaskBackMessage.prototype.setTaskAward = function (taskAward) {
        this._data.set("taskAward", taskAward);
    };
    FinishTaskBackMessage.prototype.getTaskAward = function () {
        return this._data.get("taskAward");
    };
    FinishTaskBackMessage.prototype.setNewTaskId = function (newTaskId) {
        this._data.set("newTaskId", newTaskId);
    };
    FinishTaskBackMessage.prototype.getNewTaskId = function () {
        return this._data.get("newTaskId");
    };
    FinishTaskBackMessage.prototype.getPID = function () {
        return 2034;
    };
    FinishTaskBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    FinishTaskBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    FinishTaskBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return FinishTaskBackMessage;
}(MessageBase));
__reflect(FinishTaskBackMessage.prototype, "FinishTaskBackMessage");
//# sourceMappingURL=FinishTaskBackMessage.js.map