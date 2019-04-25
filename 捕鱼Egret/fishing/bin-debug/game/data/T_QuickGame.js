var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_QuickGame = (function () {
            function T_QuickGame() {
                //场次id
                this.id = 0;
                //入场费
                this.admissionFee = "";
                //炮倍限制
                this.minGunId = 0;
                //第1名
                this.theFirst = "";
                //第2名
                this.theSecond = "";
                //第3名
                this.theThird = "";
            }
            return T_QuickGame;
        }());
        table.T_QuickGame = T_QuickGame;
        __reflect(T_QuickGame.prototype, "game.table.T_QuickGame");
        var T_QuickGame_Table = (function () {
            function T_QuickGame_Table() {
            }
            T_QuickGame_Table.getVoByKey = function (key) {
                var len = _T_QuickGame_.length;
                var data = table.SerchUtil.binary_search(_T_QuickGame_, "id", 0, len, key);
                return data;
            };
            T_QuickGame_Table.getAllVo = function () {
                return _T_QuickGame_;
            };
            return T_QuickGame_Table;
        }());
        table.T_QuickGame_Table = T_QuickGame_Table;
        __reflect(T_QuickGame_Table.prototype, "game.table.T_QuickGame_Table");
        var _T_QuickGame_ = [
            { id: 7, admissionFee: "10001_2000", minGunId: 1, theFirst: "10001_8000", theSecond: "10001_4000", theThird: "10001_2400", },
            { id: 8, admissionFee: "10001_12500", minGunId: 1, theFirst: "10001_50000", theSecond: "10001_25000", theThird: "10001_15000", },
            { id: 9, admissionFee: "10001_125000", minGunId: 1, theFirst: "50001_1", theSecond: "10001_250000", theThird: "10001_150000", },
            { id: 10, admissionFee: "10001_500000", minGunId: 1, theFirst: "50001_4", theSecond: "10001_1000000", theThird: "10001_600000", },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_QuickGame.js.map