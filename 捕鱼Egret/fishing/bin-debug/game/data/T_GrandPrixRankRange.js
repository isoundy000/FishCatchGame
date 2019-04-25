var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_GrandPrixRankRange = (function () {
            function T_GrandPrixRankRange() {
                //id
                this.id = 0;
                //房间类型
                this.roomType = 0;
                //大奖赛名词范围
                this.rangeMin = 0;
                //大奖赛名词范围
                this.rangeMax = 0;
                //奖励
                this.award = "";
            }
            return T_GrandPrixRankRange;
        }());
        table.T_GrandPrixRankRange = T_GrandPrixRankRange;
        __reflect(T_GrandPrixRankRange.prototype, "game.table.T_GrandPrixRankRange");
        var T_GrandPrixRankRange_Table = (function () {
            function T_GrandPrixRankRange_Table() {
            }
            T_GrandPrixRankRange_Table.getVoByKey = function (key) {
                var len = _T_GrandPrixRankRange_.length;
                var data = table.SerchUtil.binary_search(_T_GrandPrixRankRange_, "id", 0, len, key);
                return data;
            };
            T_GrandPrixRankRange_Table.getAllVo = function () {
                return _T_GrandPrixRankRange_;
            };
            return T_GrandPrixRankRange_Table;
        }());
        table.T_GrandPrixRankRange_Table = T_GrandPrixRankRange_Table;
        __reflect(T_GrandPrixRankRange_Table.prototype, "game.table.T_GrandPrixRankRange_Table");
        var _T_GrandPrixRankRange_ = [
            { id: 1, roomType: 5, rangeMin: 1, rangeMax: 1, award: "50001_2", },
            { id: 2, roomType: 5, rangeMin: 2, rangeMax: 2, award: "50002_5", },
            { id: 3, roomType: 5, rangeMin: 3, rangeMax: 3, award: "50002_2", },
            { id: 4, roomType: 5, rangeMin: 4, rangeMax: 10, award: "10001_150000", },
            { id: 5, roomType: 5, rangeMin: 11, rangeMax: 20, award: "10001_100000", },
            { id: 6, roomType: 5, rangeMin: 21, rangeMax: 50, award: "10002_100", },
            { id: 7, roomType: 5, rangeMin: 51, rangeMax: 100, award: "10002_50", },
            { id: 8, roomType: 5, rangeMin: 101, rangeMax: 200, award: "40001_20", },
            { id: 9, roomType: 6, rangeMin: 1, rangeMax: 1, award: "50001_80", },
            { id: 9, roomType: 99, rangeMin: 1, rangeMax: 1, award: "10001_30000000", },
            { id: 10, roomType: 6, rangeMin: 2, rangeMax: 2, award: "50001_40", },
            { id: 10, roomType: 99, rangeMin: 2, rangeMax: 2, award: "10001_20000000", },
            { id: 11, roomType: 6, rangeMin: 3, rangeMax: 3, award: "50001_20", },
            { id: 11, roomType: 99, rangeMin: 3, rangeMax: 3, award: "10001_1000000", },
            { id: 12, roomType: 6, rangeMin: 4, rangeMax: 10, award: "50001_10", },
            { id: 12, roomType: 99, rangeMin: 4, rangeMax: 10, award: "10001_5000000", },
            { id: 13, roomType: 6, rangeMin: 11, rangeMax: 20, award: "50001_5", },
            { id: 13, roomType: 99, rangeMin: 11, rangeMax: 20, award: "10001_2000000", },
            { id: 14, roomType: 6, rangeMin: 21, rangeMax: 50, award: "50001_3", },
            { id: 14, roomType: 99, rangeMin: 21, rangeMax: 50, award: "10001_1000000", },
            { id: 15, roomType: 6, rangeMin: 51, rangeMax: 100, award: "50002_5", },
            { id: 15, roomType: 99, rangeMin: 51, rangeMax: 100, award: "10001_500000", },
            { id: 16, roomType: 6, rangeMin: 101, rangeMax: 200, award: "50002_3", },
            { id: 16, roomType: 99, rangeMin: 101, rangeMax: 200, award: "10001_250000", },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_GrandPrixRankRange.js.map