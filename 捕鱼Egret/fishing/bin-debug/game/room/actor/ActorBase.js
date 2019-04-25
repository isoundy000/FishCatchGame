var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var room;
(function (room) {
    var actor;
    (function (actor) {
        var ActorBase = (function (_super) {
            __extends(ActorBase, _super);
            function ActorBase() {
                return _super.call(this) || this;
            }
            /** 行为结束回调 */
            ActorBase.prototype.actionEndCallback = function () {
            };
            /** 获取鱼的id */
            ActorBase.prototype.getFishId = function () {
                return this._fid;
            };
            /** 重置鱼的数据 */
            ActorBase.prototype.resetData = function () {
            };
            ActorBase.prototype.hitRect = function (x, y) {
                var isHit = this.hitTestPoint(x, y);
                ;
                if (isHit) {
                    return 0;
                }
                return -1;
            };
            ActorBase.prototype.setUniqId = function (uid) {
                this._uniqId = uid;
            };
            ActorBase.prototype.getUniqId = function () {
                return this._uniqId;
            };
            ActorBase.prototype.setType = function (type) {
                this._actorType = type;
            };
            ActorBase.prototype.getType = function () {
                return this._actorType;
            };
            ActorBase.prototype.flipX = function (f) {
                this.FISH_LAYER.scaleX = (f == true ? -1 : 1);
            };
            ActorBase.prototype.flipY = function (f) {
                var childFishs = this.FISH_LAYER.numChildren;
                for (var i = 0; i < childFishs; i++) {
                    var fish = this.FISH_LAYER.getChildAt(i);
                    fish.scaleY = (f == true ? -1.5 : 1.5);
                }
            };
            ActorBase.prototype.isFlipY = function () {
                return this._bFlipY;
            };
            ActorBase.prototype.fishflipY = function () {
            };
            ActorBase.prototype.playHitEffect = function () {
            };
            ActorBase.prototype.playDead = function (isGroup) {
                if (isGroup === void 0) { isGroup = false; }
            };
            ActorBase.prototype.getFISH_LAYER = function () {
                return this.FISH_LAYER;
            };
            ActorBase.prototype.getEFFECT_LAYER = function () {
                return this.EFFECT_LAYER;
            };
            ActorBase.prototype.destory = function () {
                this.removeChildren();
            };
            return ActorBase;
        }(egret.DisplayObjectContainer));
        actor.ActorBase = ActorBase;
        __reflect(ActorBase.prototype, "room.actor.ActorBase");
    })(actor = room.actor || (room.actor = {}));
})(room || (room = {}));
//# sourceMappingURL=ActorBase.js.map