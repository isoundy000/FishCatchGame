var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_FishCatchAll = (function () {
            function T_FishCatchAll() {
                //一网打尽ID
                this.id = 0;
                //一网打尽名称
                this.name = 0;
                //一网打尽里鱼的id
                this.fishIds = "";
                //路线ID
                this.moves = "";
            }
            return T_FishCatchAll;
        }());
        table.T_FishCatchAll = T_FishCatchAll;
        __reflect(T_FishCatchAll.prototype, "game.table.T_FishCatchAll");
        var T_FishCatchAll_Table = (function () {
            function T_FishCatchAll_Table() {
            }
            T_FishCatchAll_Table.getVoByKey = function (key) {
                var len = _T_FishCatchAll_.length;
                var data = table.SerchUtil.binary_search(_T_FishCatchAll_, "id", 0, len, key);
                return data;
            };
            T_FishCatchAll_Table.getAllVo = function () {
                return _T_FishCatchAll_;
            };
            return T_FishCatchAll_Table;
        }());
        table.T_FishCatchAll_Table = T_FishCatchAll_Table;
        __reflect(T_FishCatchAll_Table.prototype, "game.table.T_FishCatchAll_Table");
        var _T_FishCatchAll_ = [
            { id: 1, name: 2219, fishIds: "29,30,35,36,37,38,39", moves: "102901,102902,102903,102904,102910,102911,102912", },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_FishCatchAll.js.map