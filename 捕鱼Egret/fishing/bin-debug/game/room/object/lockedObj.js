var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 锁定状态的结构体
 */
var LockedObj = (function () {
    function LockedObj(nLockedId, nLockedPos, nUserId) {
        this._arrLocekdId = nLockedId;
        this._nLockedPos = nLockedPos;
        this._nUserId = nUserId;
    }
    LockedObj.prototype.setLockedId = function (nLockedId, nGunIndex) {
        this._arrLocekdId[nGunIndex] = nLockedId;
    };
    LockedObj.prototype.getLockedID = function () {
        return this._arrLocekdId;
    };
    LockedObj.prototype.spliceLockedID = function () {
        this._arrLocekdId.splice(1, 1);
        this._arrLocekdId.splice(2, 1);
    };
    LockedObj.prototype.getLockedPos = function () {
        return this._nLockedPos;
    };
    LockedObj.prototype.getUserId = function () {
        return this._nUserId;
    };
    return LockedObj;
}());
__reflect(LockedObj.prototype, "LockedObj");
//# sourceMappingURL=lockedObj.js.map