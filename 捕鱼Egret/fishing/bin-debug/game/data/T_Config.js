var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_Config = (function () {
            function T_Config() {
                //id
                this.id = 0;
                //数值
                this.value = "";
            }
            return T_Config;
        }());
        table.T_Config = T_Config;
        __reflect(T_Config.prototype, "game.table.T_Config");
        var T_Config_Table = (function () {
            function T_Config_Table() {
            }
            T_Config_Table.getVoByKey = function (key) {
                var len = _T_Config_.length;
                var data = table.SerchUtil.binary_search(_T_Config_, "id", 0, len, key);
                return data;
            };
            T_Config_Table.getAllVo = function () {
                return _T_Config_;
            };
            return T_Config_Table;
        }());
        table.T_Config_Table = T_Config_Table;
        __reflect(T_Config_Table.prototype, "game.table.T_Config_Table");
        var _T_Config_ = [
            { id: 12, value: "10000", },
            { id: 13, value: "15000", },
            { id: 14, value: "30000", },
            { id: 15, value: "5_10", },
            { id: 17, value: "3000000", },
            { id: 20, value: "20000", },
            { id: 21, value: "30000", },
            { id: 24, value: "101,102,103", },
            { id: 29, value: "20", },
            { id: 30, value: "10", },
            { id: 32, value: "1_30000_30000", },
            { id: 33, value: "2_4", },
            { id: 34, value: "2_5", },
            { id: 35, value: "4_6", },
            { id: 36, value: "14_27_34", },
            { id: 37, value: "35", },
            { id: 38, value: "50", },
            { id: 41, value: "30", },
            { id: 42, value: "30", },
            { id: 43, value: "1", },
            { id: 46, value: "0_5", },
            { id: 47, value: "1_3", },
            { id: 48, value: "11_13", },
            { id: 49, value: "12", },
            { id: 50, value: "1_7", },
            { id: 51, value: "20000", },
            { id: 52, value: "30", },
            { id: 53, value: "10001_80000,10002_100", },
            { id: 54, value: "600_800_800", },
            { id: 55, value: "5", },
            { id: 56, value: "10002_30", },
            { id: 57, value: "30002_20,10001_2000,10002_10,40001_5", },
            { id: 58, value: "10", },
            { id: 59, value: "10001_1,30002_2,10001_8000,10002_20,40001_5,10001_4000,10002_10,50001_1,10001_800,10002_5", },
            { id: 60, value: "23_14_14", },
            { id: 61, value: "1_0_1", },
            { id: 62, value: "10002_100", },
            { id: 63, value: "2000_1500_600", },
            { id: 64, value: "1500_1000_500,1000_500_200", },
            { id: 65, value: "600_10,400_11,200_12", },
            { id: 66, value: "5001_5002_5003,5003_5004_5005,5006_5007_5008,5009_5001", },
            { id: 67, value: "240", },
            { id: 68, value: "1,2,3,4-10,11-20,21-50,51-100,101-200", },
            { id: 69, value: "100_200_300,100_200_300", },
            { id: 70, value: "50001_5", },
            { id: 71, value: "10002_20", },
            { id: 72, value: "4", },
            { id: 73, value: "2", },
            { id: 74, value: "2400,1600", },
            { id: 75, value: "5001_5002_5003,5003_5004_5005,5006_5007_5008,5009_5001", },
            { id: 76, value: "40006_2,40007_2", },
            { id: 77, value: "11", },
            { id: 78, value: "14", },
            { id: 79, value: "3", },
            { id: 80, value: "10001_20000", },
            { id: 81, value: "10001_20000", },
            { id: 82, value: "10000", },
            { id: 83, value: "2", },
            { id: 84, value: "10002_10", },
            { id: 85, value: "207,208,209,210,211,212,213,214,215", },
            { id: 86, value: "5", },
            { id: 87, value: "20", },
            { id: 88, value: "8", },
            { id: 89, value: "2", },
            { id: 90, value: "30", },
            { id: 91, value: "10001_10000,10002_30", },
            { id: 92, value: "10002_10", },
            { id: 93, value: "3", },
            { id: 94, value: "0_e7788f671b0da28db2b990dc106da7f8,1_3b0d270a35fc84d859001848fe6a86bc,2_bd1f553a84516dff51bad75833f38b27,3_6c1bf1a19c2f708e7235f1aba9eb230f,4_947cabda6a48f43ac9db95253cfe3a86,5_b1ce1e2206fca96be34de8a5abdf251c,6_c27d404e49ac8b35e391d42a55dd5072,7_6faf10edfa4e80a4c375b804ab707cd5", },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_Config.js.map