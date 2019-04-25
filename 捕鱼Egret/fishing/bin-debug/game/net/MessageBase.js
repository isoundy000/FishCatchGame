var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MessageBase = (function () {
    function MessageBase() {
        this._pid = 0;
    }
    MessageBase.prototype.setPID = function (pid) {
        this._pid = pid;
    };
    MessageBase.prototype.getPID = function () {
        return this._pid;
    };
    MessageBase.prototype.toByteArray = function () {
        return null;
    };
    MessageBase.prototype.setData = function (buff) {
    };
    MessageBase.prototype.initData = function () {
    };
    return MessageBase;
}());
__reflect(MessageBase.prototype, "MessageBase");
//# sourceMappingURL=MessageBase.js.map