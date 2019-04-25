var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var model;
    (function (model) {
        /**
         * Gun对象
         */
        var GunItem = (function () {
            function GunItem(vo, state) {
                this._vo = vo;
                this._state = state;
            }
            GunItem.prototype.getVO = function () {
                return this._vo;
            };
            GunItem.prototype.getState = function () {
                return this._state;
            };
            GunItem.prototype.setState = function (state) {
                this._state = state;
            };
            return GunItem;
        }());
        model.GunItem = GunItem;
        __reflect(GunItem.prototype, "game.model.GunItem");
    })(model = game.model || (game.model = {}));
})(game || (game = {}));
//# sourceMappingURL=GunItem.js.map