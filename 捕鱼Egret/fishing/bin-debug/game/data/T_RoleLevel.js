var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_RoleLevel = (function () {
            function T_RoleLevel() {
                //角色等级
                this.roleLevel = 0;
                //角色升级经验
                this.levelUpExp = 0;
                //升级奖励
                this.levelUpAward = "";
            }
            return T_RoleLevel;
        }());
        table.T_RoleLevel = T_RoleLevel;
        __reflect(T_RoleLevel.prototype, "game.table.T_RoleLevel");
        var T_RoleLevel_Table = (function () {
            function T_RoleLevel_Table() {
            }
            T_RoleLevel_Table.getVoByKey = function (key) {
                var len = _T_RoleLevel_.length;
                var data = table.SerchUtil.binary_search(_T_RoleLevel_, "roleLevel", 0, len, key);
                return data;
            };
            T_RoleLevel_Table.getAllVo = function () {
                return _T_RoleLevel_;
            };
            return T_RoleLevel_Table;
        }());
        table.T_RoleLevel_Table = T_RoleLevel_Table;
        __reflect(T_RoleLevel_Table.prototype, "game.table.T_RoleLevel_Table");
        var _T_RoleLevel_ = [
            { roleLevel: 1, levelUpExp: 376, levelUpAward: "10002_2,40001_2,40002_1", },
            { roleLevel: 2, levelUpExp: 996, levelUpAward: "10002_3,40001_2,40002_1", },
            { roleLevel: 3, levelUpExp: 1386, levelUpAward: "10002_3,40001_2,40002_1", },
            { roleLevel: 4, levelUpExp: 3186, levelUpAward: "10002_5,40001_2,40002_1", },
            { roleLevel: 5, levelUpExp: 5586, levelUpAward: "10002_5,40001_2,40002_1", },
            { roleLevel: 6, levelUpExp: 6886, levelUpAward: "10002_10,40001_2,40002_1", },
            { roleLevel: 7, levelUpExp: 9498, levelUpAward: "10002_10,40001_2,40002_1", },
            { roleLevel: 8, levelUpExp: 18998, levelUpAward: "10002_20,40001_2,40002_1", },
            { roleLevel: 9, levelUpExp: 48998, levelUpAward: "10002_20,40001_2,40002_1", },
            { roleLevel: 10, levelUpExp: 70000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 11, levelUpExp: 150000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 12, levelUpExp: 300000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 13, levelUpExp: 720000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 14, levelUpExp: 1150000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 15, levelUpExp: 1600000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 16, levelUpExp: 2300000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 17, levelUpExp: 2800000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 18, levelUpExp: 3200000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 19, levelUpExp: 4500000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 20, levelUpExp: 6000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 21, levelUpExp: 9000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 22, levelUpExp: 13500000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 23, levelUpExp: 18000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 24, levelUpExp: 30000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 25, levelUpExp: 45000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 26, levelUpExp: 60000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 27, levelUpExp: 75000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 28, levelUpExp: 90000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 29, levelUpExp: 150000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 30, levelUpExp: 300000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 31, levelUpExp: 450000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 32, levelUpExp: 600000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 33, levelUpExp: 750000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 34, levelUpExp: 900000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 35, levelUpExp: 1000000000, levelUpAward: "10002_40,40001_2,40002_1", },
            { roleLevel: 36, levelUpExp: 5000000000, levelUpAward: "10002_40,40001_2,40002_1", },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_RoleLevel.js.map