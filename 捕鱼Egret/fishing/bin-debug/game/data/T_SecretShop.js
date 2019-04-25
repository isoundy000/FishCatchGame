var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_SecretShop = (function () {
            function T_SecretShop() {
                //id
                this.id = 0;
                //物品
                this.goods = "";
                //价格
                this.price = "";
            }
            return T_SecretShop;
        }());
        table.T_SecretShop = T_SecretShop;
        __reflect(T_SecretShop.prototype, "game.table.T_SecretShop");
        var T_SecretShop_Table = (function () {
            function T_SecretShop_Table() {
            }
            T_SecretShop_Table.getVoByKey = function (key) {
                var len = _T_SecretShop_.length;
                var data = table.SerchUtil.binary_search(_T_SecretShop_, "id", 0, len, key);
                return data;
            };
            T_SecretShop_Table.getAllVo = function () {
                return _T_SecretShop_;
            };
            return T_SecretShop_Table;
        }());
        table.T_SecretShop_Table = T_SecretShop_Table;
        __reflect(T_SecretShop_Table.prototype, "game.table.T_SecretShop_Table");
        var _T_SecretShop_ = [
            { id: 1, goods: "40001_5", price: "10001_10,10013_2", },
            { id: 2, goods: "40001_10", price: "10001_20,10013_4", },
            { id: 3, goods: "40002_5", price: "10001_10,10013_2", },
            { id: 4, goods: "40003_10", price: "10001_20,10013_4", },
            { id: 5, goods: "50001_1", price: "10001_500000,10013_100000", },
            { id: 6, goods: "50002_1", price: "10001_200000,10013_40000", },
            { id: 7, goods: "20001_1_720", price: "10001_500000,10013_100000", },
            { id: 8, goods: "20002_1_720", price: "10001_1000000,10013_200000", },
            { id: 9, goods: "10002_50", price: "10001_25000,10013_5000", },
            { id: 10, goods: "10002_100", price: "10001_50000,10013_10000", },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_SecretShop.js.map