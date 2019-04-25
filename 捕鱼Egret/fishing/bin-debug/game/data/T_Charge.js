var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_Charge = (function () {
            function T_Charge() {
                //充值id
                this.id = 0;
                //充值名称
                this.name = 0;
                //充值类型
                this.type = 0;
                //出售价格
                this.price = "";
                //获取
                this.award = "";
                //首充该档位额外奖励
                this.firstAward = "";
                //描述
                this.desc = 0;
                //icon图片
                this.res = "";
                //平台对应充值ID
                this.productId = "";
                //对应平台
                this.platform = 0;
            }
            return T_Charge;
        }());
        table.T_Charge = T_Charge;
        __reflect(T_Charge.prototype, "game.table.T_Charge");
        var T_Charge_Table = (function () {
            function T_Charge_Table() {
            }
            T_Charge_Table.getVoByKey = function (key) {
                var len = _T_Charge_.length;
                var data = table.SerchUtil.binary_search(_T_Charge_, "id", 0, len, key);
                return data;
            };
            T_Charge_Table.getAllVo = function () {
                return _T_Charge_;
            };
            return T_Charge_Table;
        }());
        table.T_Charge_Table = T_Charge_Table;
        __reflect(T_Charge_Table.prototype, "game.table.T_Charge_Table");
        var _T_Charge_ = [
            { id: 1, name: 2160, type: 1, price: "10012_60", award: "10001_30000", firstAward: "10001_3000", desc: 2164, res: "101", productId: "null", platform: 0, },
            { id: 2, name: 2160, type: 1, price: "10012_120", award: "10001_60000", firstAward: "10001_6000", desc: 2165, res: "101", productId: "null", platform: 0, },
            { id: 3, name: 2160, type: 1, price: "10012_280", award: "10001_140000", firstAward: "10001_14000", desc: 2166, res: "102", productId: "null", platform: 0, },
            { id: 4, name: 2160, type: 1, price: "10012_500", award: "10001_250000", firstAward: "10001_25000", desc: 2167, res: "102", productId: "null", platform: 0, },
            { id: 5, name: 2160, type: 1, price: "10012_1000", award: "10001_500000", firstAward: "10001_50000", desc: 2168, res: "102", productId: "null", platform: 0, },
            { id: 6, name: 2160, type: 1, price: "10012_3000", award: "10001_1500000", firstAward: "10001_150000", desc: 2169, res: "103", productId: "null", platform: 0, },
            { id: 7, name: 2160, type: 1, price: "10012_5000", award: "10001_2500000", firstAward: "10001_250000", desc: 2170, res: "103", productId: "null", platform: 0, },
            { id: 8, name: 2160, type: 1, price: "10012_10000", award: "10001_5000000", firstAward: "10001_500000", desc: 2171, res: "103", productId: "null", platform: 0, },
            { id: 9, name: 2160, type: 1, price: "10012_20000", award: "10001_10000000", firstAward: "10001_1000000", desc: 2172, res: "103", productId: "null", platform: 0, },
            { id: 12, name: 2161, type: 2, price: "10012_60", award: "10002_60", firstAward: "0", desc: 2173, res: "201", productId: "null", platform: 0, },
            { id: 13, name: 2161, type: 2, price: "10012_120", award: "10002_120", firstAward: "0", desc: 2174, res: "201", productId: "null", platform: 0, },
            { id: 14, name: 2161, type: 2, price: "10012_280", award: "10002_280", firstAward: "0", desc: 2175, res: "201", productId: "null", platform: 0, },
            { id: 15, name: 2161, type: 2, price: "10012_500", award: "10002_500", firstAward: "0", desc: 2176, res: "202", productId: "null", platform: 0, },
            { id: 16, name: 2161, type: 2, price: "10012_1000", award: "10002_1000", firstAward: "0", desc: 2177, res: "202", productId: "null", platform: 0, },
            { id: 17, name: 2161, type: 2, price: "10012_3000", award: "10002_3000", firstAward: "0", desc: 2178, res: "202", productId: "null", platform: 0, },
            { id: 18, name: 2161, type: 2, price: "10012_5000", award: "10002_5000", firstAward: "0", desc: 2179, res: "203", productId: "null", platform: 0, },
            { id: 19, name: 2161, type: 2, price: "10012_10000", award: "10002_10000", firstAward: "0", desc: 2180, res: "203", productId: "null", platform: 0, },
            { id: 20, name: 2161, type: 2, price: "10012_20000", award: "10002_20000", firstAward: "0", desc: 2181, res: "203", productId: "null", platform: 0, },
            { id: 21, name: 2162, type: 3, price: "600", award: "10012_60", firstAward: "0", desc: 2182, res: "301", productId: "null", platform: 0, },
            { id: 22, name: 2162, type: 3, price: "1200", award: "10012_120", firstAward: "10012_6", desc: 2183, res: "301", productId: "null", platform: 0, },
            { id: 23, name: 2162, type: 3, price: "2800", award: "10012_280", firstAward: "10012_28", desc: 2184, res: "302", productId: "null", platform: 0, },
            { id: 24, name: 2162, type: 3, price: "5000", award: "10012_500", firstAward: "10012_75", desc: 2185, res: "302", productId: "null", platform: 0, },
            { id: 25, name: 2162, type: 3, price: "10000", award: "10012_1000", firstAward: "10012_200", desc: 2186, res: "302", productId: "null", platform: 0, },
            { id: 26, name: 2162, type: 3, price: "30000", award: "10012_3000", firstAward: "10012_750", desc: 2187, res: "302", productId: "null", platform: 0, },
            { id: 27, name: 2162, type: 3, price: "50000", award: "10012_5000", firstAward: "10012_1500", desc: 2188, res: "303", productId: "null", platform: 0, },
            { id: 28, name: 2162, type: 3, price: "100000", award: "10012_10000", firstAward: "10012_3000", desc: 2189, res: "303", productId: "null", platform: 0, },
            { id: 29, name: 2162, type: 3, price: "200000", award: "10012_20000", firstAward: "10012_6000", desc: 2190, res: "303", productId: "null", platform: 0, },
            { id: 30, name: 2163, type: 4, price: "10012_280", award: "10001_20000,10002_20,40001_5,40002_2", firstAward: "0", desc: 2191, res: "1", productId: "null", platform: 0, },
            { id: 48, name: 2162, type: 3, price: "600", award: "10012_60", firstAward: "0", desc: 2192, res: "301", productId: "9654", platform: 13, },
            { id: 49, name: 2162, type: 3, price: "1200", award: "10012_120", firstAward: "10012_6", desc: 2193, res: "301", productId: "9655", platform: 13, },
            { id: 50, name: 2162, type: 3, price: "2800", award: "10012_280", firstAward: "10012_28", desc: 2194, res: "302", productId: "9656", platform: 13, },
            { id: 51, name: 2162, type: 3, price: "5000", award: "10012_500", firstAward: "10012_75", desc: 2195, res: "302", productId: "9657", platform: 13, },
            { id: 52, name: 2162, type: 3, price: "10000", award: "10012_1000", firstAward: "10012_200", desc: 2196, res: "302", productId: "9658", platform: 13, },
            { id: 53, name: 2162, type: 3, price: "30000", award: "10012_3000", firstAward: "10012_750", desc: 2197, res: "302", productId: "9659", platform: 13, },
            { id: 54, name: 2162, type: 3, price: "50000", award: "10012_5000", firstAward: "10012_1500", desc: 2198, res: "303", productId: "9660", platform: 13, },
            { id: 55, name: 2162, type: 3, price: "100000", award: "10012_10000", firstAward: "10012_3000", desc: 2199, res: "303", productId: "9661", platform: 13, },
            { id: 56, name: 2162, type: 3, price: "200000", award: "10012_20000", firstAward: "10012_6000", desc: 2200, res: "303", productId: "9662", platform: 13, },
            { id: 77, name: 2162, type: 3, price: "600", award: "10012_60", firstAward: "0", desc: 2201, res: "301", productId: "9663", platform: 14, },
            { id: 78, name: 2162, type: 3, price: "1200", award: "10012_120", firstAward: "10012_6", desc: 2202, res: "301", productId: "9664", platform: 14, },
            { id: 79, name: 2162, type: 3, price: "2800", award: "10012_280", firstAward: "10012_28", desc: 2203, res: "302", productId: "9665", platform: 14, },
            { id: 80, name: 2162, type: 3, price: "5000", award: "10012_500", firstAward: "10012_75", desc: 2204, res: "302", productId: "9666", platform: 14, },
            { id: 81, name: 2162, type: 3, price: "10000", award: "10012_1000", firstAward: "10012_200", desc: 2205, res: "302", productId: "9667", platform: 14, },
            { id: 82, name: 2162, type: 3, price: "30000", award: "10012_3000", firstAward: "10012_750", desc: 2206, res: "302", productId: "9668", platform: 14, },
            { id: 83, name: 2162, type: 3, price: "50000", award: "10012_5000", firstAward: "10012_1500", desc: 2207, res: "303", productId: "9669", platform: 14, },
            { id: 84, name: 2162, type: 3, price: "100000", award: "10012_10000", firstAward: "10012_3000", desc: 2208, res: "303", productId: "9670", platform: 14, },
            { id: 85, name: 2162, type: 3, price: "200000", award: "10012_20000", firstAward: "10012_6000", desc: 2209, res: "303", productId: "9671", platform: 14, },
            { id: 86, name: 2162, type: 3, price: "600", award: "10012_60", firstAward: "0", desc: 2210, res: "301", productId: "null", platform: 9, },
            { id: 87, name: 2162, type: 3, price: "1200", award: "10012_120", firstAward: "10012_6", desc: 2211, res: "301", productId: "null", platform: 9, },
            { id: 88, name: 2162, type: 3, price: "2800", award: "10012_280", firstAward: "10012_28", desc: 2212, res: "302", productId: "null", platform: 9, },
            { id: 89, name: 2162, type: 3, price: "5000", award: "10012_500", firstAward: "10012_75", desc: 2213, res: "302", productId: "null", platform: 9, },
            { id: 90, name: 2162, type: 3, price: "10000", award: "10012_1000", firstAward: "10012_200", desc: 2214, res: "302", productId: "null", platform: 9, },
            { id: 91, name: 2162, type: 3, price: "30000", award: "10012_3000", firstAward: "10012_750", desc: 2215, res: "302", productId: "null", platform: 9, },
            { id: 92, name: 2162, type: 3, price: "50000", award: "10012_5000", firstAward: "10012_1500", desc: 2216, res: "303", productId: "null", platform: 9, },
            { id: 93, name: 2162, type: 3, price: "100000", award: "10012_10000", firstAward: "10012_3000", desc: 2217, res: "303", productId: "null", platform: 9, },
            { id: 94, name: 2162, type: 3, price: "200000", award: "10012_20000", firstAward: "10012_6000", desc: 2218, res: "303", productId: "null", platform: 9, },
            { id: 10000, name: 2162, type: 3, price: "600", award: "10012_60", firstAward: "0", desc: 2210, res: "301", productId: "1", platform: 2, },
            { id: 10001, name: 2162, type: 3, price: "1200", award: "10012_120", firstAward: "10012_6", desc: 2211, res: "301", productId: "3", platform: 2, },
            { id: 10002, name: 2162, type: 3, price: "2800", award: "10012_280", firstAward: "10012_28", desc: 2212, res: "302", productId: "4", platform: 2, },
            { id: 10003, name: 2162, type: 3, price: "5000", award: "10012_500", firstAward: "10012_75", desc: 2213, res: "302", productId: "5", platform: 2, },
            { id: 10004, name: 2162, type: 3, price: "10000", award: "10012_1000", firstAward: "10012_200", desc: 2214, res: "302", productId: "6", platform: 2, },
            { id: 10005, name: 2162, type: 3, price: "30000", award: "10012_3000", firstAward: "10012_750", desc: 2215, res: "302", productId: "7", platform: 2, },
            { id: 10006, name: 2162, type: 3, price: "50000", award: "10012_5000", firstAward: "10012_1500", desc: 2216, res: "303", productId: "8", platform: 2, },
            { id: 10007, name: 2162, type: 3, price: "100000", award: "10012_10000", firstAward: "10012_3000", desc: 2217, res: "303", productId: "9", platform: 2, },
            { id: 10008, name: 2162, type: 3, price: "200000", award: "10012_20000", firstAward: "10012_6000", desc: 2218, res: "303", productId: "10", platform: 2, },
            { id: 10100, name: 2162, type: 3, price: "600", award: "10012_60", firstAward: "0", desc: 2210, res: "301", productId: "null", platform: 5, },
            { id: 10101, name: 2162, type: 3, price: "1200", award: "10012_120", firstAward: "10012_6", desc: 2211, res: "301", productId: "null", platform: 5, },
            { id: 10102, name: 2162, type: 3, price: "2800", award: "10012_280", firstAward: "10012_28", desc: 2212, res: "302", productId: "null", platform: 5, },
            { id: 10103, name: 2162, type: 3, price: "5000", award: "10012_500", firstAward: "10012_75", desc: 2213, res: "302", productId: "null", platform: 5, },
            { id: 10104, name: 2162, type: 3, price: "10000", award: "10012_1000", firstAward: "10012_200", desc: 2214, res: "302", productId: "null", platform: 5, },
            { id: 10105, name: 2162, type: 3, price: "30000", award: "10012_3000", firstAward: "10012_750", desc: 2215, res: "302", productId: "null", platform: 5, },
            { id: 10106, name: 2162, type: 3, price: "50000", award: "10012_5000", firstAward: "10012_1500", desc: 2216, res: "303", productId: "null", platform: 5, },
            { id: 10107, name: 2162, type: 3, price: "100000", award: "10012_10000", firstAward: "10012_3000", desc: 2217, res: "303", productId: "null", platform: 5, },
            { id: 10108, name: 2162, type: 3, price: "200000", award: "10012_20000", firstAward: "10012_6000", desc: 2218, res: "303", productId: "null", platform: 5, },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_Charge.js.map