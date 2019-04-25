var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_Lottery = (function () {
            function T_Lottery() {
                //抽奖id
                this.id = 0;
                //名称
                this.name = 0;
                //奖池积分
                this.integral = 0;
                //奖励1
                this.award1 = "";
                //奖励2
                this.award2 = "";
                //奖励3
                this.award3 = "";
                //奖励4
                this.award4 = "";
                //奖励5
                this.award5 = "";
                //奖励6
                this.award6 = "";
            }
            return T_Lottery;
        }());
        table.T_Lottery = T_Lottery;
        __reflect(T_Lottery.prototype, "game.table.T_Lottery");
        var T_Lottery_Table = (function () {
            function T_Lottery_Table() {
            }
            T_Lottery_Table.getVoByKey = function (key) {
                var len = _T_Lottery_.length;
                var data = table.SerchUtil.binary_search(_T_Lottery_, "id", 0, len, key);
                return data;
            };
            T_Lottery_Table.getAllVo = function () {
                return _T_Lottery_;
            };
            return T_Lottery_Table;
        }());
        table.T_Lottery_Table = T_Lottery_Table;
        __reflect(T_Lottery_Table.prototype, "game.table.T_Lottery_Table");
        var _T_Lottery_ = [
            { id: 1, name: 2416, integral: 100, award1: "30002_2_1250", award2: "10002_10_5000", award3: "10002_5_2500", award4: "10001_600_600", award5: "10001_300_300", award6: "10001_100_100", },
            { id: 2, name: 2417, integral: 20000, award1: "30002_15_9375", award2: "10002_100_50000", award3: "10002_50_25000", award4: "10001_50000_50000", award5: "10001_24000_24000", award6: "10001_8000_8000", },
            { id: 3, name: 2418, integral: 100000, award1: "30002_30_18750", award2: "50002_2_450000", award3: "10002_150_75000", award4: "10001_250000_250000", award5: "10001_120000_120000", award6: "10001_40000_40000", },
            { id: 4, name: 2419, integral: 200000, award1: "30002_70_43750", award2: "50001_1_750000", award3: "10002_300_150000", award4: "10001_500000_500000", award5: "10001_240000_240000", award6: "10001_80000_80000", },
            { id: 5, name: 2420, integral: 400000, award1: "30002_150_93750", award2: "50001_2_1500000", award3: "10002_500_250000", award4: "10001_1000000_1000000", award5: "10001_480000_480000", award6: "10001_160000_160000", },
            { id: 6, name: 2421, integral: 1200000, award1: "30002_450_281250", award2: "50001_6_4500000", award3: "10002_800_400000", award4: "10001_3000000_3000000", award5: "10001_1440000_1440000", award6: "10001_480000_480000", },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_Lottery.js.map