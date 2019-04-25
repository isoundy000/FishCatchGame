var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var model;
    (function (model) {
        /**
         * Rank对象
         */
        var RankDataItem = (function () {
            function RankDataItem(rankType, rank, userId, rankValue, vipLevel, exp, name, iconUrl) {
                this._nRankType = rankType;
                this._nRank = rank;
                this._nUserId = userId;
                this._nRankValue = rankValue;
                this._nVipLevel = vipLevel;
                this._nExp = exp;
                this._strName = name;
                this._strIconUrl = iconUrl;
            }
            return RankDataItem;
        }());
        model.RankDataItem = RankDataItem;
        __reflect(RankDataItem.prototype, "game.model.RankDataItem");
    })(model = game.model || (game.model = {}));
})(game || (game = {}));
//# sourceMappingURL=RankItem.js.map