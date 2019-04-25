var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var QuickInfo = (function () {
    function QuickInfo(msg) {
        /**
        required uint32 userId = 1;
        required string name = 2;
        required uint32 rank = 3;
        required uint32 integral = 4;
        required uint32 bulletNum = 5; */
        this._nIntegral = Number(msg.getIntegral());
        this._nUserId = Number(msg.getUserId());
        this._nBulletNum = Number(msg.getBulletNum());
    }
    QuickInfo.prototype.getUserId = function () {
        return this._nUserId;
    };
    QuickInfo.prototype.getBulletNum = function () {
        return this._nBulletNum;
    };
    QuickInfo.prototype.setBulletNum = function (value) {
        this._nBulletNum = value;
    };
    QuickInfo.prototype.getIntegral = function () {
        return this._nIntegral;
    };
    QuickInfo.prototype.setIntegral = function (value) {
        this._nIntegral = value;
    };
    return QuickInfo;
}());
__reflect(QuickInfo.prototype, "QuickInfo");
//# sourceMappingURL=quickInfoObj.js.map