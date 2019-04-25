var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/***
 *
 * 移动逻辑基类
 *
 */
var MoveLogicBase = (function () {
    function MoveLogicBase() {
    }
    /**创建函数 */
    MoveLogicBase.prototype.create = function (nType, parent, objRotation, destPos, nCostTime) {
        this._nType = nType;
        this._ojbParent = parent;
        this._posDest = destPos;
        this._nCostTime = nCostTime;
        this._nObjRotation = objRotation;
    };
    MoveLogicBase.prototype.start = function () {
        if (!this._ojbParent) {
            return;
        }
        egret.Tween.get(this._ojbParent).to({ x: this._posDest.x, y: this._posDest.y }, this._nCostTime);
    };
    MoveLogicBase.prototype.startWithCall = function (callback, thisObj) {
        egret.Tween.get(this._ojbParent).to({ rotation: this._ojbParent.rotation + this._nObjRotation, x: this._posDest.x, y: this._posDest.y }, this._nCostTime).call(callback, thisObj);
    };
    MoveLogicBase.prototype.end = function () {
        if (!this._ojbParent) {
            return;
        }
        egret.Tween.removeTweens(this._ojbParent);
        this._ojbParent = null;
    };
    return MoveLogicBase;
}());
__reflect(MoveLogicBase.prototype, "MoveLogicBase");
//# sourceMappingURL=moveLogicBase.js.map