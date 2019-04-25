var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var room;
(function (room) {
    var action;
    (function (action) {
        var ActionBase = (function () {
            function ActionBase(actor) {
                this._actor = actor;
                this._tween = egret.Tween.get(this._actor, { loop: false });
            }
            ActionBase.prototype.getActor = function () {
                return this._actor;
            };
            ActionBase.prototype.getTween = function () {
                return this._tween;
            };
            ActionBase.prototype.action = function (type) {
            };
            ActionBase.prototype.runaway = function () {
                var _this = this;
                egret.Tween.removeTweens(this._actor);
                this._actor.rotation = 180;
                if (this._actor.isFlipY()) {
                    this._actor.flipY(false);
                }
                this._tween = egret.Tween.get(this._actor, { loop: false });
                this._tween.to({ x: -400, y: this._actor.y }, 1000);
                this._tween.call(function () {
                    _this.setActionAlive(false);
                    _this._actor.destory();
                });
            };
            ActionBase.prototype.pause = function () {
                egret.Tween.pauseTweens(this._actor);
            };
            ActionBase.prototype.resume = function () {
                egret.Tween.resumeTweens(this._actor);
            };
            /** 获取action状态 */
            ActionBase.prototype.getActionAlive = function () {
                return this._actionAlive;
            };
            ActionBase.prototype.setActionAlive = function (alive) {
                this._actionAlive = alive;
            };
            ActionBase.prototype.destory = function () {
                egret.Tween.removeTweens(this._actor);
                this._actor.destory();
                this._actor = null;
                this._tween = null;
            };
            return ActionBase;
        }());
        action.ActionBase = ActionBase;
        __reflect(ActionBase.prototype, "room.action.ActionBase");
    })(action = room.action || (room.action = {}));
})(room || (room = {}));
//# sourceMappingURL=ActionBase.js.map