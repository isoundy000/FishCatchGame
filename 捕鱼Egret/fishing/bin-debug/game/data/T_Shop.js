var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_Shop = (function () {
            function T_Shop() {
                //id
                this.id = 0;
                //商城类别
                this.shopType = 0;
                //道具ID
                this.itemId = 0;
                //道具数量
                this.num = 0;
                //价格
                this.price = "";
                //有效期
                this.validPeriod = 0;
            }
            return T_Shop;
        }());
        table.T_Shop = T_Shop;
        __reflect(T_Shop.prototype, "game.table.T_Shop");
        var T_Shop_Table = (function () {
            function T_Shop_Table() {
            }
            T_Shop_Table.getVoByKey = function (key) {
                var len = _T_Shop_.length;
                var data = table.SerchUtil.binary_search(_T_Shop_, "id", 0, len, key);
                return data;
            };
            T_Shop_Table.getAllVo = function () {
                return _T_Shop_;
            };
            return T_Shop_Table;
        }());
        table.T_Shop_Table = T_Shop_Table;
        __reflect(T_Shop_Table.prototype, "game.table.T_Shop_Table");
        var _T_Shop_ = [
            { id: 1, shopType: 1, itemId: 20001, num: 1, price: "10012_600", validPeriod: 720, },
            { id: 2, shopType: 1, itemId: 20006, num: 1, price: "10012_600", validPeriod: 720, },
            { id: 3, shopType: 1, itemId: 20005, num: 1, price: "10012_600", validPeriod: 720, },
            { id: 4, shopType: 1, itemId: 20004, num: 1, price: "10012_600", validPeriod: 720, },
            { id: 5, shopType: 3, itemId: 40001, num: 100, price: "10002_50", validPeriod: 0, },
            { id: 6, shopType: 3, itemId: 40002, num: 40, price: "10002_50", validPeriod: 0, },
            { id: 7, shopType: 3, itemId: 40003, num: 100, price: "10002_50", validPeriod: 0, },
            { id: 8, shopType: 2, itemId: 80001, num: 1, price: "10012_300", validPeriod: 720, },
            { id: 9, shopType: 2, itemId: 80002, num: 1, price: "10012_300", validPeriod: 720, },
            { id: 10, shopType: 2, itemId: 80003, num: 1, price: "10012_300", validPeriod: 720, },
            { id: 11, shopType: 3, itemId: 40004, num: 10, price: "10002_50", validPeriod: 0, },
            { id: 12, shopType: 3, itemId: 40005, num: 10, price: "10002_50", validPeriod: 0, },
            { id: 13, shopType: 3, itemId: 70001, num: 10, price: "10012_25", validPeriod: 0, },
            { id: 14, shopType: 3, itemId: 70002, num: 10, price: "10012_25", validPeriod: 0, },
            { id: 15, shopType: 3, itemId: 70003, num: 10, price: "10012_25", validPeriod: 0, },
            { id: 16, shopType: 3, itemId: 70004, num: 10, price: "10012_25", validPeriod: 0, },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_Shop.js.map