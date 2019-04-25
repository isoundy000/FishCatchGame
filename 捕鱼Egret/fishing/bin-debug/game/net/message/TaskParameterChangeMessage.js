//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TaskParameterChangeMessage = (function (_super) {
    __extends(TaskParameterChangeMessage, _super);
    function TaskParameterChangeMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("TaskParameterChange");
        return _this;
    }
    TaskParameterChangeMessage.prototype.setChangedTasks = function (changedTasks) {
        this._data.set("changedTasks", changedTasks);
    };
    TaskParameterChangeMessage.prototype.getChangedTasks = function () {
        return this._data.get("changedTasks");
    };
    TaskParameterChangeMessage.prototype.setArenaTaskTimes = function (arenaTaskTimes) {
        this._data.set("arenaTaskTimes", arenaTaskTimes);
    };
    TaskParameterChangeMessage.prototype.getArenaTaskTimes = function () {
        return this._data.get("arenaTaskTimes");
    };
    TaskParameterChangeMessage.prototype.setPirateTaskEndTime = function (pirateTaskEndTime) {
        this._data.set("pirateTaskEndTime", pirateTaskEndTime);
    };
    TaskParameterChangeMessage.prototype.getPirateTaskEndTime = function () {
        return this._data.get("pirateTaskEndTime");
    };
    TaskParameterChangeMessage.prototype.getPID = function () {
        return 2032;
    };
    TaskParameterChangeMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    TaskParameterChangeMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    TaskParameterChangeMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return TaskParameterChangeMessage;
}(MessageBase));
__reflect(TaskParameterChangeMessage.prototype, "TaskParameterChangeMessage");
//# sourceMappingURL=TaskParameterChangeMessage.js.map