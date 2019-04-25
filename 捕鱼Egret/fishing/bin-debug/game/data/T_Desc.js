var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_Desc = (function () {
            function T_Desc() {
                //子弹id
                this.id = 0;
                //描述宽高
                this.descW_H = "";
                //特权描述
                this.descVip = 0;
            }
            return T_Desc;
        }());
        table.T_Desc = T_Desc;
        __reflect(T_Desc.prototype, "game.table.T_Desc");
        var T_Desc_Table = (function () {
            function T_Desc_Table() {
            }
            T_Desc_Table.getVoByKey = function (key) {
                var len = _T_Desc_.length;
                var data = table.SerchUtil.binary_search(_T_Desc_, "id", 0, len, key);
                return data;
            };
            T_Desc_Table.getAllVo = function () {
                return _T_Desc_;
            };
            return T_Desc_Table;
        }());
        table.T_Desc_Table = T_Desc_Table;
        __reflect(T_Desc_Table.prototype, "game.table.T_Desc_Table");
        var _T_Desc_ = [
            { id: 1, descW_H: "400_150", descVip: 2323, },
            { id: 2, descW_H: "420_120", descVip: 2324, },
            { id: 3, descW_H: "420_220", descVip: 2325, },
            { id: 4, descW_H: "420_220", descVip: 2326, },
            { id: 5, descW_H: "420_270", descVip: 2327, },
            { id: 6, descW_H: "420_270", descVip: 2328, },
            { id: 7, descW_H: "420_280", descVip: 2329, },
            { id: 8, descW_H: "420_280", descVip: 2330, },
            { id: 9, descW_H: "420_280", descVip: 2331, },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_Desc.js.map