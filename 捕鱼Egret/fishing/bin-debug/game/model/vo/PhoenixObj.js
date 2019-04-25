var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var model;
    (function (model) {
        /** 世界boss的数据对象 */
        var PhoenixObj = (function () {
            function PhoenixObj(msg) {
                this.changeData(msg);
            }
            ;
            PhoenixObj.prototype.changeData = function (msg) {
                var bChange = false;
                if (msg.getState()) {
                    if (msg.getState() != Phoenix_State.ShieldDead) {
                        this._state = msg.getState();
                    }
                    else {
                        bChange = true;
                    }
                }
                if (msg.getTime() && !bChange) {
                    this._time = msg.getTime();
                }
                if (msg.getCurShieldValue() != null) {
                    this._curShield = msg.getCurShieldValue();
                }
                if (msg.getShieldMax() != null) {
                    this._maxShield = msg.getShieldMax();
                }
            };
            PhoenixObj.prototype.getState = function () {
                return this._state;
            };
            PhoenixObj.prototype.getTime = function () {
                return this._time;
            };
            PhoenixObj.prototype.getCurShield = function () {
                return this._curShield;
            };
            PhoenixObj.prototype.getMaxShield = function () {
                return this._maxShield;
            };
            return PhoenixObj;
        }());
        model.PhoenixObj = PhoenixObj;
        __reflect(PhoenixObj.prototype, "game.model.PhoenixObj");
    })(model = game.model || (game.model = {}));
})(game || (game = {}));
//# sourceMappingURL=PhoenixObj.js.map