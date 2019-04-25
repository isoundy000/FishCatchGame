var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var model;
    (function (model) {
        /**
         * exchange对象
         */
        var ExchangeItem = (function () {
            function ExchangeItem(id, name, type, exchangePriceId, exchangePrice, instruction, marketPrice, url, minVip, goodsId, goodsNum, serverNum, order, color, minGunId, state) {
                this._id = id;
                this._name = name;
                this._type = type;
                this._exchangePriceId = exchangePriceId;
                this._exchangePrice = exchangePrice;
                this._instruction = instruction;
                this._marketPrice = marketPrice;
                this._url = url;
                this._minVip = minVip;
                this._goodsId = goodsId;
                this._goodsNum = goodsNum;
                this._serverNum = serverNum;
                this._order = order;
                this._color = color;
                this._minGunId = minGunId;
                this._state = state;
            }
            return ExchangeItem;
        }());
        model.ExchangeItem = ExchangeItem;
        __reflect(ExchangeItem.prototype, "game.model.ExchangeItem");
    })(model = game.model || (game.model = {}));
})(game || (game = {}));
//# sourceMappingURL=ExchangeItem.js.map