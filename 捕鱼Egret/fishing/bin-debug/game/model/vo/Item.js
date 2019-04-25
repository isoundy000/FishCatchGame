var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var model;
    (function (model) {
        /**
         * 道具对象
         */
        var Item = (function () {
            function Item(itemId, count, time) {
                if (time === void 0) { time = null; }
                this._itemId = itemId;
                this._count = count;
                this._time = 0;
                if (time) {
                    this._time = time;
                }
            }
            Item.prototype.getItemId = function () {
                return this._itemId;
            };
            Item.prototype.setCount = function (count) {
                this._count = count;
            };
            Item.prototype.getCount = function () {
                return this._count;
            };
            Item.prototype.setTime = function (time) {
                this._time = time;
            };
            Item.prototype.getTime = function () {
                return this._time;
            };
            Item.prototype.isAct = function () {
                if (this._time <= 0) {
                    return true;
                }
                var residue = this._time - game.util.TimeUtil.getCurrTime();
                if (residue > 0) {
                    return true;
                }
                else {
                    return false;
                }
            };
            return Item;
        }());
        model.Item = Item;
        __reflect(Item.prototype, "game.model.Item");
    })(model = game.model || (game.model = {}));
})(game || (game = {}));
//# sourceMappingURL=Item.js.map