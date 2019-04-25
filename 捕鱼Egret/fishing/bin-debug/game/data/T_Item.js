var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_Item = (function () {
            function T_Item() {
                //道具id
                this.id = 0;
                //道具名称
                this.name = 0;
                //道具类型
                this.type = 0;
                //拥有的功能
                this.functions = "";
                //每次邮寄数量
                this.everyTimeLimit = 0;
                //图片
                this.resUrl = "";
                //解释说明
                this.desc = 0;
                //背包数量上限
                this.backpackMax = 0;
                //价值类型_数量
                this.worth = "";
            }
            return T_Item;
        }());
        table.T_Item = T_Item;
        __reflect(T_Item.prototype, "game.table.T_Item");
        var T_Item_Table = (function () {
            function T_Item_Table() {
            }
            T_Item_Table.getVoByKey = function (key) {
                var len = _T_Item_.length;
                var data = table.SerchUtil.binary_search(_T_Item_, "id", 0, len, key);
                return data;
            };
            T_Item_Table.getAllVo = function () {
                return _T_Item_;
            };
            return T_Item_Table;
        }());
        table.T_Item_Table = T_Item_Table;
        __reflect(T_Item_Table.prototype, "game.table.T_Item_Table");
        var _T_Item_ = [
            { id: 10001, name: 2056, type: 1, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2000, backpackMax: 0, worth: "0", },
            { id: 10002, name: 2057, type: 1, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2001, backpackMax: 0, worth: "0", },
            { id: 10003, name: 2058, type: 1, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2002, backpackMax: 0, worth: "0", },
            { id: 10004, name: 2059, type: 1, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2003, backpackMax: 0, worth: "0", },
            { id: 10005, name: 2060, type: 1, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2004, backpackMax: 0, worth: "0", },
            { id: 10006, name: 2061, type: 1, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2005, backpackMax: 0, worth: "0", },
            { id: 10007, name: 2062, type: 1, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2006, backpackMax: 0, worth: "0", },
            { id: 10008, name: 2063, type: 1, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2007, backpackMax: 0, worth: "0", },
            { id: 10009, name: 2064, type: 1, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2008, backpackMax: 0, worth: "0", },
            { id: 10010, name: 2065, type: 1, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2009, backpackMax: 0, worth: "0", },
            { id: 10011, name: 2066, type: 1, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2010, backpackMax: 0, worth: "0", },
            { id: 10012, name: 2067, type: 1, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2011, backpackMax: 0, worth: "0", },
            { id: 10013, name: 2068, type: 1, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2012, backpackMax: 0, worth: "0", },
            { id: 20000, name: 2069, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2013, backpackMax: 1, worth: "0", },
            { id: 20001, name: 2070, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2014, backpackMax: 1, worth: "0", },
            { id: 20002, name: 2071, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2015, backpackMax: 1, worth: "0", },
            { id: 20003, name: 2072, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2016, backpackMax: 1, worth: "0", },
            { id: 20004, name: 2073, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2017, backpackMax: 1, worth: "0", },
            { id: 20005, name: 2074, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2018, backpackMax: 1, worth: "0", },
            { id: 20006, name: 2075, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2019, backpackMax: 1, worth: "0", },
            { id: 20051, name: 2076, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2020, backpackMax: 1, worth: "0", },
            { id: 20052, name: 2077, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2021, backpackMax: 1, worth: "0", },
            { id: 20053, name: 2078, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2022, backpackMax: 1, worth: "0", },
            { id: 20054, name: 2079, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2023, backpackMax: 1, worth: "0", },
            { id: 20055, name: 2080, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2024, backpackMax: 1, worth: "0", },
            { id: 20056, name: 2081, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2025, backpackMax: 1, worth: "0", },
            { id: 20057, name: 2082, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2026, backpackMax: 1, worth: "0", },
            { id: 20058, name: 2083, type: 2, functions: "4", everyTimeLimit: 0, resUrl: "null", desc: 2027, backpackMax: 1, worth: "0", },
            { id: 30001, name: 2084, type: 3, functions: "1_2", everyTimeLimit: 1, resUrl: "null", desc: 2028, backpackMax: 5, worth: "0", },
            { id: 30002, name: 2092, type: 5, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2036, backpackMax: 99999, worth: "0", },
            { id: 40001, name: 2085, type: 4, functions: "1", everyTimeLimit: 100, resUrl: "null", desc: 2029, backpackMax: 9999, worth: "1_10002_2", },
            { id: 40002, name: 2086, type: 4, functions: "1", everyTimeLimit: 40, resUrl: "null", desc: 2030, backpackMax: 9999, worth: "1_10002_5", },
            { id: 40003, name: 2087, type: 4, functions: "1", everyTimeLimit: 100, resUrl: "null", desc: 2031, backpackMax: 9999, worth: "1_10002_2", },
            { id: 40004, name: 2088, type: 4, functions: "1", everyTimeLimit: 10, resUrl: "null", desc: 2032, backpackMax: 90, worth: "1_10002_20", },
            { id: 40005, name: 2089, type: 4, functions: "1", everyTimeLimit: 10, resUrl: "null", desc: 2033, backpackMax: 90, worth: "1_10002_20", },
            { id: 40006, name: 2090, type: 4, functions: "1", everyTimeLimit: 0, resUrl: "null", desc: 2034, backpackMax: 2, worth: "0", },
            { id: 40007, name: 2091, type: 4, functions: "1", everyTimeLimit: 0, resUrl: "null", desc: 2035, backpackMax: 2, worth: "0", },
            { id: 50001, name: 2093, type: 6, functions: "0", everyTimeLimit: 1, resUrl: "null", desc: 2037, backpackMax: 999, worth: "0", },
            { id: 50002, name: 2094, type: 6, functions: "0", everyTimeLimit: 1, resUrl: "null", desc: 2038, backpackMax: 999, worth: "0", },
            { id: 50003, name: 2095, type: 6, functions: "0", everyTimeLimit: 1, resUrl: "null", desc: 2039, backpackMax: 999, worth: "0", },
            { id: 50004, name: 2096, type: 6, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2040, backpackMax: 999, worth: "1_10002_200", },
            { id: 60001, name: 2097, type: 7, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2041, backpackMax: 0, worth: "0", },
            { id: 60002, name: 2098, type: 7, functions: "1_7_8", everyTimeLimit: 50, resUrl: "null", desc: 2042, backpackMax: 999, worth: "0", },
            { id: 60003, name: 2099, type: 7, functions: "1_7_8", everyTimeLimit: 50, resUrl: "null", desc: 2043, backpackMax: 999, worth: "0", },
            { id: 60004, name: 2100, type: 7, functions: "1_7_8", everyTimeLimit: 50, resUrl: "null", desc: 2044, backpackMax: 999, worth: "0", },
            { id: 60005, name: 2101, type: 7, functions: "1_7_8", everyTimeLimit: 50, resUrl: "null", desc: 2045, backpackMax: 999, worth: "0", },
            { id: 60006, name: 2102, type: 7, functions: "1", everyTimeLimit: 50, resUrl: "null", desc: 2046, backpackMax: 999, worth: "0", },
            { id: 60007, name: 2103, type: 7, functions: "1", everyTimeLimit: 50, resUrl: "null", desc: 2047, backpackMax: 999, worth: "0", },
            { id: 70001, name: 2104, type: 8, functions: "1_2_3", everyTimeLimit: 10, resUrl: "null", desc: 2048, backpackMax: 999, worth: "0", },
            { id: 70002, name: 2105, type: 8, functions: "1_2_3", everyTimeLimit: 10, resUrl: "null", desc: 2049, backpackMax: 999, worth: "0", },
            { id: 70003, name: 2106, type: 8, functions: "1_2_3", everyTimeLimit: 10, resUrl: "null", desc: 2050, backpackMax: 999, worth: "0", },
            { id: 70004, name: 2107, type: 8, functions: "1_2_3", everyTimeLimit: 10, resUrl: "null", desc: 2051, backpackMax: 999, worth: "0", },
            { id: 70005, name: 2108, type: 8, functions: "0", everyTimeLimit: 0, resUrl: "null", desc: 2052, backpackMax: 9999, worth: "0", },
            { id: 80001, name: 2109, type: 9, functions: "4_5_6", everyTimeLimit: 0, resUrl: "null", desc: 2053, backpackMax: 1, worth: "0", },
            { id: 80002, name: 2110, type: 9, functions: "4_5_6", everyTimeLimit: 0, resUrl: "null", desc: 2054, backpackMax: 1, worth: "0", },
            { id: 80003, name: 2111, type: 9, functions: "4_5_6", everyTimeLimit: 0, resUrl: "null", desc: 2055, backpackMax: 1, worth: "0", },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_Item.js.map