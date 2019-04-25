var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_WorldBoss = (function () {
            function T_WorldBoss() {
                //BOSSID
                this.id = 0;
                //鱼ID
                this.fishId = 0;
            }
            return T_WorldBoss;
        }());
        table.T_WorldBoss = T_WorldBoss;
        __reflect(T_WorldBoss.prototype, "game.table.T_WorldBoss");
        var T_WorldBoss_Table = (function () {
            function T_WorldBoss_Table() {
            }
            T_WorldBoss_Table.getVoByKey = function (key) {
                var len = _T_WorldBoss_.length;
                var data = table.SerchUtil.binary_search(_T_WorldBoss_, "id", 0, len, key);
                return data;
            };
            T_WorldBoss_Table.getAllVo = function () {
                return _T_WorldBoss_;
            };
            return T_WorldBoss_Table;
        }());
        table.T_WorldBoss_Table = T_WorldBoss_Table;
        __reflect(T_WorldBoss_Table.prototype, "game.table.T_WorldBoss_Table");
        var _T_WorldBoss_ = [
            { id: 1, fishId: 201, },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_WorldBoss.js.map